import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import {Container, Row, Nav, Navbar, Form,Card , Col, Pagination} from "react-bootstrap";
import "../customerdashboard/customerdashboard.css";
import { Link } from "react-router-dom";
import { MdAddHomeWork } from "react-icons/md";
import axios from "axios";
import { useSelector } from "react-redux";


function Customerdashboard() {

  const APIURL = useSelector((state) => state.APIURL.url);

  const handleCardClick = () => {setShowModal(true);};
  
  const [customers, setCustomers] = useState([]);

  console.log(customers,"dddddddddddd")

  useEffect(() => {
    axios.get(`${APIURL}/api/addadmin`)
   
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  // const [institutionName] = useState("St Johns Residential HSS");
  // const [board] = useState("ICSEeeeeeeeeeeeeeeeeeeeeICSEeeeeeeeeeeeeeeeeeeeeICSEeeeeeeeeeeeeeeeeeeeeICSEeeeeeeeeeeeeeeeeeeee")
  // const [instid] = useState("1234567890123456789012345678901234567890123456789012345678901234567890")
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
            {customers.length === 0 ? (
            <Row className="justify-content-center" style={{backgroundColor:'white', borderRadius:'15px'}}>
              <Col>
                <Card className="text-center p-4" style={{backgroundColor:'transparent', border:'none', color:'#526D82'}}>
                  <h5>No data to be shown</h5>
                </Card>
              </Col>
            </Row>
          ) : (
          <Row xs={1} sm={1} md={2} lg={3} xl={4} >
            {customers.map((customer, index) => (
              <Col key={index} className="d-flex justify-content-center mb-4">
                {/* <Link to={`/viewinstitution/${customer.id}`} style={{textDecoration:'none'}}> */}
                <Link to={{ pathname: `/viewinstitution/${customer.id}`, state: { customer } }} style={{textDecoration:'none'}}>

                {/* {`/viewinstitution/${customer.id}`} */}
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
                        <Card.Title     style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize:'20px' }}>{customer.institute_name}</Card.Title>
                      </div>
                      <div style={{display:'flex', justifyContent: "space-between"}}> 
                        <Card.Text  style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',maxWidth: "20%" }}>{customer.eduational_body}</Card.Text>
                        <Card.Text  style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',maxWidth: "20%" }}>{customer.institute_code}</Card.Text>
                      </div>
                  </Card.Body>
                  </Card>
                </div>
                </Link>
              </Col>
            ))}
          </Row>
        )}
          <Pagination className="cust_pagination_custom" style={{position: "fixed", top: "600px", left: "50px",}}>
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