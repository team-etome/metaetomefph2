import React from "react";
import InstitutionDashboard from "../../components/admin/institutionadding/InstitutionDashboard";
import AdminDashboardpage from "./AdminDashboardpage";
import MainHeader from "../../components/menus/common/MainHeader/";

function InstitutionAddingPage() {
  return (
    <div>
      {/* <InstitutionDashboard/>
        <AdminDashboardpage/> */}
      <MainHeader />
      <InstitutionDashboard />
    </div>
  );
}

export default InstitutionAddingPage;
