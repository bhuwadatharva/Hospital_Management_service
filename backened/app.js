import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from "./router/messageRouter.js";
import { errormiddleWare } from "./middlewares/errorMiddeware.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";
import casepaperRouter from "./router/casepaperRouter.js";
import multer from 'multer';
import { sendMessage } from './controller/messController.js';
import PdfDetails from "./models/pdfDetails.js";
import twilio from "twilio";

const app = express();


const accountSid = process.env.TWILIO_ACCOUNT_SID || 'AC41b7399fff568606e41d017f61b1fc66';
const authToken = process.env.TWILIO_AUTH_TOKEN || 'f26f0ee53652da56c416e5d3399afb63';
const client = twilio(accountSid, authToken);

// Serve static files from the "files" directory
app.use("/files", express.static("files"));

// Configure environment variables
config({ path: "./config/config.env" });

app.use(cors({
  origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL, process.env.DOCTOR_DASHBOARD_URL],
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Disposition"],
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Set up routes
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);
app.use("/api/v1/casepaper", casepaperRouter);

// Handle message sending
app.post('/send-message', sendMessage);

// Connect to the database
dbConnection();

// Error handling middleware
app.use(errormiddleWare);

// Route for uploading files
app.post("/upload-files", upload.single("file"), async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ status: "error", message: "No file uploaded" });
    }
  
    const title = req.body.title;
    const fileName = req.file.filename;
    //const fileUrl = `http://localhost:5175/files/${fileName}`; // Replace with your public URL
   // const to = req.body.phone; // Get the recipient phone number from the request body
  
    /*try {
      await client.messages.create({
        body: 'Here is the PDF you requested.',
        from: 'whatsapp:+14155238886', // Twilio sandbox number or your Twilio number
        to: `whatsapp:+91${to}`, // Recipient's WhatsApp number
        mediaUrl: fileUrl
      });
      */
      try {
        await PdfSchema.create({ title: title, pdf: fileName });
        res.send({ status: "ok" });
      } catch (error) {
        res.json({ status: error });
      }
  });
  
  

export default app;
