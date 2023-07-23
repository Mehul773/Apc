import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import AddStudent from "./Pages/AddStudent";
import axios from 'axios'
import "react-toastify/dist/ReactToastify.css";
import * as myContants from '../myConstant'

axios.defaults.baseURL = myContants.BACKEND_URL;
axios.defaults.withCredentials = true;

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddStudent />} />
      </Routes>
    </>
  );
}

export default App;
