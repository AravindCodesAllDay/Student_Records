import React from "react";
import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Sympo from "../Components/Sympo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

const Student = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [postImage, setPostImage] = useState({ myFile: "" });
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    regNo: "",
    batch: "",
    mail: "",
    age: "",
    dob: "",
    gender: "",
    phoneNo: "",
    fatherName: "",
    fatherOccupation: "",
    fatherPhone: "",
    motherName: "",
    motherOccupation: "",
    motherPhone: "",
    address: "",
    emisNo: "",
    aadhaarNo: "",
    tenthPercentage: "",
    twelthPercentage: "",
    professionalphoto: postImage.myFile,
    polytechnicPercentage: "",
    quota: "",
    semesterMarksheets: [],
  });
  console.log(postImage.myFile);
  const [files, setFiles] = useState({
    tenthMarksheet: null,
    twelthMarksheet: null,
    polytechnicMarksheet: null,
  });

  const [batches, setBatches] = useState([]);

  useEffect(() => {
    const fetchBatchDetails = async () => {
      const res = await fetch(`http://localhost:3000/staff/getBatch`);
      const data = await res.json();
      const durations = data.map((item) => item.duration);
      setBatches([...batches, ...durations]);
    };
    fetchBatchDetails();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    for (const key in formData) {
      if (key !== "professionalphoto") {
        form.append(key, formData[key]);
      } else {
        form.append("professionalphoto", JSON.stringify(postImage.myFile));
      }
    }
    for (const key in files) {
      if (files[key]) {
        form.append(key, files[key]);
      }
    }

    for (const [key, value] of form.entries()) {
      console.log(key, value);
    }

    try {
      const result = await axios.post("http://localhost:3000/student", form);
      const data = result.data;

      if (result.status === 201) {
        toast.success(data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "light",
        });

        window.open("/drop");
      } else {
        toast.warning(data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error("Internal Server error...!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "light",
      });
      console.error("Error uploading student data and files:", error);
    } finally {
      setLoading(false);
    }
  };

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    // console.log(base64);
    setPostImage({ ...postImage, myFile: base64 });
  };

  return (
    <>
      <ToastContainer />

      {loading && (
        <>
          <div className="flex justify-center">
            <CircularProgress />
          </div>
        </>
      )}

      {!loading && (
        <>
          <div className=" p-5 flex justify-center items-center font-popins">
            <div className="max-w-lg w-full   max-sm:max-w-[320px] max-sm:mx-auto ">
              <h1 className="font-popins text-3xl text-center border-2">
                Student Form
              </h1>
              <form onSubmit={handleSubmit} className="py-8 border-2  px-2">
                <div className="flex flex-col gap-8">
                  <div className="flex justify-between">
                    <label htmlFor="username" className="text-xl">
                      Name:
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      onChange={handleInputChange}
                      className="text-center rounded-md outline-none mt-1 h-8"
                      required
                    />
                  </div>
                  <div className="flex justify-between">
                    <label htmlFor="professionalphoto" className="text-xl">
                      Professional photo(upto 3mb):
                    </label>
                    <input
                      type="file"
                      name="professionalphoto"
                      className="text-center rounded-md ml-40 outline-none mt-1 h-8"
                      onChange={handleFileUpload}
                      required
                    />
                  </div>
                  <div className="flex justify-between">
                    <label htmlFor="rollNo" className="text-xl">
                      Roll no:
                    </label>
                    <input
                      type="text"
                      name="rollNo"
                      placeholder="Roll no"
                      onChange={handleInputChange}
                      className="text-center rounded-md outline-none mt-1 h-8"
                      required
                    />
                  </div>
                  <div className="flex justify-between">
                    <label htmlFor="registerNo" className="text-xl">
                      Register no:
                    </label>
                    <input
                      type="number"
                      name="regNo"
                      placeholder="Register no"
                      onChange={handleInputChange}
                      className="text-center rounded-md outline-none mt-1 h-8"
                      required
                    />
                  </div>
                  <div className="flex justify-between">
                    <label htmlFor="email" className="text-xl">
                      Email ID:
                    </label>
                    <input
                      type="email"
                      name="mail"
                      placeholder="Email ID"
                      onChange={handleInputChange}
                      className="text-center rounded-md outline-none mt-1 h-8"
                      required
                    />
                  </div>
                  <div className="flex justify-between">
                    <label htmlFor="age" className="text-xl">
                      Age:
                    </label>
                    <input
                      type="number"
                      name="age"
                      placeholder="Age"
                      onChange={handleInputChange}
                      className="text-center rounded-md outline-none mt-1 h-8"
                      required
                    />
                  </div>
                  <div className="flex justify-between">
                    <label htmlFor="age" className="text-xl">
                      Batch:
                    </label>
                    <select
                      name="batch"
                      className="w-48"
                      onChange={handleInputChange}
                    >
                      <option value="">Select the batch</option>
                      {batches.map((batch) => (
                        <option value={batch}>{batch}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex justify-between">
                    <label htmlFor="dob" className="text-xl">
                      Date of birth:
                    </label>
                    <input
                      type="date"
                      name="dob"
                      onChange={handleInputChange}
                      className="text-center rounded-md outline-none mt-1 h-8 w-48"
                      required
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-xl">Gender:</label>
                    <div className="flex justify-around">
                      <label className="text-xl">
                        <input
                          type="radio"
                          name="gender"
                          value="Male"
                          onChange={handleInputChange}
                          className="mr-2"
                          required
                        />
                        Male
                      </label>
                      <label className="text-xl">
                        <input
                          type="radio"
                          name="gender"
                          value="Female"
                          onChange={handleInputChange}
                          className="mr-2"
                          required
                        />
                        Female
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <label htmlFor="studentPhone" className="text-xl">
                      Student Phone no:
                    </label>
                    <input
                      type="number"
                      name="phoneNo"
                      placeholder="Student phone no"
                      onChange={handleInputChange}
                      className="text-center rounded-md outline-none mt-1 h-8"
                      required
                    />
                  </div>
                  <div className="flex justify-between">
                    <label htmlFor="fatherName" className="text-xl">
                      Father Name:
                    </label>
                    <input
                      type="text"
                      name="fatherName"
                      placeholder="Father Name"
                      onChange={handleInputChange}
                      className="text-center rounded-md outline-none mt-1 h-8"
                      required
                    />
                  </div>
                  <div className="flex justify-between">
                    <label htmlFor="fatherOccupation" className="text-xl">
                      Father Occupation:
                    </label>
                    <input
                      type="text"
                      name="fatherOccupation"
                      placeholder="Father Occupation"
                      onChange={handleInputChange}
                      className="text-center rounded-md outline-none mt-1 h-8"
                      required
                    />
                  </div>
                  <div className="flex justify-between">
                    <label htmlFor="fatherPhone" className="text-xl">
                      Father phone no:
                    </label>
                    <input
                      type="tel"
                      name="fatherPhone"
                      placeholder="Father phone no"
                      onChange={handleInputChange}
                      className="text-center rounded-md outline-none mt-1 h-8"
                      required
                    />
                  </div>
                  <div className="flex justify-between">
                    <label htmlFor="motherName" className="text-xl">
                      Mother Name:
                    </label>
                    <input
                      type="text"
                      name="motherName"
                      placeholder="Mother Name"
                      className="text-center rounded-md outline-none mt-1 h-8"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="flex justify-between">
                    <label htmlFor="motherOccupation" className="text-xl">
                      Mother Occupation:
                    </label>
                    <input
                      type="text"
                      name="motherOccupation"
                      placeholder="Mother Occupation"
                      className="text-center rounded-md outline-none mt-1 h-8"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="flex justify-between">
                    <label htmlFor="motherPhone" className="text-xl">
                      Mother phone no:
                    </label>
                    <input
                      type="tel"
                      name="motherPhone"
                      placeholder="Mother phone no"
                      onChange={handleInputChange}
                      className="text-center rounded-md outline-none mt-1 h-8"
                      required
                    />
                  </div>
                  <div className="flex justify-between">
                    <label htmlFor="address" className="text-xl">
                      Address:
                    </label>
                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      onChange={handleInputChange}
                      className="text-center rounded-md outline-none mt-1 h-8"
                      required
                    />
                  </div>
                  <div className="flex justify-between">
                    <label htmlFor="emisNo" className="text-xl">
                      Emis number:
                    </label>
                    <input
                      type="number"
                      name="emisNo"
                      placeholder="Emis number"
                      onChange={handleInputChange}
                      className="text-center rounded-md outline-none mt-1 h-8"
                      required
                    />
                  </div>
                  <div className="flex justify-between">
                    <label htmlFor="aadhaarnumber" className="text-xl">
                      Aadhar Number:
                    </label>
                    <input
                      type="number"
                      name="aadhaarNo"
                      placeholder="Aadhar Number"
                      onChange={handleInputChange}
                      className="text-center rounded-md outline-none mt-1 h-8"
                      required
                    />
                  </div>
                  <div className="flex justify-between">
                    <label htmlFor="mark10" className="text-xl">
                      Enter your 10th mark and percentage:
                    </label>
                    <input
                      type="number"
                      name="tenthPercentage"
                      placeholder="10th Mark"
                      className="text-center rounded-md outline-none mt-1 h-8"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="flex justify-between">
                    <label htmlFor="markSheet10" className="text-xl">
                      Your 10th mark Sheet:
                    </label>
                    <input
                      type="file"
                      name="tenthMarksheet"
                      className="text-center rounded-md ml-40 outline-none mt-1 h-8"
                      onChange={handleFileChange}
                      required
                    />
                  </div>
                  <div className="flex justify-between">
                    <label htmlFor="mark12" className="text-xl">
                      Enter your 12th mark and percentage:
                    </label>
                    <input
                      type="number"
                      name="twelthPercentage"
                      placeholder="12th Mark"
                      onChange={handleInputChange}
                      className="text-center rounded-md outline-none mt-1 h-8"
                    />
                  </div>
                  <div className="flex justify-between">
                    <label htmlFor="markSheet12" className="text-xl">
                      Your 12th mark Sheet:
                    </label>
                    <input
                      type="file"
                      name="twelthMarksheet"
                      onChange={handleFileChange}
                      className="text-center rounded-md ml-36  outline-none mt-1"
                    />
                  </div>
                  <div className="flex justify-between">
                    <label htmlFor="mark12" className="text-xl">
                      Enter your polytechnic mark and percentage:
                    </label>
                    <input
                      type="number"
                      name="polytechnicPercentage"
                      placeholder="12th Mark"
                      onChange={handleInputChange}
                      className="text-center rounded-md outline-none mt-1 h-8"
                    />
                  </div>
                  <div className="flex justify-between">
                    <label htmlFor="markSheet12" className="text-xl">
                      Your polytechnic mark Sheet:
                    </label>
                    <input
                      type="file"
                      name="polytechnicMarksheet"
                      onChange={handleFileChange}
                      className="text-center rounded-md ml-40  outline-none mt-1"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xl">Quota:</label>
                    <div className="flex justify-around">
                      <label className="text-xl">
                        <input
                          type="radio"
                          name="quota"
                          value="Government"
                          onChange={handleInputChange}
                          className="mr-2"
                          required
                        />
                        Government Quota
                      </label>
                      <label className="text-xl">
                        <input
                          type="radio"
                          name="quota"
                          value="Management"
                          onChange={handleInputChange}
                          className="mr-2"
                          required
                        />
                        Management Quota
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="py-2 mt-8 flex items-center justify-center gap-2 bg-blue2 hover:bg-black text-white px-6 rounded-2xl duration-300 hover:duration-500"
                  >
                    Click
                    <FaArrowRight />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Student;
