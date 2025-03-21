import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import {Strategy as GithubStrategy} from "passport-github2";
import {Strategy as MicrosoftStrategy} from "passport-microsoft"
import User from "../models/user.model.js";
import config from "./config.js";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GITHUB_CLIENT_SECRET, GITHUB_CLIENT_ID, MICROSOFT_CLIENT_ID, MICROSOFT_CLIENT_SECRET } = config;

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/redirect",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ oauthId: profile.id });

                if (!user) {
                    user = await User.create({
                        oauthId: profile.id,
                        avatar: profile.photos[0].value,
                        username: profile.displayName,
                    });
                }

                done(null, user);
            } catch (err) {
                done(err, null);
            }
        }
    )
);


passport.use(
    new GithubStrategy(
        {
            clientID: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
            callbackURL: "/auth/github/redirect",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ oauthId: profile.id });

                if (!user) {
                    user = await User.create({
                        oauthId: profile.id,
                        avatar: profile.photos[0].value,
                        username: profile.displayName,
                    });
                }

                done(null, user);
            } catch (err) {
                done(err, null);
            }
        }
    )
);







export default passport;
