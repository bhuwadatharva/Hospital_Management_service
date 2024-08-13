import express from "express";
import { getallCase, postCase, searchCaseByFirstName} from "../controller/caseController.js";
import { isDoctorAuthenticated } from "../middlewares/auth.js";
import { Casepaper } from "../models/caseSchema.js";
const router = express.Router();

router.post("/post",isDoctorAuthenticated,postCase);
router.get("/getall",isDoctorAuthenticated, getallCase);
router.get("/search", isDoctorAuthenticated,searchCaseByFirstName);

  
export default router;


//GET http://localhost:4000/api/v1/cases/search?firstName=John
