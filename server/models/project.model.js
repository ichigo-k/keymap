import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        project_name: {
            type: String,
            default: "New Project"
        },
        description: {
            type: String,
            default: "Project description"
        },
        prompt: {
            type: String,
        },
        tables: [
            {
                name: {
                    type: String,
                    required: true
                },
                columns: [
                    {
                        name: {
                            type: String,
                            required: true
                        },
                        type: {
                            type: String,
                            required: true
                        }
                    }
                ]
            }
        ]
    },
    { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
