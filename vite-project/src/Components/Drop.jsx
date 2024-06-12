import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Drop = () => {
  const navigate = useNavigate();
  const Sympo = () => {
    navigate("/Sympo");
  };
  const [sem1, setSem1] = useState();
  const [sem2, setSem2] = useState();
  const [sem3, setSem3] = useState();
  const [sem4, setSem4] = useState();
  const [sem5, setSem5] = useState();
  const [sem6, setSem6] = useState();
  const [sem7, setSem7] = useState();
  const [sem8, setSem8] = useState();

  const handleSelectChange = (e) => {
    setSem1(e.target.value);
    setSem2(e.target.value);
    setSem3(e.target.value);
    setSem4(e.target.value);
    setSem5(e.target.value);
    setSem6(e.target.value);
    setSem7(e.target.value);
    setSem8(e.target.value);
  };

  const Datasem1 = [
    { sub: "01 Title of the subject" },
    { sub: "02 Title of the subject" },
    { sub: "03 Title of the subject" },
    { sub: "04 Title of the subject" },
    { sub: "05 Title of the subject" },
    { sub: "06 Title of the subject" },
  ];

  return (
    <>
      <div className="mt-[150px] ml-[600px] max-sm:max-w-[320px] max-sm:mx-auto">
        <h1 className="font-jomolhari font-semibold text-4xl max-sm:text-3xl max-sm:ml-4">
          Semester and Subjects
        </h1>
        <select
          name="semesters"
          className="outline-none p-2 px-4 rounded-2xl mt-4 ml-20 "
          onChange={handleSelectChange}
        >
          <option value="">Select a semester</option>
          <option value="Semester 01">Semester 01</option>
          <option value="Semester 02">Semester 02</option>
          <option value="Semester 03">Semester 03</option>
          <option value="Semester 04">Semester 04</option>
          <option value="Semester 05">Semester 05</option>
          <option value="Semester 06">Semester 06</option>
          <option value="Semester 07">Semester 07</option>
          <option value="Semester 08">Semester 08</option>
        </select>

        {sem1 === "Semester 01" && (
          <div className=" mt-4 bg-slate-400 w-[360px] p-4 ml-[-10px] max-sm:ml-[-18px]">
            <div className="mt-4 text-center">
              <h2 className="font-semibold text-2xl">Semester 01 Subjects</h2>

              {Datasem1.map((item) => (
                <div
                  key={item}
                  className="text-center py-3 flex items-center ml-[-40px]"
                >
                  <div>
                    <h1 className="w-[250px] text-lg">{item.sub}</h1>
                  </div>
                  <div>
                    <select
                      name=""
                      id=""
                      className="outline-none text-center rounded-3xl"
                    >
                      <option value="">Select a Grade</option>
                      <option value="">O</option>
                      <option value="">A++</option>
                      <option value="">A</option>
                      <option value="">B++</option>
                      <option value="">B</option>
                      <option value="">C</option>
                      <option value="">PASS</option>
                      <option value="">FAIL</option>
                      <option value="">RA</option>
                      <option value="">U</option>
                      <option value="">SA</option>
                      <option value="">W</option>
                    </select>
                  </div>
                </div>
              ))}
              <button className="py-2 border-black hover:border-white border-2 mt-4 ml-[115px] max-sm:ml-[105px] duration-300 hover:duration-500 text-xl flex items-center gap-2 bg-blue2 hover:bg-black/75 text-white hover:text-white px-2 rounded-2xl">
                Update
              </button>
            </div>
          </div>
        )}
        {sem2 === "Semester 02" && (
          <div className=" mt-4 bg-lime-400 w-[360px] p-4 max-sm:ml-[-18px] ml-[-10px] ">
            <div className="mt-4 text-center">
              <h2 className="font-semibold text-2xl">Semester 02 Subjects</h2>

              {Datasem1.map((item) => (
                <div
                  key={item}
                  className="text-center py-3 flex items-center ml-[-40px]"
                >
                  <div>
                    <h1 className="w-[250px] text-lg">{item.sub}</h1>
                  </div>
                  <div>
                    <select
                      name=""
                      id=""
                      className="outline-none text-center rounded-3xl"
                    >
                      <option value="">Select a Grade</option>
                      <option value="">O</option>
                      <option value="">A++</option>
                      <option value="">A</option>
                      <option value="">B++</option>
                      <option value="">B</option>
                      <option value="">C</option>
                      <option value="">PASS</option>
                      <option value="">FAIL</option>
                      <option value="">RA</option>
                      <option value="">U</option>
                      <option value="">SA</option>
                      <option value="">W</option>
                    </select>
                  </div>
                </div>
              ))}
              <button className="py-2 border-black hover:border-white border-2 mt-4 ml-[115px] max-sm:ml-[105px] duration-300 hover:duration-500 text-xl flex items-center gap-2 bg-blue2 hover:bg-black/75 text-white hover:text-white px-2 rounded-2xl">
                Update
              </button>
            </div>
          </div>
        )}
        {sem3 === "Semester 03" && (
          <div className=" mt-4 bg-red-400 w-[360px] p-4 max-sm:ml-[-18px] ml-[-10px] ">
            <div className="mt-4 text-center">
              <h2 className="font-semibold text-2xl">Semester 03 Subjects</h2>

              {Datasem1.map((item) => (
                <div
                  key={item}
                  className="text-center py-3 flex items-center ml-[-40px]"
                >
                  <div>
                    <h1 className="w-[250px] text-lg">{item.sub}</h1>
                  </div>
                  <div>
                    <select
                      name=""
                      id=""
                      className="outline-none text-center rounded-3xl"
                    >
                      <option value="">Select a Grade</option>
                      <option value="">O</option>
                      <option value="">A++</option>
                      <option value="">A</option>
                      <option value="">B</option>
                      <option value="">B++</option>
                      <option value="">C</option>
                      <option value="">PASS</option>
                      <option value="">FAIL</option>
                      <option value="">RA</option>
                      <option value="">U</option>
                      <option value="">SA</option>
                      <option value="">W</option>
                    </select>
                  </div>
                </div>
              ))}
              <button className="py-2 border-black hover:border-white border-2 mt-4 ml-[115px] max-sm:ml-[105px] duration-300 hover:duration-500 text-xl flex items-center gap-2 bg-blue2 hover:bg-black/75 text-white hover:text-white px-2 rounded-2xl">
                Update
              </button>
            </div>
          </div>
        )}
        {sem4 === "Semester 04" && (
          <div className=" mt-4 bg-yellow-400 w-[360px] p-4 max-sm:ml-[-18px] ml-[-10px]  ">
            <div className="mt-4 text-center">
              <h2 className="font-semibold text-2xl">Semester 04 Subjects</h2>

              {Datasem1.map((item) => (
                <div
                  key={item}
                  className="text-center py-3 flex items-center ml-[-40px]"
                >
                  <div>
                    <h1 className="w-[250px] text-lg">{item.sub}</h1>
                  </div>
                  <div>
                    <select
                      name=""
                      id=""
                      className="outline-none text-center rounded-3xl"
                    >
                      <option value="">Select a Grade</option>
                      <option value="">O</option>
                      <option value="">A++</option>
                      <option value="">A</option>
                      <option value="">B+</option>
                      <option value="">B</option>
                      <option value="">C</option>
                      <option value="">PASS</option>
                      <option value="">FAIL</option>
                      <option value="">RA</option>
                      <option value="">U</option>
                      <option value="">SA</option>
                      <option value="">W</option>
                    </select>
                  </div>
                </div>
              ))}
              <button className="py-2 border-black hover:border-white border-2 mt-4 ml-[115px] max-sm:ml-[105px] duration-300 hover:duration-500 text-xl flex items-center gap-2 bg-blue2 hover:bg-black/75 text-white hover:text-white px-2 rounded-2xl">
                Update
              </button>
            </div>
          </div>
        )}
        {sem5 === "Semester 05" && (
          <div className=" mt-4 bg-purple-400 w-[360px] p-4 max-sm:ml-[-18px] ml-[-10px] ">
            <div className="mt-4 text-center">
              <h2 className="font-semibold text-2xl">Semester 05 Subjects</h2>

              {Datasem1.map((item) => (
                <div
                  key={item}
                  className="text-center py-3 flex items-center ml-[-40px]"
                >
                  <div>
                    <h1 className="w-[250px] text-lg">{item.sub}</h1>
                  </div>
                  <div>
                    <select
                      name=""
                      id=""
                      className="outline-none text-center rounded-3xl"
                    >
                      <option value="">Select a Grade</option>
                      <option value="">O</option>
                      <option value="">A++</option>
                      <option value="">A</option>
                      <option value="">B++</option>
                      <option value="">B</option>
                      <option value="">C</option>
                      <option value="">PASS</option>
                      <option value="">FAIL</option>
                      <option value="">RA</option>
                      <option value="">U</option>
                      <option value="">SA</option>
                      <option value="">W</option>
                    </select>
                  </div>
                </div>
              ))}
              <button className="py-2 border-black hover:border-white border-2 mt-4 ml-[115px] max-sm:ml-[105px] duration-300 hover:duration-500 text-xl flex items-center gap-2 bg-blue2 hover:bg-black/75 text-white hover:text-white px-2 rounded-2xl">
                Update
              </button>
            </div>
          </div>
        )}
        {sem6 === "Semester 06" && (
          <div className=" mt-4 bg-blue-400 w-[360px] p-4 max-sm:ml-[-18px] ml-[-10px] ">
            <div className="mt-4 text-center">
              <h2 className="font-semibold text-2xl">Semester 06 Subjects</h2>

              {Datasem1.map((item) => (
                <div
                  key={item}
                  className="text-center py-3 flex items-center ml-[-40px]"
                >
                  <div>
                    <h1 className="w-[250px] text-lg">{item.sub}</h1>
                  </div>
                  <div>
                    <select
                      name=""
                      id=""
                      className="outline-none text-center rounded-3xl"
                    >
                      <option value="">Select a Grade</option>
                      <option value="">O</option>
                      <option value="">A++</option>
                      <option value="">A</option>
                      <option value="">B++</option>
                      <option value="">B</option>
                      <option value="">C</option>
                      <option value="">PASS</option>
                      <option value="">FAIL</option>
                      <option value="">RA</option>
                      <option value="">U</option>
                      <option value="">SA</option>
                      <option value="">W</option>
                    </select>
                  </div>
                </div>
              ))}
              <button className="py-2 border-black hover:border-white border-2 mt-4 ml-[115px] max-sm:ml-[105px] duration-300 hover:duration-500 text-xl flex items-center gap-2 bg-blue2 hover:bg-black/75 text-white hover:text-white px-2 rounded-2xl">
                Update
              </button>
            </div>
          </div>
        )}
        {sem7 === "Semester 07" && (
          <div className=" mt-4 bg-green-400 w-[360px] p-4 max-sm:ml-[-18px] ml-[-10px] ">
            <div className="mt-4 text-center">
              <h2 className="font-semibold text-2xl">Semester 07 Subjects</h2>

              {Datasem1.map((item) => (
                <div
                  key={item}
                  className="text-center py-3 flex items-center ml-[-40px]"
                >
                  <div>
                    <h1 className="w-[250px] text-lg">{item.sub}</h1>
                  </div>
                  <div>
                    <select
                      name=""
                      id=""
                      className="outline-none text-center rounded-3xl"
                    >
                      <option value="">Select a Grade</option>
                      <option value="">O</option>
                      <option value="">A++</option>
                      <option value="">A</option>
                      <option value="">B++</option>
                      <option value="">B</option>
                      <option value="">C</option>
                      <option value="">PASS</option>
                      <option value="">FAIL</option>
                      <option value="">RA</option>
                      <option value="">U</option>
                      <option value="">SA</option>
                      <option value="">W</option>
                    </select>
                  </div>
                </div>
              ))}
              <button className="py-2 border-black hover:border-white border-2 mt-4 ml-[115px] max-sm:ml-[105px] duration-300 hover:duration-500 text-xl flex items-center gap-2 bg-blue2 hover:bg-black/75 text-white hover:text-white px-2 rounded-2xl">
                Update
              </button>
            </div>
          </div>
        )}
        {sem8 === "Semester 08" && (
          <div className=" mt-4 bg-rose-400 w-[360px] p-4 max-sm:ml-[-18px] ml-[-10px] ">
            <div className="mt-4 text-center">
              <h2 className="font-semibold text-2xl">Semester 08 Subjects</h2>

              {Datasem1.map((item) => (
                <div
                  key={item}
                  className="text-center py-3 flex items-center ml-[-40px]"
                >
                  <div>
                    <h1 className="w-[250px] text-lg">{item.sub}</h1>
                  </div>
                  <div>
                    <select
                      name=""
                      id=""
                      className="outline-none text-center rounded-3xl"
                    >
                      <option value="">Select a Grade</option>
                      <option value="">O</option>
                      <option value="">A++</option>
                      <option value="">A</option>
                      <option value="">B++</option>
                      <option value="">B</option>
                      <option value="">C</option>
                      <option value="">PASS</option>
                      <option value="">FAIL</option>
                      <option value="">RA</option>
                      <option value="">U</option>
                      <option value="">SA</option>
                      <option value="">W</option>
                    </select>
                  </div>
                </div>
              ))}
              <div className="flex justify-between">
                <button className="py-2 border-black hover:border-white border-2 mt-4 ml-[15px] max-sm:ml-[25px] duration-300 hover:duration-500 text-xl flex items-center gap-2 bg-blue2 hover:bg-black/75 text-white hover:text-white px-2 rounded-2xl">
                  Update
                </button>
                <button
                  type="submit"
                  onClick={Sympo}
                  className="py-2  border-black hover:border-white border-2 mt-4 ml-[105px] max-sm:ml-[105px] duration-300 hover:duration-500 text-xl flex items-center gap-2 bg-blue2 hover:bg-black/75 text-white hover:text-white px-4 rounded-2xl"
                >
                  NEXT
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Drop;
