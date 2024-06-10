import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import backgroundImage from "../assets/images/background.jpeg";
import backgroundImage2 from "../assets/images/r6_1.png";
import backgroundImage3 from "../assets/images/background3.jpg";
import logo from "../assets/images/Image 3.png";
import google from "../assets/images/google.png";


import "./Auth.css";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async () => {
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) setError(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <div className="logo">
          <img src={logo} alt="site logo" />
        </div>
        <h2>{isSignUp ? "Sign Up" : "Log In"}</h2>
        <input
          type="email"
          placeholder="Enter Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
        />
        <button onClick={handleAuth} className="auth-button">
          {isSignUp ? "Sign Up" : "Log In"}
        </button>
        {error && <p className="auth-error">{error}</p>}
        <div className="auth-links">
          <p className="auth-link" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp
              ? "Already have an account?"
              : "Don't have an account?"}
          </p>
          <p className="auth-link">Lost password?</p>
        </div>
        <div className="social-login">
          <p>or</p>
          <button className="social-button google">
            <i className="fab fa-google"></i> Google
          </button>
          <button className="social-button facebook">
            <i className="fab fa-facebook-f"></i> Facebook
          </button>
          <button className="social-button apple">
            <i className="fab fa-apple"></i> Apple
          </button>
        </div>
      </div>
      <div className="auth-image">
        <img src={backgroundImage3} alt="cover" />
      </div>
    </div>
  );
};

export default Auth;
