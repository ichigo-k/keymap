import { useState } from "react";
import { ArrowUp, LoaderCircle  } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import useProjectStore from "../store/projectStore.js";
import {useParams} from "react-router";
import { motion } from "framer-motion";
import TablesDisplay from "../components/TablesDisplay.jsx";
import useAuthStore from "../store/authStore.js";
import {Link} from "react-router";

const Project = () => {
    const {id} = useParams()
    const { selectedProject, messages, updateProject, chatLoading } = useProjectStore();
    const [input, setInput] = useState("");
    const {isAuth} = useAuthStore()

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit =async (e) => {
        e.preventDefault()
        if (!input.trim()) return;

        updateProject(id,input)
        messages.push({ type: "req", msg: input })

        setInput("");
    };

    return (
        <>
            <Navbar projectName={selectedProject?.project_name} />
            <div className="mx-auto p-4 max-w-2xl flex flex-col mt-5">

                <TablesDisplay/>
                {/* Messages Section */}
                <p className={"block mt-3"}></p>
                <div className="text-center ">
                    {messages.slice(-2).map((message, index) => (
                        <p
                            className={`p-2 mb-4 ${
                                message.type === "res"
                                    ? "block " 
                                    : "bg-gray-100 px-3 rounded-full text-gray-900 inline-block" 
                            }`}
                        >
                            {message.msg}
                        </p>
                    ))}
                </div>


                {chatLoading && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="flex items-center justify-center gap-2 text-gray-600 mb-4"
                    >
                        <LoaderCircle className="animate-spin text-gray-900" size={24} />
                        <p className="text-sm font-medium">Loading...</p>
                    </motion.div>
                )}




                {
                    isAuth ?(
                        <form onSubmit={handleSubmit}  className="flex items-center bg-white border border-gray-300 rounded-full shadow-md px-4 py-2 focus-within:ring-2 focus-within:ring-gray-400">

                            <input
                                value={input}
                                onChange={handleChange}
                                type="text"
                                placeholder="Ask anything"
                                className="w-full outline-none text-gray-700 placeholder-gray-400 bg-transparent"
                            />
                            <button
                                className="ml-2 bg-black text-white p-2 rounded-full hover:bg-gray-800 transition"
                            >
                                <ArrowUp size={16} />
                            </button>
                        </form>
                    ):(
                        <Link to={"/"} className={"text-center p-2 rounded-full bg-black text-white cursor-pointer"}>Login to Edit</Link>
                    )
                }
            </div>
        </>
    );
};

export default Project;
