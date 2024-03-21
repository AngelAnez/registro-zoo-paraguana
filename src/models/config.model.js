import mongoose from "mongoose";

const configSchema = mongoose.Schema({
    internetDolarValue: {
        type: String,
        required: true
    },
    defaultDolarValue: {
        type: String,
        required: true
    },
    childrenTicketPrice: {
        type: String,
        required: true
    },
    adultsTicketPrice: {
        type: String,
        required: true
    },
    seniorsTicketPrice: {
        type: String,
        required: true
    }
})

export default mongoose.model('Config', configSchema)