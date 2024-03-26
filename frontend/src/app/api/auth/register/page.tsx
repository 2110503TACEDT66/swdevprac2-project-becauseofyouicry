'use client'
import React, { useState } from 'react';
import { Link } from "@mui/material";
import styles from './RegisterPage.module.css'; // Import your CSS file

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [tel, setTel] = useState('');
  const [error, setError] = useState('');

  const handleRegister = () => {
    // Here you can perform registration logic, like sending registration data to a server
    // For simplicity, let's assume a basic validation here
    if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      // Perform registration
      console.log('Registration successful'); // Replace with your actual success handling
      // Redirect or navigate to another page here
    }
  };

  return (
    <div className={`${styles.area} relative min-h-screen flex justify-center items-center overflow-hidden`}>
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
        <div className="bg-white p-8 rounded shadow-md w-80 relative z-10">
          <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
          {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
          <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }} className="space-y-4">
            <div>
              <label htmlFor="username" className="block mb-1">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-1">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block mb-1">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div>
              <label htmlFor="tel" className="block mb-1">Telephone:</label>
              <input
                type="tel"
                id="tel"
                value={tel}
                onChange={(e) => setTel(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <button type="submit" className="w-full inline-flex items-center justify-center h-12 border border-green-500 rounded-full bg-green-500 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 hover:bg-green-600 transition duration-300">
              Register
            </button>
          </form>
          {/* Add a link or button to navigate to the login page */}
          <div className="mt-4 text-center">
            <Link href="/api/auth/signin">
              <a className="text-blue-500 underline">Already have an account?</a>
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.circles}>
        <ul>
          {/* Add circles for background animation */}
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
};

export default RegisterPage;