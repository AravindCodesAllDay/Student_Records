import React from "react";
import { PiHandTap } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const Student = () => {
    navigate("/Student");
  };
  return (
    <>
      <div className="bg-blue1 h-screen flex justify-center items-center  ">
        <div className="font-jomolhari max-sm:max-w-[300px] mx-auto">
          <h1 className=" text-2xl max-sm:text-[21px] ">
            Welcome to CSBS Department
          </h1>
          <button
            onClick={Student}
            className="py-2 mt-4 ml-[115px] max-sm:ml-[105px] duration-300 hover:duration-500 text-xl flex items-center gap-2 bg-blue2 hover:bg-black text-white hover:text-white px-2 rounded-2xl  "
          >
            Click
            <PiHandTap />
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
