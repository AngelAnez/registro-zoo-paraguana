import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://0.0.0.0:27017/zoodb")
        console.log("DB is connected")
    } catch (error) {
        console.log(error)
    }
}

// Localhost fue sustituido por 0.0.0.0, porque daba error. Para mas info: https://stackoverflow.com/questions/46523321/mongoerror-connect-econnrefused-127-0-0-127017