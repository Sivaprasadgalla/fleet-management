import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function OffCanvas({ open, title, description, children, onClose }) {
  return (
    <AnimatePresence>
      {open && <div className="fixed inset-0 z-50" role="presentation">
      <button
        type="button"
        aria-label="Close panel"
        className="absolute inset-0 cursor-default bg-slate-950/35"
        onClick={onClose}
      />
      <motion.aside
        aria-modal="true"
        aria-label={title}
        role="dialog"
        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 320, damping: 34 }} className="absolute inset-y-0 right-0 flex w-full max-w-xl flex-col bg-white h-auto overflow-y-scroll shadow-2xl sm:w-[min(34rem,calc(100vw-1rem))]"
      >
        <header className="flex items-start justify-between border-b border-slate-200 px-4 py-4 sm:px-6 sm:py-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
            {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
            <X size={21} />
          </button>
        </header>
        {children}
      </motion.aside>
    </div>}
    </AnimatePresence>
  );
}
