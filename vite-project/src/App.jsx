import React from "react";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
