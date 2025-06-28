import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { IoIosArrowDown, IoIosArrowUp, IoIosAdd } from "react-icons/io";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "../teacherreference/teacherrefrencelist.css";
import { BsFilterRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { IoChevronBackSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";



function TeacherRefrenceList() {
  const [showThisMonth, setShowThisMonth] = useState(true);
  const [showPreviousMonth, setShowPreviousMonth] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [references, setReferences] = useState([])
  const [selectedReference, setSelectReference] = useState(null);




  console.log(references, "referenceeeee")
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/teacherreferenceadd");


  };


  const APIURL = useSelector((state) => state.APIURL.url);
  const teacher = useSelector((state) => state.teacherinfo);
  const teacher_subject = useSelector((state) => state.teachersubjectinfo);

  console.log(references, "referenceeee")


  // const handleReferenceclick = (reference) => {
  //   setSelectReference(reference);
  //   setShowModal(true);
  // };
  const handleReferenceclick = (reference) => {
    // Check if PDF is available (assuming the PDF URL is in reference.pdf)
    if (reference.pdf && reference.pdf.trim() !== "") {
      setSelectReference(reference);
      setShowModal(true);
    } else if (reference.url && reference.url.trim() !== "") {
      // If no PDF, but a URL is provided, open that URL in a new tab
      window.open(reference.url, "_blank");
    } else {
      alert("No document available for this reference.");
    }
  };




  useEffect(() => {
    const fetchReferences = async () => {
      const standard = teacher_subject.teachersubjectinfo?.class;
      const division = teacher_subject.teachersubjectinfo?.division;
      const subject = teacher_subject.teachersubjectinfo?.subject;
      const teacher_id = teacher.teacherinfo?.teacher_id;
      try {
        const response = await axios.get(`${APIURL}/api/reference`, {
          params: {
            teacher_id,
            standard,
            division,
            subject,
          },
        });

        setReferences(response.data.reference);
      } catch (error) {
        console.error("Error fetching references:", error);
      }
    };

    fetchReferences();
  }, [APIURL, teacher, teacher_subject]);


  const groupByMonth = (references) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const thisMonth = [];
    const previousMonth = [];

    references.forEach((reference) => {
      const assignedDate = new Date(reference.date);
      console.log(assignedDate, "assigned dateeeee")

      if (!isNaN(assignedDate)) {
        if (
          assignedDate.getMonth() === currentMonth &&
          assignedDate.getFullYear() === currentYear
        ) {
          thisMonth.push(reference);
        } else {
          previousMonth.push(reference);
        }
      } else {
        console.error(`Invalid date format: ${reference.date}`);
      }

    });

    return { thisMonth, previousMonth };
  };

  const { thisMonth, previousMonth } = groupByMonth(references);
 

  const handleBackClick = () => {
    navigate('/teacherclassview')
  }
  // const handleDeleteReference = async (id) => {
  //   console.log(id, "idddd")
  //   if (window.confirm("Are you sure you want to delete this reference?")) {
  //     try {
  //       await axios.delete(`${APIURL}/api/testdelete/${id}/`, {
  //         params: { type: "reference" }
  //       });
  //       setReferences((prevRefs) => prevRefs.filter((ref) => ref.id !== id));
  //     } catch (error) {
  //       console.error("Error deleting reference:", error);
  //       alert("Failed to delete reference.");
  //     }
  //   }
  // };

  const handleDeleteReference = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this deletion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${APIURL}/api/testdelete/${id}/`, {
            params: { type: "reference" }
          });
          // Remove the deleted reference from state
          setReferences((prevRefs) => prevRefs.filter((ref) => ref.id !== id));
          Swal.fire("Deleted!", "Your reference has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting reference:", error);
          Swal.fire("Error!", "Failed to delete reference.", "error");
        }
      }
      // If canceled, nothing happens.
    });
  };
  
  console.log(selectedReference, "selectedReferencedattaaa")
  return (
    <Container className="refrence_container">
      <Row>
        <Col className="refrence_list">
          <div className="refrence_header">

            <h2>References</h2>
            {/* <div className="refrence_search_filter_icon d-flex align-items-center">
              <BsFilterRight className="refrence-bs-filter-right" />
            </div> */}
          </div>
          <hr />
          <div className="refrence_body">
            <div
              className="refrence_week"
              onClick={() => setShowThisMonth(!showThisMonth)}
            >
              <span>This Month</span>
              {showThisMonth ? (
                <IoIosArrowUp className="week_icon" />
              ) : (
                <IoIosArrowDown className="week_icon" />
              )}
            </div>
            {showThisMonth &&
              thisMonth.map((refrences) => (
                <div
                  key={refrences.id}
                  className="refrence_item mb-3 p-2"
                  onClick={() => handleReferenceclick(refrences)}
                >
                  <div className="reference-info">
                    <h5>{refrences.title}</h5>
                    <p> <MdDelete
                      className="delete-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteReference(refrences.id);
                      }}
                    /></p>
                  </div>
                  <p>Posted On:{refrences.date}</p>
                </div>
              ))}

            <div
              className="refrence_week"
              onClick={() => setShowPreviousMonth(!showPreviousMonth)}
            >
              <span>Previous Month</span>
              {showPreviousMonth ? (
                <IoIosArrowUp className="week_icon" />
              ) : (
                <IoIosArrowDown className="week_icon" />
              )}
            </div>
            {showPreviousMonth &&
              previousMonth.map((refrences) => (
                <div
                  key={refrences.id}
                  className="refrence_item mb-3 p-2"
                  onClick={() => handleReferenceclick(refrences)}
                >
                  <div className="reference-info">
                    <h4>{refrences.title}</h4>
                    <p><MdDelete
                      className="delete-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteReference(refrences.id);
                      }}
                    /></p>
                  </div>
                  <p>Posted On:{refrences.date}</p>
                </div>
              ))}
          </div>
          <div className="refrence_teacher_button">
            <Link to="/teacherreferenceadd">
              <Button
                className={`teacher_refrence teacher_refrence_my_button ${showModal ? "active" : ""
                  }`}
                onClick={handleAddClick}
              >
                <IoIosAdd
                  style={{ height: "40px", width: "40px", color: "#ffff" }}
                />
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
      {selectedReference && (
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          // fullscreen
          size="xl"
        // centered
        // style={{border:"2px solid black"}}
        // className="modal-pdf"
        >
          <Modal.Header closeButton>
            <Modal.Title>{selectedReference.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ padding: 0 }}>
            {/* Display the PDF in an iframe */}
            <iframe
              src={selectedReference.pdf}
              title="PDF Viewer"
              style={{ width: "100%", height: "80vh", border: "none" }}
            ></iframe>
          </Modal.Body>
          <Modal.Footer>
            {/* <a
              href={selectedReference.pdf_url}  // Ensure this matches your data property.
              download
              className="btn btn-primary"
            >
              Download PDF
            </a> */}
            {/* <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button> */}
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
}

export default TeacherRefrenceList;
