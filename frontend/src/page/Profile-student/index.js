import React, { useState, useEffect } from "react";
import Profile from "../../assets/pics/profile-student.png";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { currentUser, updateUser } from "../../api/auth"
import MyFileBase64 from "../../components/file-base64";

const API_PROVINCE = 'https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json'
const API_COLLEGE = 'https://raw.githubusercontent.com/MicroBenz/thai-university-database/master/dist/universities-pretty.json'

function ProfileStudent() {

  const { user } = useSelector((state) => ({ ...state }));

  const [provinces,setProvice] = useState([]) 
  const [colleges,setCollege] = useState([]) 
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    college: "",
    faculty: "",
    program: "",
    transcript: "",
    img: null,
    editable: false,
  });
  const it = document.createElement('it');

  async function fetchProvincesName(){  
    const response = await fetch(API_PROVINCE)
    const data = await response.json() 
    setProvice(data)
  }

  async function fetchCollegesName(){  
    const response = await fetch(API_COLLEGE)
    const data = await response.json() 
    setCollege(data)
  }

    useEffect(() => {
  
      fetchProvincesName()
    fetchCollegesName()
    loadData(user.token)
  
  }, []);
  
    const loadData = (authtoken) => {
 
      currentUser(authtoken)
        .then((res) => {  
          
          setValues({...values,...res.data});
          console.log(res.data)
        })
        .catch((err) => {
          //err
          console.log("Error loadData", err.response.data);
        });
    };


  const handleSubmit = (e) => {
    console.log("proIm isL",values.img)
    if (values.img === null || values.img === '' || values.transcript === '' || values.transcript === null){
        alert('please upload profile image or transcript')
    }
    else{
    alert("Saved");
    e.preventDefault();
    setValues({
      editable: false,
      img:values.img,
      transcript:values.transcript
    });

    console.log(values.resume)

    updateUser(user.token, values)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        loadData(user.token);
      });
  };}


 const handleEdit = (e) => {
    if(values.editable){
      alert("ปิดการเเก้ไขข้อมูลโปรไฟล์")
    }
    else{
      alert("เปิดการเเก้ไขข้อมูลโปรไฟล์")
    }
    setValues({...values,
      editable: !values.editable,
      img:values.img,
      transcript:values.transcript
    });
    console.log('editable inside',values.editable)
    console.log('img profile inside',values.img)

  };
  const handleChange = (e) => {
    setValues({ ...values, 
      [e.target.name]: e.target.value });
  };

  const programList = [
    "ชีวการแพทย์",
    "คอมพิวเตอร์",
    "แมคคาทรอนิกส์",
    "แมคคาทรอนิกส์และหุ่นยนต์",
    "ไฟฟ้า",
    "โยธา",
    "ธรณี",
    "อิเล็กทรอนิกส์",
    "โทรคมนาคม",
    "เคมี",
    "เกษตร",
    "การจัดการและโลจิสติกส์",
    "ขนส่ง",
    "ปิโตรเลียม",
    "ซอฟต์แวร์",
    "สารสนเทศ",
    "สิ่งแวดล้อม",
    "เครื่องกล",
    "สิ่งทอ",
    "การตลาด",
    "การจัดการ ",
    "การเงินและการธนาคาร ",
    "การบัญชี",
    "ระบบสารสนเทศธุรกิจ",
    "การจัดการการท่องเที่ยวและการบริการ",
    "ธุรกิจอสังหาริมทรัพย์ ",
    "การจัดการอุตสาหกรรม",
    "การประกันภัย",
    "การจัดการ(กลุ่มวิชาพาณิชยศาสตร์)",
    "เศรษฐศาสตร์ธุรกิจ",
    "ภาษาฝรั่งเศสธุรกิจ ",
    "ภาษาจีนธุรกิจ",
    "ภาษาญี่ปุ่นธุรกิจ",
    "ภาษาจีนเพื่อเศรษฐกิจและการค้า",
    "เทคโนโลยีสารสนเทศ",
    "วิทยาการโทรคมนาคม",
    "การวิเคราะห์ข้อมูลเชิงธุรกิจ",
    "การจัดการเทคโนโลยี",
    "ธุรกิจดนตรี",
    "การแสดงดนตรี",
    "การประชาสัมพันธ์",
    "การสื่อสารผ่านสื่อใหม่",
    "การสื่อสารการแสดง",
    "การออกแบบนิเทศศิลป์",
    "กระบวนจินตภาพคอมพิวเตอร์",
    "เทคโนโลยีการอาหาร",
    "อุตสาหกรรมเกษตร",
    "สถาปัตยกรรมศาสตร์ ",
    "สถาปัตยกรรมภายใน",
    "ออกแบบภายใน",
    "ออกแบบผลิตภัณฑ์",
    "คณิตศาสตร์และวิทยาการคอมพิวเตอร์",
    "เคมี",
    "ชีววิทยา",
    "ฟิสิกส์",
    "พฤกษศาสตร์",
    "เคมีเทคนิค",
    "วิทยาศาสตร์สิ่งแวดล้อม",
    "วิทยาศาสตร์ทางทะเล",
    "ชีวเคมี",
    "วัสดุศาสตร์",
    "จุลชีววิทยา",
    "เทคโนโลยีทางอาหาร",
    // ].sort((a, b) => a.length - b.length);
  ].sort();

  const facultyList = [
    "เกษตรศาสตร์",
    "ครุศาสตร์อุตสาหกรรม",
    "เทคโนโลยีสารสนเทศ",
    "ประมง",
    "วิทยาศาสตร์",
    "วิศวกรรมศาสตร์",
    "สิ่งแวดล้อม",
    "กายภาพบำบัด",
    "การแพทย์แผนไทย",
    "ทันตแพทยศาสตร์",
    "เทคนิคการแพทย์",
    "แพทยศาสตร์",
    "พยาบาลศาสตร์",
    "เภสัชศาสตร์",
    "สหเวชศาสตร์",
    "สัตวแพทยศาสตร์",
    "สาธารณสุขศาสตร์",
    "ทัศนมาตรศาสตร์",
    "นิติศาสตร์",
    "นิเทศศาสตร์",
    "บริหารธุรกิจและการบัญชี",
    "มนุษยศาสตร์",
    "รัฐศาสตร์",
    "ศิลปกรรมศาสตร์",
    "เศรษฐศาสตร์",
    "สถาปัตยกรรมศาสตร์",
    "สังคมศาสตร์",
    "สังคมสงเคราะห์ศาสตร์",
  ].sort();
  
  console.log('editable outside is ',values.editable)
  return (
    <div className="mx-80 my-20 bg-gray-200 shadow  rounded-lg font-sans">
      <div className=" h-20 w-200  bg-green-300  shadow  rounded-lg">
        <div className="p-4 text-center font-bold  text-gray-700 text-3xl ">
          โปรไฟล์ผู้ใช้งาน
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="font-bold  text-gray-700 m-4 text-xl">
          ประวัติส่วนตัว
        </div>
        <div className="flex justify-center">
          <img
            className="h-36 w-36"
            img
            src={values.img === null ? Profile : values.img}
            alt="profile"
            // รูปภาพ
          />
        </div>
        <div className="flex justify-center w-64 mx-72">
        <MyFileBase64
                           
                            name = {it}
                            disabled={values.editable === false}
                            mutiple = {false} 
                            onDone = {({base64})=>setValues ({...values,
                            img:base64})} 
                            />
        </div>

        <div className="m-4 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            // ชื่อ-นามสกุล
          >
            ชื่อ-นามสกุล *
          </label>
          <input
            className={`bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal w-full ${
              values.editable ? "text-black" : "text-gray-400"
            } focus:text-black focus:ring-blue-300 focus:ring-2`}
            id="name"
            type="name"
            onChange={handleChange}
            name="name"
            placeholder="ชื่อ-นามสกุล"
            value={values.name}
            required
            autoComplete="none"
            disabled={values.editable === false}

            /* {...(fix === true ? abled : disabled)} */
          />

          <div
            className="block text-gray-700 text-sm font-bold mb-2 mt-4 space-x-96"
            // E-mail เบอร์โทรศัพท์
          >
            <label>E-mail *</label>
            <label> &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;เบอร์โทรศัพท์ *</label>
          </div>
          <div className="flex flex-row ml-auto space-x-20 items-center">
            <input
              className={`bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal w-96 ${
                values.editable ? "text-black" : "text-gray-400"
              } focus:text-black focus:ring-blue-300 focus:ring-2`}
              id="email"
              type="email"
              onChange={handleChange}
              name="email"
              placeholder="jane@example.com"
              value={values.email}
              required
              autoComplete="none"
              disabled={values.editable === false}
            />

            <input
              className={`bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal w-96 ${
                values.editable ? "text-black" : "text-gray-400"
              } focus:text-black focus:ring-blue-300 focus:ring-2`}
              id="phone"
              type="number"
              pattern="[0-9]*"
              onChange={handleChange}
              name="phone"
              placeholder="0800000000"
              value={values.phone}
              required
              autoComplete="none"
              disabled={values.editable === false}
            />
          </div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2 mt-4"
            // ที่อยู่
          >
            ที่อยู่
          </label>
          <textarea
            className={`resize-none bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal w-full ${
              values.editable ? "text-black" : "text-gray-400"
            } focus:text-black focus:ring-blue-300 focus:ring-2`}
            id="address"
            onChange={handleChange}
            name="address"
            rows="3"
            placeholder="รายละเอียดที่อยู่"
            value={values.address}
            autoComplete="none"
            disabled={values.editable === false}
          ></textarea>
        </div>
        <div className="py-0.5 mx-5 bg-gray-300  "></div>
        <div className="font-bold  text-gray-700 m-4 text-xl">
          ประวัติการศึกษา
        </div>
        <div className="m-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            // มหาลัย
          >
            มหาลัย *
          </label>
          <select
            name="college"
            onChange={handleChange}
            id="univercity"
            required
            autoComplete="none"
            value={values.college}
            disabled={values.editable === false}
            className={`bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block leading-normal w-full ${
              values.editable ? "text-black" : "text-gray-400"
            } focus:text-black focus:ring-blue-300 focus:ring-2`}
            aria-label="Default select example"
          >
           <option value="">ระบุมหาลัยที่จบมา</option>
                        {colleges.map((item)=>
                        <option>{item.university}</option>
                        )}
          </select>

          <div
            className="block text-gray-700 text-sm font-bold mb-2 mt-4 space-x-96"
            // คณะ สาขา
          >
            <label>คณะ *</label>
            <label> &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; สาขา *</label>
          </div>
          <div className="flex flex-row ml-auto space-x-20 items-center">
            <select
              name="faculty"
              onChange={handleChange}
              id="faculty"
              required
              autoComplete="none"
              value={values.faculty}
              disabled={values.editable === false}
              className={`bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal w-96 ${
                values.editable ? "text-black" : "text-gray-400"
              } focus:text-black focus:ring-blue-300 focus:ring-2`}
              aria-label="Default select example"
            >
                <option value="">ระบุคณะที่จบมา</option>
              {facultyList.map((e, idx) => (
                <option value={e}>{e}</option>
              ))}
            </select>
            <select
              name="program"
              onChange={handleChange}
              id="program"
              required
              autoComplete="none"
              value={values.program}
              disabled={values.editable === false}
              className={`bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal w-96 ${
                values.editable ? "text-black" : "text-gray-400"
              } focus:text-black focus:ring-blue-300 focus:ring-2`}
              aria-label="Default select example"
            >
                <option value="">ระบุสาขาที่จบมา</option>
              {programList.map((e, idx) => (
                <option value={e}>{e}</option>
              ))}
                   
            </select>
          </div>
          <label
            className="block text-gray-700 text-sm font-bold mt-4"
            // มหาลัย
          >
            ใบทรานสคริปต์ *
          </label>
            
          <div className="flex justify-left w-72" >
          <MyFileBase64    id = 'trans'
          disabled={values.editable === false}
                            mutiple = {false} 
                            onDone = {({base64})=>setValues ({...values,
                            transcript:base64})} />
          
          </div>
          <div className="flex space-x-12 justify-center mt-4 ">
            <button 
              onClick = {handleEdit}
              type="button"
              className="inline-block px-7 py-3 bg-[#da3d3d] text-white text-md font-bold  leading-tight uppercase rounded shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none  hover:bg-[#a12727]  hover:ring-2 hover:ring-white active:shadow-lg transition duration-150 ease-in-out"
              id="change"
            >
              แก้ไข{values.editable}
            </button>
              <button
                className="inline-block px-7 py-3 bg-[#24AB82] text-white text-md font-bold leading-tight uppercase rounded shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none  hover:bg-[#1F795E] hover:ring-2 hover:ring-white active:shadow-lg transition duration-150 ease-in-out"
                id="submit" disabled={values.editable === false}
              >
                ตกลง
              </button>
          </div>
          <div className="h-10 w-200 bg-gray-200   rounded-lg "></div>
        </div>
      </form>
    </div>
  );
}

export default ProfileStudent;
