import React from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import LogoJF from "../../assets/logoJF/LogoJF.svg"; //อยู่คนละ folder ต้องเพิ่ม ../
import Profile from "../../assets/pics/Profile.png";
import { Link } from  'react-router-dom';


/* ใส่ path ตรงนี้ + ข้างล่างตรง Profile บรรทัดที่ 109 กับ 128 */
const navigation = [
  { name: "หน้าหลัก", link: "/homecompany", current: false },
  { name: "ค้นหางาน", link: "/search", current: false },
  { name: "ใบสมัคร", link: "/applicantcompany", current: false },
  { name: "ประวัติการโพสต์", link: "/companypost", current: false },
  { name: "ติดต่อสอบถาม", link: "/contactcompany", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  return (
    <Disclosure as="nav" className="border-b-[1.5px] bg-white">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="no-underline selection:inline-flex items-center justify-center p-2 rounded-md text-black hover:text-white hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              {/* logo */}
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start no-underline">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    img
                    src={LogoJF}
                    alt="logo"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    img
                    src={LogoJF}
                    alt="logo"
                  />
                </div>

                {/* เเก้สีตัวอักษร navbar */}
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-6">
                    {navigation.map((item) => (
                      <Link to = {item.link} className='no-underline font-sans'>
                      <a
                        key={item.name}
                        link={item.link}
                        className={classNames(
                          item.current
                            ? "bg-teal-400 text-white no-underline"
                            : "no-underline text-black hover:bg-teal-400 hover:text-white",
                          "text-decoration: none",
                          "px-3 py-2 rounded-md text-sm font-medium no-underline"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-white flex text-sm rounded-full  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-teal-400 focus:ring-teal-400">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        img
                        src={Profile}
                        alt="Profile"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none , text-decoration: none">
                      {/* Profile */}
                      <Menu.Item>
                        {({ active }) => (
                          <Link to
                            ={"/profileCompany"} /* ใส่ path ไปหน้า Profile */
                            className={classNames(
                              active ? "bg-teal-400 no-underline" : "",
                              "no-underline block px-4 py-2 text-sm text-black"
                            )}
                          >
                            Profile
                          </Link>
                        )}
                      </Menu.Item>

                      {/* Signout */}
                      <Menu.Item>
                        {({ active }) => (
                          <Link to
                          ={"/"} /* ใส่ pathไป logout */
                            className={classNames(
                              active ? "bg-teal-400 no-underline" : "",
                              "no-underline block px-4 py-2 text-sm text-black"
                            )}
                          >
                            Sign out
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link to = {item.link} className='no-underline'>
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  link={item.link}
                  className={classNames(
                    item.current
                      ? "bg-teal-400 text-white no-underline"
                      : "no-underline text-gray-300 hover:bg-teal-400 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium no-underline"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
