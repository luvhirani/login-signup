import { Form, Button, Alert, Row } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CRow,
} from "@coreui/react";

export default function Update() {

  const [userData, setUserData] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [aboutError, setAboutError] = useState(null);

  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userAccessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8001/auth/userInfo/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userAccessToken}`,
            },
          }
        );
        // console.log(response.data.user,"userrrrrrrrrrrrrrrrr\\\\\\\\\\")

        setUserData(response.data.user);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [userId, userAccessToken, dispatch, navigate]);
  // console.log(userData.about, "uiddddddddddddddddddddd abuuuuuuuuu");
 

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleAddress = (event) => {
    const placeId = event.value.place_id;
    setUserData({ ...userData, place_id: placeId });
    console.log(placeId, "Place ID");
  };

  const handleUpdate = async () => {
    try {
      // console.log(userData, "usssssssssssssssssssssssssssssssssssssssss");
      if (!isEmailValid(userData.email)) {
        setEmailError("Invalid email format");
        return;
      }

      if (!userData.name || userData.name.trim() === "") {
        setNameError("Name cannot be empty");
        return;
      }

      const response = await axios.patch(
        `http://localhost:8001/auth/updateUserInfo/${userId}`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userAccessToken}`,
          },
        }
      );
      const successMessage = "User data updated successfully.";
      console.log("Update Successful:", response.data);
      navigate("/dashboard", { state: { successMessage } });
    } catch (error) {
      console.error("Error updating user:", error);
      setErrorMessage("Error fetching user data.");
    }
  };

  return (
    <>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form>
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
          <CContainer>
            <CRow className="justify-content-center">
              <CCol md={9} lg={7} xl={6}>
                <CCard className="mx-4">
                  <CCardBody className="p-4">
                    <h1>Update</h1>
                    <p className="text-medium-emphasis">
                      Anything you want to change in your account
                    </p>

                    <Row className="mb-3">
                      {/* name */}
                      <Form.Group controlId="formBasicName">
                        <Form.Label>
                          <strong>Name</strong>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Name"
                          name="name"
                          value={userData.name}
                          onChange={(e) => {
                            setUserData({ ...userData, name: e.target.value });
                            setNameError(null);
                          }}
                          isInvalid={nameError}
                        />
                        <Form.Control.Feedback
                          type="invalid"
                          style={{ color: "red" }}
                        >
                          {nameError}
                        </Form.Control.Feedback>
                      </Form.Group>

                      {/* email */}
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>
                          <strong>Email address</strong>
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          name="email"
                          value={userData.email}
                          readOnly
                          isInvalid={emailError}
                        />
                        <Form.Control.Feedback
                          type="invalid"
                          style={{ color: "red" }}
                        >
                          {emailError}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>

                    {/* about */}
                    <Form.Group controlId="formBasicName">
                      <Form.Label>
                        <strong>About</strong>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="About"
                        name="about"
                        value={userData.about}
                        onChange={(e) => {
                          setUserData({ ...userData, about: e.target.value });
                          setAboutError(null);
                        }}
                        isInvalid={aboutError}
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        style={{ color: "red" }}
                      >
                        {aboutError}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <br></br>

                    {/* </Form.Group> */}
                    <div>
                      <h6>Select Address</h6>
                      <GooglePlacesAutocomplete
                        apiKey="AIzaSyA-Q3d6RwQbrA8DsJQeUs7aE0IKPTXK9KA"
                        selectProps={{
                          onChange: handleAddress,
                        }}
                      />
                    </div>
                    <br></br>

                    {/* selected address */}
                    <Form.Group controlId="formBasicName">
                      <Form.Label>
                        <strong>Your address</strong>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Selected Address"
                        name="formatted_address"
                        readOnly
                        value={ userData.address ? userData.address.formattedAddress : " "}
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        style={{ color: "red" }}
                      ></Form.Control.Feedback>
                    </Form.Group>
                    <br></br>

                    {/* Update button */}
                    <Button type="button" onClick={handleUpdate}>
                      Update
                    </Button>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </CContainer>
        </div>
      </Form>
    </>
  );
}
