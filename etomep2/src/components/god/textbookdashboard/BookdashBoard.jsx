import React from "react";
import { BsFilterRight, BsSearch } from "react-icons/bs";
import {Container, Row, Nav, Navbar, NavDropdown, Form,Card , Col, Pagination} from "react-bootstrap";
import chemistryImage from "../../../assets/chemistry.png";
import "../textbookdashboard/bookdashboard.css";


function BookdashBoard() {
  return (
    <div style={{ backgroundColor: "#DDE6ED", minHeight: "100vh", overflowY: "auto" }}>
    <Navbar expand="lg" className="bg-body-tertiary" style={{ marginBottom: "20px" }}>
      <Container>
        <Navbar.Brand href="#home">Library</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Class" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">XII</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Subject" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Science</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Board" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">CBSE</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <div className="position-relative">
              <BsSearch className="position-absolute top-50 translate-middle-y ms-3" style={{ height: "20px", width: "20px", color: "#D8D4D4" }} />
              <Form.Control type="search" placeholder="Search by name" className="me-5 ps-5" aria-label="Search" style={{ width: "500px", borderRadius: "12px", fontWeight: "400px" }} />
            </div>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Container style={{ backgroundColor: "#fff", borderRadius: "17px", marginBottom: "70px" }}>

        <Container>
          {/* <Row>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              {Array.from({ length: 4 }, (_, index) => (
                <div key={index} style={{ display: "flex" }}>
                  <Card
                    style={{
                      width: "200px",
                      marginTop: "20px",
                      marginBottom: "30px",
                      marginRight: "20px",
                      // alignItems: "center",
                      border:'none'
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={chemistryImage}
                      style={{ width: "150px", margin: "10px" }}
                    />
                    <Card.Body>
                      <Card.Text>Chemistry</Card.Text>
                      <Card.Subtitle className="mb-1 text-muted">
                        David Fernandace
                      </Card.Subtitle>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </Row> */}
          {/* <Row xs={1} sm={2} md={3} lg={4} className="g-4" style={{}}>
            {Array.from({ length: 10 }).map((_, index) => (
              <Col key={index}>
                <Card style={{width:'200px', marginTop: "20px",marginBottom: "30px",border:'none', display:'flex',alignItems:'center', justifyContent:'center',}}>
                  <Card.Img variant="top" src={chemistryImage} style={{ width: "150px", margin: "10px",justifyContent:'center', boxShadow:'1px 1px 10px 0px black' }} />
                  <Card.Body>
                    <Card.Title>Chemistry</Card.Title>
                    <Card.Text>
                    David Fernandace
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row> */}
          <Row xs={1} sm={2} md={3} lg={4} className="justify-content-center">
            {Array.from({ length: 10 }).map((_, index) => (
              <Col key={index} className="d-flex justify-content-center mb-4">
                <Card style={{ width: "200px", alignItems: "center", border: "none", marginTop: "20px",marginBottom: "30px", boxShadow:'rgba(0, 0, 0, 0.24) 0px 3px 8px'  }}>
                  <Card.Img variant="top" src={chemistryImage} style={{ width: "150px", margin: "10px", }} class="image-container"/>
                  <Card.Body>
                    <Card.Title>Chemistry</Card.Title>
                    <Card.Text>David Fernandace</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Pagination> 
        <Pagination.Prev /> 
        <Pagination.Item>{1}</Pagination.Item> 
        <Pagination.Item>{2}</Pagination.Item> 
        <Pagination.Item>{3}</Pagination.Item> 
        <Pagination.Ellipsis /> 
        <Pagination.Next /> 
      </Pagination> 
        </Container>
      </Container>
    </div>
  );
}

export default BookdashBoard;


 // <div
    //   style={{ backgroundColor: "#DDE6ED", height: "100vh", overflowY: "auto" }}
    // >
    //   <Container
    //     style={{
    //       backgroundColor: "#fff",
    //       marginTop: "80px",
    //       borderRadius: "17px",
    //       marginBottom: "70px",
    //     }}
    //   >
    //     <Container>
    //       <h6
    //         style={{
    //           color: "#526D82",
    //           fontSize: "20px",
    //           marginTop: "50px",
    //           padding: "10px",
    //         }}
    //       >
    //         Library
    //       </h6>
    //       <Navbar expand="lg" className="bg-body-tertiary custom_navbar ">
    //         <Container

    //         >
    //           <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //           <Navbar.Collapse id="basic-navbar-nav">
    //             <Nav className="me-auto" style={{ padding: "10px" }}>
    //               <NavDropdown
    //                 title="Class"
    //                 id="basic-nav-dropdown"
    //                 menuVariant="dark"
    //                 align="end"
    //                 style={{
    //                   backgroundColor: "#ffff",
    //                   borderRadius: "8px",
    //                   marginLeft: "20px",
    //                   width: "100px",
    //                   height: "40px",
    //                 }}
    //               >
    //                 <div style={{ backgroundColor: "#ffff" }}>
    //                   <NavDropdown.Item
    //                     href="#action/3.1"
    //                   >
    //                     XII
    //                   </NavDropdown.Item>
    //                 </div>
    //               </NavDropdown>
    //               <NavDropdown
    //                 title="Subject"
    //                 id="basic-nav-dropdown"
    //                 menuVariant="dark"
    //                 align="end"
    //                 style={{
    //                   backgroundColor: "#ffff",
    //                   borderRadius: "8px",
    //                   marginLeft: "20px",
    //                   width: "100px",
    //                   height: "40px",
    //                 }}
    //               >
    //                 <NavDropdown.Item href="#action/3.1">
    //                   Science
    //                 </NavDropdown.Item>
    //               </NavDropdown>
    //               <NavDropdown
    //                 title="Board"
    //                 id="basic-nav-dropdown"
    //                 menuVariant="dark"
    //                 align="end"
    //                 style={{
    //                   backgroundColor: "#ffff",
    //                   borderRadius: "8px",
    //                   marginLeft: "20px",
    //                   width: "100px",
    //                   height: "40px",
    //                 }}
    //               >
    //                 <NavDropdown.Item href="#action/3.1">CBSE</NavDropdown.Item>
    //               </NavDropdown>
    //             </Nav>
    //             <Form className="d-flex">
    //               <div className="position-relative">
    //                 <BsSearch
    //                   className="position-absolute top-50 translate-middle-y ms-3"
    //                   style={{
    //                     height: "20px",
    //                     width: "20px",
    //                     color: "#D8D4D4",
    //                   }}
    //                 />
    //                 <Form.Control
    //                   type="search"
    //                   placeholder="Search by name"
    //                   className="me-5 ps-5 custom-search"
    //                   aria-label="Search"
    //                   style={{
    //                     width: "500px",
    //                     borderRadius: "12px",
    //                     fontWeight: "400px",
    //                   }}
    //                 />
    //               </div>
    //             </Form>
    //           </Navbar.Collapse>
    //         </Container>
    //       </Navbar>
    //     </Container>