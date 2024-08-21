import {catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"
import ErrorHandler from "../middlewares/errorMiddeware.js"
import { User } from "../models/userSchema.js";
import { generateToken} from "../utils/jwtToken.js";
import cloudinary from "cloudinary"
import bcrypt from "bcryptjs"

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, adharno, dob, gender, password, role } = req.body;
  
    if (!firstName || !lastName || !email || !phone || !adharno || !dob || !gender || !password || !role) {
      return next(new ErrorHandler("Please fill full form!", 400));
    }
  
    if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
      return next(new ErrorHandler("Phone number must be 10 digits!", 400));
    }
  
    let user = await User.findOne({ email });
    if (user) {
      return next(new ErrorHandler("User already registered", 400));
    }
  
    user = await User.create({ firstName, lastName, email, phone, adharno, dob, gender, password, role: "patient" });
    generateToken(user, "Successfully Registered!", 200, res); // this is used to generate token by using cookies
  });
  
   export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        console.log('Missing details:', { email, password, role });
        return next(new ErrorHandler("Please provide all details!", 400));
    }

    try {
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            console.log('User not found with email:', email);
            return next(new ErrorHandler("Invalid Email Or Password!", 400));
        }

        console.log('Entered Password:', password);
        console.log('Stored Hashed Password:', user.password);

        const isPasswordMatch = await user.comparePassword(password);
        console.log('Password Match Result:', isPasswordMatch);

        if (!isPasswordMatch) {
            console.log('Password does not match for user:', email);
            return next(new ErrorHandler("Invalid Email Or Password!", 400));
        }

        if (role !== user.role) {
            console.log('Role does not match for user:', email);
            return next(new ErrorHandler("User Not Found With This Role!", 400));
        }

        generateToken(user, "Login Successfully!", 201, res);
    } catch (err) {
        console.log('Error during login:', err);
        return next(new ErrorHandler("Invalid Email Or Password!", 400));
    }
});


//now we are writing a code to add new admin in the database
export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, adharno, dob, gender, password } = req.body;
  
    if (!firstName || !lastName || !email || !phone || !adharno || !dob || !gender || !password) {
      return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
  
    if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
      return next(new ErrorHandler("Phone number must be 10 digits!", 400));
    }
  
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
      return next(new ErrorHandler("Admin With This Email Already Exists!", 400));
    }
  
    const admin = await User.create({
      firstName,
      lastName,
      email,
      phone,
      adharno,
      dob,
      gender,
      password,
      role: "Admin",
    });
    res.status(200).json({
      success: true,
      message: "New Admin Registered",
      admin,
    });
  });
  

export const getAllDoctors = catchAsyncErrors(async(req, res, next)=> {
    const doctors = await User.find({role: "Doctor"});
    res.status(200).json({
        success: true,
        doctors,
    });
});

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});
  
//to logout the admin
export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()), // Capitalized Date
    }).json({
        success: true,
        message: "Admin Logged Out Successfully"
    });
});


export const logoutPatient = catchAsyncErrors(async(req, res, next)=>{
    res.status(200).cookie("patientToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
    }).json ({
        success:true,
        message: "Patient Logged Out Successfully"
    });
});

//we are adding the Doctor in a database
export const addNewDoctor = catchAsyncErrors(async(req, res, next) => {
    //We are adding a Docavatar and here we used condition that docavatar is required
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
    //ig=f the data that you are given and the email is registered already then it will throw the error
    const { firstName, lastName, email, phone, adharno, dob, gender, password, doctorDepartment} = req.body;
    if(!firstName || !lastName || !email || !phone || !adharno || !dob || !gender || !password || !doctorDepartment) {
        return next(new ErrorHandler("Please Provide Full Details",400));
        }
        const isRegistered = await User.findOne({email});
        if(isRegistered) {
            return next(new ErrorHandler(`${isRegistered.role} already registered with this email`,400));
        }

        const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath); //we are using this to upload the the image like docavatar 
        if(!cloudinaryResponse || cloudinaryResponse.error) {
            console.error("Cloudinary Error!",cloudinaryResponse.error || "unknown Cloudinary Error");
        }
        //now we are creating a doctor user in our database by using all authentication
        const doctor = await User.create ({firstName, lastName, email, phone, adharno, dob, gender, password, doctorDepartment, role:"Doctor", docAvatar:{public_id:cloudinaryResponse.public_id, url: cloudinaryResponse.secure_url,}});
        generateToken(doctor, "Successfully Registered!", 200, res);
});
