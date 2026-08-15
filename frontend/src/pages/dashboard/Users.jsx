import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import {
  Search,
  Eye,
  Pencil,
  Trash2,
  Plus,
  X,
  CheckCircle,
  UserRound,
  Mail,
  Phone,
  Shield,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../../app/users/userActions";

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phoneNumber: "",
  role: "user",
  status: "active",
  profilePhoto: "",
};

const Users = () => {
  const dispatch = useDispatch();

  // ==========================================
  // REDUX STATE
  // ==========================================

  const { users = [], loading, error } = useSelector(
    (state) => state.users
  );

  const { user: loggedInUser } = useSelector(
    (state) => state.auth
  );

  // ==========================================
  // LOCAL STATE
  // ==========================================

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [showView, setShowView] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const [viewLoading, setViewLoading] = useState(false);

  const [formData, setFormData] = useState(emptyForm);

  // ==========================================
  // GET ALL USERS
  // ==========================================

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // ADD USER
  // ==========================================

  const handleAddUser = () => {
    setEditMode(false);
    setSelectedUser(null);

    setFormData({
      ...emptyForm,
    });

    setShowForm(true);
  };

  // ==========================================
  // EDIT USER
  // ==========================================

  const handleEdit = (row) => {
    setEditMode(true);

    setSelectedUser(row);

    setFormData({
      firstName: row.firstName || "",
      lastName: row.lastName || "",
      email: row.email || "",

      // IMPORTANT:
      // Never put row.password here.
      // Database password is hashed.
      password: "",

      phoneNumber: row.phoneNumber || "",
      role: row.role || "user",
      status: row.status || "active",
      profilePhoto: row.profilePhoto || "",
    });

    setShowForm(true);
  };

  // ==========================================
  // CLOSE FORM
  // ==========================================

  const closeForm = () => {
    setShowForm(false);
    setEditMode(false);
    setSelectedUser(null);
    setFormData({
      ...emptyForm,
    });
  };

  // ==========================================
  // CREATE / UPDATE USER
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ======================================
      // CREATE USER
      // ======================================

      if (!editMode) {
        const createPayload = {
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
          password: formData.password,
          phoneNumber: formData.phoneNumber.trim(),
          role: formData.role,
          status: formData.status,
          profilePhoto: formData.profilePhoto.trim(),
        };

        await dispatch(
          createUser(createPayload)
        ).unwrap();

        // Refresh users
        await dispatch(getUsers()).unwrap();

        closeForm();

        return;
      }

      // ======================================
      // UPDATE USER
      // ======================================

      if (!loggedInUser?.userId) {
        alert("Logged-in user ID not found.");
        return;
      }

      if (!selectedUser?._id) {
        alert("User ID not found.");
        return;
      }

      const updatePayload = {
        // Logged-in admin/user ID
        userId: loggedInUser.userId,

        // User that admin is editing
        id: selectedUser._id,

        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        role: formData.role,
        status: formData.status,
        profilePhoto: formData.profilePhoto.trim(),
      };

      // ======================================
      // NEW PASSWORD
      // ======================================
      // Only send password if admin entered one.
      // Empty password means keep existing password.

      if (formData.password.trim() !== "") {
        updatePayload.password = formData.password;
      }

      console.log("UPDATE USER:", updatePayload);

      await dispatch(
        updateUser(updatePayload)
      ).unwrap();

      // Refresh users
      await dispatch(getUsers()).unwrap();

      closeForm();

    } catch (err) {
      console.error("User operation failed:", err);

      alert(
        err?.message ||
          err?.error ||
          "User operation failed"
      );
    }
  };

  // ==========================================
  // VIEW USER
  // ==========================================

  const handleView = async (id) => {
    if (!id) {
      alert("User ID not found");
      return;
    }

    try {
      setViewLoading(true);

      // Close old view first
      setShowView(false);

      // IMPORTANT:
      // Do not display old selectedUser.
      setSelectedUser(null);

      // Call existing getUser API
      const response = await dispatch(
        getUser(id)
      ).unwrap();

      console.log("VIEW USER RESPONSE:", response);

      // Your backend:
      // { message: "...", data: user }

      const userData = response?.data;

      if (!userData) {
        alert("User details not found");
        return;
      }

      // Set the exact user returned by API
      setSelectedUser(userData);

      // Only open modal after API response
      setShowView(true);

    } catch (err) {
      console.error("View user failed:", err);

      alert(
        err?.message ||
          err?.error ||
          "Unable to get user details"
      );
    } finally {
      setViewLoading(false);
    }
  };

  // ==========================================
  // CLOSE VIEW
  // ==========================================

  const closeView = () => {
    setShowView(false);
    setSelectedUser(null);
  };

  // ==========================================
  // DELETE USER
  // ==========================================

  const handleDelete = async (id) => {
    if (!id) {
      alert("User ID not found");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await dispatch(
        deleteUser(id)
      ).unwrap();

      // Refresh users
      await dispatch(getUsers()).unwrap();

    } catch (err) {
      console.error("Delete user failed:", err);

      alert(
        err?.message ||
          err?.error ||
          "Unable to delete user"
      );
    }
  };

  // ==========================================
  // SEARCH
  // ==========================================

  const filteredUsers = users.filter((user) => {
    const searchText = search.toLowerCase();

    return (
      `${user.firstName || ""} ${user.lastName || ""}`
        .toLowerCase()
        .includes(searchText) ||

      (user.email || "")
        .toLowerCase()
        .includes(searchText) ||

      (user.phoneNumber || "")
        .toLowerCase()
        .includes(searchText) ||

      (user.role || "")
        .toLowerCase()
        .includes(searchText)
    );
  });

  // ==========================================
  // TABLE COLUMNS
  // ==========================================

  const columns = [
    {
      name: "NAME",
      minWidth: "180px",

      selector: (row) =>
        `${row.firstName || ""} ${row.lastName || ""}`,

      sortable: true,

      cell: (row) => (
        <div className="py-1">
          <p className="font-semibold text-[13px] text-slate-800">
            {row.firstName} {row.lastName}
          </p>
        </div>
      ),
    },

    {
      name: "EMAIL",
      minWidth: "180px",

      selector: (row) => row.email,

      sortable: true,

      cell: (row) => (
        <span className="text-[13px] text-slate-600">
          {row.email || "-"}
        </span>
      ),
    },

    {
      name: "PHONE",
      minWidth: "180px",

      selector: (row) => row.phoneNumber,

      sortable: true,

      cell: (row) => (
        <span className="text-[13px] text-slate-600">
          {row.phoneNumber || "-"}
        </span>
      ),
    },

    {
      name: "ROLE",
      minWidth: "160px",

      selector: (row) => row.role,

      sortable: true,

      cell: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-[11px] font-medium ${
            row.role === "admin"
              ? "bg-purple-100 text-purple-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {row.role === "admin"
            ? "Admin"
            : "User"}
        </span>
      ),
    },

    {
      name: "STATUS",
      minWidth: "170px",

      selector: (row) => row.status,

      sortable: true,

      cell: (row) => (
        <div className="flex items-center gap-2">
          <CheckCircle
            size={15}
            className="text-green-500"
          />

          <span className="text-[13px] font-medium text-green-600 capitalize">
            {row.status}
          </span>
        </div>
      ),
    },

    {
      name: "ACTIONS",
      minWidth: "135px",

      cell: (row) => (
        <div className="flex items-center gap-4">

          {/* VIEW */}

          <button
            type="button"
            onClick={() => handleView(row._id)}
            disabled={viewLoading}
            className="text-blue-600 hover:text-blue-800 transition disabled:opacity-50"
            title="View"
          >
            <Eye size={17} />
          </button>

          {/* EDIT */}

          <button
            type="button"
            onClick={() => handleEdit(row)}
            className="text-orange-500 hover:text-orange-700 transition"
            title="Edit"
          >
            <Pencil size={17} />
          </button>

          {/* DELETE */}

          <button
            type="button"
            onClick={() =>
              handleDelete(row._id)
            }
            className="text-red-500 hover:text-red-700 transition"
            title="Delete"
          >
            <Trash2 size={17} />
          </button>

        </div>
      ),
    },
  ];

  // ==========================================
  // DATATABLE STYLES
  // ==========================================

  const customStyles = {
    table: {
      style: {
        width: "100%",
      },
    },

    headRow: {
      style: {
        minHeight: "42px",
        backgroundColor: "#f8fafc",
        borderBottom: "1px solid #e2e8f0",
      },
    },

    headCells: {
      style: {
        fontSize: "12px",
        fontWeight: "500",
        color: "#64748b",
        paddingLeft: "16px",
        paddingRight: "16px",
      },
    },

    rows: {
      style: {
        minHeight: "64px",
        borderBottom: "1px solid #e2e8f0",
      },
    },

    cells: {
      style: {
        paddingLeft: "16px",
        paddingRight: "16px",
      },
    },

    pagination: {
      style: {
        minHeight: "48px",
        borderTop: "1px solid #e2e8f0",
      },
    },
  };

  // ==========================================
  // INITIAL LOADING
  // ==========================================

  if (loading && users.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-sm text-slate-500">
          Loading users...
        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error && users.length === 0) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4">
          {error?.message || error}
        </div>
      </div>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="w-full px-4 py-4">

      {/* =================================
          PAGE HEADER
      ================================= */}

      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Users
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage users, roles and account status
          </p>
        </div>

        {/* ADD USER */}

        <button
          type="button"
          onClick={handleAddUser}
          className="h-10 px-4 flex items-center justify-center gap-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
        >
          <Plus size={17} />
          Add User
        </button>

      </div>

      {/* =================================
          USERS TABLE CONTAINER
      ================================= */}

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">

        {/* TABLE HEADER */}

        <div className="px-5 py-4 flex items-center justify-between border-b border-slate-100">

          <div>
            <h2 className="text-[17px] font-semibold text-slate-800">
              All Users
            </h2>

            <p className="text-[12px] text-slate-500 mt-0.5">
              {users.length} total users
            </p>
          </div>

          {/* SEARCH */}

          <div className="relative">

            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search users..."
              className="w-64 h-10 pl-9 pr-3 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:bg-white focus:border-blue-400 transition"
            />

          </div>

        </div>

        {/* DATATABLE */}

        <DataTable
          columns={columns}
          data={filteredUsers}
          customStyles={customStyles}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[
            5,
            10,
            20,
          ]}
          highlightOnHover
          responsive
          persistTableHead
          noDataComponent={
            <div className="py-10 text-sm text-slate-400">
              No users found
            </div>
          }
        />

      </div>

      {/* =================================
          CREATE / EDIT MODAL
      ================================= */}

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl">

            {/* MODAL HEADER */}

            <div className="px-5 py-4 border-b flex items-center justify-between">

              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  {editMode
                    ? "Edit User"
                    : "Create User"}
                </h2>

                <p className="text-xs text-slate-500 mt-1">
                  {editMode
                    ? "Update user information"
                    : "Add a new user"}
                </p>
              </div>

              <button
                type="button"
                onClick={closeForm}
                className="text-slate-400 hover:text-slate-700"
              >
                <X size={20} />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="p-5"
            >

              <div className="grid grid-cols-2 gap-4">

                {/* FIRST NAME */}

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    First Name
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                    required
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500"
                  />
                </div>

                {/* LAST NAME */}

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Last Name
                  </label>

                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                    required
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500"
                  />
                </div>

                {/* EMAIL */}

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    required
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500"
                  />
                </div>

                {/* PHONE */}

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Phone Number
                  </label>

                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone number"
                    required
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500"
                  />
                </div>

                {/* PASSWORD */}

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    {editMode
                      ? "New Password"
                      : "Password"}
                  </label>

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={
                      editMode
                        ? "Leave blank to keep current password"
                        : "Password"
                    }
                    required={!editMode}
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500"
                  />

                  {editMode && (
                    <p className="mt-1 text-[11px] text-slate-400">
                      Leave blank to keep the current password.
                    </p>
                  )}
                </div>

                {/* ROLE */}

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Role
                  </label>

                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 bg-white"
                  >
                    <option value="user">
                      User
                    </option>

                    <option value="admin">
                      Admin
                    </option>
                  </select>
                </div>

                {/* STATUS */}

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 bg-white"
                  >
                    <option value="active">
                      Active
                    </option>

                    <option value="inactive">
                      Inactive
                    </option>
                  </select>
                </div>

                {/* PROFILE PHOTO */}

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Profile Photo
                  </label>

                  <input
                    type="text"
                    name="profilePhoto"
                    value={formData.profilePhoto}
                    onChange={handleChange}
                    placeholder="Profile photo URL"
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500"
                  />
                </div>

              </div>

              {/* FORM BUTTONS */}

              <div className="flex justify-end gap-3 mt-5 pt-4 border-t">

                <button
                  type="button"
                  onClick={closeForm}
                  className="px-4 h-9 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 h-9 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-60"
                >
                  {loading
                    ? "Saving..."
                    : editMode
                    ? "Update User"
                    : "Create User"}
                </button>

              </div>

            </form>

          </div>
        </div>
      )}

      {/* =================================
          VIEW USER MODAL
      ================================= */}

      {showView && selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-md rounded-xl shadow-xl">

            {/* VIEW HEADER */}

            <div className="px-5 py-4 border-b flex items-center justify-between">

              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  User Details
                </h2>

                <p className="text-xs text-slate-500 mt-1">
                  Complete user information
                </p>
              </div>

              <button
                type="button"
                onClick={closeView}
                className="text-slate-400 hover:text-slate-700"
              >
                <X size={20} />
              </button>

            </div>

            {/* USER DETAILS */}

            <div className="p-5">

              {/* USER NAME */}

              <div className="flex items-center gap-3 pb-4 border-b">

                <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <UserRound size={21} />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-800">
                    {selectedUser.firstName}{" "}
                    {selectedUser.lastName}
                  </h3>

                  <p className="text-xs text-slate-400 capitalize">
                    {selectedUser.role}
                  </p>
                </div>

              </div>

              {/* DETAILS */}

              <div className="mt-4 space-y-3">

                {/* EMAIL */}

                <div className="flex items-center gap-3">

                  <Mail
                    size={16}
                    className="text-slate-400"
                  />

                  <div>
                    <p className="text-[11px] text-slate-400">
                      Email
                    </p>

                    <p className="text-sm text-slate-700">
                      {selectedUser.email || "-"}
                    </p>
                  </div>

                </div>

                {/* PHONE */}

                <div className="flex items-center gap-3">

                  <Phone
                    size={16}
                    className="text-slate-400"
                  />

                  <div>
                    <p className="text-[11px] text-slate-400">
                      Phone
                    </p>

                    <p className="text-sm text-slate-700">
                      {selectedUser.phoneNumber || "-"}
                    </p>
                  </div>

                </div>

                {/* ROLE */}

                <div className="flex items-center gap-3">

                  <Shield
                    size={16}
                    className="text-slate-400"
                  />

                  <div>
                    <p className="text-[11px] text-slate-400">
                      Role
                    </p>

                    <p className="text-sm text-slate-700 capitalize">
                      {selectedUser.role || "-"}
                    </p>
                  </div>

                </div>

                {/* STATUS */}

                <div className="flex items-center gap-3">

                  <CheckCircle
                    size={16}
                    className="text-green-500"
                  />

                  <div>
                    <p className="text-[11px] text-slate-400">
                      Status
                    </p>

                    <p className="text-sm text-green-600 capitalize">
                      {selectedUser.status || "-"}
                    </p>
                  </div>

                </div>

              </div>

              {/* BLUE CLOSE BUTTON */}

              <button
                type="button"
                onClick={closeView}
                className="w-full mt-5 h-9 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

      {/* =================================
          VIEW LOADING
      ================================= */}

      {viewLoading && (
        <div className="fixed inset-0 z-[60] bg-black/20 flex items-center justify-center pointer-events-none">
          <div className="bg-white px-5 py-3 rounded-lg shadow-lg text-sm text-slate-600">
            Loading user details...
          </div>
        </div>
      )}

    </div>
  );
};

export default Users;