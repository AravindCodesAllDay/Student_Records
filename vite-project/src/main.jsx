import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";
import "./index.css";
import Home from "./Components/Home";
import Student from "./pages/Student";
import Sympo from "./Components/Sympo";
import StudentDetails from "./pages/StudentDetails";
import AddSemester from "./pages/AddSemester";
import GradeSheet from "./pages/GradeSheet";

const router = createHashRouter([
  { path: "/", element: <Home /> },
  { path: "Student", element: <Student /> },
  { path: "Drop", element: <GradeSheet /> },
  { path: "addSem", element: <AddSemester /> },
  { path: "details", element: <StudentDetails /> },
  { path: "Sympo", element: <Sympo /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
