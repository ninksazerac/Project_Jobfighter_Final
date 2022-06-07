import React from "react";
import Typography from '@material-ui/core/Typography';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import "./Payment-company.css";
import qr from "../../assets/pics/QR_code_for_mobile_English_Wikipedia.svg.webp";
import MyFileBase64 from "../../components/file-base64";
import { useState,useEffect  } from "react";
import { useSelector } from "react-redux";
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Paymentcompany(){

    let { user } = useSelector((state) => ({ ...state }));
    const navigate = useNavigate()
    const [PayData,SetPayData] = useState([])
    const [value,setValue] = useState({
        payname :'',
        paydate : '',
        slipimg : '',
      })


    const handleChange = (e) => {
        console.log(e.target.name ,e.target.value )
        setValue({
            ...value,
            [e.target.name]:e.target.value
          })
      }
     
      //submitbutton
      async function handleClick  (e)   {
       
        const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
          });
        let valueX = params.id;

        const response = await  axios.put(process.env.REACT_APP_API+`/posts/pay/${valueX}`, value ,{headers:{'authorization':`Bearer ${user.token}`}} )
        .then((res) => {
          toast.success("Payment Success");
          navigate('/homecompany')
        }).catch((err) =>{
          toast.error("Error: Something Wrog");
        })
     
    }
    
      async function fetchFirstJsonData(valueX)    {
        const response = await  axios.get(process.env.REACT_APP_API+`/posts/pay/${valueX}`,{headers:{'authorization':`Bearer ${user.token}`}} )
        console.log('response is ::::', response)
        SetPayData(response.data)
        
    }

    useEffect(()=> {
        console.log('userid:',user.id)
        const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
          });
        let valueX = params.id;
        fetchFirstJsonData(valueX)    

    },[])
    
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
            fontSize:25,
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
    return(
        <ThemeProvider theme={notosan1}>
            <div className=" h-20 w-200 bg-green-300 rounded-t-lg mx-10 mt-8">

            {/* หัวข้อ */}
            <div div className="flex items-center justify-center pt-2.5">
            <Typography variant="subtitle1">
                ชำระเงิน
            </Typography>
            </div>
            </div>
            <div className=" w-200  bg-gray-200  shadow-lg md:drop-shadow-xl rounded-b-lg mx-10 mb-10 mt-0 shadow-black">
            
            <div className="flex space-x-28 ">
            

            {/* ฝั่งซ้าย */}
            {/* หัว */}
            <div className="flex flex-col space-y-4 mt-5 ml-40 items-center justify-center">
                <Typography variant="body1">
                แสกน QR code เพื่อชำระเงิน
                </Typography>
            {/* qr code */}
            <div className="flex flex-wrap justify-center">
            <img
            src={qr}
            class="p-1 bg-white border rounded-lg max-w-sm shadow-sm"
            alt="..."
            />
            </div>

            {/* ราคา */}
            <div className="h-48 w-[500px] bg-green-300 mb-5 rounded-lg shadow-sm">
                <div className="flex space-x-6">
                    <div className="flex flex-col space-y-6 ml-5 mt-3">
                    <Typography variant="body1">
                        ราคา Post {PayData.postExpireIn} ชั่วโมง
                        </Typography>
                    <Typography variant="body1">
                        ราคา Boost Post {PayData.postExpireIn} ชั่วโมง
                    </Typography>
                    <Typography variant="body1">
                        รวมสุทธิ
                    </Typography>
                    </div>


                    <div className="flex flex-col space-y-5 ml-5 mt-3">
                    <div className="w-64 h-10 bg-white rounded-lg shadow-sm text-center">
                    <Typography variant="body1">
                         {PayData.calPrice}
                        </Typography>
                        </div>
                    <div className="w-64 h-10 bg-white rounded-lg shadow-sm text-center">
                    <Typography variant="body1">
                         {PayData.boostPrice}
                        </Typography>
                        </div>
                    <div className="w-64 h-10 bg-white rounded-lg shadow-sm text-center">
                    <Typography variant="body1">
                         {PayData.totalPrice}
                        </Typography>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            {/* ฝั่งขวา */}
            <div class="flex space-x-10">
            <div class="flex flex-col space-y-7 mt-48">
                <div>
                <Typography variant="body1">
                        ชื่อ-นามสกุล ผู้โอนเงิน
                        </Typography> 
                </div>
                <div>
                <Typography variant="body1">
                        วันที่โอนเงิน
                        </Typography>
                </div>
                <div>
                <Typography variant="body1">
                        แนบไฟล์**
                        </Typography>
                <Typography variant="body1">
                        สลิปการชำระเงิน
                        </Typography>
                </div>
                
                </div>
            <div class="flex flex-col space-y-7 mt-48">
            <div className="w-full h-10 bg-white rounded-lg shadow-sm text-center">
                    <input type="text" name = 'payname' onChange= { handleChange } require
                    // onKeyPress = {isCharInput}
                        className="text-black text-center text-sm rounded-lg ring-2 ring-black focus:ring-black-500 focus:border-black-500 block w-full p-2.5"
                        placeholder="สมหญิง เหนี่ยวไกล">
                    </input>
                        </div>

                    <div className="w-full h-10 bg-white rounded-lg shadow-sm text-center">
                    <input type="text" name = 'paydate'  onChange= { handleChange }require
                        className="text-black text-center text-sm rounded-lg ring-2 ring-black focus:ring-black-500 focus:border-black-500 block w-full p-2.5"
                        placeholder="01/12/2022">
                    </input>
                        </div>

                    <div className="h-10">
                    <MyFileBase64
                        require
                        mutiple={false}
                        onDone={({ base64 }) => setValue({ ...value, slipimg: base64 })}/>
                        </div>

                </div>
            </div>
            </div>
            <div className="absolute right-10 bottom-2">
            <button
              class="bg-[#24AB82] drop-shadow-md font-bold text-white text-2xl rounded-xl px-6 py-2.5 mt-5 mb-4 hover:bg-[#1F795E] hover:ring-2 hover:ring-white focus:ring-2 focus:ring-white focus:outline-none "
            onClick={handleClick} disabled = {value.paydate===''||value.payname===''||value.slipimg===''||value.slipimg===null}
            >
              <Typography variant="body1">
              ชำระเงิน
              </Typography>
                  </button>
            </div>
            </div>
        </ThemeProvider>
    );
}