import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row, Form,Pagination } from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "../aarnaseating/seatdashboard.css";
import { useSelector } from "react-redux";
import { BsSearch, BsFilterRight } from "react-icons/bs";
import axios from "axios";

function SeatingDashboard() {
  const [isActive, setIsActive] = useState(false);
  const [seatingData, setSeatingData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Define how many items per page for pagination
  const APIURL = useSelector((state) => state.APIURL.url);
  const admininfo = useSelector((state) => state.admininfo);


  console.log(seatingData, "seating dataaaaaaa");

  const filteredSeatingData = seatingData.filter((item) => {
    return item.classes
      .join(",")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  const admin_id = admininfo.admininfo?.admin_id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeatingData = async () => {
      try {
        const response = await axios.get(`${APIURL}/api/seating/${admin_id}`);
        setSeatingData(response.data);
        console.log(response.data, "if gwerfieuwrgfef");
      } catch (error) {
        console.error("Error fetching seating data:", error);
      }
    };

    fetchSeatingData();

    const interval = setInterval(() => {
      setIsActive((prevState) => !prevState);
    }, 2000);

    return () => clearInterval(interval);
  }, [APIURL, admin_id]);

  const handleButtonClick = () => {
    navigate("/seatassigning");
  };

  const handleclick = (item) => {
    navigate("/seatview", { state: { seatingData: item } });
  };


  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSeatingData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredSeatingData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "104.5%" }}>
      <Container
        fluid
        className="seat_container_scroll"
        style={{ marginTop: "16px" }}
      >
        <Row>
          <div className="seat_list_search_filter_main d-flex">
            <Form className="d-flex">
              <div className="position-relative">
                <Form.Control
                  type="search"
                  placeholder="Search by class"
                  className="ps-3 seat_list_ad_search_bar"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  
                />
                <BsSearch className="position-absolute top-50 translate-middle-y seat_list_searchbar_icon" />
              </div>
            </Form>
          </div>
        </Row>
        <Row>
          {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
              <Col
                lg={3}
                md={6}
                sm={12}
                xs={12}
                key={index}
                className="seat_list"
              >
                <div
                  onClick={() => handleclick(item)}
                  className="border border-white seat_rectangle"
                >
                  <div className="seat_hall_date">
                    <div className="seat_hallno">{item.hall_name}</div>
                    <div className="seat_date">{item.exam_date}</div>
                  </div>
                  <div className="seat_facultyno">Faculty : {item.teacher}</div>
                  <div className="seat_time">{item.classes.join(",")}</div>
                </div>
              </Col>
            ))
          ) : (
            <div className="no-exams-message">
              <h3>No Seating arranged</h3>
            </div>
          )}
        </Row>
        {/* Pagination Controls */}
        <div className="pagination-wrapper">
          <div className="d-flex flex-column align-items-center">
            <button
              className="pagination-btn mb-2"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <Pagination className="d-flex flex-column">
              {[...Array(totalPages).keys()].map((_, index) => (
                <div
                  className={`pagination-numeric ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </div>
              ))}
            </Pagination>
            <button
              className="pagination-btn mt-2"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </Container>
      <div className="seat_adding_button">
        <button
          className={`seat_adding seat_adding_my_button ${
            isActive ? "active" : ""
          }`}
          onClick={handleButtonClick}
        >
          <IoIosAdd style={{ height: "40px", width: "40px", color: "#ffff" }} />
        </button>
      </div>
    </div>
  );
}

export default SeatingDashboard;
