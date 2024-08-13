import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
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
        required: [true, "Phone is required!"],
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v);
            },
            message: "Phone number must be 10 digits!"
        }
    },
    adharno: {
        type: String,
        required: true,
        minLength: [10, "Adhar number must contain 10 digits"],
        maxLength: [10, "Adhar number must contain 10 digits"]
    },
    dob: {
        type: Date,
        required: [true, "DOB is required"]
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"]
    },
    password: {
        type: String,
        minLength: [8, "Password must contain at least 8 characters"],
        required: true,
        select: false
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "Doctor", "patient"]
    },
    doctorDepartment: {
        type: String,
    },
    docAvatar: {
        public_id: String,
        url: String,
    }
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};

export const User = mongoose.model('User', userSchema);
