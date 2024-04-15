import React from "react";
import "../viewinstitution/viewinstitution.css";
import { IoIosArrowRoundBack } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";

function ViewInstitution() {
  return (
    <div
      style={{
        backgroundColor: "#DDE6ED",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <div className="container" style={{ backgroundColor: "#fff", marginTop: '80px', }}>

        <nav class="navbar navbar-expand-lg navbar-light">
          <div class="container-fluid">
            <IoIosArrowRoundBack style={{height:'30px', width:'30px' }} />
            <a class="navbar-brand" href="#" >
              <img
                src=""
                alt=""
                width="40"
                height="40"
                style={{borderRadius:'100%', backgroundColor:'#DAE2E9'}}
              />
            </a>
            <a class="navbar-brand" href="#" style={{color:'#526D82', fontWeight:'500'}}>
              Institution Name
            </a>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
              <form class="d-flex">
                <button class="btn btn-outline-danger" type="submit">
                  Block
                </button>
              </form>
            </div>
            {/* <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <BsThreeDotsVertical/> */}
            
          </div>
        </nav>
        <hr />
        <div className="container" style={{}}>
          <div className="row" style={{padding:'30px' }}>
            <div className="col-md-6" style={{}}>
              <div className="row">
                <div className="col-md-6" style={{marginBottom: '30px'}}>
                  <div
                    className="clearfix"
                    style={{ backgroundColor: "#DAE2E9", height: "180px" }}
                  >
                    <img
                      src="..."
                      class="col-md-6 float-md-end mb-3 ms-md-3"
                      alt="logo"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div class="mb-3">
                    <label for="institutionName" class="form-label" style={{color:'#727272', fontWeight:'500px'}}>
                      Institution Name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="institutionName"
                      placeholder=""
                      style={{ marginBottom: '50px' }}
                    />
                  </div>
                  <div class="mb-3" >
                    <label for="educationBoard" class="form-label" style={{color:'#727272', fontWeight:'500px'}}>
                      Board Of Education
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="formGroupExampleInput2"
                      placeholder=""
                      style={{ marginBottom: '50px' }}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div class="mb-3">
                  <label for="formGroupExampleInput" class="form-label" style={{color:'#727272', fontWeight:'500px'}}> 
                    Email Id
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="formGroupExampleInput"
                    placeholder=""
                    style={{ marginBottom: '25px' }}
                  />
                </div>
                <div class="mb-3">
                  <label for="formGroupExampleInput2" class="form-label" style={{color:'#727272', fontWeight:'500px'}}>
                    Address
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="formGroupExampleInput2"
                    placeholder=""
                    style={{ marginTop: '0px' }}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6" style={{marginBottom: '50px'}}>
              <div class="mb-3" style={{}}>
                <label for="formGroupExampleInput" class="form-label" style={{color:'#727272', fontWeight:'500px'}}>
                  Institution Code
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="formGroupExampleInput"
                  placeholder=""
                  style={{ marginBottom: '50px' }}
                />
              </div>
              <div class="mb-3">
                <label for="formGroupExampleInput2" class="form-label" style={{color:'#727272', fontWeight:'500px'}}>
                  Phone No.
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="formGroupExampleInput2"
                  placeholder=""
                  style={{ marginBottom: '50px' }}
                />
              </div>
              <div class="mb-3">
                <label for="formGroupExampleInput" class="form-label" style={{color:'#727272', fontWeight:'500px'}}>
                  Database Code
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="formGroupExampleInput"
                  placeholder=""
                  style={{ marginBottom: '40px' }}
                />
              </div>
              <div class="mb-3">
                <label for="formGroupExampleInput2" class="form-label">
                  Password
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="formGroupExampleInput2"
                  placeholder=""
                  style={{ marginBottom: '10px', }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewInstitution;
