import { motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white space-y-4">

            <LoaderCircle className="w-12 h-12 animate-spin text-gray-900" />

            {/* Animated Company Name */}
            <motion.h1
                className="text-4xl font-bold tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            >
                <motion.span
                    className="text-gray-900"
                    animate={{
                        x: [-5, 5, -5], // Slight shaking effect
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                >
                    Key
                </motion.span>
                <motion.span
                    className="text-gray-900"
                    animate={{
                        y: [-3, 3, -3], // Slight bouncing effect
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                >
                    Map
                </motion.span>
            </motion.h1>
        </div>
    );
};

export default Loading;
