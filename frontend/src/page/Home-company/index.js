import React from "react";
import "../../page/Home-student/Home-student.css"; //เหมือนกับของ student
import Work2 from "../../assets/pics/Work2.png";
import Company1 from "../../assets/pics/Company1.png";
import Company2 from "../../assets/pics/Company2.png";
import Company3 from "../../assets/pics/Company3.png";
import Card from "../../page/Home-student/Card.js"; //เหมือนกับcard ของ student
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function Homecompany() {
  const { user } = useSelector((state) => ({ ...state }));

  // useEffect({
  //   firstCheck
  // },[])

  // async function firstCheck(){
  //   const res = await  axios.put(process.env.REACT_APP_API+`/users/get-user` ,{headers:{'authorization':`Bearer ${user.token}`}} )
  //   .then(console.log('user data is :',res))

  // }

  async function hdClick() {
    console.log(' home user id is :', user.id)
    var resUser
    await axios.get(process.env.REACT_APP_API + `/users/get-user`, { headers: { 'authorization': `Bearer ${user.token}` } })
      .then((res) => {
        // console.log('user data is :', res.data)
        // console.log('user data name is :', res.data.name)
        // console.log('user data phone is :', res.data.phone)
        // console.log('user data business is :', res.data.business)
        if (!res.data.name || !res.data.phone || !res.data.business) {
          // console.log('send to homecompany')
          // console.log('name', userData.name)
          // console.log('phone', userData.phone)
          // console.log('business', userData.business)
          alert('Please edit your profile data')
          window.location.replace('/homecompany')
          }
       
      })
  }


  return (
    <div className="w-full">
      {/* อันที่ 1 home */}
      <div className="home">
        {/* left */}
        <div className="i-left">
          <div className="i-name font-sans">
            <span>เข้าถึงผู้สมัครได้มากกว่าใคร !</span>
            <span>Job Fighter</span>
          </div>
          {/* link to หน้าสร้างโพสต์ */}
          <Link to="/postjob" onClick={hdClick}>
          <button className="button i-button font-sans"  >สร้างโพสต์
            
          </button>
          </Link>

        </div>
        {/* right */}
        <div className="i-right">
          <img src={Work2} alt="" />

          {/* blur div */}
          <div className="blur" style={{ background: "#f8e4c8e3" }}></div>
          <div
            className="blur"
            style={{
              background: "#d1f7e4 ",
              top: "17rem",
              width: "21rem",
              height: "20rem",
              left: "-20rem",
            }}
          ></div>
        </div>
      </div>

      {/* อันที่ 2 home2 */}
      <div className="home2">
        {/* left */}
        <div className="awesome font-sans">
          <span>ลงประกาศงานกับ</span>
          <span>Job Fighter</span>
        </div>

        {/* right */}
        <div className="cards font-sans">
          <div style={{ top: "15rem", left: "-15rem" }}>
            <Card
              emoji={Company1}
              heading={"โปรไฟล์บริษัท"}
              detail={
                "พื้นที่บอกเรื่องราวบริษัทของคุณ ดึงดูดผู้สมัครหลากหลายประเภท"
              }
            />
          </div>

          <div style={{ top: "15rem", left: "8rem" }}>
            <Card
              emoji={Company2}
              heading={"ค้นหาประวัติ"}
              detail={"ค้นหาประวัติผู้สมัครได้ง่าย ครอบคลุมหลากหลายอาชีพ"}
            />
          </div>

          <div style={{ top: "15rem", left: "30rem" }}>
            <Card
              emoji={Company3}
              heading={"สร้างโพสต์ง่าย"}
              detail={"สร้างโพสต์ได้ทันที สะดวกสบายต่อผู้ใช้งาน"}
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Homecompany;
