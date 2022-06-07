import React from 'react'
import {useState , useEffect} from "react";
import axios from 'axios';


const SubmitJob = (req ,res ) => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  let value = params.id;
  console.log('value kuy kuy : ',value)
  
  const [PostData,SetPostData] = useState([])

  let JsonData ;
  
  async function testbutton (e)  {
    console.log('clicked')
    const response = await  axios.put(process.env.REACT_APP_API+`/search/${PostData._id}`)
    console.log('uid : ',response.data.user._id)
    console.log('usersubmited : ',response.data.userSubmit) // อย่าลืมใส่ [index] ระบุตัวตอนเรียก เเละ กำหนด setPostData ไม่งั้นจะ Search ไม่เจอใน response 

  }


  async function fetchFirstJsonData(value){  
    const response = await  axios.get(process.env.REACT_APP_API+`/search/${value}`)
    JsonData = response.data
    console.log(response)
    SetPostData(JsonData)
  }

  useEffect(()=> {
    fetchFirstJsonData(value)
  },[])

  console.log('PostData : ',PostData)

  // console.log('PostData : ',PostData)

  return (
    <div> SubmitJOB PAGE
      <h1>{PostData.desc}</h1>
      <h1>{PostData.benefit}</h1>
      <h1>{PostData.college}</h1>
      <h1>{PostData.jobType}</h1>

      <div className="flex items-center justify-center">
            <button
              class="bg-[#24AB82] drop-shadow-md font-bold text-white text-2xl rounded-xl px-6 py-2.5 mt-5 mb-4 hover:bg-[#1F795E] hover:ring-2 hover:ring-white focus:ring-2 focus:ring-white focus:outline-none " 
            onClick={testbutton}
            >
                  </button>
        </div>

    </div>
  )
}

export default SubmitJob