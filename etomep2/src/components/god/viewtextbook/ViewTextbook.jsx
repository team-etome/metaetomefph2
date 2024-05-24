import React, { useState } from "react";
import { Modal, Button, Row, Col, Image, Form } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import "../viewtextbook/viewtextbook.css"; // Ensure the CSS path is correct
import { Link } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function ViewTextbook({ show, handleClose, book }) {
  const [showPDF, setShowPDF] = useState(false);

  const togglePDFView = () => {
    setShowPDF(!showPDF);
  };

  const onPageLoadSuccess = (page) => {
    console.log(`Page ${page._pageIndex + 1} loaded`);
  };

  return (
    <Modal centered size="lg" show={show} onHide={handleClose} style={{minHeight: "100vh",}}>
      <Modal.Header closeButton>
        <Modal.Title>{book.text_name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col
            md={4}
            className="d-flex justify-content-center align-items-center"
          >
            {showPDF ? (
              <embed
                src={book.textbook_pdf}
                type="application/pdf"
                width="100%"
                height="300px"
              />
            ) : (
              <Image
                src={book.textbook_image}
                alt="Book Cover"
                fluid
                style={{ maxHeight: "100%", maxWidth: "100%" }}
              />
            )}
          </Col>
          <Col md={8}>
            <Form>
              <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={book.text_name}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formPublisher">
                <Form.Label>Publisher</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={book.publisher_name}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formChapters">
                <Form.Label>Total Chapters</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={book.total_chapters}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formVolume">
                <Form.Label>Volume</Form.Label>
                <Form.Control type="text" defaultValue={book.volume} readOnly />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Link to={`/addbooks/${book.id}`}>
          <Button variant="secondary">Edit</Button>
        </Link>
        <Button
          variant="secondary"
          style={{ backgroundColor: "#5C7689" }}
          onClick={togglePDFView}
        >
          {showPDF ? "Hide PDF" : "Preview PDF"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ViewTextbook;
