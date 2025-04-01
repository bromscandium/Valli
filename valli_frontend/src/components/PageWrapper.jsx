import { motion } from "framer-motion"

function PageWrapper({ children }) {
    return (
        <motion.div
            initial={{ opacity: 0, backgroundColor: "rgba(0,0,0,0.05)" }}
            animate={{ opacity: 1, backgroundColor: "rgba(0,0,0,0)" }}
            exit={{ opacity: 0, backgroundColor: "rgba(0,0,0,0.05)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            {children}
        </motion.div>
    )
}

export default PageWrapper
