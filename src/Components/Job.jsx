import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { jobs } from "../Careers";
import { FaArrowLeft, FaLinkedin, FaUpload } from "react-icons/fa6";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.js";

const Job = () => {
  const { slug } = useParams();

  const [jobInfo, setJobInfo] = useState({
    title: "",
    desc: "",
    requirements: [],
    location: "",
    type: "",
    department: "",
    linkedinUrl: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    degree: "BE",
    address: "",
    portfolio: "",
    resume: null,
  });

  const job = jobs.find((job) => job.slug === slug);

  useEffect(() => {
    if (job) {
      setJobInfo({
        title: job.title,
        desc: job.description,
        requirements: job.requirements,
        location: job.location,
        type: job.type,
        department: job.department,
        linkedinUrl: job.linkedinUrl || "",
      });
    }
  }, [job]);

 const handleChange = async (e) => {
  const { name, value, files } = e.target;

  // 📌 If user is selecting a resume (PDF)
  if (files && files.length > 0) {
    const file = files[0];

    if (file.type !== "application/pdf") {
      alert("Only PDF files allowed");
      return;
    }

    // Continue with PDF extract logic
    const reader = new FileReader();
    reader.onload = async () => {
      const typedArray = new Uint8Array(reader.result);
      const pdf = await pdfjsLib.getDocument(typedArray).promise;
      let text = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map(item => item.str).join(" ") + "\n";
      }

      const email = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}/)?.[0] || "";
      const phone = text.match(/(\+?\d{1,3}[-.\s]?)?\d{10}/)?.[0] || "";
      const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
      const nameMatch = lines.find(line => /^[A-Za-z\s]{2,}$/.test(line)) || "";

      setFormData(prev => ({
        ...prev,
        name: nameMatch || prev.name,
        email: email || prev.email,
        phone: phone || prev.phone,
        resume: file
      }));
    };
    reader.readAsArrayBuffer(file);
    return;
  }

  // 📌 For normal input typing
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Application submitted successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto p-8 mt-10 bg-white rounded-xl shadow-sm">

      {/* Back Button */}
      <div className="mb-8">
        <Link to="/careers" className="flex items-center gap-2 text-gray-700 hover:text-black transition">
          <FaArrowLeft /> Back to Careers
        </Link>
      </div>

      {/* Job Info */}
      <div className="mb-10">
        <h1 className="text-4xl font-semibold text-gray-900">{jobInfo.title}</h1>
        <p className="text-gray-600 mt-2 text-lg">
          {jobInfo.department} • {jobInfo.location} • {jobInfo.type}
        </p>
        <p className="mt-4 text-gray-700 leading-relaxed">
          {jobInfo.desc}
        </p>
      </div>

      {/* Requirements */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Role Requirements</h2>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          {jobInfo.requirements.map((req, i) => (
            <li key={i}>{req}</li>
          ))}
        </ul>
      </div>

      {/* Application Box */}
      <div className="bg-neutral-50 border border-neutral-200 p-8 rounded-xl shadow-sm">

        <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">
          Submit Your Application
        </h2>

        {/* LinkedIn Apply */}
        <div className="flex flex-col justify-center items-center gap-3 mb-8">
          <button
            onClick={() =>
              window.open(jobInfo.linkedinUrl || "https://www.linkedin.com/company/maritimesolutionsltd/jobs/", "_blank")
            }
            className="w-52 h-11 bg-blue-600 hover:bg-blue-700 transition rounded-xl text-white flex items-center gap-3 justify-center shadow-sm"
          >
            <FaLinkedin /> Apply with LinkedIn
          </button>

          <p className="text-gray-500 font-medium">OR</p>

          {/* Resume Upload */}
          <label className="rounded-md relative flex justify-center items-center gap-3 p-4 cursor-pointer border border-dashed border-purple-400 hover:bg-purple-50 bg-white w-64 text-purple-700 font-medium transition">
            <FaUpload /> Upload Resume
            <input
              name="resume"
              type="file"
              onChange={handleChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </label>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="flex flex-col">
            <label className="font-medium mb-1">Name<span className="text-red-500"> *</span></label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded-md p-2 outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium mb-1">Email<span className="text-red-500"> *</span></label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded-md p-2 outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium mb-1">Phone<span className="text-red-500"> *</span></label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border rounded-md p-2 outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium mb-1">Degree<span className="text-red-500"> *</span></label>
            <select
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              className="border rounded-md p-2 outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option>BE</option>
              <option>BTech</option>
              <option>Navy</option>
            </select>
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="font-medium mb-1">Address<span className="text-red-500"> *</span></label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border rounded-md p-2 h-24 outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="font-medium mb-1">Portfolio Link<span className="text-red-500"> *</span></label>
            <input
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
              className="border rounded-md p-2 outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-yellow-200  hover:bg-purple-700 text-yellow-900 border border-yellow-950 font-medium rounded-lg py-2 px-6 md:col-span-2 mx-auto mt-4 shadow-sm transition"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default Job;
