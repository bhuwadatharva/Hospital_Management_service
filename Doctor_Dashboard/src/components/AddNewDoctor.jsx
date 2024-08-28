import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button, Input, Typography, Textarea } from "@material-tailwind/react";
import { jsPDF } from "jspdf";

const AddNewDoctor = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [cc, setCc] = useState("");
  const [pmh, setPmh] = useState("");
  const [medication, setMedication] = useState("");
  const [Allergies, setAllergies] = useState("");
  const [DiagnosisTest, setDiagnosisTest] = useState("");
  const [Assesment, setAssesment] = useState("");
  const [Plan, setPlan] = useState("");
  const [doctor_firstName, setDoctor_FirstName] = useState("");
  const [doctor_lastName, setDoctor_LastName] = useState("");
  const [hpi, setHpi] = useState("");
  const [progressNote, setProgressNote] = useState("");
  const [docAvatar, setDocAvatar] = useState("");
  const [docAvatarPreview, setDocAvatarPreview] = useState("");

  const navigateTo = useNavigate();

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDocAvatarPreview(reader.result);
      setDocAvatar(file);
    };
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(`First Name: ${firstName}`, 10, 10);
    doc.text(`Last Name: ${lastName}`, 10, 20);
    doc.text(`Age: ${age}`, 10, 30);
    doc.text(`Gender: ${gender}`, 10, 40);
    doc.text(`Phone: ${phone}`, 10, 50);
    doc.text(`Date of Birth: ${dob}`, 10, 60);
    doc.text(`Chief Complaint: ${cc}`, 10, 70);
    doc.text(`Past Medical History: ${pmh}`, 10, 80);
    doc.text(`Having Past Illness: ${hpi}`, 10, 90);
    doc.text(`Medication: ${medication}`, 10, 100);
    doc.text(`Allergies: ${Allergies}`, 10, 110);
    doc.text(`Diagnosis Test: ${DiagnosisTest}`, 10, 120);
    doc.text(`Assessment: ${Assesment}`, 10, 130);
    doc.text(`Plan: ${Plan}`, 10, 140);
    doc.text(`Doctor First Name: ${doctor_firstName}`, 10, 150);
    doc.text(`Doctor Last Name: ${doctor_lastName}`, 10, 160);
    doc.text(`Progress Note: ${progressNote}`, 10, 170);

    // Save the PDF as a blob
    const pdfBlob = doc.output("blob");

    // Create a FormData object and append the PDF file, title, and phone number
    const formData = new FormData();
    formData.append("title", `${firstName}_${lastName}`); // Append title
    formData.append("file", pdfBlob, `${firstName}_${lastName}_case.pdf`); // Append PDF file
    formData.append("phone", phone); // Append phone number

    return formData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate PDF and prepare form data
    const formData = generatePDF();

    // Prepare JSON payload for the second API call
    const jsonPayload = {
      firstName,
      lastName,
      age,
      gender,
      phone,
      dob,
      cc,
      pmh,
      medication,
      Allergies,
      DiagnosisTest,
      Assesment,
      Plan,
      doctor_firstName,
      doctor_lastName,
      hpi,
      progressNote,
    };

    try {
      // Perform both API calls concurrently
      await axios.all([
        axios.post("https://backend-vy3x.onrender.com/upload-files", formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }),
        axios.post("https://backend-vy3x.onrender.com/api/v1/casepaper/post", jsonPayload, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }),
      ]);

      toast.success("PDF and form data uploaded successfully.");
      navigateTo("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload PDF or form data.");
    }
  };

  return (
    <section className="page flex flex-col lg:flex-row items-start bg-white">
      <div className="lg:w-1/3 flex flex-col items-center"></div>
      <div className="lg:w-2/3 flex flex-col items-start">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          {/* Form inputs as before */}
          {/* Your form inputs go here */}
          <Button
            variant="gradient"
            color="pink"
            type="submit"
            className="!min-w-full bg-regal-pink"
          >
            Submit
          </Button>
        </form>
      </div>
    </section>
  );
};

export default AddNewDoctor;
