import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const clientId = '817643488404-kitr3mdv05aesvn1kjg8qnd7giinbjab.apps.googleusercontent.com'; // Replace with your actual Client ID

function GoogleSignInButton() {
  const [user, setUser] = useState(null);

  const onSuccess = async (response) => {
    try {
      const googleUser = await fetch('http://localhost:5000/api/auth/google', {  // Your backend endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: response.credential }), // Send the token to your backend
      });

      const userData = await googleUser.json();

      if(userData.success) {
        localStorage.setItem('user', JSON.stringify(userData.user))
        // Redirect or update UI as needed
        console.log('User signed in:', userData.user);
        window.location.href = '/'; // Redirect to home page
      } else {
          console.error("Authentication failed:", userData.message)
      }

    } catch (error) {
      console.error('Error during Google sign-in:', error);
    }
  };

  const onFailure = (error) => {
    console.error('Google sign-in failed:', error);
  };

  useEffect(() => {
     const storedUser = localStorage.getItem('user')
     if(storedUser) {
        setUser(JSON.parse(storedUser))
     }
  }, [])


  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div>
          <GoogleLogin
            onSuccess={onSuccess}
            onError={onFailure}
            // Use uxMode="redirect" for smoother mobile experience
            uxMode="redirect" // Recommended for better mobile experience
            // prompt="consent" // Optional: Force consent prompt every time
            // scopes={['profile', 'email']} // Optional: Specify requested scopes
          />
      </div>
    </GoogleOAuthProvider>
  );
}

export default GoogleSignInButton;