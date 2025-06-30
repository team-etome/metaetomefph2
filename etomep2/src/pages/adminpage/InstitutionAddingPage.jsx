import React from "react";
import InstitutionDashboard from "../../components/admin/institutionadding/InstitutionDashboard";
import AdminDashboardpage from "./AdminDashboardpage";
import MainHeader from "../../components/menus/common/MainHeader/";
import NewInstitutionDashboard from "../../components/admin/institutionadding/NewInstitutionDashboard";

function InstitutionAddingPage() {
  return (
    <div style={{backgroundColor:"#f9f9f9"}}>
      {/* <InstitutionDashboard/>
        <AdminDashboardpage/> */}
      <MainHeader/>
      {/* <InstitutionDashboard /> */}
      <NewInstitutionDashboard/>
    </div>
  );
}

export default InstitutionAddingPage;
