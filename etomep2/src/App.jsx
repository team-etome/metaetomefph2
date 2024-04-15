
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import GodloginPage from './pages/godpage/GodloginPage'
import GoddashboardPage from './pages/godpage/GoddashboardPage'
import AddCustomer from './components/god/addinstitution/AddCustomer';
import AddBooks from './components/god/addtextbook/AddBooks';
import ViewInstitution from './components/god/viewinstitution/ViewInstitution';



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

  


  
</Routes>
</BrowserRouter>
</div>
  )
}

export default App
