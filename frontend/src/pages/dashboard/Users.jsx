import ResourceManagementPage from "../../components/data-management/ResourceManagementPage";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../../app/users/userActions";

const badge = (value) => (
  <span className={`rounded-full px-3.5 py-2 text-xs font-medium capitalize ${value == "admin" ?  "text-green-700 bg-blue-50"  : "text-blue-900 bg-blue-50" }`}>
  
    {value || "—"}
  </span>
);

const badgeStatus = (value) => (
  <span className={`rounded-full px-2.5 py-2 text-xs font-medium capitalize ${value == "active" ?  "text-blue-700 bg-blue-50"  : "text-red-600 bg-red-50" }`}>
  
    {value || "—"}
  </span>
);

const usersResource = {
  singular: "User",
  plural: "Users",
  storeKey: "users",
  itemsKey: "users",
  description: "Manage users, roles and account status.",
  searchFields: ["firstName", "lastName", "email", "phoneNumber", "role", "status"],
  emptyForm: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "user",
    status: "active",
    profilePhoto: "",
  },
  actions: {
    fetchAll: getUsers,
    create: createUser,
    update: updateUser,
    remove: deleteUser,
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
      name: "password",
      label: "Password",
      type: "password",
      required: true,
      optionalOnEdit: true,
      placeholder: "Password",
      editPlaceholder: "Leave blank to keep current password",
      editHint: "Leave blank to keep the current password.",
    },
    {
      name: "role",
      label: "Role",
      type: "select",
      options: [
        { value: "user", label: "User" },
        { value: "admin", label: "Admin" },
      ],
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ],
    },
    {
      name: "profilePhoto",
      label: "Profile photo URL",
      placeholder: "https://...",
      fullWidth: true,
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
      name: "EMAIL",
      selector: (row) => row.email,
      sortable: true,
      minWidth: "200px",
      cell: (row) => <span className="text-slate-600">{row.email || "—"}</span>,
    },
    {
      name: "PHONE NUMBER",
      selector: (row) => row.phoneNumber,
      sortable: true,
      minWidth: "150px",
      cell: (row) => row.phoneNumber || "—",
    },
   {
  name: "LAST LOGIN",
  minWidth:"150px",
  cell: (row) =>
    row.lastLogin
      ? new Date(row.lastLogin).toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : "Never",
},
    {
      name: "ROLE",
      selector: (row) => row.role,
      sortable: true,
      cell: (row) => badge(row.role),
    },
    {
      name: "STATUS",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => badgeStatus(row.status),
    },
  ],
  details: [
    {
      label: "Name",
      key: "firstName",
      format: (_, item) =>
        item ? `${item.firstName || ""} ${item.lastName || ""}`.trim() : "—",
    },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phoneNumber" },
    { label: "Role", key: "role" },
    { label: "Status", key: "status" },
  ],
  toForm: (row) => ({
    firstName: row.firstName || "",
    lastName: row.lastName || "",
    email: row.email || "",
    password: "",
    phoneNumber: row.phoneNumber || "",
    role: row.role || "user",
    status: row.status || "active",
    profilePhoto: row.profilePhoto || "",
  }),
  toPayload: (form, userId, selected) => ({
    ...form,
    firstName: form.firstName.trim(),
    lastName: form.lastName.trim(),
    email: form.email.trim(),
    phoneNumber: form.phoneNumber.trim(),
    profilePhoto: form.profilePhoto.trim(),
    ...(selected ? { userId, id: selected._id } : {}),
  }),
};

export default function Users() {
  return <ResourceManagementPage resource={usersResource} />;
}
