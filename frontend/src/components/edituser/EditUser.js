import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EditUser.css';

const EditUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({ firstName: '', lastName: '', emailID: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/users/${id}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the user!', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/users/${id}`, user)
      .then(() => {
        setSuccessMessage('User updated successfully!');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      })
      .catch(error => {
        console.error('There was an error updating the user!', error);
      });
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="edit-user-container">
      <h1>Edit User</h1>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="firstName" value={user.firstName} onChange={handleChange} required />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastName" value={user.lastName} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="emailID" value={user.emailID} onChange={handleChange} required />
        </label>
        <div className="button-group">
          <button type="submit">Update User</button>
          <button onClick={handleCancel} className="cancel-button" >Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
