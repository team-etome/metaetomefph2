import React, { useState, useEffect } from "react";
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

import axios from "axios";
import { BiBookAdd } from "react-icons/bi";
import { Link } from "react-router-dom";
import ViewTextbook from "../viewtextbook/ViewTextbook";
import '../textbookdashboard/bookdashboard.css'

function BookdashBoard() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const APIURL = useSelector((state) => state.APIURL.url);

  console.log(books, "booksssssssss");

  const getClassNames = () => {
    const classNames = new Set();
    books.forEach((book) => {
      if (book.class_name) {
        classNames.add(parseInt(book.class_name, 10)); // Convert to integer
      }
    });
    return Array.from(classNames).sort((a, b) => a - b); // Sort numerically
  };

  const getSubjects = () => {
    const subjects = new Set();
    books.forEach((book) => {
      if (book.subject) {
        subjects.add(book.subject);
      }
    });
    return Array.from(subjects).sort();
  };

  useEffect(() => {
    axios
      .get(`${APIURL}/api/create-textbook/`)
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, [APIURL]);

  const handleCardClick = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject === selectedSubject ? "" : subject);
  };

  const handleClassClick = (className) => {
    setSelectedClass(className === selectedClass ? "" : className);
  };

  const filteredBooks = books.filter(
    (book) =>
      book.text_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedSubject === "" || book.subject === selectedSubject) &&
      (selectedClass === "" || book.class_name === selectedClass.toString())
  );

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBook = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="book_dashboard_page"
      // style={{
      //   backgroundColor: "#DDE6ED",
      //   minHeight: "100vh",
      //   overflowY: "auto",
      // }}
    >
      <Navbar
        expand="lg"
        className="bg-body-tertiary book_dashboard_navbar"
        // style={{
        //   marginBottom: "20px",
        //   marginTop: "10px",
        //   borderRadius: "17px",
        // }}
      >
        <Container>
          <Navbar.Brand
            href="#home"
            style={{ color: "#526D82", fontSize: "23px" }}
          >
            Library
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Class" id="basic-nav-dropdown">
                {getClassNames().map((className, index) => (
                  <NavDropdown.Item
                    key={index}
                    href="#action/3.1"
                    onClick={() => handleClassClick(className)}
                    style={{
                      textDecoration:
                        selectedClass === className ? "underline" : "none",
                    }}
                  >
                    Class {className}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
              <NavDropdown title="Subject" id="basic-nav-dropdown">
                {getSubjects().map((subject, index) => (
                  <NavDropdown.Item
                    key={index}
                    href="#action/3.2"
                    onClick={() => handleSubjectClick(subject)}
                    style={{
                      textDecoration:
                        selectedSubject === subject ? "underline" : "none",
                    }}
                  >
                    {subject}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
              {/* <NavDropdown title="Board" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">CBSE</NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            <Form className="d-flex">
              <div className="position-relative">
                <BsSearch
                  className="position-absolute top-50 translate-middle-y ms-3 book_dashboard_search"
                  // style={{ height: "20px", width: "20px", color: "#D8D4D4" }}
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Container
          style={{
            backgroundColor: "#fff",
            borderRadius: "17px",
            marginBottom: "70px",
          }}
        >
          {currentBook.length === 0 ? (
            <Row className="justify-content-center">
              <Col>
                <Card
                  className="text-center p-4"
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "#526D82",
                  }}
                >
                  <h5>No data to be shown</h5>
                </Card>
              </Col>
            </Row>
          ) : (
            <Row xs={1} sm={2} md={3} lg={4}>
              {currentBook.map((book, index) => (
                <Col key={index} className="d-flex justify-content-center mb-4">
                  <Card className="book_dashboard_card"
                    style={{
                      width: "200px",
                      alignItems: "center",
                      border: "none",
                      marginTop: "20px",
                      marginBottom: "30px",
                      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                      height:'100%'
                    }}
                    onClick={() => handleCardClick(book)}
                  >
                    <Card.Img
                      variant="top"
                      src={book.textbook_image}
                      style={{ width: "150px", margin: "10px", height:'150px' }}
                      className="image-container"
                    />
                    <Card.Body>
                      <Card.Title>{book.text_name}</Card.Title>
                      <Card.Text>{book.publisher_name}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
          {currentBook.length > 0 && (
            <Pagination
              className="book_pagination_custom"
              style={{ justifyContent: "center" }}
            >
              <Pagination.Prev
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {Array.from(
                { length: Math.ceil(filteredBooks.length / booksPerPage) },
                (_, i) => (
                  <Pagination.Item
                    key={i}
                    active={i + 1 === currentPage}
                    onClick={() => paginate(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                )
              )}
              <Pagination.Next
                onClick={() => paginate(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(filteredBooks.length / booksPerPage)
                }
              />
            </Pagination>
          )}
        </Container>
        <div>
          <Link to="/addbooks">
            <BiBookAdd
              style={{
                position: "fixed",
                top: "600px",
                right: "25px",
                color: "black",
                borderRadius: "100%",
                backgroundColor: "white",
                padding: "10px",
                width: "60px",
                height: "60px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 1)",
              }}
            />
          </Link>
        </div>
        {showModal && selectedBook && (
          <ViewTextbook
            show={showModal}
            handleClose={() => setShowModal(false)}
            book={selectedBook}
          />
        )}
      </Container>
    </div>
  );
}

export default BookdashBoard;