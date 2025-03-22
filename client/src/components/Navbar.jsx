import Logo from "../assets/logo.svg";
import useAuthStore from "../store/authStore.js";
import { Menu, LogOut, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import {Link, useNavigate} from "react-router";

const DropDown = ({ setDropDown }) => {
    const { logout } = useAuthStore();
    const navigate = useNavigate()
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-3 top-[4rem] bg-white shadow-lg border border-gray-200 rounded-md w-40 py-2 z-50"
        >
            <Link to={"/dashboard"} className="flex items-center gap-2 px-4 py-2 w-full text-gray-700 hover:bg-gray-100"
                    >
                <LayoutDashboard size={18} />
                Dashboard
            </Link>
            <button className="flex items-center gap-2 px-4 py-2 w-full text-red-600 hover:bg-gray-100"
                    onClick={() => logout(navigate)}>
                <LogOut size={18} />
                Logout
            </button>
        </motion.div>
    );
};

const Navbar = ({ projectName = "" }) => {
    const { user, isAuth } = useAuthStore();
    const [dropDown, setDropDown] = useState(false);

    return (
        <nav className="w-full p-3 border-b bg-white border-gray-200 flex justify-between items-center relative">

            <img src={Logo} alt="logo" />


            {projectName && (
                <h1 className="font-semibold hidden md:block">{projectName}</h1>
            )}


            {isAuth ? (
                <div className="flex items-center gap-x-3">
                    <Menu
                        className="cursor-pointer"
                        onClick={() => setDropDown(!dropDown)}
                    />
                    <img
                        src={user.avatar}
                        alt="Profile"
                        className="w-8 h-8 rounded-full border cursor-pointer"
                        onClick={() => setDropDown(!dropDown)}
                    />
                </div>
            ) : (
                <Link
                to={"/"}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
        >
            Login
        </Link>
    )}



{dropDown && <DropDown setDropDown={setDropDown} />}
        </nav>
    );
};

export default Navbar;
