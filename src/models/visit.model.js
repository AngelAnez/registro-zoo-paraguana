import mongoose from "mongoose";

const visitSchema = mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    childrenNumber: {
        type: String,
        required: true
    },
    adultsNumber: {
        type: String,
        required: true
    },
    seniorsNumber: {
        type: String,
        required: true
    },
    totalFamily: {
        type: String,
        required: true
    },
    totalDolars: {
        type: String,
        required: true
    },
    totalBolivars: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    extraInfoPayment: {
        type: String,
        required: true
    },
    representativeName: {
        type: String,
        required: true
    },
    representativePhone: {
        type: String,
        required: true
    }
})

export default mongoose.model("Visit", visitSchema)