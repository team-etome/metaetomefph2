import React ,{useState} from 'react'
import AdminDashboard from '../../components/admin/admindashboard/AdminDashboard'
import MobileSidebar from '../../components/menus/sidebar/MobileSidebar';
import Header from '../../components/menus/header/Header';
import Sidebar from '../../components/menus/sidebar/Sidebar';

function AdminDashboardpage() {

    const [showMobileSidebar, setShowMobileSidebar] = useState(false);

    const handleBurgerClick = () => {
        setShowMobileSidebar(true);
    };
  
    const handleCloseSidebar = () => {
        setShowMobileSidebar(false);
    };

    
    return (
        <div>
            <Header onBurgerClick={handleBurgerClick} />
            <Sidebar/>
            <MobileSidebar show={showMobileSidebar} onClose={handleCloseSidebar} />
            <AdminDashboard />
        </div>
    )
}

export default AdminDashboardpage
