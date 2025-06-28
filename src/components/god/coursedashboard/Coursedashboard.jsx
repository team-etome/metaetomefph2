import React from 'react'
import {Container, Row, Nav, Navbar, Form,Card , Col, Pagination, Button} from "react-bootstrap";
import School from '../addcourse/School';

function Coursedashboard() {
  return (
    <div style={{minHeight:'100vh', overflowY: "auto", }}>
        <School/>
    </div>
  )
}

export default Coursedashboard