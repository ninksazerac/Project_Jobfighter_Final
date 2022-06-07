import React, { useState, useEffect } from "react";
import { Switch, Checkbox ,Tag, Modal,  } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import MenubarAdmin from "../../components/navbar/NavbarAdmin";
import { useSelector } from "react-redux";
import "antd/dist/antd.css";
import momentTH from "moment/min/moment-with-locales";
import moment from "moment";

import { 
  listPost, 
  changeEnable, 
  removePost
} from "../../api/post";
import axios from "axios";

const ManageAdmin = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [post, setPost] = useState([]);

  async function fetchfirstdata(authtoken) {
    await  axios.get(process.env.REACT_APP_API+'/posts/adget/xx',{headers:{'authorization':`Bearer ${user.token}`}}).then((res)=>{setPost(res.data)
      console.log(res.data)
    })
  }

  console.log("data in useState", post);
  useEffect(() => {
    //code
    fetchfirstdata(user.token);
    //loadPost(user.token);
  }, []);

  // load ข้อมูลมาใส่ใน state [post,setPost]
  const loadPost = (authtoken) => {
    //code
    listPost(authtoken) // ดึงข้อมูล Post ทั้งหมดมา 
      .then((res) => {  
        //code
        setPost(res.data); //  set ตัวแปร post ให้เท่ากับ ข้อมูล Post ทั้งหมดที่โหลดมา
      })
      .catch((err) => {
        //err
        console.log("Error loadData", err.response.data);
      });
  };

  const handlechangeEnable = (e, id) => {
    const value = {
      id: id,
      enable: e,
    };
  
    changeEnable(user.token, value)
      .then((res) => {
        console.log("Enable Changed", res); // แสดงข้อมูลโพสที่ถูก change enable ไป
        fetchfirstdata(user.token)
        //loadPost(user.token); // เรียกใช้ loadData เพื่อเอาข้อมูลล่าสุดของโพสทั้งหมด หลังจากเปลี่ยนแปลง
      })
      .catch((err) => {
        console.log(err.response);
      });
  };


  // const handleChangeRole = (e, id) => {
  //   let values = {
  //     id: id,
  //     role: e,
  //   };
  //   changeRole(user.token, values)
  //     .then((res) => {
  //       console.log(res);
  //       loadData(user.token);
  //     })
  //     .catch((err) => {
  //       console.log(err.response);
  //     });
  // };
  const handleRemove = (id) => {
    if (window.confirm("Are You Sure Delete!!")) {
      removePost(user.token, id)
        .then((res) => {
          console.log(res);
          fetchfirstdata(user.token)
          //loadPost(user.token);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };
  return (
    
    <div className="container-fluid">
      <MenubarAdmin />
      <div className="row">
        <div className="col-md-2">
          
        </div>

        <div className="col">
          <h1>ManageAdmin Page</h1>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">created</th>
                <th scope="col">updated</th> {/*accept post*/}
                <th scope="col">email</th>
                <th scope="col">name</th>
                <th scope="col">boost</th>
                <th scope="col">status</th>
                <th scope="col">actions</th> {/*delete post*/}
              </tr>
            </thead>
            <tbody>
              {post.map((item, index) => (
                <tr>
                  <td scope="row">{moment(item.createdAt).format('DD-MM-YYYY')}</td>
                  <td scope="row">{momentTH(item.updatedAt).locale('th').startOf(item.updatedAt).fromNow()}</td>
                  <td scope="row">{item.user.email}</td>
                  <td scope="row">{item.user.name}</td>

                  <td>
                    <Checkbox 
                      checked={item.boost}
                    />
                  </td>

                  <td>
                    <Switch 
                      checked={item.enable}
                      onChange={(e) => handlechangeEnable(e, item._id)}
                      
                    />
                    
                  </td>
                  <td>
                    <DeleteOutlined onClick={() => handleRemove(item._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageAdmin;
