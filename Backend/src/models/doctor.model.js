import mongoose, { Schema } from "mongoose";

const doctorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    specialization: {
        type: String,
        required: true
    },
    roomNumber: {
        type: String,
        required: true
    },
},{timestamps: true});

export const Doctor = mongoose.model("Doctor", doctorSchema);
