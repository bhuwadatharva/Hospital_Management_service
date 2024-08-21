import express from "express"
import { getAllMessages, sendMessage } from "../controller/messageController.js"
import { isAdminAuthenticated } from "../middlewares/auth.js"
//here we have route the data in the database 
const router = express.Router();
//POST is the method use in API to store the data in database 
router.post("/send", sendMessage);
router.get("/getall",isAdminAuthenticated, getAllMessages); //here the code is written as for getting this request the admin should be authenticated and then it will get all messages

export default router;