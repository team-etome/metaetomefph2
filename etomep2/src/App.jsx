
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
import Header from './components/god/header/Header';
import Customerdashboard from './components/god/customerdashboard/Customerdashboard';



function App() {


  return (
<div className='App'>
<BrowserRouter>
<Routes>


  {/* godside */}
  <Route path="/godlogin" element={<GodloginPage/>}/>
  <Route path="/goddashboard" element={<GoddashboardPage/>}/>
  <Route path="/addcustomer" element={<AddCustomer/>}/>
  <Route path='/addbooks' element={<AddBooks/>}/>
  <Route path='/viewinstitution' element={<ViewInstitution/>}/>
  <Route path='/textbookdashboard' element={<BookdashBoard/>}/>
  <Route path='/viewtextbook' element={<ViewTextbook/>}/>
  <Route path="/header" element={<Header/>}/>
  <Route path="/customerdashboard" element={<Customerdashboard/>}/>
  





  


  
</Routes>
</BrowserRouter>
</div>
  )
}

export default App
