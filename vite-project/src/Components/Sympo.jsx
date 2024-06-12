import React from "react";
import { useNavigate } from "react-router-dom";

const Sympo = () => {
  const navigate = useNavigate();

  const home = () => {
    navigate("/");
  };
  return (
    <>
      <div className="mt-[150px] ml-[480px] max-sm:max-w-[320px] max-sm:mx-auto">
        {/* Heading */}
        <h1 className="font-jomolhari font-semibold text-4xl max-sm:text-lg max-sm:ml-4">
          Other College Symposium Details
        </h1>

        <form action="" onSubmit={home}>
          {/* Form Container */}
          <div className="flex flex-col max-sm:flex-row gap-3 ml-[130px] py-8 max-sm:ml-0">
            {/* Label */}
            <label htmlFor="markSheet10" className="text-lg">
              <h2 className="text-lg max-sm:text-sm font-bold text-black/75">
                Insert Your Sympo Certificate:
              </h2>
            </label>

            {/* File Input */}
            <input
              type="file"
              id="markSheet10"
              className="text-center rounded-xl outline-none mt-1 sm:ml-4"
            />
          </div>
          {/* Form Container */}
          <div className="flex flex-col max-sm:flex-row gap-3 ml-[130px]  max-sm:ml-0">
            {/* Label */}
            <label htmlFor="markSheet10" className="text-lg">
              <h2 className="text-lg max-sm:text-sm font-bold text-black/75">
                Review Your Sympo:
              </h2>
            </label>

            {/* File Input */}
            <input
              type="tel"
              id="detail"
              placeholder="Enter your review"
              className="text-center rounded-xl  outline-none mt-1 w-[250px]  max-sm:ml-4"
            />
          </div>
          <button className="py-1 border-black hover:border-white border-2 mt-4 ml-[195px] max-sm:ml-[105px] duration-300 hover:duration-500 text-xl flex items-center gap-2 bg-blue2 hover:bg-black/75 text-white hover:text-white px-2 rounded-2xl">
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default Sympo;
