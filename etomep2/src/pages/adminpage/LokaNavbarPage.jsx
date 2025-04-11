import React from 'react'
import NavbarLoka from '../../components/admin/lokanavbar/NavbarLoka'
import MainHeader from "../../components/menus/common/MainHeader/";
import NewNavbarLoka from '../../components/admin/newlokanavbar/NewNavbarLoka';


function LokaNavbarPage() {
  return (
    <div style={{backgroundColor:"#f9f9f9"}}>
        <MainHeader />
        {/* <NavbarLoka/> */}
        <NewNavbarLoka/>
    </div>
  )
}

export default LokaNavbarPage