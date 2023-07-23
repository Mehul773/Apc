import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function AddStudent() {
  const [name, setName] = useState("");
  const [rollNum, setRollNum] = useState("");

  async function addStudent(ev) {
    ev.preventDefault();
    if (name == "" || rollNum == "") {
      toast.error("Please add all field");
    } else {
      try {
        await axios.post("/student/add", { name, rollNum }).then((res) => {
          if (res.status === 200) {
            toast.success("Student added ");
            setRollNum("");
            setName("");
          } else {
            toast.error("Can not add student");
          }
        });
      } catch (error) {
        if (error.response.status == 409) {
          toast.error("Student already exists");
        } else toast.error("Error");
        console.log(error);
      }
    }
  }

  return (
    <>
      <div>
        <ToastContainer />
        <Link to="/" className="flex justify-center mt-12">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Home
          </button>
        </Link>
        <div className="w-[400px] m-auto mt-6">
          <form onSubmit={addStudent}>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Name
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Mehul Chovatiya"
                value={name}
                onChange={(ev) => {
                  setName(ev.target.value);
                }}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Roll number
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="906"
                value={rollNum}
                onChange={(ev) => {
                  setRollNum(ev.target.value);
                }}
              />
            </div>

            <div className="flex justify-center ">
              <button
                type="submit"
                className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddStudent;
