import mongoose from "mongoose";

// Function to connect to the MongoDB database
const connectDB = async () => {

    mongoose.connection.on('connected', () => console.log('Database Connected'))
    mongoose.connection.on('error', (err) => console.error('Database Connection Error:', err.message))

    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/job-portal`)
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error.message)
        console.error('Please check your MONGODB_URI in server/.env')
    }

}

export default connectDB
