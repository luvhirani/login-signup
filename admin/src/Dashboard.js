import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthLogout } from './redux-services/slices/AuthSlice';
import { Alert } from "react-bootstrap";
import { useLocation } from "react-router-dom";
function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  let { userAccessToken } = useSelector((state) => state.auth);
  const [user, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ name: '', email: '' });
  const [totalUsers, setTotalUsers] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const userId = localStorage.getItem('userId');
  const location = useLocation();
  const successMessage = location.state && location.state.successMessage;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8001/auth/userInfo/${userId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userAccessToken}`,
            },
          }
        );
        // console.log(response.data ,"dddddddddd")
        setTotalUsers(response.data.data)
        setUserData(response.data.user);
        
      } catch (error) {
        console.error('Error:', error);
        if (error.response && error.response.status === 401) {
          dispatch(setAuthLogout());
          navigate('/signin');
        }
      }
      
    };

    fetchData();
  }, [userId, userAccessToken, dispatch, navigate]);

  const handleLogout = () => {
    dispatch(setAuthLogout());
    navigate('/signin');
  };

  const handleEdit = () => {
    setIsEditing(true);
    setUpdatedUser({ name: user.name, email: user.email });
    navigate(`/dashboard/update`)
  };
  

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = async () => {
    try {
      //API request to update the user details
      const response = await axios.put(
        `http://localhost:8001/auth/updateUserInfo/${userId}`,
        updatedUser,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userAccessToken}`,
          },
        }
        );

      setUserData(response.data.user);
      setIsEditing(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value,
    });
  };
  console.log(user,"userrrrrrrrrrrr")

  useEffect(() => {
    // console.log("Success message changed:", successMessage);
    if (successMessage) {
      // console.log("Show success message:", successMessage);
      setShowSuccessMessage(true);

      const timerId = setTimeout(() => {
        console.log("Hide success message");
        setShowSuccessMessage(false);
      }, 2000);

      return () => clearTimeout(timerId);
    }
  },[]);

  return (
    <>
         {showSuccessMessage && <Alert variant="success">{successMessage}</Alert>}
    <div style={{ position: 'relative' }}>
      <h3>Welcome {user.name} </h3>
      <br />

      <div>
        <p>About: {user.about} </p>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Address: {user.address ? user.address.formattedAddress : " "} </p>
        <p>Total Registered Users : {totalUsers}</p>
      </div>

      {!isEditing ? (
        <button
          className="btn btn-primary"
          style={{ marginRight: '10px' }}
          onClick={handleEdit}
        >
          Edit
        </button>
      ) : (
        <>
          <button
            className="btn btn-success"
            style={{ marginRight: '10px' }}
            onClick={handleSaveEdit}
          >
            Save
          </button>
          <button
            className="btn btn-secondary"
            onClick={handleCancelEdit}
          >
            Cancel
          </button>
        </>
      )}

      <button
        className="btn btn-danger"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
    </>
  );
}

export default Dashboard;
