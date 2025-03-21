import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    avatar: {
        type:String,
        default: "https://placehold.co/600x400"
    },
    oauthId: {
        type: String,
        required: true
    }
})

const User = mongoose.model("User", userSchema)
export default User