
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'rsuite/dist/rsuite.min.css';
import GodloginPage from './pages/godpage/GodloginPage'
import GoddashboardPage from './pages/godpage/GoddashboardPage'
import GodHeader from './components/god/godheader/GodHeader';
import AdminForgot from './components/admin/adminforgotpassword/AdminForgot';
import AdminNewPassword from './components/admin/adminnewpassword/AdminNewPassword';
import Header from './components/menus/header/Header';
import Sidebar from './components/menus/sidebar/Sidebar';
import React, { useState } from 'react';

import AdminDashboardpage from './pages/adminpage/AdminDashboardpage';
import AddtextbooksPage from './pages/godpage/AddtextbooksPage';
import AddcustomerPage from './pages/godpage/AddcustomerPage';
import ViewinstitutionPage from './pages/godpage/ViewinstitutionPage';
import BookdashboardPage from './pages/godpage/BookdashboardPage';
import CustomerdashboardPage from './pages/godpage/CustomerdashboardPage';
import CoursedashboardPage from './pages/godpage/CoursedashboardPage';
import SchoolPage from './pages/godpage/SchoolPage';
import AdminLoginPage from './pages/adminpage/AdminLoginPage';
import AdminFacultyPage from './pages/adminpage/AdminFacultyPage';
import AdminClassPage from './pages/adminpage/AdminClassPage';
import InstitutionAddingPage from './pages/adminpage/InstitutionAddingPage';





function App() {


  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const handleBurgerClick = () => {
      setShowMobileSidebar(true);
  };

  const handleCloseSidebar = () => {
      setShowMobileSidebar(false);
  };

  return (
<div className='App'>
  
<BrowserRouter >
<Routes>


  {/* godside */}
  <Route path="/godlogin" element={<GodloginPage/>}/>
  <Route path="/goddashboard" element={<GoddashboardPage/>}/>
  <Route path="/addcustomer" element={<AddcustomerPage/>}/>
  <Route path='/addbooks' element={<AddtextbooksPage/>}/>
  <Route path='/addbooks/:id' element={<AddtextbooksPage/>}/>
  <Route path='/viewinstitution/:id' element={<ViewinstitutionPage/>}/>
  <Route path='/textbookdashboard' element={<BookdashboardPage/>}/>
  <Route path="/GodHeader" element={<GodHeader/>}/>
  <Route path="/customerdashboard" element={<CustomerdashboardPage/>}/>
  <Route path="/coursedashboard" element={<CoursedashboardPage/>}/>
  <Route path="/school" element={<SchoolPage/>}/>
  

  {/* adminside */}


  <Route path="/adminlogin" element={<AdminLoginPage/>}/>
  <Route path="/admindashboard" element={<AdminDashboardpage/>}/>
  <Route path="/institutionadding" element={<InstitutionAddingPage/>}/>


  <Route path="/adminforgot" element={<AdminForgot/>}/>
  <Route path="/adminnewpassword" element={<AdminNewPassword/>}/>
  <Route path="/adminclassdashboard" element={<AdminClassPage/>}/>
  <Route path="/adminfacultydashboard" element={<AdminFacultyPage/>}/>




{/* menu */}
  <Route path="/header" element={<Header/>}/>
  <Route path="/sidebar" element={<Sidebar/>}/>

 
</Routes>
</BrowserRouter>
</div>
  )
}

export default App
