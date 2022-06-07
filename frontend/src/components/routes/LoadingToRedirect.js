import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {

    const interval = setInterval(() => {
      // set count เริ่มที่ สร้างตัวแปร currentCount ซึ่งเท่ากับ 3 => --currentCount ลดทีละ 1 
      setCount((currentCount) => --currentCount);    // นับถอยหลัง 3 2 1
    }, 1000);    // 1000 คือ 1 วินาที
    // Redirect
    count === 0 && navigate("/");    // ถ้า count == 0 แล้วให้เด้งไปหน้า login

    return () => clearInterval(interval);    // clear ค่า
  }, [count]);                               // clear ค้า

  return (
  <div>
    <h2>No Permission, redirect in {count}</h2>
  </div>)
};

export default LoadingToRedirect;
