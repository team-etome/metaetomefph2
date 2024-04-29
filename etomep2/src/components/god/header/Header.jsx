import React, { useState } from "react";
import { Col, Container, Row, Tabs, Tab, Nav } from "react-bootstrap";
import etomelogo from "../../../assets/etomelogo.png";
import { IoIosSearch } from "react-icons/io";
import { IoAddSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import BookdashBoard from "../textbookdashboard/BookdashBoard";
import Customerdashboard from "../customerdashboard/Customerdashboard";
import "../header/header.css";

function Header() {
  const [activeTab, setActiveTab] = useState("Institution");

  return (
    <div className="header-container">
      <Container>
        <Row>
          <Col md={12} style={{ marginTop: "30px" }}>
          <Nav
              variant="underline"
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className="navbar_text"
              
            >
              <Nav.Item>
                <Nav.Link eventKey="Institution">Institution</Nav.Link>
                
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Textbook">Textbook</Nav.Link>
              </Nav.Item>
            </Nav>
            <div className="dashboard-container">
            {activeTab === "Institution" && <Customerdashboard />}
            {activeTab === "Textbook" && <BookdashBoard />}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Header;



// import React, { useState } from "react";
// import { Col, Container, Row, Tabs, Tab, Nav } from "react-bootstrap";
// import etomelogo from "../../../assets/etomelogo.png";
// import { IoIosSearch } from "react-icons/io";
// import { IoAddSharp } from "react-icons/io5";
// import { Link } from "react-router-dom";
// import BookdashBoard from "../textbookdashboard/BookdashBoard";
// import Customerdashboard from "../customerdashboard/Customerdashboard";
// import "../header/header.css";


// function Header() {
//   const [activeTab, setActiveTab] = useState("Institution");

//   return (
//     <div>
//       <Container>
//         <Row>
//           <Col md={12} style={{ marginTop: "30px" }}>
//             <Tabs
//               activeKey={activeTab}
//               onSelect={(k) => setActiveTab(k)}
//               className="mb-3 "
//             >
//               <Tab eventKey="Institution" title="Institution">
//               <Customerdashboard/>
//               </Tab>
                
//               <Tab eventKey="Textbook" title="Textbook">
//                 <BookdashBoard/>
//               </Tab>
//             </Tabs>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// }

// export default Header;
