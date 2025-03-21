import jwt from "jsonwebtoken"
import config from "../config/config.js";

const {JWT_SECRET} = config
export function generateTokenAndSetCookie(res, id) {
    const token = jwt.sign({ id }, JWT_SECRET, {
        expiresIn: "7d"
    })

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 20 * 24 * 60 * 60 * 1000
    })

    return token;

}