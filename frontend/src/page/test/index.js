import React from "react";
import Profile from "../../assets/pics/profile-company.png";

class A extends React.Component {
  state = {
    username: "",
    password: "",
  };

  setValue = (fieldName) => (evt) =>
    this.setState({ [fieldName]: evt.target.value });

  render() {
    const {
      name,
      email,
      tel,
      address,
      bisiness,
      details,
      welfare,
      fileProfile,
    } = this.state;
    const fix = true;
    return (
      <div className="mx-80 my-20 bg-gray-200 shadow  rounded-lg font-sans">
        <div className=" h-20 w-200  bg-green-300  shadow  rounded-lg">
          <div className="p-4 text-center font-bold  text-gray-700 text-3xl ">
            โปรไฟล์บริษัท
          </div>
        </div>
        <form>
          <div className="font-bold  text-gray-700 m-4 text-xl">
            ข้อมูลบริษัท
          </div>
          <div className="flex justify-center">
            <img
              className="h-36 w-36"
              img
              src={Profile}
              alt="profile"

              // รูปภาพ
            />
          </div>
          <div className="flex justify-center w-64 mx-80">
            <input
              className="form-control block text-base font-normal text-gray-700  bg-white bg-clip-padding border  border-solid border-gray-300 rounded transition ease-in-out mt-3 mb-4 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
              type="file"
              id="fileProfile"
              onChange={this.setValue("fileProfile")}
              value={fileProfile}
              required
            ></input>
          </div>

          <div className="m-4 ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              // ชื่อ-นามสกุล
            >
              ชื่อบริษัท *
            </label>
            <input
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal w-full text-gray-400 focus:text-black focus:ring-blue-300 focus:ring-2 disabled"
              id="name"
              type="text"
              onChange={this.setValue("name")}
              value={name}
              placeholder="ชื่อ-นามสกุล"
              required
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
                className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal w-96 text-gray-400 focus:text-black focus:ring-blue-300 focus:ring-2"
                id="email"
                type="email"
                onChange={this.setValue("email")}
                value={email}
                placeholder="jane@example.com"
                required
              />

              <input
                className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal w-96 border-solid text-gray-400 focus:text-black focus:ring-blue-300 focus:ring-2"
                id="tel"
                type="tel"
                onChange={this.setValue("tel")}
                value={tel}
                placeholder="0800000000"
                required
              />
            </div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2 mt-4"
              // ลักษณะธุรกิจ
            >
              ลักษณะธุรกิจ *
            </label>
            <select
              value={bisiness}
              onChange={this.setValue("bisiness")}
              id="bisiness"
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 text-gray-400 focus:text-black rounded-lg py-2 px-4 block leading-normal w-full focus:ring-blue-300 focus:ring-2"
              aria-label="Default select example"
            >
              <option selected>ระบุลักษณะธุรกิจ</option>
              <option value="1">บลาๆ</option>
              <option value="2">บลาๆๆ</option>
              <option value="3">บลาๆๆๆ</option>
            </select>
            <label
              className="block text-gray-700 text-sm font-bold mb-2 mt-4"
              // รายละเอียด
            >
              รายละเอียดเกี่ยวกับบริษัทและการดำเนินการ
            </label>
            <textarea
              className="resize-none bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal w-full text-gray-400 focus:text-black focus:ring-blue-300 focus:ring-2"
              id="details"
              onChange={this.setValue("details")}
              value={details}
              rows="5"
              placeholder="รายละเอียดเกี่ยวกับบริษัท"
            ></textarea>
            <label
              className="block text-gray-700 text-sm font-bold mb-2 mt-4"
              // สวัสดิการ
            >
              สวัสดิการ
            </label>
            <textarea
              className="resize-none bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal w-full text-gray-400 focus:text-black focus:ring-blue-300 focus:ring-2"
              id="welfare"
              onChange={this.setValue("welfare")}
              value={welfare}
              rows="3"
              placeholder="รายละเอียดสวัสดิการ"
            ></textarea>
            <label
              className="block text-gray-700 text-sm font-bold mb-2 mt-4"
              // ที่อยู่
            >
              ที่อยู่
            </label>
            <textarea
              className="resize-none bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal w-full text-gray-400 focus:text-black focus:ring-blue-300 focus:ring-2"
              id="address"
              onChange={this.setValue("address")}
              value={address}
              rows="3"
              placeholder="รายละเอียดที่อยู่"
            ></textarea>
          </div>

          <div className="m-4">
            <div className="flex space-x-12 justify-center mt-4 ">
              <button
                className="inline-block px-7 py-3 bg-[#da3d3d] text-white text-md font-bold  leading-tight uppercase rounded shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none  hover:bg-[#a12727]  hover:ring-2 hover:ring-white active:shadow-lg transition duration-150 ease-in-out"
                id="change"
              >
                แก้ไข
              </button>
              <a
              // path กดตกลง
              >
                <button
                  type="submit"
                  className="inline-block px-7 py-3 bg-[#24AB82] text-white text-md font-bold leading-tight uppercase rounded shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none  hover:bg-[#1F795E] hover:ring-2 hover:ring-white active:shadow-lg transition duration-150 ease-in-out"
                  id="submit"
                  fix={false}
                >
                  ตกลง
                </button>
              </a>
            </div>
            <div className="h-10 w-200 bg-gray-200   rounded-lg ">{fix}</div>
          </div>
        </form>
      </div>
    );
  }
}
export default A;
