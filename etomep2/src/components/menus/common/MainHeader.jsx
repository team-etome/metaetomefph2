import React from 'react'
import Header from '../header/Header'
import Sidebar from '../sidebar/Sidebar'
import MobileSidebar from '../sidebar/MobileSidebar'

const MainHeader = () => {

  return (
    <div>
      <Header/>
      <Sidebar/>
      <MobileSidebar/>
    </div>
  )
}

export default MainHeader
