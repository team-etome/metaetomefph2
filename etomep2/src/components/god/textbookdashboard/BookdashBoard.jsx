import React,{useState,useEffect} from "react";
import { BsFilterRight, BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";
import {
  Container,
  Row,
  Nav,
  Navbar,
  NavDropdown,
  Form,
  Card,
  Col,
  Pagination,
} from "react-bootstrap";
import chemistryImage from "../../../assets/chemistry.png";
import "../textbookdashboard/bookdashboard.css";
import axios from "axios";
import { BiBookAdd } from "react-icons/bi";
import { Link } from "react-router-dom";

function BookdashBoard() {
  const [books, setBooks] = useState([]);

  const APIURL = useSelector((state) => state.APIURL.url);

  console.log(books,"aaaaaaaaaaaaaaaaaaaaaaaaa")
 
  useEffect(() => {
    axios.get(`${APIURL}/api/create-textbook/`)
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#DDE6ED",
        minHeight: "100vh",
        overflowY: "auto",
      }}
    >
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        style={{ marginBottom: "20px" }}
      >
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
                <BsSearch
                  className="position-absolute top-50 translate-middle-y ms-3"
                  style={{ height: "20px", width: "20px", color: "#D8D4D4" }}
                />
                <Form.Control
                  type="search"
                  placeholder="Search by name"
                  className="me-5 ps-5"
                  aria-label="Search"
                  style={{
                    width: "500px",
                    borderRadius: "12px",
                    fontWeight: "400px",
                  }}
                />
              </div>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container
        style={{
          backgroundColor: "#fff",
          borderRadius: "17px",
          marginBottom: "70px",
        }}
      >
        <Container>
          <Row xs={1} sm={2} md={3} lg={4} className="justify-content-center">
          {books.map((book, index) => (
              <Col className="d-flex justify-content-center mb-4">
                <Card
                  style={{
                    width: "200px",
                    alignItems: "center",
                    border: "none",
                    marginTop: "20px",
                    marginBottom: "30px",
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={book.textbook_image}
                    style={{ width: "150px", margin: "10px" }}
                    class="image-container"
                  />
               
                  <Card.Body>
                    <Card.Title>{book.text_name}</Card.Title>
                    <Card.Text>{book.publisher_name}</Card.Text>
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
          <div style={{}}>
            <Link to='/addbooks'>
              <BiBookAdd style={{ position: "fixed", top: "650px", right: "25px", color: 'black', borderRadius: "100%", backgroundColor: "white", padding: "10px",  width: "60px", height: "60px",boxShadow: "0px 0px 10px rgba(0, 0, 0, 1)" }}/>
            </Link>
          </div>
        </Container>
      </Container>
    </div>
  );
}

export default BookdashBoard;
