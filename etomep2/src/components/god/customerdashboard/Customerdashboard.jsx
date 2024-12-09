import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { Container, Row, Nav, Navbar, Form, Card, Col, Pagination, Button } from "react-bootstrap";
import "../customerdashboard/customerdashboard.css";
import { Link } from "react-router-dom";
import { MdAddHomeWork } from "react-icons/md";
import axios from "axios";
import { useSelector } from "react-redux";

function Customerdashboard() {
  const APIURL = useSelector((state) => state.APIURL.url);

  const handleCardClick = () => {
    setShowModal(true);
  };

  const [customers, setCustomers] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [customerPerPage] = useState(8);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const handleAddHomeWorkClick = () => {
    setShowOptions(!showOptions);
  };

  useEffect(() => {
    axios.get(`${APIURL}/api/addadmin`)
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, [APIURL]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.institute_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastCustomer = currentPage * customerPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customerPerPage;
  const currentCustomer = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div  className="customer_dashboard_page">
      <Container>
        <Navbar
          expand="lg"
          className="bg-body-tertiary customer_dashboard"
          // style={{ marginBottom: "20px", marginTop: '20px', backgroundColor: "#fff", borderRadius: "17px" }}
        >
          <Container>
            <Form className="ms-auto d-flex">
              <div className="position-relative">
                <BsSearch
                  className="position-absolute top-50 translate-middle-y ms-3 customer_dashboard_search"
                  // style={{ height: "20px", width: "20px", color: "#D8D4D4" }}
                />
                <Form.Control
                  type="search"
                  placeholder="Search School here"
                  className="me-5 ps-5 customer_dashboard_search_bar"
                  aria-label="Search"
                  value={searchQuery} // Bind search query state
                  onChange={handleSearchChange} // Update search query state
                  // style={{
                  //   width: "300px",
                  //   borderRadius: "12px",
                  //   fontWeight: "400px",
                  // }}
                />
              </div>
            </Form>
          </Container>
        </Navbar>
      </Container>

      <div>
        <Container
        className="customer_dashboard_container"
          // style={{
          //   backgroundColor: "#DDE6ED",
          //   borderRadius: "17px",
          //   marginBottom: "70px",
          //   border:'1px solid red'
          // }}
        >
          {/* <Container> */}
            {currentCustomer.length === 0 ? (
              <Row className="justify-content-center customer_dashboard_row" >
                <Col>
                  <Card className="text-center p-4 customer_dashboard_nodata" >
                  {/* style={{ backgroundColor: 'transparent', border: 'none', color: '#526D82' }} */}
                    <h5>No data to be shown</h5>
                  </Card>
                </Col>
              </Row>
            ) : (
              <Row xs={1} sm={1} md={2} lg={3} xl={4}>
                {currentCustomer.map((customer, index) => (
                  <Col key={index} className="d-flex justify-content-center mb-4">
                    <Link to={{ pathname: `/viewinstitution/${customer.id}`, state: { customer } }} style={{ textDecoration: 'none' }}>
                      <div onClick={handleCardClick}>
                        <Card className="customer_dashboard_card"
                          // style={{
                          //   width: "270px",
                          //   height: '170px',
                          //   border: "none",
                          //   marginTop: "0px",
                          //   marginBottom: "30px",
                          //   paddingLeft: '10px',
                          //   boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                          // }}
                        >
                          <Card.Body className="customer_dashboard_card_body" >
                            <div>
                              <Card.Title className='customer_dashboard_card_body_title' >{customer.institute_name}</Card.Title>
                            </div>
                            <div style={{ display: 'flex', justifyContent: "space-between" }}>
                              <Card.Text className="customer_dashboard_card_body_text" >{customer.eduacational_body}</Card.Text>
                              <Card.Text className="customer_dashboard_card_body_text">{customer.institute_code}</Card.Text>
                            </div>
                          </Card.Body>
                        </Card>
                      </div>
                    </Link>
                  </Col>
                ))}
              </Row>
            )}

            {currentCustomer.length > 0 && (
              <Pagination className="cust_pagination_custom" style={{ justifyContent: 'center' }}>
                <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
                {Array.from({ length: Math.ceil(filteredCustomers.length / customerPerPage) }, (_, i) => (
                  <Pagination.Item key={i} active={i + 1 === currentPage} onClick={() => paginate(i + 1)} style={{ backgroundColor: i + 1 === currentPage ? "#526D82" : "" }}>
                    {i + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredCustomers.length / customerPerPage)} />
              </Pagination>
            )}

            <div>
              <MdAddHomeWork  className='customer_dashboard_add'  onClick={handleAddHomeWorkClick} />
              {showOptions && (
                <div className="customer_dashboard_add_options"
                  // style={{
                  //   position: "fixed",
                  //   top: "540px",
                  //   right: "110px",
                  //   borderRadius: "5px",
                  //   padding: "10px",
                  //   zIndex: "999",
                  // }}
                >
                  {/* <div>
                    <Link to='/addcustomer'>
                      <Button onClick={() => handleOptionClick("College")} style={{ marginBottom: "10px", backgroundColor: 'white', border: 'none', color: '#526D82', width: '100px' }}>College</Button>
                    </Link>
                  </div> */}
                  <div>
                    <Link to='/addcustomer'>
                      <Button
                        // onClick={() => handleOptionClick("School")}
                        className="customer_dashboard_add_option_icon"
                        // style={{ backgroundColor: 'white', border: 'none', color: '#526D82', width: '100px' }}
                      >
                        School
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          {/* </Container> */}
        </Container>
      </div>
    </div>
  );
}

export default Customerdashboard;