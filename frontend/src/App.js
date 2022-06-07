import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./page/Login";
import Forgotpass from "./page/Forgotpass";
import Signupstudent from "./page/Signup-student";
import Signupcompany from "./page/Signup-company";
import Layoutstudent from "./page/Layout/Layout-student/index";
import Layoutcompany from "./page/Layout/Layout-company/index";

//redux
import { useDispatch } from "react-redux";
// page user
import ProfileStudent from "./page/Profile-student";
import Historystudent from "./page/History-student";
import Homestudent from "./page/Home-student";
import Contactstudent from "./page/Contact-student";

// page company
// import HomeCompany from "./page/company/home"
import ProfileCompany from "./page/Profile-company";
import EditPost from "./page/Postjob/edit-post";
import CreatePost from "./page/Postjob/create-post";
import Applicantcompany from "./page/Applicant-company";
import Paymentcompany from "./page/Payment-company/payment";
import Homecompany from "./page/Home-company";
import CompanyPost from "./page/WaitPost";
import Contactcompany from "./page/Contact-company";

import Search from "./page/Search";
import Applyjob from "./page/Applyjob";
import Aboutus from "./page/About-us";
// functions
import { currentUser } from "./api/auth";
// Routes
import StudentRoutes from "./page/Layout/studentRoutes";
import CompanyRoutes from "./page/Layout/companyRoutes";
import AdminRoute from "./components/routes/AdminRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// page admin
import ManageAdmin from "./page/admin/ManageAdmin";

//Navbar

import Layout from "./page/Layout/index";
function App() {
  const dispatch = useDispatch();
  const idtoken = localStorage.token;
  const role = localStorage.role;
  if (idtoken ) {
    dispatch({
      type: "LOGIN",
      payload: {
        token: idtoken,
        role: role,
      },
    });
    currentUser(idtoken)
      .then((res) => {
        console.log(res.data);
        // dispatch({
        //   type: "LOGIN",
        //   payload: {
        //     token: idtoken,
        //     username: res.data.name,
        //     role: res.data.role,
        //   },
        // });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <ToastContainer />
   
      <Routes>
        
      <Route element ={<Layout role={role}></Layout> } >
        <Route path="/search" element={<Search  />} />
        </Route>

        <Route path="/" element={<Login />} />
        <Route path="/forgotpass" element={<Forgotpass />} />
        <Route path="/signupstudent" element={<Signupstudent />} />
        <Route path="/signupcompany" element={<Signupcompany />} />
        <Route path="/aboutus" element={<Aboutus />} />

        <Route
          path="/admin/manage"
          element={
            <AdminRoute>
              <ManageAdmin />
            </AdminRoute>
          }
        />

        <Route element={<Layoutstudent></Layoutstudent>}>
          <Route element={<StudentRoutes></StudentRoutes>}>
            <Route path="/profileStudent" element={<ProfileStudent />} />

            <Route path="/applyjob/" element={<Applyjob />} />
            <Route path="/historystudent" element={<Historystudent />} />
            <Route path="/contactstudent" element={<Contactstudent />} />
          </Route>
          <Route path="/homestudent" element={<Homestudent />} />
        </Route>

        <Route element={<Layoutcompany></Layoutcompany>}>
          <Route element={<CompanyRoutes></CompanyRoutes>}>
            <Route path="/profileCompany" element={<ProfileCompany />} />

            <Route path="/applicantcompany" element={<Applicantcompany />} />
            <Route path="/paymentcompany/" element={<Paymentcompany />} />
            <Route path="/postjob" element={<CreatePost />} />
            <Route path="/postjob/:id" element={<EditPost />} />
            <Route path="/contactcompany" element={<Contactcompany />} />
            <Route path="/companypost" element={<CompanyPost />} />

            <Route path="/applicantcompany" element={<Applicantcompany />} />
          </Route>
          <Route path="/homecompany" element={<Homecompany />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
