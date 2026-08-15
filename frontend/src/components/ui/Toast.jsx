/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, CircleAlert, Info, X } from "lucide-react";

const ToastContext = createContext(null);
const styles = {
  success: { icon: CheckCircle2, className: "border-emerald-200 bg-emerald-50 text-emerald-900", iconClass: "text-emerald-600" },
  error: { icon: CircleAlert, className: "border-red-200 bg-red-50 text-red-900", iconClass: "text-red-600" },
  info: { icon: Info, className: "border-blue-200 bg-blue-50 text-blue-900", iconClass: "text-blue-600" },
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const dismiss = useCallback((id) => setToasts((current) => current.filter((toast) => toast.id !== id)), []);
  const toast = useCallback((message, type = "info") => {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { id, message, type }]);
    window.setTimeout(() => dismiss(id), 4500);
  }, [dismiss]);

  return <ToastContext.Provider value={toast}>{children}<div className="pointer-events-none fixed right-4 top-4 z-[100] flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-3"><AnimatePresence>{toasts.map((item) => <Toast key={item.id} item={item} onDismiss={() => dismiss(item.id)} />)}</AnimatePresence></div></ToastContext.Provider>;
}

function Toast({ item, onDismiss }) {
  const style = styles[item.type] || styles.info;
  const Icon = style.icon;
  return <motion.div layout initial={{ opacity: 0, x: 48, scale: 0.96 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 48, scale: 0.96 }} transition={{ type: "spring", stiffness: 380, damping: 28 }} className={`pointer-events-auto flex items-start gap-3 rounded-xl border p-4 shadow-xl shadow-slate-900/10 ${style.className}`} role="status"><Icon size={20} className={`mt-0.5 shrink-0 ${style.iconClass}`} /><p className="flex-1 text-sm font-medium leading-5">{item.message}</p><button type="button" onClick={onDismiss} aria-label="Dismiss notification" className="rounded p-0.5 opacity-60 transition hover:bg-black/5 hover:opacity-100"><X size={16} /></button></motion.div>;
}

export function useToast() {
  const toast = useContext(ToastContext);
  if (!toast) throw new Error("useToast must be used inside ToastProvider");
  return toast;
}
