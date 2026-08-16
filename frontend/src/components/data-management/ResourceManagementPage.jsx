import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import OffCanvas from "./OffCanvas";
import ResourceForm from "./ResourceForm";
import ResourceTable from "./ResourceTable";
import { useToast } from "../ui/Toast";
import ConfirmDialog from "../ui/ConfirmDialog";

const dateValue = (value) =>
  value ? new Date(value).toISOString().slice(0, 10) : "";

export default function ResourceManagementPage({ resource }) {
  const dispatch = useDispatch();
  const toast = useToast();
  const state = useSelector((store) => store[resource.storeKey]);
  const loggedInUser = useSelector((store) => store.auth.user);
  const items = Array.isArray(state?.[resource.itemsKey])
  ? state[resource.itemsKey]
  : [];
  const [search, setSearch] = useState("");
  const [panel, setPanel] = useState(null);
  const [selected, setSelected] = useState(null);
  const [formData, setFormData] = useState(resource.emptyForm);
  const [formErrors, setFormErrors] = useState({});
  const [itemToDelete, setItemToDelete] = useState(null);

  const userId = loggedInUser?.userId;
  useEffect(() => {
    dispatch(resource.actions.fetchAll(userId));
  }, [dispatch, resource.actions, userId]);

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return items;
    return items.filter((item) =>
      resource.searchFields.some((field) =>
        String(item[field] || "")
          .toLowerCase()
          .includes(query),
      ),
    );
  }, [items, resource.searchFields, search]);

  const closePanel = () => {
    setPanel(null);
    setSelected(null);
    setFormData(resource.emptyForm);
    setFormErrors({});
  };
  const openCreate = () => {
    setSelected(null);
    setFormData(resource.emptyForm);
    setFormErrors({});
    setPanel("form");
  };
  const openEdit = (item) => {
    setSelected(item);
    setFormData(resource.toForm(item, dateValue));
    setFormErrors({});
    setPanel("form");
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setFormErrors((current) => ({ ...current, [name]: "" }));
  };
  const validateForm = () => {
    const errors = {};
    resource.fields.forEach((field) => {
      const value = String(formData[field.name] ?? "").trim();
      if (field.required && !(selected && field.optionalOnEdit) && !value)
        errors[field.name] = `${field.label} is required.`;
      else if (value && field.type === "email" && !/^\S+@\S+\.\S+$/.test(value))
        errors[field.name] = "Enter a valid email address.";
      else if (value && field.pattern && !field.pattern.test(value))
        errors[field.name] =
          field.errorMessage || `Enter a valid ${field.label.toLowerCase()}.`;
    });
    return errors;
  };
  const handleDelete = async () => {
    if (!itemToDelete) return;
    try {
      await dispatch(
        resource.actions.remove({ id: itemToDelete._id, userId }),
      ).unwrap();
      await dispatch(resource.actions.fetchAll(userId)).unwrap();
      toast(`${resource.singular} deleted successfully.`, "success");
      setItemToDelete(null);
    } catch (error) {
      toast(
        error?.message ||
          error?.error ||
          `Unable to delete ${resource.singular.toLowerCase()}.`,
        "error",
      );
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      toast("Please correct the highlighted fields.", "error");
      return;
    }
    const payload = resource.toPayload(formData, userId, selected);
    try {
      if (selected) await dispatch(resource.actions.update(payload)).unwrap();
      else await dispatch(resource.actions.create(payload)).unwrap();
      await dispatch(resource.actions.fetchAll(userId)).unwrap();
      toast(
        `${resource.singular} ${selected ? "updated" : "created"} successfully.`,
        "success",
      );
      closePanel();
    } catch (error) {
      toast(
        error?.message ||
          error?.error ||
          `Unable to save ${resource.singular.toLowerCase()}.`,
        "error",
      );
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: "easeOut" }}
      className="w-full px-0 py-1 sm:py-2"
    >
      <header className="mb-4 flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white to-blue-50/70 p-4 shadow-sm sm:mb-6 sm:p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
            Operations
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {resource.plural}
          </h1>
          <p className="mt-1 text-sm text-slate-500">{resource.description}</p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:shadow-blue-600/30 active:translate-y-0 sm:w-auto"
        >
          <Plus size={17} />
          Add {resource.singular}
        </button>
      </header>
      {state.error && items.length === 0 ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {state.error?.message || state.error}
        </div>
      ) : (
        <ResourceTable
          resource={resource}
          rows={filteredItems}
          columns={resource.columns}
          search={search}
          onSearchChange={setSearch}
          onView={(item) => {
            setSelected(item);
            setPanel("view");
          }}
          loading={state.loading}
          onEdit={openEdit}
          onDelete={setItemToDelete}
        />
      )}
      <OffCanvas
        open={panel === "form"}
        onClose={closePanel}
        title={
          selected ? `Edit ${resource.singular}` : `Create ${resource.singular}`
        }
        description={
          selected
            ? `Update ${resource.singular.toLowerCase()} information.`
            : `Add a new ${resource.singular.toLowerCase()} to your fleet.`
        }
      >
        <ResourceForm
          fields={resource.fields}
          values={formData}
          errors={formErrors}
          onChange={handleChange}
          onCancel={closePanel}
          onSubmit={handleSubmit}
          saving={state.loading}
          isEditing={Boolean(selected)}
          resourceName={resource.singular}
        />
      </OffCanvas>
      <OffCanvas
        open={panel === "view"}
        onClose={closePanel}
        title={`${resource.singular} details`}
        description={`Complete ${resource.singular.toLowerCase()} information.`}
      >
        <div className="flex-1 overflow-y-auto p-6">
          <dl className="space-y-4">
            {resource.details.map((detail) => (
              <div
                key={detail.label}
                className="border-b border-slate-100 pb-3"
              >
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  {detail.label}
                </dt>
                <dd className="mt-1 text-sm text-slate-800">
                  {detail.format
                    ? detail.format(selected?.[detail.key], selected)
                    : selected?.[detail.key] || "—"}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </OffCanvas>
      <ConfirmDialog
        open={Boolean(itemToDelete)}
        loading={state.loading}
        title={`Delete ${resource.singular}?`}
        description={`This will permanently remove ${itemToDelete?.firstName ? `${itemToDelete.firstName} ${itemToDelete.lastName || ""}`.trim() : `this ${resource.singular.toLowerCase()}`}. This action cannot be undone.`}
        onCancel={() => setItemToDelete(null)}
        onConfirm={handleDelete}
      />
    </motion.div>
  );
}
