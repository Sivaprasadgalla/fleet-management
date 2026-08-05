import { motion } from "framer-motion";

export default function Card({
    children,
    className = "",
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className={`
                bg-white
                rounded-2xl
                border
                border-slate-200
                shadow-sm
                p-6
                ${className}
            `}
        >
            {children}
        </motion.div>
    );
}