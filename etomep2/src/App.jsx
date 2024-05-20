
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import GodloginPage from './pages/godpage/GodloginPage'
import GoddashboardPage from './pages/godpage/GoddashboardPage'
import AddCustomer from './components/god/addinstitution/AddCustomer';
import AddBooks from './components/god/addtextbook/AddBooks';
import ViewInstitution from './components/god/viewinstitution/ViewInstitution';
import BookdashBoard from './components/god/textbookdashboard/BookdashBoard';
import ViewTextbook from './components/god/viewtextbook/ViewTextbook';
import GodHeader from './components/god/godheader/GodHeader';
import Customerdashboard from './components/god/customerdashboard/Customerdashboard';
import Coursedashboard from './components/god/coursedashboard/Coursedashboard';
import School from './components/god/addcourse/School';
import AdminLogin from './components/admin/adminlogin/AdminLogin';
import AdminDashboard from './components/admin/admindashboard/AdminDashboard';
import AdminForgot from './components/admin/adminforgotpassword/AdminForgot';
import AdminNewPassword from './components/admin/adminnewpassword/AdminNewPassword';
import Header from './components/menus/header/Header';
import Sidebar from './components/menus/sidebar/Sidebar';




function App() {


  return (
<div className='App'>
<BrowserRouter>
<Routes>


  {/* godside */}
  <Route path="/" element={<GodloginPage/>}/>
  <Route path="/goddashboard" element={<GoddashboardPage/>}/>
  <Route path="/addcustomer" element={<AddCustomer/>}/>
  <Route path='/addbooks' element={<AddBooks/>}/>
  <Route path='/addbooks/:id' element={<AddBooks/>}/>
  <Route path='/viewinstitution/:id' element={<ViewInstitution/>}/>
  <Route path='/textbookdashboard' element={<BookdashBoard/>}/>
  <Route path='/ViewTextbook' element={<ViewTextbook/>}/>
  <Route path="/GodHeader" element={<GodHeader/>}/>
  <Route path="/customerdashboard" element={<Customerdashboard/>}/>
  <Route path="/coursedashboard" element={<Coursedashboard/>}/>
  <Route path="/school" element={<School/>}/>
  

  {/* adminside */}
  <Route path="/adminlogin" element={<AdminLogin/>}/>
  <Route path="/admindashboard" element={<AdminDashboard/>}/>
  <Route path="/adminforgot" element={<AdminForgot/>}/>
  <Route path="/adminnewpassword" element={<AdminNewPassword/>}/>


{/* menu */}
  <Route path="/header" element={<Header/>}/>
  <Route path="/sidebar" element={<Sidebar/>}/>

 
</Routes>
</BrowserRouter>
</div>
  )
}

export default App
