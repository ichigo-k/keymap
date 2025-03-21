import { useEffect } from "react";
import { motion } from "framer-motion";
import {CopyIcon, Trash} from "lucide-react";
import useAuthStore from "../store/authStore.js";
import Navbar from "../components/Navbar.jsx";
import useProjectStore from "../store/projectStore.js";
import StartUp from "../assets/rocket.gif";
import CreateNewProjectButton from "../components/CreateProjectButton.jsx";
import {Link} from "react-router";
import config from "../../config/config.js"
import {toast} from "sonner";


const Dashboard = () => {
    const { user } = useAuthStore();
    const { fetchProjects, projects } = useProjectStore();
    const {CLIENT_URL} = config


    useEffect(() => {
        fetchProjects();
    }, []);

    console.log(projects)

    return (
        <>
            <Navbar projectName="Dashboard" />
            <section className="p-6 max-w-4xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Welcome, {user?.username}! 👋
                    </h1>
                    <p className="text-gray-600">Here are your projects:</p>
                </div>

                {projects.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {projects.map((project, key) => (
                                <div key={key} className="bg-white shadow-md rounded-lg p-4 border border-gray-200 relative">
                                    <div>
                                        <Link to={`/project/${project._id}`} className="text-lg font-medium text-gray-700">
                                            {project.project_name}
                                        </Link>
                                        <p className="text-sm text-gray-500 truncate">{project.description}</p>
                                    </div>
                                    <button
                                        className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-red-600 hover:scale-110 transition duration-200 ease-in-out"
                                        onClick={() => {
                                            navigator.clipboard.writeText(`${CLIENT_URL}/project/${project._id}`).then(() => {
                                                toast.success("Copied successfully")
                                            }).catch(err => {
                                                console.error("Failed to copy text: ", err);
                                            });
                                        }}
                                    >
                                        <CopyIcon className="w-5 h-5" />
                                    </button>


                                </div>
                            ))}
                        </div>
                        <CreateNewProjectButton />
                    </>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mx-auto p-4 mt-20 flex flex-col items-center h-60 justify-center"
                    >
                        <img src={StartUp} alt="RocketShip" className="size-32 opacity-80" />
                        <h1 className="text-xl font-semibold text-gray-800 mt-2">Nothing to see here</h1>
                        <p className="text-gray-600">You have no available projects</p>
                        <CreateNewProjectButton />
                    </motion.div>
                )}

            </section>
        </>
    );
};

export default Dashboard;
