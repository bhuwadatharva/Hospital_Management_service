import mongoose from "mongoose";
import validator from "validator";

// The messageSchema is used to structure the database given by the frontend appointment 
const messageSchema = new mongoose.Schema({
    firstName: {
        type: String, // Add the type property
        required: true,
        minLength: [3, "First name must contain 3 characters!"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Last name must contain 3 characters!"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    phone: {
        type: String,
        required: true,
        minLength: [10, "Phone number must contain 10 digits"],
        maxLength: [10, "Phone number must contain 10 digits"], // Changed from minLength to maxLength
    },
    message: {
        type: String,
        required: true,
        minLength: [10, "Message must contain at least 10 characters"]
    },
});

export const Message = mongoose.model("Message", messageSchema);
