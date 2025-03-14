import React, { useState, useEffect } from "react";
import { Col, Container, Row, Form, Pagination } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import "../aarnaquestionpaper/aarnaquestionpaper.css";
import { IoIosAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function AarnaQuestionPaper() {
  const [isActive, setIsActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const APIURL = useSelector((state) => state.APIURL.url);
  const [qpaperListData, setQpaperListData] = useState([]);

  const admininfo = useSelector((state) => state.admininfo);
  const admin_id = admininfo.admininfo?.admin_id;

  console.log(qpaperListData, "qpaper dataaaaaa");

  const navigate = useNavigate();
  const itemsPerPage = 12; // Define how many items per page for pagination

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${APIURL}/api/questionpaper/${admin_id}`
        );
        setQpaperListData(response.data);
      } catch (error) {
        console.error(
          "There was an error fetching the question papers!",
          error
        );
      }
    };

    fetchData(qpaperListData, "listttt");

    console.log();

    const interval = setInterval(() => {
      setIsActive((prevState) => !prevState);
    }, 2000);

    return () => clearInterval(interval);
  }, [APIURL]);

  const handleButtonClick = () => {
    navigate("/questionadding");
  };

  const handleclick = (item) => {
    navigate("/questionview", { state: { questionPaper: item } });
  };

  // Filter the question papers based on the search term
  //   const filteredQpaperListData = qpaperListData.filter((item) => {
  //   return (
  //     item.class_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     item.division.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     const combined = (item.class_name + " " + item.division + " " + item.subject_name).toLowerCase();

  //   );
  // });

  // const filteredQpaperListData = qpaperListData.filter((item) => {
  //   // Remove spaces from class_name, division, and subject_name and combine them into one string
  //   const combined = (
  //     item.class_name.replace(/\s+/g, "") + item.division.replace(/\s+/g, "")
  //   ).toLowerCase();

  //   // Remove spaces from searchTerm
  //   const searchTermWithoutSpaces = searchTerm
  //     .replace(/\s+/g, "")
  //     .toLowerCase();

  //   // Check if the search term (without spaces) is found in the combined string
  //   return combined.includes(searchTermWithoutSpaces);
  // });

  const filteredQpaperListData = qpaperListData
    .filter((item) => {
      const combined = (
        item.class_name.replace(/\s+/g, "") +
        item.division.replace(/\s+/g, "") +
        item.subject_name.replace(/\s+/g, "")
      ).toLowerCase();
      return combined.includes(searchTerm.replace(/\s+/g, "").toLowerCase());
    })
    .sort((a, b) => new Date(b.exam_date) - new Date(a.exam_date)); // Sort by date, latest first
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredQpaperListData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredQpaperListData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="questionpaper_dashboard">
      <Container fluid className="qpaper_container_scroll_1">
        <Row>
          <div className="qp_list_search_filter_main d-flex">
            <Form className="d-flex">
              <div className="position-relative">
                <Form.Control
                  type="search"
                  placeholder="Search by class"
                  className="ps-3 qp_list_ad_search_bar"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <BsSearch className="position-absolute top-50 translate-middle-y qp_list_searchbar_icon" />
              </div>
            </Form>
          </div>
        </Row>
        {/* <Row>
          {filteredQpaperListData.length > 0 ? (
            filteredQpaperListData.map((item, index) => (
              <Col
                lg={3}
                md={6}
                sm={12}
                xs={12}
                key={index}
                className="qpaper_list"
              >
                <div
                  onClick={() => handleclick(item)}
                  className="border border-white qpaper_rectangle"
                >
                  <div className="qpaper_faculty_name">{item.teacher_name}</div>
                  <div className="qpaper_term_date">
                    <div className="qpaper_term">{item.exam_name}</div>
                    <div className="qpaper_date">{item.exam_date}</div>
                  </div>
                  <div className="qpaper_subject">
                    {item.class_name} {item.division} - {item.subject_name}
                  </div>
                
                    <div
                      style={{
                        color: "green",
                        marginLeft: "12px",
                        marginTop: "15px",
                        fontWeight: "bold",
                        
                      }}
                    >
                      {item.status === "completed" ? "Completed" : "Pending"}
                    </div>
                
                </div>
              </Col>
            ))
          ) : (
            <div className="no-exams-message">
              <h3>No exams scheduled</h3>
            </div>
          )}
        </Row> */}
        {/* List question papers */}
        <Row>
          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <Col
                lg={3}
                md={6}
                sm={12}
                xs={12}
                key={index}
                className="qpaper_list"
              >
                <div className="qpaper_rectangle" onClick={() => handleclick(item)}
                // style={{ border: "2px solid red"}}
                ><div className="qpaper_innersection_2">
                  <div className="qpaper_class">
                    {item.class_name} {/*{item.division} */}
                  </div>
                  <div className="qpaper_subject">
                    {item.subject_name}
                  </div>
                </div>
                  
                  <div className="qpaper_innersection_1">
                    <div className="qpaper_term"><span className={item.exam_name.length > 20 ? "scrollable" : ""}>{item.exam_name}</span></div>
                    <div className="qpaper_date">{item.exam_date}</div>
                    <div className="qpaper_faculty_status">
                      <div className="qpaper_faculty_name"> <span className={item.teacher_name.length > 20 ? "scrollable" : ""}>{item.teacher_name}</span></div>
                      <div
                        className={`status-text ${item.status === "completed"
                          ? "text-success"
                          : "text-danger"
                          }`}
                        style={{
                          // marginLeft: "80px",
                          // marginTop: "15px",
                          paddingRight:"10px",
                          fontWeight: "bold",
                        }}
                      >
                        {item.status === "completed" ? "Completed" : "Pending"}
                      </div>

                    </div>
                  </div>
                </div>
              </Col>
            ))
          ) : (
            <div className="no-exams-message">
              <h3>No exams scheduled</h3>
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
                  className={`pagination-numeric ${currentPage === index + 1 ? "active" : ""
                    }`}
                  key={index}
                  active={currentPage === index + 1}
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
      <div className="qpaper_adding_button">
        <button
          className={`qpaper_adding qpaper_adding_my_button ${isActive ? "active" : ""
            }`}
          onClick={handleButtonClick}
        >
          <IoIosAdd style={{ height: "40px", width: "40px", color: "#ffff" }} />
        </button>
      </div>
    </div>
  );
}

export default AarnaQuestionPaper;











// for refference if column need five card in single row
// <Row className="card-row" style={{ display: "flex", flexWrap: "wrap" }}>
//   {currentItems.map((item, index) => (
//     <Col
//       key={index}
//       style={{
//         flex: "0 0 20%",
//         maxWidth: "20%",
//         padding: "10px"
//       }}
//     >
//       <div
//         className="qpaper_rectangle"
//         onClick={() => handleclick(item)}
//       >
//         <div className="qpaper_innersection_2">
//           <div className="qpaper_class">
//             {item.class_name}
//           </div>
//           <div className="qpaper_subject">
//             {item.subject_name}
//           </div>
//         </div>
//         <div className="qpaper_innersection_1">
//           <div className="qpaper_term">
//             <span className={item.exam_name.length > 20 ? "scrollable" : ""}>
//               {item.exam_name}
//             </span>
//           </div>
//           <div className="qpaper_date">{item.exam_date}</div>
//           <div className="qpaper_faculty_status">
//             <div className="qpaper_faculty_name">
//               <span className={item.teacher_name.length > 20 ? "scrollable" : ""}>
//                 {item.teacher_name}
//               </span>
//             </div>
//             <div
//               className={`status-text ${
//                 item.status === "completed" ? "text-success" : "text-danger"
//               }`}
//               style={{
//                 paddingRight:"10px",
//                 fontWeight: "bold",
//               }}
//             >
//               {item.status === "completed" ? "Completed" : "Pending"}
//             </div>
//           </div>
//         </div>
//       </div>
//     </Col>
//   ))}
// </Row>

// const filteredQpaperListData = qpaperListData
// .filter((item) => {
//   const combined = (
//     item.class_name.replace(/\s+/g, "") +
//     item.division.replace(/\s+/g, "") +
//     item.subject_name.replace(/\s+/g, "")
//   ).toLowerCase();
//   return combined.includes(searchTerm.replace(/\s+/g, "").toLowerCase());
// })
// .sort((a, b) => new Date(b.exam_date) - new Date(a.exam_date));

// const indexOfLastItem = currentPage * itemsPerPage;
// const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// const currentItems = filteredQpaperListData.slice(indexOfFirstItem, indexOfLastItem);
// const totalPages = Math.ceil(filteredQpaperListData.length / itemsPerPage);

// const groups = [];
// for (let i = 0; i < currentItems.length; i += 5) {
// groups.push(currentItems.slice(i, i + 5));
// }