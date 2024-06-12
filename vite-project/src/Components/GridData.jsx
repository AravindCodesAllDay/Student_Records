import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { DataGrid } from "@mui/x-data-grid";
import Modal from "@mui/material/Modal";
import axios from "axios";

export default function GridData({ selectedBatch }) {
  const [studentsData, setStudentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState({});
  const [openFamilyModal, setOpenFamilyModal] = useState({});
  const [openSemModal, setOpenSemModal] = useState({});

  const [loadingPdf, setLoadingPdf] = useState(false);

  const handleOpen = (rowId) => {
    setOpenModal({ ...openModal, [rowId]: true });
  };

  const handleClose = (rowId) => {
    setOpenModal({ ...openModal, [rowId]: false });
  };
  const handleOpenFamily = (rowId) => {
    setOpenFamilyModal({ ...openModal, [rowId]: true });
  };

  const handleCloseFamily = (rowId) => {
    setOpenFamilyModal({ ...openModal, [rowId]: false });
  };

  const handleOpenSem = (rowId) => {
    setOpenSemModal({ ...openModal, [rowId]: true });
  };

  const handleCloseSem = (rowId) => {
    setOpenSemModal({ ...openModal, [rowId]: false });
  };

  const style = {
    position: "absolute",
    padding: "10px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#fff",
    boxShadow: 24,
    borderRadius: "8px",
    overflow: "hidden",
  };

  const columns = [
    { field: "id", headerAlign: "center", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Student Name",
      headerAlign: "center",
      width: 150,
      editable: false,
    },
    {
      field: "rollNo",
      headerAlign: "center",
      headerName: "Roll No",
      width: 100,
      editable: false,
    },
    {
      field: "regNo",
      headerAlign: "center",
      headerName: "Register No.",
      width: 250,
      editable: false,
    },
    {
      field: "phoneNo",
      headerAlign: "center",
      headerName: "Mobile No.",
      width: 100,
      editable: false,
    },
    {
      field: "address",
      headerAlign: "center",
      headerName: "Address",
      width: 100,
      editable: false,
    },
    {
      field: "cgpa",
      headerAlign: "center",
      headerName: "Overall CGPA",
      width: 100,
      editable: false,
      renderCell: (params) => {
        const rowId = params.row.id;
        const [cgpa, setCgpa] = useState(null);

        useEffect(() => {
          const fetchStudentDetails = async () => {
            const filtered = studentsData.filter((student) =>
              student.id.includes(rowId)
            );
            const semesterDetails = filtered[0].semesterDetails;

            // Calculate CGPA
            let totalCredits = 0;
            let totalGradepoints = 0;
            console.log(semesterDetails);
            semesterDetails.forEach((semester) => {
              totalCredits += semester.totalCredits;
              totalGradepoints += semester.totalGradePoints;
            });

            const result = totalGradepoints / totalCredits;
            console.log(result);
            setCgpa(result);
          };

          fetchStudentDetails();
        }, [rowId, studentsData]);

        return <>{cgpa}</>;
      },
    },
    {
      field: "preUniversity",
      headerAlign: "center",
      headerName: "Pre University Details",
      width: 100,
      editable: false,
      renderCell: (params) => {
        const rowId = params.row.id;
        const [preUniversityDetails, setPreuniversityDetails] = useState([]);
        useEffect(() => {
          const fetchPreuniversityDetails = async () => {
            const filtered = studentsData.filter((student) =>
              student.id.includes(rowId)
            );
            setPreuniversityDetails({
              tenthPercentage: filtered[0].tenthPercentage,
              tenthMarksheet: filtered[0].tenthMarksheet,
              twelthPercentage: filtered[0].twelthPercentage,
              twelthMarksheet: filtered[0].twelthMarksheet,
              polytechnicPercentage: filtered[0].polytechnicPercentage,
              polytechnicMarksheet: filtered[0].polytechnicMarksheet,
            });
          };
          fetchPreuniversityDetails();
        }, []);

        const handleViewPdf = async (studentId, type) => {
          setLoadingPdf(true);
          const response = await axios.get(
            `http://localhost:3000/student/pdf/${studentId}/${type}`,
            {
              responseType: "blob",
            }
          );
          const file = new Blob([response.data], {
            type: response.headers["content-type"],
          });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL);
          setLoadingPdf(false);
        };

        return (
          <div>
            <button size="large" onClick={() => handleOpen(rowId)}>
              View
            </button>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={openModal[rowId] || false}
              onClose={() => handleClose(rowId)}
            >
              <Box sx={style}>
                {!preUniversityDetails ? (
                  <>Details not found...!!</>
                ) : (
                  <>
                    <label htmlFor="tenthPercentage">
                      Percentage obtained in 10th:{" "}
                    </label>
                    <p>{preUniversityDetails.tenthPercentage} %</p>
                    <br />
                    <label htmlFor="tenthMarksheet">10th Marksheet:</label>
                    <button onClick={() => handleViewPdf(rowId, "tenth")}>
                      {loadingPdf ? "Loading..." : "View"}
                    </button>
                    <br />
                    {preUniversityDetails.twelthMarksheet && (
                      <>
                        <label htmlFor="twelthPercentage">
                          Percentage obtained in 12th:{" "}
                        </label>
                        <p>{preUniversityDetails.twelthPercentage} %</p>
                        <br />
                        <label htmlFor="twelthMarksheet">12th Marksheet:</label>
                        <button onClick={() => handleViewPdf(rowId, "twelth")}>
                          {loadingPdf ? "Loading..." : "View"}
                        </button>
                        <br />
                      </>
                    )}
                    {preUniversityDetails.polytechnicMarksheet && (
                      <>
                        <label htmlFor="polytechnicPercentage">
                          Percentage obtained in Polytechnic:{" "}
                        </label>
                        <p>{preUniversityDetails.polytechnicPercentage} %</p>
                        <br />
                        <label htmlFor="polytechnicMarksheet">
                          Polytechnic Marksheet:
                        </label>
                        <button
                          onClick={() => handleViewPdf(rowId, "polytechnic")}
                        >
                          {loadingPdf ? "Loading..." : "View"}
                        </button>
                        <br />
                      </>
                    )}
                  </>
                )}
              </Box>
            </Modal>
          </div>
        );
      },
    },
    {
      field: "family",
      headerAlign: "center",
      headerName: "Family Details",
      width: 100,
      editable: false,
      renderCell: (params) => {
        const rowId = params.row.id;
        const [familyDetails, setFamilyDetails] = useState([]);
        useEffect(() => {
          const fetchFamilyDetails = async () => {
            const filtered = studentsData.filter((student) =>
              student.id.includes(rowId)
            );
            setFamilyDetails({
              fatherName: filtered[0].fatherName,
              fatherPhone: filtered[0].fatherPhone,
              motherName: filtered[0].motherName,
              motherPhone: filtered[0].motherPhone,
            });
          };
          fetchFamilyDetails();
        }, []);

        return (
          <div>
            <button size="large" onClick={() => handleOpenFamily(rowId)}>
              View
            </button>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={openFamilyModal[rowId] || false}
              onClose={() => handleCloseFamily(rowId)}
            >
              <Box sx={style}>
                {!familyDetails ? (
                  <>Details not found...!!</>
                ) : (
                  <>
                    <label htmlFor="fatherName">Father Name: </label>
                    <p>{familyDetails.fatherName}</p>
                    <br />
                    <label htmlFor="fatherPhone">Father Mobile No: </label>
                    <p>{familyDetails.fatherPhone}</p>
                    <br />
                    <label htmlFor="motherName">Mother Name: </label>
                    <p>{familyDetails.motherName}</p>
                    <br />
                    <label htmlFor="motherPhone">Mother Mobile No: </label>
                    <p>{familyDetails.motherPhone}</p>
                    <br />
                  </>
                )}
              </Box>
            </Modal>
          </div>
        );
      },
    },
    {
      field: "semesterDetails",
      headerAlign: "center",
      headerName: "Semester Details",
      width: 100,
      editable: false,
      renderCell: (params) => {
        const rowId = params.row.id;
        const [semester, setSemester] = useState("");
        const [allSemDetails, setAllSemDetails] = useState([]);
        const [imageData, setImageData] = useState(false);
        const [semDetails, setSemDetails] = useState([]);
        const [index, setIndex] = useState();
        useEffect(() => {
          const fetchSemDetails = async () => {
            const filtered = studentsData.filter((student) =>
              student.id.includes(rowId)
            );
            setAllSemDetails(filtered[0].semesterDetails);
          };
          fetchSemDetails();
        }, []);

        const filledSemester = allSemDetails.map((item) => item.semester);
        useEffect(() => {
          const semIndex = allSemDetails.findIndex(
            (sem) => sem.semester === semester
          );
          setIndex(semIndex);
          setSemDetails(allSemDetails[semIndex]);
        }, [semester]);

        const handleViewPdf = () => {
          setImageData(true);
        };

        return (
          <div>
            <button size="large" onClick={() => handleOpenSem(rowId)}>
              View
            </button>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={openSemModal[rowId] || false}
              onClose={() => handleCloseSem(rowId)}
            >
              <Box sx={style}>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                >
                  <option value="">Select Semester</option>
                  {filledSemester.map((sem, index) => (
                    <option key={index}>{sem}</option>
                  ))}
                </select>
                {semDetails && semester && (
                  <>
                    <label htmlFor="subList">Subject List:</label>
                    {Object.entries(semDetails.grades).map(
                      ([subjectCode, grade]) => (
                        <p key={subjectCode}>
                          {subjectCode}: {grade}
                        </p>
                      )
                    )}
                    <label htmlFor="gpa">
                      GPA for selected semester {semester}:
                    </label>
                    <p>
                      {semDetails.totalGradePoints / semDetails.totalCredits}
                    </p>
                    <label htmlFor="polytechnicMarksheet">Marksheet:</label>
                    <button onClick={() => handleViewPdf(rowId)}>
                      {loadingPdf ? "Loading..." : "View"}
                    </button>
                    {imageData && <img src={semDetails.image} alt="Uploaded" />}
                  </>
                )}
              </Box>
            </Modal>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    const fetchRows = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const [studentsRes] = await Promise.all([
          fetch(`http://localhost:3000/student/${selectedBatch}`),
        ]);

        const [studentsData] = await Promise.all([studentsRes.json()]);

        setStudentsData(
          studentsData.map((element) => ({
            id: element._id,
            name: element.name,
            rollNo: element.rollNo,
            regNo: element.regNo,
            phoneNo: element.phoneNo,
            address: element.address,
            age: element.age,
            tenthPercentage: element.tenthPercentage,
            tenthMarksheet: element.tenthMarksheet,
            twelthPercentage: element.twelthPercentage,
            twelthMarksheet: element.twelthMarksheet,
            polytechnicPercentage: element.polytechnicPercentage,
            polytechnicMarksheet: element.polytechnicMarksheet,
            fatherName: element.fatherName,
            fatherPhone: element.fatherPhone,
            motherName: element.motherName,
            motherPhone: element.motherPhone,
            semesterDetails: element.semesterDetails,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false); // Set loading to false after data is fetched
    };

    fetchRows();
  }, [selectedBatch]);

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <DataGrid
          rows={studentsData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 11,
              },
            },
          }}
          pageSizeOptions={[11]}
          sx={{
            boxShadow: 10,
            "& .MuiDataGrid-cell": {
              justifyContent: "center",
              backgroundColor: "white",
            },
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "#40773b",
              color: "white",
            },
          }}
          disableSelectionOnClick
        />
      )}
    </Box>
  );
}
