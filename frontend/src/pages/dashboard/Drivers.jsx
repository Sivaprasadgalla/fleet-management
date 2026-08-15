import ResourceManagementPage from "../../components/data-management/ResourceManagementPage";
import {
  createDriver,
  deleteDriver,
  getDrivers,
  updateDriver,
} from "../../app/drivers/driverAction";

const status = (value) => (
  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
    {value || "—"}
  </span>
);
const driversResource = {
  singular: "Driver",
  plural: "Drivers",
  storeKey: "drivers",
  itemsKey: "drivers",
  description: "Manage driver profiles, licence records and availability.",
  searchFields: [
    "firstName",
    "lastName",
    "email",
    "phoneNumber",
    "licenseNumber",
    "status",
  ],
  emptyForm: {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    licenseNumber: "",
    licenseExpiry: "",
    status: "Available",
  },
  actions: {
    fetchAll: getDrivers,
    create: createDriver,
    update: updateDriver,
    remove: deleteDriver,
  },
  fields: [
    {
      name: "firstName",
      label: "First name",
      required: true,
      placeholder: "First name",
    },
    {
      name: "lastName",
      label: "Last name",
      required: true,
      placeholder: "Last name",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
      placeholder: "Email address",
    },
    {
      name: "phoneNumber",
      label: "Phone number",
      required: true,
      placeholder: "10-digit phone number",
      pattern: /^\d{10}$/,
      errorMessage: "Enter a 10-digit phone number.",
    },
    {
      name: "licenseNumber",
      label: "Licence number",
      required: true,
      placeholder: "Licence number",
    },
    {
      name: "licenseExpiry",
      label: "Licence expiry",
      type: "date",
      required: true,
    },
    {
      name: "status",
      label: "Availability",
      type: "select",
      options: [
        { value: "Available", label: "Available" },
        { value: "Assigned", label: "Assigned" },
        { value: "InActive", label: "Inactive" },
      ],
    },
  ],
  columns: [
    {
      name: "NAME",
      selector: (row) => `${row.firstName || ""} ${row.lastName || ""}`,
      sortable: true,
      minWidth: "180px",
      cell: (row) => (
        <span className="font-semibold text-slate-800">
          {row.firstName} {row.lastName}
        </span>
      ),
    },
    {
      name: "CONTACT",
      selector: (row) => row.email,
      sortable: true,
      minWidth: "210px",
      cell: (row) => (
        <div className="py-2">
          <p className="text-slate-700">{row.email || "—"}</p>
        </div>
      ),
    },
    {
      name: "PHONE NUMBER",
      selector: (row) => row.email,
      sortable: true,
      minWidth: "210px",
      cell: (row) => (
        <div className="py-2">
          <p className="text-slate-700">{row.phoneNumber || "—"}</p>
        </div>
      ),
    },
    {
      name: "LICENCE",
      selector: (row) => row.licenseNumber,
      sortable: true,
      minWidth: "150px",
      cell: (row) => row.licenseNumber || "—",
    },
    {
      name: "STATUS",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => status(row.status),
    },
  ],
  details: [
    {
      label: "Name",
      key: "firstName",
      format: (_, item) =>
        `${item?.firstName || ""} ${item?.lastName || ""}`.trim() || "—",
    },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phoneNumber" },
    { label: "Licence number", key: "licenseNumber" },
    {
      label: "Licence expiry",
      key: "licenseExpiry",
      format: (value) => (value ? new Date(value).toLocaleDateString() : "—"),
    },
    { label: "Status", key: "status" },
  ],
  toForm: (row, dateValue) => ({
    firstName: row.firstName || "",
    lastName: row.lastName || "",
    phoneNumber: row.phoneNumber || "",
    email: row.email || "",
    licenseNumber: row.licenseNumber || "",
    licenseExpiry: dateValue(row.licenseExpiry),
    status: row.status || "Available",
  }),
  toPayload: (form, userId, selected) => ({
    ...form,
    userId,
    id: selected?._id,
    firstName: form.firstName.trim(),
    lastName: form.lastName.trim(),
    email: form.email.trim(),
    phoneNumber: form.phoneNumber.trim(),
    licenseNumber: form.licenseNumber.trim(),
  }),
};

export default function Drivers() {
  return <ResourceManagementPage resource={driversResource} />;
}
