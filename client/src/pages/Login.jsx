import { motion } from "framer-motion";
import Logo from "../assets/logo.svg";
import Google from "../assets/google.png"
import Github from "../assets/github.png"
import useAuthStore from "../store/authStore.js";

const Login = () => {
    const {googleLogin, githubLogin, error } = useAuthStore()
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 text-gray-900">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-2xl shadow-xl w-96 text-center"
            >
                <motion.img
                    src={Logo}
                    alt="logo"
                    className="w-[70%] h-[2rem] mx-auto mb-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                />
                <div className="w-[50%] h-1 bg-gray-500 mx-auto mb-5"></div>
                <h2 className="text-4xl font-semibold mb-6">Welcome Back</h2>
                <p className="text-gray-600 mb-6">Sign in using one of the methods below</p>

                <motion.button
                    onClick={()=>googleLogin()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center w-full py-3 mb-4 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                >
                    <img src={Google} className="size-5 mr-2" alt="google-logo" /> Continue with Google
                </motion.button>

                <motion.button
                    onClick={()=>githubLogin()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center w-full py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                >
                    <img src={Github} className="size-5 mr-2" alt="google-logo" /> Continue with GitHub
                </motion.button>

                {error && <p className={"text-red-500 mt-4"}>{error}</p>}
            </motion.div>
        </div>
    );
};

export default Login;
