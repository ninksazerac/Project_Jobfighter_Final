import React from "react";
import Nunt from "../../assets/pics/Nunt.jpg";
import Ploy from "../../assets/pics/Ploy.jpg";
import Junior from "../../assets/pics/Junior.jpg";
import Nink from "../../assets/pics/Nink.jpg";
import Phe from "../../assets/pics/Phe.jpg";

const index = () => {
  return (
    <div className="mx-20 my-20 bg-[#F2EFEF] rounded-lg ">
      <div className=" h-20 w-200  bg-[#69F0AE] rounded-lg">
        <div className=" p-4 font-bold text-black text-2xl text-center">
          เกี่ยวกับเรา
        </div>
      </div>
      <div className="flex flex-row drop-shadow-md">
        {/* Nunt  */}
        <div className="w-1/5 h-120 my-5 mx-5 bg-white rounded-lg">
          <img class="rounded-t-lg w-full h-2/4" src={Nunt} alt="aboutus" />
          <div className="inner p-4 my-3 text-center text-xl font-semibold text-black ">
            <p>นนทิชา</p>
            <p>สุขเจริญ</p>
            <span className="mt-3 text-center text-base text-gray-400">
              วิศวกรรมคอมพิวเตอร์
            </span>
          </div>
        </div>

        {/* Ploy  */}
        <div className="w-1/5 my-5 mx-5 bg-white rounded-lg">
          <img class="rounded-t-lg w-full h-2/4" src={Ploy} alt="aboutus" />
          <div className="inner p-4 my-3 text-center text-xl font-semibold text-black ">
            <p>นภสร </p>
            <p>ชาลานุมาศ</p>
            <span className="mt-3 text-center text-base text-gray-400">
              วิศวกรรมคอมพิวเตอร์
            </span>
          </div>
        </div>

          {/* Junior */}
        <div className="w-1/5 my-5 mx-5 bg-white rounded-lg">
          <img class="rounded-t-lg w-full h-2/4" src={Junior} alt="aboutus" />
          <div className="inner p-4 my-3 text-center text-xl font-semibold text-black ">
            <p>ปุณณวิชญ์</p>
            <p>พานิชผล</p>
            <span className="mt-3 text-center text-base text-gray-400">
              วิศวกรรมคอมพิวเตอร์
            </span>
          </div>
        </div>

        {/* Nink*/}
        <div className="w-1/5 my-5 mx-5 bg-white rounded-lg">
          <img class="rounded-t-lg w-full h-2/4" src={Nink} alt="aboutus" />
          <div className="inner p-4 my-3 text-center text-xl font-semibold text-black ">
            <p>พัณณ์ชิตา</p>
            <p>ธีรพัฒนโรจน์</p>
            <span className="mt-3 text-center text-base text-gray-400">
              วิศวกรรมคอมพิวเตอร์
            </span>
          </div>
        </div>

        {/* Phe */}
        <div className="w-1/5 my-5 mx-5 bg-white rounded-lg">
          <img class="rounded-t-lg w-full h-2/4" src={Phe} alt="aboutus" />
          <div className="inner p-4 my-3 text-center text-xl font-semibold text-black ">
            <p>พีระภัทร์</p>
            <p> เศรษฐพรนรา</p>
            <span className="mt-3 text-center text-base text-gray-400">
              วิศวกรรมคอมพิวเตอร์
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default index;
