import express from "express";
import {verifyToken} from "../middleware/verifyToken.js";
import {createProject, getAllProjects, getProject, updateProject} from "../controllers/project.controller.js";

const router = express.Router()
router.get("/", verifyToken, getAllProjects)
router.post("/", verifyToken, createProject)
router.get("/:id", getProject)
router.patch("/:id",verifyToken, updateProject)
export default router