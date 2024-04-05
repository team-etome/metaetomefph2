
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import GodloginPage from './pages/godpage/GodloginPage'
import GoddashboardPage from './pages/godpage/GoddashboardPage'

function App() {


  return (
<div className='App'>
<BrowserRouter>
<Routes>


  {/* godside */}
  <Route path="/godlogin" element={<GodloginPage/>}/>
  <Route path="/goddashboard" element={<GoddashboardPage/>}/>


  
</Routes>
</BrowserRouter>
</div>
  )
}

export default App
