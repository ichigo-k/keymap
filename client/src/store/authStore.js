import { create } from "zustand";
import axios from "axios";
import config from "../../config/config.js";

const { SERVER_URL } = config;

const useAuthStore = create((set) => ({
    isLoading: false,
    user: {},
    message: "",
    error: "",
    isAuth: false,

    googleLogin: () => {
        window.location.href = `${SERVER_URL}/auth/google`;
    },

    githubLogin: () => {
        window.location.href = `${SERVER_URL}/auth/github`;
    },

    fetchUser: async () => {
        set({ isLoading: true });

        try {
            const response = await axios.get(`${SERVER_URL}/auth/check-auth`, {
                withCredentials: true,
            });

            if (response.data.user) {
                set({ user: response.data.user, isAuth: true });
            } else {
                set({ user: null, isAuth: false });
            }
        } catch (error) {
            console.error("User fetch error:", error?.response?.data || error.message);
            set({ user: null, isAuth: false });
        } finally {
            set({ isLoading: false });
        }
    },

    logout: async (navigate) => {
        set({ isLoading: true });

        try {
            await axios.get(`${SERVER_URL}/auth/logout`, { withCredentials: true });
            set({ user: null, isAuth: false }); // Ensure state is cleared
            navigate("/", { replace: true });
        } catch (error) {
            console.error("Logout failed:", error?.response?.data || error.message);
        } finally {
            set({ isLoading: false });
        }
    }

}));

export default useAuthStore;
