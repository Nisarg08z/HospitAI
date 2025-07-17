import mongoose, { Schema } from "mongoose";

const patientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    symptoms: {
        type: String,
    },
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: "Doctor"
    },
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment"
    },
    customID: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true });

export const Patient = mongoose.model("Patient", patientSchema);
