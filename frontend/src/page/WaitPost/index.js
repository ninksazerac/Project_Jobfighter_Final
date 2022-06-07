import React, { useState, useEffect } from "react";
import Edit from "../../assets/pics/edit.png";
import Delete from "../../assets/pics/delete.png";
import Green from "../../assets/pics/green.jpg";
import Yellow from "../../assets/pics/yellow.jpg";
import { getmyPosts, removePost } from "../../api/post";
import moment from "moment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Postjob from "../Postjob/create-post";

const CompanyPost = () => {

  const { user } = useSelector((state) => ({ ...state }));


  const [post, setPost] = useState([]);


  useEffect(() => {
 
    loadPost(user.token);
  }, []);

  
  const loadPost = (authtoken) => {
    //code
    getmyPosts(authtoken) 
      .then(  (res) => {  
      
        console.log('res',res.data)
        setPost(res.data); //  set ตัวแปร post ให้เท่ากับ ข้อมูล Post ทั้งหมดที่โหลดมา
        console.log('post',post)
      })
      .catch((err) => {
        //err
        console.log("Error loadData", err.response.data);
      });
  };

  const handleRemove = (id) => {
    if (window.confirm("Are You Sure Delete!!")) {
      removePost(user.token, id)
        .then((res) => {
          console.log(res);
          loadPost(user.token);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
    
  };

    return (
      <div className="mx-64 my-20 bg-gray-200 shadow  rounded-lg font-sans h-full">
        <div className=" h-20 w-200  bg-green-300  shadow  rounded-lg">
          <div className="p-4 text-center font-bold  text-gray-700 text-3xl ">
            ตารางรอการโพสต์
          </div>
        </div>
        <div className="font-bold  text-gray-700 m-4 text-xl">ตารางโพสต์</div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-10">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {/* ชื่อคอลัมต่างๆฃแถวด้านบนสุด */}
                <th scope="col" className="px-6 py-3">
                  No.
                </th>
                <th scope="col" className="px-6 py-3">
                  สถานะ
                </th>
                <th scope="col" className="px-6 py-3">
                  ตำแหน่ง
                </th>
                <th scope="col" className="px-6 py-3">
                  อันตราที่รับ
                </th>
                <th scope="col" className="px-10 py-3">
                  วันที่โพสต์
                </th>

                <th scope="col" className="px-6 py-3">
                  แก้ไขการโพสต์
                </th>
              </tr>
            </thead>
            <tbody>
              { post.map((item, index) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-black dark:text-white whitespace-nowrap"
                >
                  {index+1} {/* No. */}
                </th>
                <td className="px-6 py-4 m-4">
                <img className="h-6 w-6" src={item.enable ? Green : Yellow}></img>
                  {/* สถานะ */}
                </td>
                <td className="px-6 py-4">{item.position}</td>  {/* ตำแหน่ง */}
                <td className="px-6 py-4">{item.rate}</td> {/* อันตราที่รับ */}
                <td className="px-6 py-4">{moment(item.createdAt).format('DD-MM-YYYY')}</td> {/* วันที่โพสต์ */}
                <td className="px-6 py-4">
                  <div className="flex flex-row ml-auto space-x-5 items-center">
                    <a >
                    <Link to={'/postjob/'+ item._id}>
                      <img className="h-6 w-6" src={Edit} >
                        </img> {/* แก้ไข */}
                        </Link>
                    </a>
                    <a >
                    
                      <img className="h-6 w-6" src={Delete} onClick={() => handleRemove(item._id)}></img> {/* ลบ */}
                    </a>
                  </div>
                </td>
              </tr>

              
              ))}

            </tbody>
          </table>
        </div>
        <div className="h-10 w-200 bg-gray-200   rounded-lg "></div>
      </div>
    );
  }

export default CompanyPost;
