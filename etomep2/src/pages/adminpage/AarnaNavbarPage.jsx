import React from 'react'
import AarnaNavbar from '../../components/admin/aarnanavbar/AarnaNavbar'
import MainHeader from '../../components/menus/common/MainHeader/';
import NewAarnaNavbar from '../../components/admin/aarnanavbar/NewAarnaNavbar';


function  AarnaNavbarPage() {
  return (
    <div style={{backgroundColor:"#f9f9f9"}}>
      <MainHeader/>
      {/* <AarnaNavbar/> */}
      <NewAarnaNavbar/>
    </div>
  )
}

export default AarnaNavbarPage