import { Message } from "../models/messageSchema.js"
import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js"
import ErrorHandler from "../middlewares/errorMiddeware.js"
//here we control the message and take a request body of message and respond it with particuar code no and with true and false success
export const sendMessage = catchAsyncErrors(async (req, res, next) => {
    const {firstName, lastName, email, phone, message } = req.body
    if(!firstName || !lastName || !email || !phone || !message){
        return next(new ErrorHandler("Please fill full form!",400));
    }
    await Message.create({ firstName, lastName, email, phone, message });
    res.status(200).json({
        success: true,
        message: "Message Send Succesfully!",
    });
});

//we are creating a function that will get all message given from the frontend
export const getAllMessages = catchAsyncErrors(async(req, res, next) => {
    const messages = await Message.find();
    res.status(200).json({
        success: true,
        messages,
    });
})

