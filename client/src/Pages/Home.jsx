import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Home() {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudents, setSelectedStudents] = useState({});

  useEffect(() => {
    fetchStudents();
  }, []);

  // Function to fetch students
  const fetchStudents = async () => {
    try {
      const res = await axios.get("/student/getall");
      if (res.status === 200) {
        setStudents(res.data);
      } else {
        toast.error("Error in finding students");
      }
    } catch (error) {
      toast.error("Error in finding students");
      console.log(error);
    }
  };

  // Filter students based on the search query
  const regex = new RegExp(searchQuery, "i");
  const filteredStudents = students.filter(
    (student) => regex.test(student.rollNum) || regex.test(student.name)
  );

  // Function to delete a student
  const deleteStudent = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (confirmed) {
      try {
        const res = await axios.delete(`/student/remove-student/${id}`);
        if (res.status === 200) {
          toast.success("Student deleted");
          // Remove the deleted student from the state
          setStudents(students.filter((student) => student._id !== id));
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          toast.error("Student not found");
        } else {
          toast.error("Error");
        }
        console.log(error);
      }
    }
  };

  // Function to increase the count for selected students
  const increaseCount = async () => {
    const selectedStudentIds = Object.keys(selectedStudents);

    if (selectedStudentIds.length === 0) {
      return; // No students selected
    }

    try {
      console.log(selectedStudentIds);
      await axios
        .post("/student/increase-count", {
          studentIds: selectedStudentIds,
        })
        .then((res) => {
          if (res.status === 200) {
            // Update the local state with the updated count from the server
            const updatedStudents = res.data.students;
            setStudents((prevStudents) =>
              prevStudents.map((student) => {
                const updatedStudent = updatedStudents.find(
                  (updatedSt) => updatedSt._id === student._id
                );
                if (updatedStudent) {
                  return { ...student, count: updatedStudent.count };
                }
                return student;
              })
            );

            toast.success("Counts increased successfully");
          }
        });
    } catch (error) {
      toast.error("Error in increasing counts");
      console.log(error);
    }
  };
  const decreaseCount = async () => {
    const selectedStudentIds = Object.keys(selectedStudents);

    if (selectedStudentIds.length === 0) {
      return; // No students selected
    }

    try {
      console.log(selectedStudentIds);
      await axios
        .post("/student/decrease-count", {
          studentIds: selectedStudentIds,
        })
        .then((res) => {
          if (res.status === 200) {
            // Update the local state with the updated count from the server
            const updatedStudents = res.data.students;
            setStudents((prevStudents) =>
              prevStudents.map((student) => {
                const updatedStudent = updatedStudents.find(
                  (updatedSt) => updatedSt._id === student._id
                );
                if (updatedStudent) {
                  return { ...student, count: updatedStudent.count };
                }
                return student;
              })
            );

            toast.success("Counts increased successfully");
          }
        });
    } catch (error) {
      toast.error("Error in increasing counts");
      console.log(error);
    }
  };

  // Function to handle checkbox selection
  const handleCheckboxChange = (e, studentId) => {
    setSelectedStudents((prevSelected) => {
      if (e.target.checked) {
        return { ...prevSelected, [studentId]: true };
      } else {
        const { [studentId]: _, ...rest } = prevSelected;
        return rest;
      }
    });
  };

  return (
    <>
      <div className="mx-4">
        <ToastContainer />
        <div className="flex justify-center mt-12 gap-7">
          <Link
            to="/add"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add students
          </Link>
          <div
            className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={increaseCount}
          >
            +
          </div>
          <div
            className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={decreaseCount}
          >
            -
          </div>
          <div
            className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setSelectedStudents({});
            }}
          >
            clear
          </div>
        </div>
        <div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="pb-4 bg-white dark:bg-gray-900">
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>

              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search"
                  className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for roll number"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {/* <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-all-search"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor="checkbox-all-search" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th> */}
                  <th scope="col" className="px-6 py-3"></th>
                  <th scope="col" className="px-6 py-3">
                    Roll number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Count
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr
                    key={student._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id={`checkbox-table-search-${student.id}`}
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          checked={selectedStudents[student._id] || false}
                          onChange={(e) => handleCheckboxChange(e, student._id)}
                        />
                        <label
                          htmlFor={`checkbox-table-search-${student.id}`}
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td>

                    <td className="px-6  py-4">{student.rollNum}</td>
                    <td className="px-6  py-4">{student.name}</td>
                    <td className="px-6 py-4">{student.count}</td>

                    <td className="px-6 py-4 ">
                      <p
                        className="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => deleteStudent(student._id)}
                      >
                        Delete
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
