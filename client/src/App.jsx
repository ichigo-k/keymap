import React, { useEffect, useState } from "react";
import {Route, Routes, useNavigate, useParams} from "react-router";
import useAuthStore from "./store/authStore.js";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProjectPage from "./pages/Project.jsx";
import Loading from "./pages/Loading.jsx";
import useProjectStore from "./store/projectStore.js";
import {toast} from "sonner";

function ProtectedRoute({ children }) {
    const { fetchUser, isAuth, isLoading } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        if (!isLoading && !isAuth) {
            navigate("/", { replace: true });
        }
    }, [isAuth, isLoading, navigate]);

    if (isLoading) return <Loading />;

    return isAuth ? children : null;
}

function UserData({children}){
    const { fetchUser, isLoading } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        fetchUser();
    }, []);



    if (isLoading) return <Loading />;

    return  children

}

function GuestRoute({ children }) {
    const { fetchUser, user, isLoading } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        if (!isLoading && user) {
            navigate("/dashboard");
        }
    }, [user, isLoading, navigate]);

    if (isLoading) return <Loading/>;

    return !user ? children : null;
}


function ProjectExist({ children }) {
    const { getProject, selectedProject, isLoading } = useProjectStore();
    const { id } = useParams();
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const fetchProject = async () => {
            await getProject(id, navigate);
            setChecked(true);
        };
        fetchProject();
    }, [id, getProject, navigate]);

    if (isLoading || !checked) return <Loading />;

    if (checked && !selectedProject) {
        toast.error("Project not found");
        return null;
    }

    return children;
}


function App() {
    return (
        <Routes>
            <Route path="/" element={<GuestRoute><Login /></GuestRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/project/:id" element={<ProjectExist><UserData> <ProjectPage /></UserData> </ProjectExist>} />
            <Route path={"*"} element={<p>Not found</p>}/>
        </Routes>
    );
}

export default App;
