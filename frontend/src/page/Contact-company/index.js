import React, {useRef, useState} from "react";
import Typography from '@material-ui/core/Typography';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Contact-company.css";
import { useNavigate } from "react-router-dom";

export default function Contact(){ 
const notosan1=createTheme({
    typography:{
      subtitle1:{
        fontSize:35,
        fontWeight:'bold',
        fontFamily: [
          'Noto Sans Thai',
          'sans-serif',
        ].join(','),
      },
      body1:{
        fontSize:30,
        fontFamily: [
          'Noto Sans Thai',
          'sans-serif',
        ].join(','),
      },
      body2:{
        fontSize:18,
        fontWeight:500,
        fontFamily: [
          'Noto Sans Thai',
          'sans-serif',
        ].join(','),
      }
    },
  });
  const navigate = useNavigate()
const handleSubmit = (e) => {
    e.preventDefault();
      emailjs.sendForm('service_xy8spft', 'template_ig1l1n1',e.target,'cM7rn-MmV7ZI79OUZ')     
      .then((result) => {
        console.log(result.text);
        e.target.reset();
        toast("ส่งแบบฟอร์มสำเร็จ!");
        navigate('/homecompany')
    }, (error) => {
        console.log(error.text);
    });  
  };

  

const isEmpty=()=>{
  let full_name = document.getElementById("full_name").value;
  let email = document.getElementById("email").value;
  let message = document.getElementById("message").value;
  let btn = document.getElementById("btn");
  if (full_name==""||email==""||message==""){
      setTimeout(()=>btn.disabled=true,"2 second");
  }
  else{
    setTimeout(()=>btn.disabled=false,"2 second");
  }
  };


  return(
    <ThemeProvider theme={notosan1}>
       
        <div className=" h-20 w-200 bg-green-300 rounded-t-lg mx-36 mt-8">
        <div div className="flex items-center justify-center pt-2.5">
            <Typography variant="subtitle1">
                ติดต่อสอบถาม
            </Typography>
            </div>
        </div>

        
        <div className=" w-200  bg-gray-200  shadow-lg md:drop-shadow-xl rounded-b-lg mx-36 mb-10 mt-0 shadow-black">
        <div className="flex flex-col space-y-4 ">
        <form onSubmit={handleSubmit}>
            {/* ชื่อนามกุล */}
            <div className="mt-4 ml-7 mr-7">
            <Typography variant="body1">
                ชื่อ-นามสกุล
            </Typography>
            <input type="text"
                name="full_name"
                id="full_name"
                className="h-10 w-full text-black text-sm rounded-lg ring-2 ring-black focus:ring-black-500 focus:border-black-500 block mt-2 pl-3"
                placeholder="กรุณากรอกชื่อจริง นามสกุล..."
                onKeyUp={isEmpty}
                
                ></input>
                
            </div>

            {/* อีเมลล์ */}
            <div className="mt-4 ml-7 mr-7">
            <Typography variant="body1">
                อีเมลล์ติดต่อ
            </Typography>
            <input type="email"
                name="email"
                id="email"
                className="h-10 w-full text-black text-sm rounded-lg ring-2 ring-black focus:ring-black-500 focus:border-black-500 block mt-2 pl-3"
                placeholder="example@gmail.com"
                onKeyUp={isEmpty}
                
                ></input>
                
            </div>

            {/* รายละเอียดงาน */}
            <div className="mt-4 ml-7 mr-7">
            <Typography variant="body1">
                รายละเอียดงาน
            </Typography>
            <textarea name="message" className="message" rows="4" class="mt-2 pl-3 mb-4 pt-2 w-full rounded-lg ring-2 ring-black"
              placeholder="กรุณากรอกรายละเอียด..."
              id="message"
              onKeyUp={isEmpty}
              ></textarea>
              
            </div>

            {/* ปุ่มกดส่ง */}
            
            <div className="flex items-center justify-center">
            <button type="submit"
              id="btn"
              class="bg-[#24AB82] drop-shadow-md font-bold text-white text-2xl rounded-xl px-6 py-2.5 mt-3 mb-4 hover:bg-[#1F795E] hover:ring-2 hover:ring-white focus:ring-2 focus:ring-white focus:outline-none "
              disabled="true"
            >
              <Typography variant="body1">
              ส่งข้อความ
              </Typography>
            </button>
            
           
            </div>
            
            
            </form>
        </div>
        </div>
        
    </ThemeProvider>
  );

  
}

