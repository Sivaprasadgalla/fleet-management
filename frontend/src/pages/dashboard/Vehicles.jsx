import React from "react";
import ResourceManagementPage from "../../components/data-management/ResourceManagementPage";

import {
  createVehicle,
  getVehicles,
  updateVehicle,
  deleteVehicle,
} from "../../app/vehicles/vehicleActions";

const badgeStatus = (value) => (
  <span
    className={`rounded-full px-2.5 py-2 text-xs font-medium capitalize ${
      value === "available"
        ? "bg-blue-50 text-blue-700"
        : value === "booked"
          ? "bg-emerald-50 text-emerald-700"
          : value === "maintenance"
            ? "bg-orange-50 text-orange-700"
            : "bg-red-50 text-red-600"
    }`}
  >
    {value || "—"}
  </span>
);

const vehicleResource = {
  singular: "Vehicle",
  plural: "Vehicles",
  storeKey: "vehicles",
  itemsKey: "vehicles",
  description: "Manage vehicles, insurance, permits and availability.",

  searchFields: [
    "registerNumber",
    "brand",
    "year",
    "type",
    "fuelType",
    "seatCapacity",
    "InsuranceNumber",
    "InsuranceExpiry",
    "PermitExpiry",
    "status",
  ],

  emptyForm: {
    registerNumber: "",
    brand: "",
    year: "",
    type: "car",
    fuelType: "diesel",
    seatCapacity: "",
    InsuranceNumber: "",
    InsuranceExpiry: "",
    PermitExpiry: "",
    status: "available",
  },

  actions: {
    fetchAll: getVehicles,
    create: createVehicle,
    update: updateVehicle,
    remove: deleteVehicle,
  },

  fields: [
    {
      name: "registerNumber",
      label: "Register Number",
      required: true,
      placeholder: "Register Number",
    },
    {
      name: "brand",
      label: "Brand",
      required: true,
      placeholder: "Brand",
    },
    {
      name: "year",
      label: "Year",
      type: "number",
      required: true,
      placeholder: "Year",
    },
    {
      name: "type",
      label: "Type",
      type: "select",
      options: [
        {
          value: "car",
          label: "Car",
        },
        {
          value: "truck",
          label: "Truck",
        },
        {
          value: "van",
          label: "Van",
        },
        {
          value: "bus",
          label: "Bus",
        },
      ],
    },
    {
      name: "fuelType",
      label: "Fuel Type",
      type: "select",
      options: [
        {
          value: "diesel",
          label: "Diesel",
        },
        {
          value: "petrol",
          label: "Petrol",
        },
        {
          value: "electric",
          label: "Electric",
        },
        {
          value: "hybrid",
          label: "Hybrid",
        },
      ],
    },
    {
      name: "seatCapacity",
      label: "Seat Capacity",
      type: "number",
      required: true,
      placeholder: "Seat Capacity",
    },
    {
      name: "InsuranceNumber",
      label: "Insurance Number",
      required: true,
      placeholder: "Insurance Number",
    },
    {
      name: "InsuranceExpiry",
      label: "Insurance Expiry",
      type: "date",
      required: true,
    },
    {
      name: "PermitExpiry",
      label: "Permit Expiry",
      type: "date",
      required: true,
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        {
          value: "available",
          label: "Available",
        },
        {
          value: "booked",
          label: "Booked",
        },
        {
          value: "inactive",
          label: "Inactive",
        },
        {
          value: "maintenance",
          label: "Maintenance",
        },
      ],
    },
  ],

  columns: [
    {
      name: "REGISTER NUMBER",
      selector: (row) => row.registerNumber,
      sortable: true,
      minWidth: "150px",

      cell: (row) => (
        <span className="font-semibold text-slate-800">
          {row.registerNumber || "—"}
        </span>
      ),
    },
    {
      name: "BRAND",
      selector: (row) => row.brand,
      sortable: true,
      minWidth: "140px",

      cell: (row) => <span className="text-slate-600">{row.brand || "—"}</span>,
    },

    {
      name: "YEAR",
      selector: (row) => row.year,
      sortable: true,
      minWidth: "100px",

      cell: (row) => row.year || "—",
    },

    {
      name: "TYPE",
      selector: (row) => row.type,
      sortable: true,
      minWidth: "120px",

      cell: (row) => (
        <span className="capitalize text-slate-600">{row.type || "—"}</span>
      ),
    },

    {
      name: "FUEL TYPE",
      selector: (row) => row.fuelType,
      sortable: true,
      minWidth: "120px",

      cell: (row) => (
        <span className="capitalize text-slate-600">{row.fuelType || "—"}</span>
      ),
    },

    {
      name: "SEATS",
      selector: (row) => row.seatCapacity,
      sortable: true,
      minWidth: "100px",

      cell: (row) => row.seatCapacity || "—",
    },

    {
      name: "INSURANCE NUMBER",
      selector: (row) => row.InsuranceNumber,
      sortable: true,
      minWidth: "180px",

      cell: (row) => (
        <span className="text-slate-600">{row.InsuranceNumber || "—"}</span>
      ),
    },

    {
      name: "INSURANCE EXPIRY",
      selector: (row) => row.InsuranceExpiry,
      sortable: true,
      minWidth: "160px",

      cell: (row) =>
        row.InsuranceExpiry
          ? new Date(row.InsuranceExpiry).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "—",
    },

    {
      name: "PERMIT EXPIRY",
      selector: (row) => row.PermitExpiry,
      sortable: true,
      minWidth: "160px",

      cell: (row) =>
        row.PermitExpiry
          ? new Date(row.PermitExpiry).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "—",
    },

    {
      name: "STATUS",
      selector: (row) => row.status,
      sortable: true,
      minWidth: "130px",

      cell: (row) => badgeStatus(row.status),
    },
  ],
  
  details: [
    {
      label: "Register Number",
      key: "registerNumber",
    },
    {
      label: "Brand",
      key: "brand",
    },
    {
      label: "Year",
      key: "year",
    },
    {
      label: "Type",
      key: "type",
    },
    {
      label: "Fuel Type",
      key: "fuelType",
    },
    {
      label: "Seat Capacity",
      key: "seatCapacity",
    },
    {
      label: "Insurance Number",
      key: "InsuranceNumber",
    },
    {
      label: "Insurance Expiry",
      key: "InsuranceExpiry",

      format: (value) =>
        value
          ? new Date(value).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "—",
    },
    {
      label: "Permit Expiry",
      key: "PermitExpiry",

      format: (value) =>
        value
          ? new Date(value).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "—",
    },
    {
      label: "Status",
      key: "status",

      format: (value) => value || "—",
    },
  ],

  toForm: (row) => ({   
    registerNumber: row.registerNumber || "",
    brand: row.brand || "",
    year: row.year || "",
    type: row.type || "car",
    fuelType: row.fuelType || "diesel",
    seatCapacity: row.seatCapacity || "",
    InsuranceNumber: row.InsuranceNumber || "",
    InsuranceExpiry: row.InsuranceExpiry
      ? new Date(row.InsuranceExpiry).toISOString().split("T")[0]
      : "",
    PermitExpiry: row.PermitExpiry
      ? new Date(row.PermitExpiry).toISOString().split("T")[0]
      : "",
    status: row.status || "available",
  }),

  toPayload: (form, userId, selected) => ({
    ...form,
    userId,
    id: selected !== null ? selected._id : "",
    registerNumber: form.registerNumber.trim(),
    brand: form.brand.trim(),
    year: Number(form.year),
    seatCapacity: Number(form.seatCapacity),
    InsuranceNumber: form.InsuranceNumber.trim(),
    InsuranceExpiry: form.InsuranceExpiry,
    PermitExpiry: form.PermitExpiry,
  }),
};

export default function Vehicles() {
  return <ResourceManagementPage resource={vehicleResource} />;
}
