"use client";

import { motion } from "framer-motion";

export default function LoadingComponent({
    color = "#3498db",
    message = "Loading...",
    className = "",
}: { 
    color?: string;
    message?: string;
    className?: string;
}) {
    return (
        <motion.div
            className={`flex flex-col items-center justify-center ${className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="flex space-x-2">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: color }}
                        animate={{
                            y: [0, -10, 0],
                        }}
                        transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.2,
                        }}
                    />
                ))}
            </div>
            <p className="mt-2 text-sm font-medium text-gray-300">{message}</p>
        </motion.div>
    );
}
