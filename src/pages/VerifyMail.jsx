import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const VerifyMail = () => {
  const { verificationToken } = useParams();

  const handleVerifyEmail = async () => {
    try {
      console.log('button clicked top')
      const response = await axios.post(`https://render-backend-yqw8.onrender.com/users/verify/${verificationToken}`);
      console.log('button clicked bottom')
      if (response.status === 200) {
        // Redirect user to login page on successful email verification
        alert('Email verified successfully. You can now login.');
        window.location.href = '/login';
      }
    } catch (error) {
      console.error("Error verifying email", error);
      alert('Failed to verify email. Please try again or contact support if the problem persists.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Verify Your Email</h2>
      <p>Click the button below to verify your email address.</p>
      <button onClick={handleVerifyEmail} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
        Verify Email
      </button>
    </div>
  );
};

export default VerifyMail;
