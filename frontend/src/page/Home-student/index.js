import React from "react";
import "./Home-student.css";
import Work from "../../assets/pics/Work.png";
import Student1 from "../../assets/pics/Student1.png";
import Student2 from "../../assets/pics/Student2.png";
import Student3 from "../../assets/pics/Student3.png";
import Card from "./Card.js";
import { Link } from "react-router-dom";
//import FloatingDiv from "./FloatingDiv.js";

function index() {
  return (
    <div className="w-full">
      {/* อันที่ 1 home */}
      <div className="home">
        {/* left */}
        <div className="i-left">
          <div className="i-name font-sans">
            <span>พบกับงานที่ใช่ งานที่ชอบ</span>
            <span>Job Fighter</span>
          </div>
          {/* link to Profile */}
          <Link to="/profileStudent">
            <button className="button i-button font-sans">ฝากประวัติ</button>
          </Link>
        </div>

        {/* right */}
        <div className="i-right">
          <img src={Work} alt="" />
          {/* <div style={{ top: "-11%", left: "35%" }}>
            <FloatingDiv image={Search1} txt1="ฝาก" txt2="ประวัติ" />
          </div>
          <div style={{ top: "7%", left: "35%" }}>
            <FloatingDiv image={Search2} txt1="ส่งตรง" txt2="ข่าวสาร" />
          </div> */}

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
          <span>เว็บไซต์สำหรับนักศึกษา</span>
          <span>Job Fighter</span>
        </div>

        {/* right */}
        <div className="cards font-sans">
          <div style={{ top: "15rem", left: "-15rem" }}>
            <Card
              emoji={Student1}
              heading={"ฝากประวัติ"}
              detail={"เพิ่มช่องทางเเละโอกาสให้บริษัทเห็นประวัติคุณ"}
            />
          </div>

          <div style={{ top: "15rem", left: "8rem" }}>
            <Card
              emoji={Student2}
              heading={"ส่งตรงข่าวสาร"}
              detail={"ไม่พลาดการอัปเดตงานใหม่ๆ ตามสายงานที่คุณสนใจ"}
            />
          </div>

          <div style={{ top: "15rem", left: "30rem" }}>
            <Card
              emoji={Student3}
              heading={"สมัครง่าย"}
              detail={"สมัครงานได้ง่าย สะดวกรวดเร็วทันใจผู้ใช้งาน"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
