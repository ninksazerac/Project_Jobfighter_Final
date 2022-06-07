import React from "react";
import { useState ,useEffect } from "react";
import Address from "../../assets/pics/Address.png";
import Company1 from "../../assets/pics/Company1.png";
import ReactPaginate from "react-paginate";
import axios from "axios";
import JsonData from "./MOCK_DATA.json";
import "./Searchresult.css"; 
import Salary from "../../assets/pics/Salary.png";
import { Link } from "react-router-dom";
import LoadingCard from "../../components/routes/LoadingCard";
import { useSelector } from "react-redux";

const API_PROVINCE = 'https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json'
const API_COLLEGE = 'https://raw.githubusercontent.com/MicroBenz/thai-university-database/master/dist/universities-pretty.json'




/* Pagination */
function Send_data() {
  const { user } = useSelector((state) => ({ ...state }));

/*จัดเรียงชื่อมหาลัย คณะ สาขา */
  /*คณะ */
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

  /* สาขา*/
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
  ].sort();

  /* ประเภทงาน */
  const jobTypeList = [
    "เกษตร/จัดสวน/ปศุสัตว์/ประมง/เหมืองแร่",
    "งานขาย",
    "เขียนแบบ/งานDrawing/AutoCad/ออกแบบวิศวกรรม",
    "กฎหมาย",
    "คอมพิวเตอร์/IT/โปรแกรมเมอร์",
    "งานการเงิน-ธนาคาร",
    "งานขนส่ง-คลังสินค้า",
    "งานนำเข้า-ส่งออก",
    "งานบริการลูกค้า Call Center",
    "งานบัญชี",
    "งานบันเทิง/นักแสดง/นางแบบ/นักร้อง",
    "จัดซื้อ/ธุรการ/ประสานงานทั่วไป",
    "เจ้าหน้าที่ความปลอดภัย(จป.)/สิ่งแวดล้อม/ISO",
    "ช่างเทคนิค/อิเลคโทรนิค/ซ่อมบำรุง/ช่างพิมพ์",
    "นักเขียน/บรรณาธิการ/พิสูจน์อักษร/Copywriter/นักแปลภาษาบุคคล/ฝึกอบรม",
    "ผลิต/ควบคุมคุณภาพ/โรงงาน",
    "ผู้จัดการ/ผู้อำนวยการ/MD/CEO",
    "แผนกรักษาความปลอดภัย/งานอาคารจอดรถ",
    "แพทย์/เภสัชกร/สาธารณสุข",
    "ภูมิศาสตร์/แผนที่/GIS/ผังเมือง",
    "แม่บ้าน/พี่เลี้ยง/คนสวน",
    "โยธา/สำรวจ/สถาปัตย์/มัณฑนากร/ประเมินราคา",
    "ล่าม/มัคคุเทศก์/จองห้อง/จองตั๋ว",
    "เลขานุการ",
    "วิจัย/วิเคราะห์ (เศรษฐศาสตร์/หุ้น/ประกันภัย/ธนาคาร)",
    "วิทยาศาสตร์/Lab/วิจัยพัฒนา",
    "วิศวกร",
    "ศิลปะ/กราฟฟิค/ออกแบบ/ช่างภาพ",
    "ส่งเอกสาร/ขับรถ/ส่งผลิตภัณฑ์",
    "สื่อสารมวลชน/นักข่าว/งานวิทยุ/โทรทัศน์/หนังสือพิมพ์",
    "สุขภาพ/โภชนาการ/ความงาม/ฟิตเนส/สปา",
    "เสื้อผ้า/สิ่งทอ/ช่างแพทเทิร์นdropdown",
    "ออกแบบเว็บไซต์/Web",
    "อัญมณีและเครื่องประดับ",
    "อาจารย์/ครู/งานวิชาการ",
    "อาหาร/เครื่องดื่ม/กุ๊ก/บาร์เทนเดอร์/พนักงานเสิร์ฟ",
    "งาน Part-time/พนักงานชั่วคราว",
    "Freelance",
    "อื่นๆ",
  ].sort();

  const [colleges,setCollege] = useState([])
  const [provinces,setProvice] = useState([]) 
  const [loading, setLoading] = useState([false])

  var temp1 = [] 
  var temp2 = [] 

  async function hdClick() {
    console.log(' home user id is :', user.id)
    var resUser
    await axios.get(process.env.REACT_APP_API + `/users/get-user`, { headers: { 'authorization': `Bearer ${user.token}` } })
      .then((res) => {
        console.log('user res is ::::',res.data)

        // console.log('user data is :', res.data)
        // console.log('user data name is :', res.data.name)
        // console.log('user data phone is :', res.data.phone)
        // console.log('user data business is :', res.data.business)
        if (!res.data.name || !res.data.college || !res.data.faculty || !res.data.program || !res.data.phone || !res.data.transcript ) {
          alert('Please edit your profile data')
          window.location.replace('/search')
          }
       
      })
  }
    
  async function fetchFirstJsonData(){  
    setLoading(true);
    const response = await  axios.post(process.env.REACT_APP_API+'/search')
    
    .then((res) => {
    JsonData = res.data
           //////// **********
    })
    console.log('fetch first')
    const boosted = await axios.post(process.env.REACT_APP_API+'/search',{'boost':true , 'enable': true})
    temp1 = boosted.data
    for(var m = 0 ; m < temp1.length ;  m++){
      temp2.push(temp1[m])
    }
    const notboosted = await axios.post(process.env.REACT_APP_API+'/search',{'boost':false , 'enable': true})
    temp1 = notboosted.data
    for(var m = 0 ; m < temp1.length ;  m++){
      temp2.push(temp1[m])
    }
    setLoading(false) 
    setUsers(temp2)
    console.log('sorted res is :',temp2)
    console.log('temp[0] is user :',temp2[0].user.name)
    console.log('temp[1] is user :',temp2[1].user.name)

  }

  async function fetchCollegesName(){  
    const response = await fetch(API_COLLEGE)
    const data = await response.json() 
    setCollege(data)
  }
  
  async function fetchProvincesName(){  
    const response = await fetch(API_PROVINCE)
    const data = await response.json() 
    setProvice(data)
  }

  useEffect(()=> {
    fetchCollegesName()
    fetchProvincesName()
    fetchFirstJsonData()
  },[])

  const [value,setValue] = useState({
    college :'',
    program : '',
    faculty : '',
    jobType : '',
    wageMin : 0,
    wageMax : 0,
    address : '',
    companyName : '' ,
    boost : '',
    enable :true
    // image file test
  })

  const isNumberInput =(e)=>{
    var char = String.fromCharCode(e.which)
    if(!(/[0-9]/.test(char))){
      alert('Please Enter Number')
      e.preventDefault()
    }
    
  }

  const handleChange = (e) => {
    console.log(e.target.name ,e.target.value )
    setValue({
      ...value,
      [e.target.name]:e.target.value
    })
  }
  

  async function handleSubmit (e)  {
    e.preventDefault()
    
    let keyV = ['college' ,'program','faculty','jobType' ,'wageMin' ,'wageMax' ,'address' ,'boost' ,'companyName']

    for (var i =0 ; i < keyV.length ;i++){
      if (value[keyV[i]] === '' || value[keyV[i]] === 0){
        delete value[keyV[i]]
      }
    }

    setPageNumber(0)
    var temp2 = []
    var temp1 = []

    // console.log('value',value)
    const boosted = await axios.post(process.env.REACT_APP_API+'/search/gsb',value)
    temp1 = boosted.data
    // console.log('t1',temp1.length)
    for ( var k = 0 ; k < temp1.length; k++){
      temp2.push(temp1[k])
    }
    const notboosted = await axios.post(process.env.REACT_APP_API+'/search/gsnb',value)
    temp1 = notboosted.data
    // console.log('t1.2',temp1.length)
    for ( var j = 0 ; j < temp1.length; j++){
      temp2.push(temp1[j])
    }
    console.log('sorted res is :',temp2)
    setUsers(temp2)
   
}

  const [users, setUsers] = useState(
    JsonData.slice(0, 0)
  ); /* เลือกผู้ใช้ 20 คน */
  const [pageNumber, setPageNumber] =
    useState(0); /* คลิกที่ปุ่มเเบ่งหน้า state จะเปลี่ยน */

  const usersPerPage = 3; /* หน้านึงเเสดง 3 บล็อก */
  const pagesVisited =
    pageNumber *
    usersPerPage; /* ตัวเเปรที่เก็บหน้าเว็บที่เข้าชม = หมายเลขหน้าปจบ. * จน.ผู้ใช้ต่อหน้า เช่น อยู่ใน page 6 มี item 3 อัน จะได้เท่ากับ 18 ผู้ใช้ที่่เข้าชมเว็บ */

  /* เเสดงเป็นบล็อคๆ โชว์ข้อมูลหน้าผู้ใช้ที่ต้องการ -> เวลาเเบ่งหน้าผู้ใช้*/
  var displayUsers = users
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((users, index) => {
      return (
        // เพิ่มให้คลืกไม่ได้ถ้าไมใช้ role student จะได้ไม่ค้องทำหน้าสมัครงานเพิ่ม
        <Link to={`/applyjob/?id=${users._id}`} class="text-decoration-none" onClick={hdClick} > 
          <div className="">
            {/* ผลการค้นหา ที่เเสดง card ออกมาเป็นบล็อคๆ*/}
            <div className="w-3/4 w-100 h-55 rounded-xl bg-white drop-shadow-md p-2 my-4 font-sans">
              <div className="grid grid-rows-3 grid-flow-col gap-0.5 ">
                {/* ชื่อตำเเหน่งงาน */}
                <div className="row-span-1 col-span-1 ">
                  <div className="px-4 py-1.5 focus:outline-none font-bold text-black text-lg ml-2">
                    {users.jobType}
                    {/* รอเอาค่าจากหลังบ้านมาใส่ */}
                  </div>
                </div>
                  {/*boost post*/}

                {/* ชื่อบริษัท */}
                <div className="row-span-1 col-span-1 ">
                  <div className=" px-4 py-1.5  focus:outline-none text-black ml-2">
                    {users.user.name}
                    {/* รอเอาค่าจากหลังบ้านมาใส่ */}
                  </div>
                </div>

            
                {/* logo company */}
              <div className="row-span-3 grid ml-20 justify-items-center align-items-center">
                <div className="flex w-20 h-20 rounded-xl items-center bg-[#E2E2E2] ">
                  <img
                    src={users.user.img}
                    alt="logoCompany"
                    span="location"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-row ">
              <div className="flex min-w-[50%] ">
                {/* logo address */}
                <img
                  src={Address}
                  alt="logoAddress"
                  className=" h-5 w-5 ml-8"
                  span="location"
                />
                {/* ที่อยู่ address บริษัท */}
                <div className="px-0.5 py-1.5  focus:outline-none ml-2 text-black text-sm ">
                  {users.provinceAddress}
                </div>
              </div>

              <div className="flex min-w-[50%] ">
                {/* เงินเดือน บริษัท */}
                <img
                  src={Salary}
                  alt="logoAddress"
                  className=" h-5 w-5 ml-8"
                  span="location"
                />
                <div className="px-0.5 py-1.5  focus:outline-none ml-2 text-black text-sm">
                    { users.wageMin} - { users.wageMax}
                </div>
              </div>
            </div>
          </div>
          </div>
        </Link>
       
      );
    });

  const pageCount = Math.ceil(
    users.length / usersPerPage
  ); /*ปัดเศษขึ้น ถ้ามี 20 คน/3 = 6.67 ก้มี 7 หน้า -> หน้าที่ 1-6 หน้าละ 3 user ยกเว้นหน้าที่ 7 มี 2 user  */

  /* ฟังก์ชั่นเปลี่ยนหน้า */
  const changePage = ({ selected }) => {
    setPageNumber(
      selected
    ); /*ตัวเลขที่เราต้องการเลื่อนไปทางขวา set page number = จน.ที่ถูกเลือกเท่านั้น*/
  };

  
  return (
    <div className="Send_data ">
      <form onSubmit={handleSubmit}>
        <div className="container w-200  items-center my-5 rounded-xl ">
          <div className="flex flow-row rounded-lg space-x-4 px-4 py-4 ">
            <div className="flex flex-col w-2/4  items-center rounded-xl bg-[#F7FAF7] drop-shadow-lg">
              {/* หน้าค้นหางาน */}
              <div className="flex flex-col w-3/4 gap-3 m-5 ">
                <div className="p-2 font-bold text-black text-2xl ">
                  ค้นหางาน
                </div>
                <div className="flex flex-col space-y-4 m-2">
                  {/* มหาลัย */}
                  <label for="college" className="text-black text-xl">
                    มหาลัย
                  </label>
                  <select
                    name="college"
                    className=" w-100 h-10 rounded-xl bg-white drop-shadow-md  text-zinc-400 
                    focus:outline-none focus:border-[#24AB82] focus:ring-1 focus:ring-[#24AB82]"
                    onChange={handleChange}
                  >
                    <option>ระบุมหาลัยที่ต้องการจะเลือก</option>
                    {colleges.map((item) => (
                      <option>{item.university}</option>
                    ))}
                  </select>

                  {/* คณะ */}
                  <label for="faculty" className="text-black text-xl">
                    คณะ
                  </label>
                  <select
                    name="faculty"
                    className="w-100 h-10 rounded-xl bg-white drop-shadow-md text-zinc-400 
                    focus:outline-none focus:border-[#24AB82] focus:ring-1 focus:ring-[#24AB82]"
                    onChange={handleChange}
                  >
                    <option>ระบุคณะที่ต้องการจะเลือก</option>
                    {facultyList.map((e, idx) => (
                      <option value={e}>{e}</option>
                    ))}
                  </select>

                  {/* สาขา */}
                  <label for="program" className="text-black text-xl">
                    สาขา
                  </label>
                  <select
                    name="program"
                    className="w-100 h-10 rounded-xl bg-white drop-shadow-md text-zinc-400 
                    focus:outline-none focus:border-[#24AB82] focus:ring-1 focus:ring-[#24AB82]"
                    onChange={handleChange}
                  >
                    <option>ระบุสาขาที่ต้องการจะเลือก</option>
                    {programList.map((e, idx) => (
                      <option value={e}>{e}</option>
                    ))}
                  </select>

                  {/* ประเภทงานทั้งหมด */}
                  <label for="jobType" className="text-black text-xl">
                    ประเภทงานทั้งหมด (สาขาอาชีพ)
                  </label>
                  <select
                    name="jobType"
                    className=" w-100 h-10 rounded-xl bg-white drop-shadow-md text-zinc-400 
                    focus:outline-none focus:border-[#24AB82] focus:ring-1 focus:ring-[#24AB82]"
                    onChange={handleChange}
                  >
                    <option>ระบุประเภทงานที่ต้องการจะเลือก</option>
                    {jobTypeList.map((e, idx) => (
                      <option value={e}>{e}</option>
                    ))}
                  </select>

                  {/* สถานที่ทำงาน */}
                  <label for="address" className="text-black text-xl">
                    สถานที่ทำงาน
                  </label>
                  <select
                    name="address"
                    className=" w-100 h-10 rounded-xl bg-white drop-shadow-md text-zinc-400 
                    focus:outline-none focus:border-[#24AB82] focus:ring-1 focus:ring-[#24AB82]"
                    onChange={handleChange}
                  >
                    <option>ระบุสถานทีทำงานที่ต้องการจะเลือก</option>
                    {provinces.map((item, index) => (
                      <option>{item.name_th}</option>
                    ))}
                  </select>

                  {/* เงินเดือน*/}
                  <label for="wage" className="text-black text-xl">
                    เงินเดือน (บาท)
                  </label>
                  <div className="flex flex-row space-x-4 ">
                    {/* ช่วงเงินเดือน-ข้้นต่ำ */}
                    <input
                      name="wageMin"
                      className=" w-2/4 h-10  rounded-xl bg-white drop-shadow-md placeholder:text-zinc-400
                    focus:outline-none focus:border-[#24AB82] focus:ring-1 focus:ring-[#24AB82]
                    disabled:text-[#FF3358] disabled:border-[#FF3358] disabled:shadow-none
                    invalid:border-[#FF3358] invalid:text-[#FF3358] focus:invalid:border-[#FF3358] focus:invalid:ring-[#FF3358]"
                      placeholder="ต่ำสุด"
                      onKeyPress={isNumberInput }
                      onChange={handleChange}
                      autoComplete="none"

                    ></input>
                    <div className="text-xl text-gray-500">-</div>
                    {/* ช่วงเงินเดือน-มากสุด*/}
                    <input
                      name="wageMax"
                      className=" w-2/4 h-10  rounded-xl bg-white drop-shadow-md placeholder:text-zinc-400
                    focus:outline-none focus:border-[#24AB82] focus:ring-1 focus:ring-[#24AB82]
                    disabled:text-[#FF3358] disabled:border-[#FF3358] disabled:shadow-none
                    invalid:border-[#FF3358] invalid:text-[#FF3358] focus:invalid:border-[#FF3358] focus:invalid:ring-[#FF3358] "
                      placeholder="สูงสุด"
                      onKeyPress={isNumberInput}
                      onChange={handleChange}
                      autoComplete="none"
                    
                    ></input>
                  </div>
                </div>

                {/* Button Search*/}
                <div className="flex items-center ml-2.5 mt-3 space-y-4 ">
                  <button
                    className=" bg-[#24AB82] drop-shadow-md font-bold text-white text-2xl rounded-xl px-6 py-2.5 hover:bg-[#1F795E] hover:ring-2 hover:ring-white "
                    disabled={(value.wageMin < 0 || value.wageMax < 0 )|| (value.wageMin > value.wageMax)}
                  >
                    ค้นหา
                  </button>
                </div>
              </div>
            </div>

            {/* หน้าผลการค้นหา */}
            <div className="flex flex-col w-3/4  items-center rounded-2xl  bg-[#F7FAF7] drop-shadow-lg">
                <div className="flex flex-col w-3/4 gap-5 m-5 ">
              <div className="p-2 font-bold text-black text-2xl border-b-4 border-zinc-400 ">
                ผลการค้นหา
              </div>
              {loading
              ? <LoadingCard  count ={3}/>
              : <div className="flex flex-col w-full h-full ">
              {displayUsers}
              <div className="flex h-50  mt-5">
                {/* ปุ่มเปลี่ยนหน้า */}
                <ul className="button-list">
                  <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount} /*นับจำนวนหน้า*/
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                  />
                </ul>
              </div>
            </div>
            }
              

              {/* ผลการค้นหา */}
            </div>
         
             
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Send_data;