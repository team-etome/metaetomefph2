import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Image, Form } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import "../viewtextbook/viewtextbook.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


function ViewTextbook({ show, handleClose, book  }) {
  console.log(book, 'bbbbbbbbbb');
 
  const [showPDF, setShowPDF] = useState(false);

  console.log(book, "book data before navigating");

  return (
    <>
      <Modal centered size="lg" show={show} onHide={handleClose}>
        <div>
          <Modal.Body>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <AiOutlineClose
                size={20}
                style={{ cursor: "pointer" }}
                onClick={handleClose}
              />
            </div>
            <Row>
              <Modal.Header
                style={{
                  display: "flex",
                  justifyContent: "center",
                  border: "none",
                }}
              >
                <Modal.Title>{book.text_name}</Modal.Title>
              </Modal.Header>
              <Col
                md={4}
                className="d-flex justify-content-center align-items-center"
              >
                {showPDF ? (
                  <Document
                    file={book.pdf_url}
                    onLoadSuccess={console.log("PDF loaded")}
                  >
                    <Page pageNumber={1} />
                  </Document>
                ) : (
                  <div>
                    <Image
                      src={book.textbook_image}
                      alt="Book Cover"
                      fluid
                      style={{ maxHeight: "100%", maxWidth: "100%" }}
                    />
                  </div>
                )}
              </Col>

              <Col md={8} style={{ width: "300px", marginLeft: "10px" }}>
                <Form>
                  <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={book.text_name}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group controlId="formPublisher">
                    <Form.Label>Publisher</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={book.publisher_name}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group controlId="formChapters">
                    <Form.Label>Total Chapters</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={book.total_chapters}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group controlId="formVolume">
                    <Form.Label>Volume</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={book.volume}
                      readOnly
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer style={{ border: "none", borderRadius: "8px" }}>
            <Link to={`/addbooks/${book.id}`}>
              <Button variant="secondary">Edit</Button>
            </Link>
            <Button
              variant="secondary"
              style={{ backgroundColor: "#5C7689" }}
              onClick={() => setShowPDF(true)}
            >
              Preview PDF
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}

export default ViewTextbook;
