import React from "react";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import MobileSidebar from "../sidebar/MobileSidebar";
import TeacherH from "../../menus/header/TeacherH";


const TeacherHeader = () => {
  return (
    <div>
      
    {/* <TeacherH/> */}
      <Sidebar />
      <MobileSidebar />
    </div>
  );
};

export default TeacherHeader;
