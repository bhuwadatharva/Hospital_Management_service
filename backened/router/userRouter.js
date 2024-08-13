import express from "express"
import {addNewAdmin, addNewDoctor, getAllDoctors, getUserDetails, login, logoutAdmin, logoutPatient, patientRegister } from "../controller/userController.js"
import {isAdminAuthenticated, isAuthenticated, isDoctorAuthenticated} from "../middlewares/auth.js"
//here we have route the data in the database 
const router = express.Router();
//POST is the method use in API to store the data in database 
router.post("/patient/register", patientRegister);
router.post("/login",login);
router.post("/admin/addnew",isAdminAuthenticated, addNewAdmin);
router.get("/doctors", getAllDoctors);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/doctor/me", isDoctorAuthenticated, getUserDetails);
router.route('/me').get(isAuthenticated, getUserDetails);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.get("/logout",isAuthenticated, logoutPatient);
router.post("/doctor/addnew",isAdminAuthenticated, addNewDoctor);

export default router;