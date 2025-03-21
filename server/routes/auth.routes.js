import express from "express";
import passport from "passport";
import {login, checkAuth, logout} from "../controllers/auth.controller.js";
import {verifyToken} from "../middleware/verifyToken.js";

const router = express.Router()

router.get("/logout", logout)
//Google strategy
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
router.get("/google/redirect", passport.authenticate("google",  {session: false }), login)

//Github strategy
router.get("/github", passport.authenticate("github", { scope: ["profile"] }));
router.get("/github/redirect", passport.authenticate("github",  {session: false }), login)




router.get("/check-auth",verifyToken, checkAuth)
export default router