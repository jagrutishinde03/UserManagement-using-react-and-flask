import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import UserList from './components/userlist/UserList';
import AddUser from './components/adduser/AddUser';
import EditUser from './components/edituser/EditUser';
import './App.css';

function App() {
  return (
    <div className="App">
     <Navbar/>
      <Routes>
      
        <Route path="/" element={<UserList />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
      </Routes>
    </div>
  );
}

export default App;
