import { Schema, model, models } from "mongoose";

const BlogSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    content: {
        type: String,
        required: [true, "Content is required"],
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Category is required"],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
    },
    date: {
        type: Date,
        default: Date.now,
    },
    
}, {timestamps: true});

const Blog = models.Blog || model("Blog", BlogSchema);

export default Blog;
