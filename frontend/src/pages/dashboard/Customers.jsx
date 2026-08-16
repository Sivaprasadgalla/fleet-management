import ResourceManagementPage from "../../components/data-management/ResourceManagementPage";
import {
  createCustomer,
  deleteCustomer,
  getCustomers,
  updateCustomer,
} from "../../app/customers/customerAction";

const badge = (value) => (
  <span className={`rounded-full px-2.5 py-2 text-xs font-medium capitalize ${(value == "Active" || value == "Individual" || value == "Corporate")?  "text-blue-700 bg-blue-50"  : "text-red-600 bg-red-50" }`}>
  
    {value || "—"}
  </span>
);
const customersResource = {
  singular: "Customer",
  plural: "Customers",
  storeKey: "customers",
  itemsKey: "customers",
  description: "Manage customer contacts, addresses and account status.",
  searchFields: [
    "firstName",
    "lastName",
    "email",
    "phoneNumber",
    "companyName",
    "city",
  ],
  emptyForm: {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    companyName: "",
    customerType: "Individual",
    status: "Active",
  },
  actions: {
    fetchAll: getCustomers,
    create: createCustomer,
    update: updateCustomer,
    remove: deleteCustomer,
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
      name: "companyName",
      label: "Company name",
      required: true,
      placeholder: "Company name",
    },
    {
      name: "customerType",
      label: "Customer type",
      type: "select",
      options: [
        { value: "Individual", label: "Individual" },
        { value: "Corporate", label: "Corporate" },
      ],
    },
    {
      name: "address",
      label: "Address",
      type: "textarea",
      required: true,
      fullWidth: true,
      placeholder: "Street address",
    },
    { name: "city", label: "City", required: true, placeholder: "City" },
    { name: "state", label: "State", required: true, placeholder: "State" },
    {
      name: "pincode",
      label: "Pincode",
      required: true,
      placeholder: "Pincode",
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "Active", label: "Active" },
        { value: "Inactive", label: "Inactive" },
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
      name: "COMPANY",
      selector: (row) => row.companyName,
      sortable: true,
      minWidth: "170px",
      cell: (row) => row.companyName || "—",
    },
    {
      name: "CONTACT",
      selector: (row) => row.email,
      sortable: true,
      minWidth: "210px",
      cell: (row) => (
        <div className="py-2">
          <p className="text-slate-700">{row.email || "—"}</p>
          <p className="text-xs text-slate-400">{row.phoneNumber || "—"}</p>
        </div>
      ),
    },
    {
      name: "TYPE",
      selector: (row) => row.customerType,
      sortable: true,
      cell: (row) => badge(row.customerType),
    },
    {
      name: "STATUS",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => badge(row.status),
    },
  ],
  details: [
    {
      label: "Name",
      key: "firstName",
      format: (_, item) =>
        `${item?.firstName || ""} ${item?.lastName || ""}`.trim() || "—",
    },
    { label: "Company", key: "companyName" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phoneNumber" },
    { label: "Address", key: "address" },
    { label: "City", key: "city" },
    { label: "Customer type", key: "customerType" },
    { label: "Status", key: "status" },
  ],
  toForm: (row) => ({
    firstName: row.firstName || "",
    lastName: row.lastName || "",
    phoneNumber: row.phoneNumber || "",
    email: row.email || "",
    address: row.address || "",
    city: row.city || "",
    state: row.state || "",
    pincode: row.pincode || "",
    companyName: row.companyName || "",
    customerType: row.customerType || "Individual",
    status: row.status || "Active",
  }),
  toPayload: (form, userId, selected) =>
    Object.fromEntries(
      Object.entries({ ...form, userId, id: selected?._id }).map(
        ([key, value]) => [
          key,
          typeof value === "string" ? value.trim() : value,
        ],
      ),
    ),
};

export default function Customers() {
  return <ResourceManagementPage resource={customersResource} />;
}
