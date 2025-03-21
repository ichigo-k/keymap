import {create} from "zustand"
import axios from 'axios';
import config from "../../config/config.js";
import {toast} from "sonner";

const { SERVER_URL } = config;

const useProjectStore = create((set) => ({
    projects: [],
    isLoading: true,
    selectedProject: {},
    messages:[],
    chatLoading:false,
    tables:[],


    fetchProjects: async () => {
        set({isLoading: true})
        try {
            const response = await axios.get(`${SERVER_URL}/projects/`, {
                withCredentials: true
            });
            set({ projects: response.data.projects , isLoading: false});
            console.log(response.data)
        } catch (error) {
            console.error("Error fetching projects:", error);
            set({isLoading: false})
        }
    },


    addProject: async (navigate) =>{
        set({isLoading: true})
        try {
            const response = await axios.post(`${SERVER_URL}/projects/`,{}, {
                withCredentials: true
            });
            set({ selectedProject: response.data.project , isLoading: false});
            navigate(`/project/${response.data.project._id}`)

            console.log(response.data)

        } catch (error) {
            toast.error("Something went wrong please try again later!")
            console.error("Error fetching projects:", error);
            set({isLoading: false})
        }
    },

    getProject: async (id, navigate) => {
        set({ isLoading: true });

        try {
            const response = await axios.get(`${SERVER_URL}/projects/${id}`, {
                withCredentials: true
            });

            if (!response.data.project) {
                throw new Error("Project not found");
            }

            set({
                selectedProject: response.data.project,
                isLoading: false,
                messages: [{ type: "res", msg: response.data.project.prompt }],
                tables: response.data.project.tables
            });

        } catch (error) {
            console.error("Error fetching project:", error);

            set({
                isLoading: false,
                selectedProject: null,
            });

            toast.error("Something went wrong");
            console.log(error)
            navigate("/dashboard", { replace: true });
        }
    },



    updateProject: async (id, input) => {
        try {
            set({chatLoading: true})
            const response = await axios.patch(`${SERVER_URL}/projects/${id}`,{message: input}, {
                withCredentials: true
            });
            set((state) => ({
                messages: [...state.messages, { type: "res", msg: response.data.AI }],
                chatLoading: false,
                selectedProject: response.data.project,
                tables: response.data.project.tables
            }));


        } catch (error) {
            toast.error("Something went wrong please try again later!")
            console.error("Error fetching projects:", error);
            set({isLoading: false, chatLoading: true})
        }

    }


}));

export default useProjectStore;
