import { User } from "../models/userSchema.js";
import {catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddeware.js";
import jwt from 'jsonwebtoken';

export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.adminToken;
    if(!token) {
        return next(new ErrorHandler("Admin not Authenticated",400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if(req.user.role !== "Admin") {
        return next(new ErrorHandler(`${req.user.role} not authorized for this resources!`,400));
    }
    next()
})

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.patientToken; // Correct way to retrieve the token from cookies
  
    if (!token) {
      return next(new ErrorHandler("Please login to access this resource", 401));
    }
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
  
    if (req.user.role !== "patient") {
      return next(new ErrorHandler(`${req.user.role} not authorized for this resource!`, 400));
    }
  
    next();
  });

  export const isDoctorAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.doctorToken; // Correct way to retrieve the token from cookies
  
    if (!token) {
      return next(new ErrorHandler("Please login to access this resource", 401));
    }
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
  
    if (req.user.role !== "Doctor") {
      return next(new ErrorHandler(`${req.user.role} not authorized for this resource!`, 400));
    }
  
    next();
  })

  export const isAuthorized = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new ErrorHandler(
            `${req.user.role} not allowed to access this resource!`
          )
        );
      }
      next();
    };
  };

  export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource`, 403));
        }
        next();
    };
};