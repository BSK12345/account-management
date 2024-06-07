import React, { useState, useEffect } from 'react';
import './style.css';

const AccountInfo = ({ loggedIn, setLoggedIn }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ firstname: '', lastname: '', address: '', phoneno: '', email: '', password: '' });

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setCurrentUser(loggedInUser);
      setEditData(loggedInUser);
    }
  }, [loggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setLoggedIn(false);
  };

  const handleEditToggle = (user) => {
    setIsEditing(!isEditing);
    setEditData(user);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSave = () => {
    const updatedUsers = users.map(user => 
      user.email === editData.email ? editData : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    setCurrentUser(editData);
    setIsEditing(false);
  };

  const handleDeleteAll = () => {
    localStorage.removeItem('users');
    setUsers([]);
  };

  const handleDelete = (email) => {
    const updatedUsers = users.filter(user => user.email !== email);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  return (
    <div className="container mt-5">
      <h2>Account Information</h2>
      {currentUser ? (
        <div>
          {isEditing ? (
            <div>
              <div className="form-group">
                <label>Firstname</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="firstname" 
                  value={editData.firstname} 
                  onChange={handleChange} 
                />
              </div>
              <div className="form-group">
                <label>Lastname</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="lastname" 
                  value={editData.lastname} 
                  onChange={handleChange} 
                />
              </div>
              <div className="form-group">
                <label>address</label>
                <textarea  
                  className="form-control" 
                  name="address" 
                  value={editData.address} 
                  onChange={handleChange} 
                />
              </div>
              <div className="form-group">
                <label>Phone No</label>
                <input 
                  type="number" 
                  className="form-control" 
                  name="phoneno" 
                  maxlength="10" 
                  pattern="\d{0-9}"
                  value={editData.phoneno} 
                  onChange={handleChange} 
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  className="form-control" 
                  name="email" 
                  value={editData.email} 
                  onChange={handleChange} 
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  name="password" 
                  value={editData.password} 
                  onChange={handleChange} 
                />
              </div>
              <button className="btn btn-success" onClick={handleSave}>Save</button>
              <button className="btn btn-secondary m-3" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          ) : (
            <div>
              <table className='table'>
                <thead>
                  <tr>
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th>Address</th>
                    <th>Phone No</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td>{user.firstname}</td>
                      <td>{user.lastname}</td>
                      <td>{user.address}</td>
                      <td>{user.phoneno}</td>
                      <td>{user.email}</td>
                      <td>{user.password}</td>
                      <td>
                        <button className="btn btn-primary" onClick={() => handleEditToggle(user)}>Edit</button>
                      </td>
                      <td>
                      <button className="btn btn-danger ml-2" onClick={() => handleDelete(user.email)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="btn btn-danger m-3" onClick={handleDeleteAll}>Delete All</button>
              <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      ) : (
        <p>Please log in to view your account information.</p>
      )}
    </div>
  );
};

export default AccountInfo;
