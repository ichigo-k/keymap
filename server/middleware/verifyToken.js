import jwt from "jsonwebtoken"
import config from "../config/config.js";

const {JWT_SECRET} = config
export async function verifyToken(req, res, next) {
    const token = req.cookies.token
    try {
        if (!token) return res.status(401).json({success: false, message: "Access denied -- no token provided"})
        const decoded = jwt.verify(token,JWT_SECRET);
        if (!decoded)return  res.status(401).json({success: false, message: "Access denied -- invalid token  provided"})
        req.userId = decoded.id
        next()
    } catch (error) {
        console.log("Verify token", error)
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}