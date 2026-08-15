import DataTable from "react-data-table-component";
import { Eye, Pencil, Search, Trash2 } from "lucide-react";

const styles = {
  headRow: {
    style: {
      minHeight: "44px",
      backgroundColor: "#f8fafc",
      borderBottom: "1px solid #e2e8f0",
    },
  },
  headCells: {
    style: {
      color: "#64748b",
      fontSize: "13px",
      fontWeight: 600,
      paddingLeft: "20px",
      paddingRight: "20px",
    },
  },
  rows: { style: { minHeight: "64px", borderBottom: "1px solid #f1f5f9" } },
  cells: { style: { paddingLeft: "20px", fontSize:"14px", paddingRight: "20px" } },
};

export default function ResourceTable({
  resource,
  rows,
  columns,
  search,
  onSearchChange,
  onView,
  onEdit,
  onDelete,
}) {
  const actionColumn = {
    name: "ACTIONS",
    width: "145px",
    cell: (row) => (
      <div className="flex items-center gap-3">
        <button
          type="button"
          title="View"
          onClick={() => onView(row)}
          className="text-blue-600 hover:text-blue-800"
        >
          <Eye size={17} />
        </button>
        <button
          type="button"
          title="Edit"
          onClick={() => onEdit(row)}
          className="text-amber-600 hover:text-amber-800"
        >
          <Pencil size={17} />
        </button>
        <button
          type="button"
          title="Delete"
          onClick={() => onDelete(row)}
          className="text-red-600 hover:text-red-800"
        >
          <Trash2 size={17} />
        </button>
      </div>
    ),
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_12px_32px_-20px_rgba(15,23,42,0.28)]">
      <div className="flex flex-col gap-3 border-b border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div>
          <h2 className="font-semibold text-slate-800">
            All {resource.plural}
          </h2>
          <p className="mt-0.5 text-sm text-slate-500">
            {rows.length} total {resource.plural.toLowerCase()}
          </p>
        </div>
        <label className="relative w-full sm:w-auto">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={`Search ${resource.plural.toLowerCase()}...`}
            className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50 sm:w-64"
          />
        </label>
      </div>
      <DataTable
        columns={[...columns, actionColumn]}
        data={rows}
        customStyles={styles}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[5, 10, 20]}
        highlightOnHover
        responsive
        persistTableHead
        noDataComponent={
          <div className="py-10 text-sm text-slate-400">
            No {resource.plural.toLowerCase()} found
          </div>
        }
      />
    </section>
  );
}
