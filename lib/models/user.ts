import {Schema, model, models} from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        match: [/^[a-zA-Z0-9 ._-]+$/, "Username is invalid"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
},
{timestamps: true}
);

const User = models.User || model("User", userSchema);

export default User;