const inputClass = "h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

export default function ResourceForm({ fields, values, errors, onChange, onCancel, onSubmit, saving, isEditing, resourceName }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <div className="grid flex-1 grid-cols-1 gap-4 lg:gap-6 overflow-y-auto p-4 sm:grid-cols-2 sm:p-6">
        {fields.map((field) => (
          <label key={field.name} className={field.fullWidth ? "sm:col-span-2" : ""}>
            <span className="mb-1.5 block text-xs font-medium text-slate-700">
              {field.label}{field.required && " *"}
            </span>
            {field.type === "select" ? (
              <select name={field.name} value={values[field.name] ?? ""} onChange={onChange} aria-invalid={Boolean(errors[field.name])} className={`${inputClass} ${errors[field.name] ? "border-red-400 focus:border-red-500 focus:ring-red-100" : ""}`}>
                {field.options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            ) : field.type === "textarea" ? (
              <textarea name={field.name} value={values[field.name] ?? ""} onChange={onChange} aria-invalid={Boolean(errors[field.name])} placeholder={field.placeholder} rows={3} className={`${inputClass} h-auto py-2 ${errors[field.name] ? "border-red-400 focus:border-red-500 focus:ring-red-100" : ""}`} />
            ) : (
              <input name={field.name} type={field.type || "text"} value={values[field.name] ?? ""} onChange={onChange} aria-invalid={Boolean(errors[field.name])} placeholder={isEditing && field.editPlaceholder ? field.editPlaceholder : field.placeholder} className={`${inputClass} ${errors[field.name] ? "border-red-400 focus:border-red-500 focus:ring-red-100" : ""}`} />
            )}
            {errors[field.name] && <span className="mt-1 block text-xs font-medium text-red-600">{errors[field.name]}</span>}
            {isEditing && field.editHint && <span className="mt-1 block text-xs text-slate-400">{field.editHint}</span>}
          </label>
        ))}
      </div>
      <footer className="flex flex-col-reverse gap-2 border-t border-slate-200 px-4 py-4 sm:flex-row sm:justify-end sm:gap-3 sm:px-6">
        <button type="button" onClick={onCancel} className="h-10 w-full rounded-lg border border-slate-200 px-4 text-sm font-medium text-slate-600 hover:bg-slate-50 sm:w-auto">Cancel</button>
        <button type="submit" disabled={saving} className="h-10 w-full rounded-lg bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
          {saving ? "Saving..." : isEditing ? `Update ${resourceName}` : `Create ${resourceName}`}
        </button>
      </footer>
    </form>
  );
}
