import React from "react";
import {Link} from 'react-router-dom';


function Footer() {
  return (
    <div className="p-4 bg-green-300 shadow md:px-6 md:py-5 mb-0 text-decoration: none position:fixed bottom-0 font-sans;
    ">
      <div className="sm:flex sm:items-center sm:justify-between text-decoration: none text-black ">
        <h1 style={{ color: "black", textAlign: "left" }}>Jobfighter</h1>

  
        <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400 ">
          <li>
            <Link to="/aboutus" className="mr-20 no-underline rounded text-[#000000] hover:text-[#FFFFFF] cursor-pointer text-lg font-sans ">
              เกี่ยวกับเรา
            </Link>
          </li>
          <li>
          </li>
        </ul>
      </div>


      <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

      <span className="block text-base text-gray-500 sm:text-center dark:text-gray-400 ">
        © 2022 Jobfighter{" "}
      
      </span>

    </div>
  );
};

export default Footer;