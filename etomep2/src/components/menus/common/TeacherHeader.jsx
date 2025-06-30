import React,{ useState} from "react";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import MobileSidebar from "../sidebar/MobileSidebar";
import TeacherH from "../../menus/header/TeacherH";
import Newsidebar from "../sidebar/Newsidebar";


const TeacherHeader = () => {
  
    const [activeItemLabel, setActiveItemLabel] = useState('');
  return (
    <div>
      
    {/* <TeacherH/> */}
      {/* <Sidebar />
      //  */}
      <Newsidebar setActiveItemLabel={setActiveItemLabel} />
      <MobileSidebar />
    </div>
  );
};

export default TeacherHeader;
