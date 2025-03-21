import { motion } from "framer-motion";
import { PlusCircle, Loader2 } from "lucide-react";
import useProjectStore from "../store/projectStore.js";
import {useNavigate} from "react-router";

const CreateNewProjectButton = () => {
    const { isLoading , addProject} = useProjectStore();
    const navigate = useNavigate()

    return (
        <motion.button
            onClick={()=>addProject(navigate)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
            className={`mt-4 flex items-center justify-center gap-2 bg-gray-600 text-white px-6 py-2 rounded-lg transition-all 
                ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"}`}
        >
            {isLoading ? (
                <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Creating...</span>
                </>
            ) : (
                <>
                    <PlusCircle size={20} />
                    <span>Create New Project</span>
                </>
            )}
        </motion.button>
    );
};

export default CreateNewProjectButton;
