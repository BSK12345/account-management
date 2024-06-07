// src/components/Register.js
import React, { useState } from "react";

const Register = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneno, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ firstname, lastname, address, phoneno, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful!");
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>FirstName</label>
          <input
            type="text"
            className="form-control"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>LastName</label>
          <input
            type="text"
            className="form-control"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone No</label>
          <input
            type="text"
            className="form-control"
            value={phoneno}
            maxlength="10" 
            pattern="\d{0-9}"
            onChange={(e) => setPhoneNo(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
        Register
        </button>
      </form>
    </div>
  );
};

export default Register;
