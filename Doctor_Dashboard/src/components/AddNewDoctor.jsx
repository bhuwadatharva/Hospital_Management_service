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

    // Upload the PDF to the server
    axios.post("http://localhost:4000/upload-files", formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => {
      console.log(response.data);
      toast.success("PDF uploaded successfully.");
      // Optionally, navigate to another page or reset the form
      navigateTo("/");
    })
    .catch((error) => {
      console.error(error);
      toast.error("Failed to upload PDF.");
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generatePDF();
  };

  return (
    <section className="page flex flex-col lg:flex-row items-start bg-white">
      <div className="lg:w-1/3 flex flex-col items-center"></div>
      <div className="lg:w-2/3 flex flex-col items-start">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Typography variant="small" className="mb-2 text-left font-medium !text-regal-pink">
                First Name
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="focus:border-t-gray-900"
                containerProps={{ className: "min-w-full" }}
                labelProps={{ className: "hidden" }}
              />
            </div>
            <div>
              <Typography variant="small" className="mb-2 text-left font-medium !text-regal-pink">
                Last Name
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="focus:border-t-gray-900"
                containerProps={{ className: "!min-w-full" }}
                labelProps={{ className: "hidden" }}
              />
            </div>
          </div>
          <div>
            <Typography variant="small" className="mb-2 text-left font-medium !text-regal-pink">
              Age
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="focus:border-t-gray-900"
              containerProps={{ className: "!min-w-full" }}
              labelProps={{ className: "hidden" }}
            />
          </div>
          <div>
            <Typography variant="small" className="mb-2 text-left font-medium !text-regal-pink">
              Phone Number
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="focus:border-t-gray-900"
              containerProps={{ className: "!min-w-full" }}
              labelProps={{ className: "hidden" }}
            />
          </div>
          <div>
            <Typography variant="small" className="mb-2 text-left font-medium !text-regal-pink">
              Date Of Birth
            </Typography>
            <Input
              color="gray"
              size="lg"
              type="date"
              placeholder="Date Of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="focus:border-t-gray-900"
              containerProps={{ className: "!min-w-full" }}
              labelProps={{ className: "hidden" }}
            />
          </div>
          <div>
            <Typography variant="small" className="mb-2 text-left font-medium !text-regal-pink">
              Gender
            </Typography>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="focus:border-t-gray-900 min-w-full"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <Typography variant="small" className="mb-2 text-left font-medium !text-regal-pink">
              Chief Complaint:
            </Typography>
            <Textarea
              rows={6}
              color="pink"
              placeholder="Chief Complaint"
              value={cc}
              onChange={(e) => setCc(e.target.value)}
              className="focus:border-t-gray-900"
              containerProps={{ className: "!min-w-full" }}
              labelProps={{ className: "hidden" }}
            />
          </div>
          <div>
            <Typography variant="small" className="mb-2 text-left font-medium !text-regal-pink">
              Past Medical History:
            </Typography>
            <Textarea
              rows={6}
              color="pink"
              placeholder="Past Medical History"
              value={pmh}
              onChange={(e) => setPmh(e.target.value)}
              className="focus:border-t-gray-900"
              containerProps={{ className: "!min-w-full" }}
              labelProps={{ className: "hidden" }}
            />
          </div>
          <div>
            <Typography variant="small" className="mb-2 text-left font-medium !text-regal-pink">
              Having Past Illness:
            </Typography>
            <Textarea
              rows={6}
              color="pink"
              placeholder="Having Past Illness"
              value={hpi}
              onChange={(e) => setHpi(e.target.value)}
              className="focus:border-t-gray-900"
              containerProps={{ className: "!min-w-full" }}
              labelProps={{ className: "hidden" }}
            />
          </div>
          <div>
            <Typography variant="small" className="mb-2 text-left font-medium !text-regal-pink">
              Medication:
            </Typography>
            <Textarea
              rows={6}
              color="pink"
              placeholder="Medication"
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
              className="focus:border-t-gray-900"
              containerProps={{ className: "!min-w-full" }}
              labelProps={{ className: "hidden" }}
            />
          </div>
          <div>
            <Typography variant="small" className="mb-2 text-left font-medium !text-regal-pink">
              Allergies:
            </Typography>
            <Textarea
              rows={6}
              color="pink"
              placeholder="Allergies"
              value={Allergies}
              onChange={(e) => setAllergies(e.target.value)}
              className="focus:border-t-gray-900"
              containerProps={{ className: "!min-w-full" }}
              labelProps={{ className: "hidden" }}
            />
          </div>
          <div>
            <Typography variant="small" className="mb-2 text-left font-medium !text-regal-pink">
              Diagnosis Test:
            </Typography>
            <Textarea
              rows={6}
              color="pink"
              placeholder="Diagnosis Test"
              value={DiagnosisTest}
              onChange={(e) => setDiagnosisTest(e.target.value)}
              className="focus:border-t-gray-900"
              containerProps={{ className: "!min-w-full" }}
              labelProps={{ className: "hidden" }}
            />
          </div>
          <div>
            <Typography variant="small" className="mb-2 text-left font-medium !text-regal-pink">
              Assessment:
            </Typography>
            <Textarea
              rows={6}
              color="pink"
              placeholder="Assessment"
              value={Assesment}
              onChange={(e) => setAssesment(e.target.value)}
              className="focus:border-t-gray-900"
              containerProps={{ className: "!min-w-full" }}
              labelProps={{ className: "hidden" }}
            />
          </div>
          <div>
            <Typography variant="small" className="mb-2 text-left font-medium !text-regal-pink">
              Plan:
            </Typography>
            <Textarea
              rows={6}
              color="pink"
              placeholder="Plan"
              value={Plan}
              onChange={(e) => setPlan(e.target.value)}
              className="focus:border-t-gray-900"
              containerProps={{ className: "!min-w-full" }}
              labelProps={{ className: "hidden" }}
            />
          </div>
          <div>
            <Typography variant="small" className="mb-2 text-left font-medium !text-regal-pink">
              Doctor First Name:
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="Doctor First Name"
              value={doctor_firstName}
              onChange={(e) => setDoctor_FirstName(e.target.value)}
              className="focus:border-t-gray-900"
              containerProps={{ className: "!min-w-full" }}
              labelProps={{ className: "hidden" }}
            />
          </div>
          <div>
            <Typography variant="small" className="mb-2 text-left font-medium !text-regal-pink">
              Doctor Last Name:
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="Doctor Last Name"
              value={doctor_lastName}
              onChange={(e) => setDoctor_LastName(e.target.value)}
              className="focus:border-t-gray-900"
              containerProps={{ className: "!min-w-full" }}
              labelProps={{ className: "hidden" }}
            />
          </div>
          <div>
            <Typography variant="small" className="mb-2 text-left font-medium !text-regal-pink">
              Progress Note:
            </Typography>
            <Textarea
              rows={6}
              color="pink"
              placeholder="Progress Note"
              value={progressNote}
              onChange={(e) => setProgressNote(e.target.value)}
              className="focus:border-t-gray-900"
              containerProps={{ className: "!min-w-full" }}
              labelProps={{ className: "hidden" }}
            />
          </div>
          <div>
            <Typography variant="small" className="mb-2 text-left font-medium !text-regal-pink">
              Doctor's Avatar
            </Typography>
            <input type="file" accept="image/*" onChange={handleAvatar} />
            {docAvatarPreview && (
              <img
                src={docAvatarPreview}
                alt="Avatar Preview"
                style={{ width: "100px", height: "100px", marginTop: "10px" }}
              />
            )}
          </div>
          <Button
            variant="gradient"
            color="pink"
            type="submit"
            className="!min-w-full"
          >
            Submit
          </Button>
        </form>
      </div>
    </section>
  );
};

export default AddNewDoctor;
