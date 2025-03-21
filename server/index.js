import express from "express"
import config from "./config/config.js";
import cookieParser from "cookie-parser"
import passportSetup from "./config/passport.js"
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import mongoose from "mongoose";
import cors from "cors"


const { PORT, MONGO_USER,MONGO_PORT,MONGO_PASSWORD, MONGO_IP, CLIENT_URL } = config
const app = express()

app.use(cors({
    credentials: true,
    origin: CLIENT_URL
}));
app.use(express.json())
app.use(cookieParser())
app.use("/auth",authRoutes)
app.use("/projects", projectRoutes)

const MONGODB_URI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}`
async function connectDB() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to DB");
    } catch (err) {
        console.error("Could not connect", err);
    }
}


connectDB();

app.get("/", (req, res)=>{
    res.send("Server is up and running ")
})
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))