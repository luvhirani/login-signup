import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setAuth } from "./redux-services/slices/AuthSlice";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

export default function Signin() {
  const dispatch=useDispatch();

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    try {
      const result = await axios.post('http://localhost:8001/auth/login', data);
      
      let token = result.data.token;
      let loginId=result.data.hexString;

      localStorage.setItem('token', token);
      localStorage.setItem('userId', loginId);
     
     
      if ( result.status === 201) {
        dispatch(setAuth())
      navigate('/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred while processing your request.');
      }
      console.error(error.response, 'errrr');
    }
  };

  return (
    <>
      {/* <h2>Signin</h2>
      <br></br>
      <h3 style={{ color: 'red' }}>{error}</h3>
      <Form onSubmit={handleSubmit(onSubmit)}> */}
        {/* email */}
        {/* <Form.Group controlId="formBasicEmail">
          <Form.Label><strong>Email address</strong></Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            {...register('email', { required: 'Email is required' })}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid" style={{ color: 'red' }}>
            {errors.email && errors.email.message}
          </Form.Control.Feedback>
        </Form.Group> */}

        <br></br>

        {/* password */}
        {/* <Form.Group controlId="formBasicPassword">
          <Form.Label><strong>Password</strong></Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            {...register('password', { required: 'Password is required' })}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid" style={{ color: 'red' }}>
            {errors.password && errors.password.message}
          </Form.Control.Feedback>
        </Form.Group> */}

        <br></br>

        {/* login button */}
        {/* <Button variant="primary w-50" type="submit">
          Login
        </Button>
      </Form>

      <div>or</div>

      <div className="btn btn-default border w-50 bg-light rounded-0" onClick={() => navigate('/signup')}>
        Register
      </div> */}



<div className="bg-light min-vh-100 d-flex flex-row align-items-center">
  <CContainer>
    <CRow className="justify-content-center">
      <CCol md={8}>
        <CCardGroup>
          <CCard className="p-4">
            <CCardBody>
              <h3 style={{ color: 'red' }}>{error}</h3>
              <CForm onSubmit={handleSubmit(onSubmit)}>
                <h1>Login</h1>
                <p className="text-medium-emphasis">Sign In to your account</p>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilUser} />
                  </CInputGroupText>
                  <CFormInput 
                    placeholder="Username" 
                    type="email"
                    name="email"
                    {...register('email', { required: 'Email is required' })}
                    feedbackValid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid" style={{ color: 'red' }}>
                    {errors.email && errors.email.message}
                  </Form.Control.Feedback>
                </CInputGroup>
                <CInputGroup className="mb-4">
                  <CInputGroupText>
                    <CIcon icon={cilLockLocked} />
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    placeholder="Password"
                    name="password"
                    {...register('password', { required: 'Password is required' })}
                    feedbackValid={!!errors.password}
                  />
                  
                </CInputGroup>
                <CRow>
                  <CCol xs={6}>
                    <CButton color="primary" type="submit">
                      Login
                    </CButton>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
          <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
            <CCardBody className="text-center">
              <div>
                <h2>Sign up</h2>
                <p>
                  if you don't have your account yet you can create your account simply by clicking on the register button.
                </p>
                <CButton color="primary" className="mt-3" active tabIndex={-1} onClick={() => navigate('/signup')}>
                  Register Now!
                </CButton>
              </div>
            </CCardBody>
          </CCard>
        </CCardGroup>
      </CCol>
    </CRow>
  </CContainer>
</div>
    </>
  );
}
