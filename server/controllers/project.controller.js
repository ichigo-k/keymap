import User from "../models/user.model.js";
import projectModel from "../models/project.model.js";
import Project from "../models/project.model.js";
import chat from "../config/geminiConfig.js";


export async function getAllProjects(req, res) {
    const { userId } = req;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const projects = await Project.find({user_id: userId})

        res.status(200).json({ success: true, projects:projects });

    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export async function createProject(req, res){
    const { userId } = req;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const project = await Project.create({
            user_id: userId
        })

        res.status(201).json({success:true, project: project})

    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}


export async function getProject(req, res){
    try {
        const project = await Project.findById(req.params.id)
        if(!project) return res.status(401).json({success: false, message:"No project found"})

        res.status(200).json({success:true, project: project})

    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export async function updateProject(req, res){
    try {
        const project = await Project.findById(req.params.id)
        if(!project) return res.status(401).json({success: false, message:"No project found"})

        const  {message} = req.body
        const schema = project.tables

        const response = await chat(message, schema )

        console.log(schema)
        const responseText = response.replace(/```json|```/g, '').trim();

        const parsedData = JSON.parse(responseText);


        if (parsedData.dbneeded) {
            project.tables = parsedData.tables
            project.project_name = parsedData.name
            project.description = parsedData.description
            project.prompt = parsedData.AI
            await project.save()
        }

        console.log(project, parsedData)

        res.status(200).json({AI: parsedData.AI, project: project})


    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}




