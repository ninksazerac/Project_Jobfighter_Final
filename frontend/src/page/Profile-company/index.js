import React, { useState, useEffect } from "react";
import Profile from "../../assets/pics/profile-company.png";
import Filebase64 from 'react-file-base64'
import { useSelector } from "react-redux";
import MyFileBase64 from "../../components/file-base64";
import { currentUser, updateUser } from "../../api/auth";

const API_PROVINCE = 'https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json'
const API_COLLEGE = 'https://raw.githubusercontent.com/MicroBenz/thai-university-database/master/dist/universities-pretty.json'

function ProfileCompany() {
  const { user } = useSelector((state) => ({ ...state }));
  const [provinces,setProvice] = useState([]) 
  const [colleges,setCollege] = useState([]) 
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    business: "",
    details: "",
    benefit: "",
    img: null,
    editable: false,
  });

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
    loadData(user.token);
  }, []);

  const loadData = (authtoken) => {
    currentUser(authtoken)
      .then((res) => {
        setValues({ ...values, ...res.data });
        console.log(res.data);
      })
      .catch((err) => {
        //err
        console.log("Error loadData", err.response.data);
      });
  };

  const handleSubmit = (e) => {
    console.log("proIm isL",values.img)
    if (values.img === null || values.img === ''){
        alert('please upload profile image')
    }
    else {
      console.log('valingis:',values.img)
    alert("Saved");
    e.preventDefault();
    setValues({
      editable: false,
    });

    updateUser(user.token, values)
      .then((res) => {
        console.log(res.data);
        loadData(user.token);
      })
      .catch((err) => {
        console.log(err.response.data);
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
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  
  const bisinessList = [
    "กระดาษ - อุปกรณ์สำนักงาน",
    "การเกษตร",
    "การขนส่ง",
    "การขายปลีก",
    "การโฆษณา",
    "การท่องเที่ยว",
    "การนำเข้า - การส่งออก",
    "การบริการ",
    "การประกันภัย - การประกันชีวิต",
    "การพิมพ์ - สิ่งพิมพ์",
    "การศึกษา",
    "การออกแบบ - การตกแต่งภายใน",
    "คลินิก -โรงพยาบาล",
    "ความบันเทิง",
    "คอมพิวเตอร์ - ไอที",
    "เครื่องสำอาง ยา และเวชภัณฑ์",
    "เงินทุน - หลักทรัพย์",
    "เชื้อเพลิง - พลังงาน",
    "ที่ปรึกษา",
    "ที่ปรึกษาด้านจัดหางาน",
    "ธนาคาร",
    "บรรจุภัณฑ์",
    "บัญชี และกฎหมาย",
    "พลาสติก - เคมีภัณฑ์",
    "พาณิชย์",
    "เฟอร์นิเจอร์ - เครื่องใช้ในบ้าน",
    "ไฟฟ้า",
    "ยานยนต์",
    "ราชการ รัฐวิสาหกิจ และมูลนิธิ",
    "โรงแรม สปา และสนามกอล์ฟ",
    "โลหะ",
    "วัสดุก่อสร้าง - รับเหมาก่อสร้าง",
    "สิ่งทอ",
    "สินเชื่อ - บัตรเครดิต",
    "สื่อสารโทรคมนาคม",
    "สื่อสารมวลชน",
    "อสังหาริมทรัพย์",
    "อัญมณี - เครื่องประดับ",
    "อาหาร เครื่องดื่ม และยาสูบ",
    "อิเล็กทรอนิกส์",
    "อื่นๆ",
  ].sort();
  
  return (
    <div className="mx-80 my-20 bg-gray-200 shadow  rounded-lg font-sans">
      {/*         <div> {fix ? "a" : "b"} </div>
       */}{" "}
      <div className=" h-20 w-200  bg-green-300  shadow  rounded-lg">
        <div className="p-4 text-center font-bold  text-gray-700 text-3xl ">
          โปรไฟล์บริษัท
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="font-bold  text-gray-700 m-4 text-xl">ข้อมูลบริษัท</div>
        <div className="flex justify-center">
          <img
            className="h-36 w-36"
            img
            src={values.img === null ? Profile : values.img}
            alt="profile"

            // รูปภาพ
          />
        </div>
        <div className="flex justify-center w-64 mx-72" >
        <MyFileBase64
                            disabled={values.editable === false }                           
                            mutiple = {false} 
                            onDone = {({base64})=>setValues ({...values,
                            img:base64})} 
                            />
        </div>

        <div className="m-4 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            // ชื่อ
          >
            ชื่อบริษัท *
          </label>
          <input
            className={`bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal w-full ${
              values.editable ? "text-black" : "text-gray-400"
            } focus:text-black focus:ring-blue-300 focus:ring-2`}
            id="name"
            type="name"
            onChange={handleChange}
            name="name"
            placeholder="ชื่อบริษัท"
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
              type="tel"
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
            // ลักษณะธุรกิจ
          >
            ลักษณะธุรกิจ *
          </label>
          <select
            name="business"
            onChange={handleChange}
            id="business"
            required
            autoComplete="none"
            value={values.business}
            disabled={values.editable === false}
            className={`bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block leading-normal w-full ${
              values.editable ? "text-black" : "text-gray-400"
            } focus:text-black focus:ring-blue-300 focus:ring-2`}
            aria-label="Default select example"
          >
                <option value="">ระบุลักษณะธุรกิจ</option>
            {bisinessList.map((e, idx) => (
              <option key={idx} value={e}>
                {e}
              </option>
            ))}
          </select>
          <label
            className="block text-gray-700 text-sm font-bold mb-2 mt-4"
            // รายละเอียด
          >
            รายละเอียดเกี่ยวกับบริษัทและการดำเนินการ
          </label>
          <textarea
            className={`resize-none bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal w-full ${
              values.editable ? "text-black" : "text-gray-400"
            } focus:text-black focus:ring-blue-300 focus:ring-2`}
            id="details"
            onChange={handleChange}
            name="details"
            rows="5"
            placeholder="รายละเอียดเกี่ยวกับบริษัท"
            autoComplete="none"
            value={values.details}
            disabled={values.editable === false}
          ></textarea>
          <label
            className="block text-gray-700 text-sm font-bold mb-2 mt-4"
            // สวัสดิการ
          >
            สวัสดิการ
          </label>
          <textarea
            className={`resize-none bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal w-full ${
              values.editable ? "text-black" : "text-gray-400"
            } focus:text-black focus:ring-blue-300 focus:ring-2`}
            id="benefit"
            onChange={handleChange}
            name="benefit"
            rows="3"
            placeholder="รายละเอียดสวัสดิการ"
            autoComplete="none"
            value={values.benefit}
            disabled={values.editable === false}
          ></textarea>
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

        <div className="m-4">
          <div className="flex space-x-12 justify-center mt-4 ">
            <button
              onClick={handleEdit}
              
              type="button"
              className="inline-block px-7 py-3 bg-[#da3d3d] text-white text-md font-bold  leading-tight uppercase rounded shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none  hover:bg-[#a12727]  hover:ring-2 hover:ring-white active:shadow-lg transition duration-150 ease-in-out"
              id="change"
            >
              แก้ไข
            </button>
            <a
            // path กดตกลง
            >
              <button
                className="inline-block px-7 py-3 bg-[#24AB82] text-white text-md font-bold leading-tight uppercase rounded shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none  hover:bg-[#1F795E] hover:ring-2 hover:ring-white active:shadow-lg transition duration-150 ease-in-out"
                id="submit"  disabled={values.editable === false  } 
              >
                ตกลง
              </button>
            </a>
          </div>
          <div className="h-10 w-200 bg-gray-200   rounded-lg "></div>
        </div>
      </form>
    </div>
  );
}
export default ProfileCompany;
