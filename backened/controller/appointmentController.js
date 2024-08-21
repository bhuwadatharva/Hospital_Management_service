import { catchAsyncErrors} from "../middlewares/catchAsyncErrors.js"
import ErrorHandler from "../middlewares/errorMiddeware.js";
import {Appointment} from "../models/appointmentSchema.js"
import {User} from "../models/userSchema.js"

export const postAppointment = catchAsyncErrors(async(req, res, next)=> {
    const {
        firstName,
        lastName,
        email,
        phone,
        adharno,
        dob,
        gender,
        appointment_date,
        department,
        doctor_firstName,
        doctor_lastName,
        hasVisited,
        address,
    } = req.body;

    if(!firstName ||
        !lastName ||
        !email ||
        !phone ||
        !adharno ||
        !dob ||
        !gender ||
        !appointment_date ||
        !department ||
        !doctor_firstName ||
        !doctor_lastName ||
        !address) {
            return next(new ErrorHandler("Please fill full form!", 400));
        }
        // if the doctor with same name have in the database

        const isConflict = await User.find({
            firstName: doctor_firstName,
            lastName: doctor_lastName,
            role: "Doctor",
            doctorDepartment: department,
        })
        if(isConflict.length === 0) {
            return next(new ErrorHandler("Doctor not found!", 404));
        }
        if(isConflict.length > 1) {
            return next( new ErrorHandler("Doctor Conflict! Please contact with us through email or phone",404));
        }
        const doctorId = isConflict[0]._id;
        const patientId =req.user._id;
        const appointment = await Appointment.create({
            firstName,
        lastName,
        email,
        phone,
        adharno,
        dob,
        gender,
        appointment_date,
        department,
        doctor: {
            firstName:doctor_firstName,
            lastName:doctor_lastName,
        },
        hasVisited,
        address,
        doctorId,
        patientId,
        });
        res.status(200).json({
            success: true,
            message: "Appointment is successfully submited!" ,
            appointment,
        });

});

export const getAllAppointments = catchAsyncErrors(async (req, res, next) => {
    const { doctor_firstName, doctor_lastName } = req.query;
    
    const query = {};
  
    if (doctor_firstName) {
      query["doctor.firstName"] = doctor_firstName;
    }
  
    if (doctor_lastName) {
      query["doctor.lastName"] = doctor_lastName;
    }
  
    const appointments = await Appointment.find(query);
  
    res.status(200).json({
      success: true,
      appointment: appointments,
    });
  });
  

export const updateAppointmentStatus = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    let appointment = await Appointment.findById(id); // Corrected this line
    if (!appointment) {
        return next(new ErrorHandler("Appointment Not Found", 404));
    }
    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        message: "Appointment status updated",
        appointment,
    });
});

export const deleteAppointment = catchAsyncErrors(async (req, res, next)=>{
    const { id } = req.params;
    let appointment = await Appointment.findById(id);
    if(!appointment) {
        return next (new ErrorHandler("Appointment not found", 404));
    }
    await appointment.deleteOne();
    res.status(200).json({
        success: true,
        message: "Appointment Deleted Succesfully!",
    })
})


//https://hospital-management-service-pf6w.vercel.app/