import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import {Container, Row, Nav, Navbar, Form,Card , Col, Pagination} from "react-bootstrap";
import chemistryImage from "../../../assets/chemistry.png";
import "../customerdashboard/customerdashboard.css";
import { Link } from "react-router-dom";
import { MdAddHomeWork } from "react-icons/md";


function Customerdashboard() {
  const handleCardClick = () => {setShowModal(true);};
  // const [customers, setCustomers] = useState([]);
  const [institutionName] = useState("St Johns Residential HSS");
  const [board] = useState("ICSEeeeeeeeeeeeeeeeeeeeeICSEeeeeeeeeeeeeeeeeeeeeICSEeeeeeeeeeeeeeeeeeeeeICSEeeeeeeeeeeeeeeeeeeee")
  const [instid] = useState("1234567890123456789012345678901234567890123456789012345678901234567890")
  // const institutions =[
  //   {name: 'St Johns Residential HSS', board: 'ICSE', id: '024234' },
  // ];
  return (
    <div
      style={{
        minHeight: "100vh",
        overflowY: "auto",
      }}
    >
      <Container>
      <Navbar
          expand="lg"
          className="bg-body-tertiary customer"
          style={{ marginBottom: "20px", marginTop:'20px', backgroundColor: "#fff", borderRadius: "17px",}}
        >
          <Container>
            <Form className="ms-auto d-flex">
              <div className="position-relative">
                <BsSearch
                  className="position-absolute top-50 translate-middle-y ms-3"
                  style={{ height: "20px", width: "20px", color: "#D8D4D4" }}
                />
                <Form.Control
                  type="search"
                  placeholder="Search School here"
                  className="me-5 ps-5"
                  aria-label="Search"
                  style={{
                    width: "300px",
                    borderRadius: "12px",
                    fontWeight: "400px",
                  }}
                />
              </div>
            </Form>
          </Container>
        </Navbar>
      </Container>

      <div>
      <Container
        style={{
          backgroundColor: "#DDE6ED",
          borderRadius: "17px",
          marginBottom: "70px",
        }}
      >
        <Container>
        {/* <Row className="justify-content-center">
              <Col>
                <Card className="text-center p-4" style={{backgroundColor:'transparent', border:'none', color:'#526D82'}}>
                  <h5>No data to be shown</h5>
                </Card>
              </Col>
            </Row> */}
          <Row xs={1} sm={1} md={2} lg={3} xl={4} >
            {Array.from({ length: 6}).map((_, index) => (
              <Col key={index} className="d-flex justify-content-center mb-4">
                <Link to="/viewinstitution" style={{textDecoration:'none'}}>
                <div onClick={handleCardClick}>
                  <Card
                    style={{
                      width: "270px",
                      height:'170px',
                      // alignItems: "center",
                      border: "none",
                      marginTop: "0px",
                      marginBottom: "30px",
                      paddingLeft:'10px',
                      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                      
                    }}
                  >
                  <Card.Body style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", }}>
                      <div style={{ }}>
                        <Card.Title   title={institutionName}  style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize:'20px' }}>{institutionName}</Card.Title>
                      </div>
                      <div style={{display:'flex', justifyContent: "space-between"}}> 
                        <Card.Text title={board} style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',maxWidth: "20%" }}>{board}</Card.Text>
                        <Card.Text title={instid} style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',maxWidth: "20%" }}>{instid}</Card.Text>
                      </div>
                  </Card.Body>
                  </Card>
                </div>
                </Link>
              </Col>
            ))}
          </Row>
        
          <Pagination className="cust_pagination_custom" style={{top: "630px",bottom:'100px', left: "50px",}}>
            <Pagination.Prev />
            <Pagination.Item>{1}</Pagination.Item>
            <Pagination.Item>{2}</Pagination.Item>
            <Pagination.Item>{3}</Pagination.Item>
            <Pagination.Ellipsis />
            <Pagination.Next />
          </Pagination>
          <div >
            <Link to='/addcustomer'>
              <MdAddHomeWork style={{ position: "fixed", top: "600px", right: "35px", color: 'black', borderRadius: "100%", backgroundColor: "white", padding: "10px",  width: "60px", height: "60px",boxShadow: "0px 0px 10px rgba(0, 0, 0, 1)" }}/>
            </Link>
          </div>
        </Container>
      </Container> 
      </div>
    </div>
  )
}

export default Customerdashboard