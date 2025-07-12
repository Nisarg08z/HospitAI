import mongoose, { Schema } from "mongoose";

const appointmentSchema = new Schema({
    patientId: {
        type: Schema.Types.ObjectId,
        ref: "Patient"
    },
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: "Doctor"
    },
    time: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        default: "Scheduled"
    },
},{timestamps:true});

export const Appointment = mongoose.model("Appointment", appointmentSchema);
