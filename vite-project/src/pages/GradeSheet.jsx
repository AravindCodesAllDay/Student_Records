import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";

export default function GradeSheet() {
  const [regNo, setRegisterNo] = useState("");
  const [studentDetails, setStudentDetails] = useState([]);
  const [semester, setSemester] = useState();
  const [semesterDetails, setSemesterDetails] = useState([]);
  const [subjectDetails, setSubjectDetails] = useState([]);
  const [postImage, setPostImage] = useState({ myFile: "" });
  const [grades, setGrades] = useState({});
  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState(false); // State to manage loading

  const handleInputChange = (e, subjectCode) => {
    const { value } = e.target;
    setGrades((prevGrades) => ({
      ...prevGrades,
      [subjectCode]: value,
    }));
  };

  const fetchStudentDetails = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API}/student/getStudent/${regNo}`
    );
    const data = await res.json();
    if (!res.ok) {
      toast.info(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "light",
      });
    }

    setStudentDetails(data.student);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const form = new FormData();
    form.append("batch", JSON.stringify(studentDetails.batch));
    form.append("subjectDetails", JSON.stringify(subjectDetails));
    form.append("semester", JSON.stringify(semester));
    form.append("grades", JSON.stringify(grades)); // Convert grades object to JSON string
    form.append("image", JSON.stringify(postImage));

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/student/updateSemMarks/${regNo}`,
        {
          method: "POST",
          body: form,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const result = await response.json();
      toast.success("Data submitted successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "light",
      });

      setRegisterNo("");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to submit data", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "light",
      });
    }

    setLoading(false); // Stop loading
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
    console.log(base64);
    setPostImage({ ...postImage, myFile: base64 });
  };

  useEffect(() => {
    const fetchSemesterDetails = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API}/staff/${studentDetails.batch}`
      );
      const data = await res.json();

      const filledSemester = studentDetails.semesterDetails.map((item) =>
        JSON.parse(item.semester)
      );

      const filteredSemesterDetails =
        data.batchDetails[0].semesterDetails.filter(
          (item) => !filledSemester.includes(item.semester)
        );
      setSemesterDetails(filteredSemesterDetails);
    };

    fetchSemesterDetails();

    if (semester) {
      const semIndex = semesterDetails.findIndex(
        (sem) => sem.semester === semester
      );
      setSubjectDetails(semesterDetails[semIndex]?.subjects || []);
    }
  }, [studentDetails, semester]);

  return (
    <>
      <div className="container mx-auto mt-10 p-6 max-w-xl bg-white shadow-lg rounded-lg">
        <ToastContainer />
        <input
          type="text"
          value={regNo}
          onChange={(e) => setRegisterNo(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-lg"
        />
        <br />
        <button
          onClick={fetchStudentDetails}
          className="block w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mb-4"
        >
          Fetch
        </button>
        <br />
        {studentDetails && (
          <>
            <label
              htmlFor="studentName"
              className="block text-gray-700 font-medium"
            >
              Student Name:{" "}
            </label>
            <p className="block w-full p-2 border border-gray-300 rounded-lg bg-gray-100">
              {studentDetails.name}
            </p>
            &nbsp;
            <label
              htmlFor="studentRollNo"
              className="block text-gray-700 font-medium"
            >
              Roll No:{" "}
            </label>
            <p className="block w-full p-2 border border-gray-300 rounded-lg bg-gray-100">
              {studentDetails.rollNo}
            </p>
            &nbsp;
            <label
              htmlFor="studentBatch"
              className="block text-gray-700 font-medium"
            >
              Batch:{" "}
            </label>
            <p className="block w-full p-2 border border-gray-300 rounded-lg bg-gray-100">
              {studentDetails.batch}
            </p>
            &nbsp;
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select Semester</option>
              {semesterDetails.map((sem) => (
                <option key={sem.semester} value={sem.semester}>
                  {sem.semester}
                </option>
              ))}
            </select>
            <br />
          </>
        )}
        {semester && (
          <>
            <form onSubmit={handleSubmit}>
              {subjectDetails.map((subject) => (
                <div key={subject.subjectCode}>
                  <label
                    htmlFor={subject.subjectName}
                    className="block text-gray-700 font-medium"
                  >
                    {subject.subjectCode + " - " + subject.subjectName}{" "}
                  </label>
                  <br />
                  <input
                    type="text"
                    id={subject.subjectName}
                    name={subject.subjectName}
                    value={grades[subject.subjectCode] || ""}
                    onChange={(e) => handleInputChange(e, subject.subjectCode)}
                    className="block w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                  <br />
                </div>
              ))}
              <label htmlFor="markSheet10" className="text-xl">
                Attach your semester {semester} Marksheet:
              </label>
              <input
                type="file"
                name="semesterMarksheet"
                className="block w-full text-center rounded-xl outline-none mt-1"
                onChange={handleFileUpload}
                required
              />
              <br />
              <button
                type="submit"
                className="block w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                disabled={loading} // Disable the button while loading
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" /> // Add CircularProgress
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
}
