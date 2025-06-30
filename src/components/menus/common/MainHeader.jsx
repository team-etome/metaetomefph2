import React, { useState } from 'react'
import Header from '../header/Header'
import Sidebar from '../sidebar/Sidebar'
import MobileSidebar from '../sidebar/MobileSidebar'
import Newsidebar from '../sidebar/Newsidebar'
import NewHeader from '../header/NewHeader'

const MainHeader = () => {
  const [activeItemLabel, setActiveItemLabel] = useState('');

  return (
    <div>

      <Newsidebar setActiveItemLabel={setActiveItemLabel} />
      {/* <NewHeader activeItemLabel={activeItemLabel} /> */}
      {/* <Header/> */}
      {/* <Sidebar/> */}
      <MobileSidebar />

    </div>
  )
}

export default MainHeader
