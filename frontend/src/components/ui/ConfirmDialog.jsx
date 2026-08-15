import { AlertTriangle, X } from "lucide-react";

export default function ConfirmDialog({ open, title, description, confirmLabel = "Delete", loading, onCancel, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" role="presentation">
      <button type="button" aria-label="Close confirmation" onClick={onCancel} className="absolute inset-0 cursor-default bg-slate-950/45" />
      <section aria-modal="true" aria-labelledby="confirm-dialog-title" role="dialog" className="relative w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl sm:p-6">
        <button type="button" aria-label="Close confirmation" onClick={onCancel} disabled={loading} className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"><X size={19} /></button>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600"><AlertTriangle size={23} /></div>
        <h2 id="confirm-dialog-title" className="mt-4 pr-8 text-lg font-bold text-slate-900">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
          <button type="button" onClick={onCancel} disabled={loading} className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50">Cancel</button>
          <button type="button" onClick={onConfirm} disabled={loading} className="h-10 rounded-lg bg-red-600 px-4 text-sm font-semibold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Deleting..." : confirmLabel}</button>
        </div>
      </section>
    </div>
  );
}
