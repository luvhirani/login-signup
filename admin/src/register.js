import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Modal } from "react-bootstrap";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleModalShow = () => {
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
    navigate("/signin");
  };

  const onSubmit = async (data) => {
    try {
      console.log(data, "clickeddddddd");
      const result = await axios.post(
        "http://localhost:8001/auth/signup",
        data
      );

      console.log(result.data.message, "resssjjjjjjjjjjjjjjj");

      handleModalShow();
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage =
          error.response.data.message ||
          error.response.data.error ||
          "An error occurred";
        console.log(errorMessage, "ermsggg");
        setErrorMessage(errorMessage);
      } else {
        setErrorMessage("An error occurred while processing your request.");
      }

      console.log(error, "errrr");
    }
  };

  return (
    

      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={9} lg={7} xl={6}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm onSubmit={handleSubmit(onSubmit)}>
                    <h1>Register</h1>
                    <p className="text-medium-emphasis">Create your account</p>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Name"
                        required
                        feedbackValid="Please choose a username."
                        {...register("name", {
                          required: "Name is required",
                        })}
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        style={{ color: "red" }}
                      >
                        {errors.username && errors.username.message}
                      </Form.Control.Feedback>
                    </CInputGroup>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput
                        type="email"
                        required
                        placeholder="Email"
                        {...register("email", {
                          required: "Email is required",
                        })}
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        style={{ color: "red" }}
                      >
                        {errors.email && errors.email.message}
                      </Form.Control.Feedback>
                    </CInputGroup>

                    <CInputGroup className="mb-3">
                      <CInputGroupText> <CIcon icon={cilLockLocked}/> </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        required
                        
                        {...register("password", {
                          required: "Password is required",
                        })}
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        style={{ color: "red" }}
                      >
                        {errors.password && errors.password.message}
                      </Form.Control.Feedback>
                    </CInputGroup>

                    <div>
                      <CButton color="success" type="submit">
                        Create Account
                      </CButton>
                    </div>
                    <br />
                    <div>
                      <CButton
                        color="success"
                        onClick={() => navigate("/signin")}
                      >
                        Login
                      </CButton>
                    </div>

                    {/* Modal code */}
                    <Modal show={showModal} onHide={handleModalClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>User Registered Successfully</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        Congratulations! You have successfully registered.
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="primary" onClick={handleModalClose}>
                          ok
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
  );
}
