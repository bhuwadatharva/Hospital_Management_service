import {catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"
import ErrorHandler from "../middlewares/errorMiddeware.js"
import { Casepaper } from "../models/caseSchema.js"
import cloudinary from "cloudinary"



export const postCase = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Doctor Avatar Required", 400));
    }
    //we have written that we required the files to get as a input by req.file
    const { docAvatar } = req.files;
    //the required format to paste the docAvatar and if not then throw the error
    const allowedFormats = ["image/png", "image/jpeg","image/webp"];
    if(!allowedFormats.includes(docAvatar.mimetype)) {
        return next(new ErrorHandler("File Format Not Supported!", 400));
    }

    const { 
        firstName, lastName, age, gender, phone, dob, cc, hpi, pmh, medication, Allergies, DiagnosisTest, 
        Assesment, Plan, progressNote, doctor_firstName, doctor_lastName 
    } = req.body;

    // Check if any of the required fields are missing or empty
    const requiredFields = { firstName, lastName, age, gender, phone, dob, cc, pmh, medication, Allergies, DiagnosisTest, Assesment, Plan, doctor_firstName, doctor_lastName };
    for (const [key, value] of Object.entries(requiredFields)) {
        if (!value || value.trim() === "") {
            return next(new ErrorHandler(`Please provide ${key}`, 400));
        }
    }

    try {
        const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath); // we are using this to upload the image like docavatar 
        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.error("Cloudinary Error!", cloudinaryResponse.error || "unknown Cloudinary Error");
            return next(new ErrorHandler("Error uploading file", 500));
        }

        const casepaper = await Casepaper.create({
            firstName, lastName, age, gender, phone, dob, cc, hpi, pmh, medication, Allergies, DiagnosisTest, role: "Treatment", Assesment, Plan, progressNote, doctor_firstName,
            doctor_lastName, docAvatar: { public_id: cloudinaryResponse.public_id, url: cloudinaryResponse.secure_url }
        });

        res.status(200).json({
            success: true,
            casepaper
        });
    } catch (error) {
        console.error("Error creating case paper", error);
        return next(new ErrorHandler("Error creating case paper", 500));
    }
});

export const getallCase = catchAsyncErrors(async (req, res, next) => {
    const casepapers = await Casepaper.find({ role: "Treatment" });

    res.status(200).json({
        success: true,
        casepapers
    });
}); 

export const searchCaseByFirstName = catchAsyncErrors(async (req, res, next) => {
    const { firstName } = req.query;
    if (!firstName) {
        return next(new ErrorHandler("Please provide a first name to search", 400));
    }
    const casepapers = await Casepaper.find({ role: "Treatment", firstName: { $regex: firstName, $options: 'i' } });
    res.status(200).json({
        success: true,
        casepapers
    });
});

