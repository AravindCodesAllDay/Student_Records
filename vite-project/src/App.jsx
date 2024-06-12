import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Student from "./pages/Student";
import Drop from "./Components/Drop";
import Sympo from "./Components/Sympo";
// import Test from "./Components/Test";
import StudentDetails from "./pages/StudentDetails";
import AddSemester from "./pages/AddSemester";
import GradeSheet from "./pages/GradeSheet";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Student" element={<Student />} />
          <Route path="Drop" element={<GradeSheet />} />
          <Route path="addSem" element={<AddSemester />} />
          <Route path="details" element={<StudentDetails />} />

          <Route path="Sympo" element={<Sympo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
