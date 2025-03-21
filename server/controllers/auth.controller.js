import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookies.js";
import config from "../config/config.js";
import User from "../models/user.model.js";

const {CLIENT_URL} = config

export async function login(req, res) {

    try {
        const { user } = req;
        if (!user) {
            res.redirect(`${CLIENT_URL}/login?error=Something went wrong please try again`);
        }
        generateTokenAndSetCookie(res, user.id);
        res.redirect(`${CLIENT_URL}/dashboard`);
    } catch (error) {
        console.error("Login error:", error);
        res.redirect(`${CLIENT_URL}/login?error=Internal server error`);
    }
}


export async function checkAuth(req, res){
    try {
       const user =await User.findById(req.userId)
        if(!user) return res.status(401).json({success: false, message:"User not found"})
        res.status(200).json({success: true, user:user})
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({success:false, message: "Internal server error" });
    }
}

export async function  logout (req, res){
    res.clearCookie('token');
    res.status(200).json({ success: true, message: 'Logged out' });
}