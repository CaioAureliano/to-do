import mongoose from "mongoose";
import "../config/database/mongoose";

const { Schema } = mongoose;

const todoSchema = new Schema({
    task: {
        type: String,
        required: [true, 'task body is required']
    },
    status: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export const Todo = mongoose.model('Todo', todoSchema);