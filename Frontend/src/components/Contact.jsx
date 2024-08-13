import React, { useState } from "react";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import axios from "axios";

export function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleMessage = async (e) => {
    e.preventDefault();
    console.log({ firstName, lastName, email, phone, message });
    try {
      await axios
        .post(
          "http://localhost:4000/api/v1/message/send",
          { firstName, lastName, email, phone, message },
          {
            withCredentials: true,
            headers: {
              "Content-type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          toast.success(res.data.message);
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setMessage("");
        });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <section className="px-8 py-8 lg:py-16">
      <div className="container mx-auto text-center">
        <Typography variant="h5" color="pink" className="mb-4 !text-base lg:!text-2xl">
          Customer Care
        </Typography>
        <Typography variant="h1" color="blue-gray" className="mb-4 !text-3xl lg:!text-5xl">
          We're Here to Help
        </Typography>
        <Typography className="mb-10 font-normal !text-lg lg:mb-20 mx-auto max-w-3xl !text-regal-pink">
          Whether it's a question about our services, a request for technical assistance, or suggestions for improvement, our team is eager to hear from you.
        </Typography>
        <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-2 items-start">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3804.572830069863!2d73.51218317493807!3d17.527893383383397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc207cee76d7f0f%3A0x4a47762445f5075f!2sAparant%20Hospital!5e0!3m2!1sen!2sin!4v1721492233325!5m2!1sen!2sin"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <form onSubmit={handleMessage} className="flex flex-col gap-4 lg:max-w-sm">
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
                Your Email
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="name@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder="phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="focus:border-t-gray-900"
                containerProps={{ className: "!min-w-full" }}
                labelProps={{ className: "hidden" }}
              />
            </div>
            <div>
              <Typography variant="small" className="mb-2 text-left font-medium !text-regal-pink">
                Your Message
              </Typography>
              <Textarea
                rows={6}
                color="pink"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="focus:border-t-gray-900"
                containerProps={{ className: "!min-w-full" }}
                labelProps={{ className: "hidden" }}
              />
            </div>
            <Button type="submit" className="w-full bg-regal-pink py-2">
              Send message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
