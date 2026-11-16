import { useState } from 'react';
import './Login.css';

import TextField from '../components/TextField';

export default function Login({ navigatePage }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');


  //potentially get rid of regex validation for login: 
  //  it matters that the input matches a database entry and not so much a regex pattern 
  //if login input is regex valid
  const [validFields, setValidFields] = useState({
    username: false,
    password: false,
  });

  // same rules as signup
  const regexRules = {
    username: /^\w{4,}$/,
    password: /^\w{8,}$/,
  };

  //end of regex vars//

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setValidFields((prev) => ({ ...prev, username: regexRules.username.test(event.target.value) }));
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setValidFields((prev) => ({ ...prev, password: regexRules.password.test(event.target.value) }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          username: username,
          password: password,
        })
      });

      if (res.ok) {
        navigatePage("dashboard")
      } else {
        setMessage('Invalid username or password');
      }
    } catch (err) {
      console.error(err);
      setMessage('error');
    }
  };


  return (
    <div className = "login-page">

    {/*left panel sign up form*/}
    <section className = "login-panel">
      <h1>Welcome!</h1>
      <p>Log in here</p>
      <form style={{ padding: '20px' }} onSubmit={handleSubmit} className = "login-form">
        <TextField
          fieldName="username"
          variable={username}
          handleEvent={handleUsernameChange}
          type = "text"
        />

        {username && !validFields.username && <p>Username must be at least 4 letters, numbers, or underscores</p>}

        <TextField
          fieldName="password"
          variable={password}
          handleEvent={handlePasswordChange}
          type = "password"
        />

        <button
          type="submit"
          className="login-button"
        >
          Log in
        </button>

        {password && !validFields.password && <p>Password must be at least 8 characters</p>}

        {message && <p>{message}</p>}

  
      </form>


      <h3>New to the app? Sign up here!</h3>
      <button
        className="login-button"
        onClick={() => navigatePage("signup")}
      >
        Sign up
      </button>

    </section>


    {/*right panel welcome visual*/}
     <aside className="login-scene" aria-hidden="true">
      <div className="login-sun" />

      <svg className="login-hills" viewBox="0 0 800 300" preserveAspectRatio="none">
        <path d="M0 120 C 200 40, 380 60, 560 130 S 760 120, 800 100 V300 H0Z" fill="#6d9db0" />
        <path d="M0 220 C 180 150, 360 170, 520 220 S 720 240, 800 200 V300 H0Z" fill="#2f5552" />
      </svg>

      <div className="login-ticket">
        <div className="login-ticket-main">
          <div className="login-ticket-route">
            <span>LAX</span>
            <span>HND</span>
          </div>
          <div className="login-ticket-cities">
            <span>Los Angeles</span>
            <span>Tokyo Haneda</span>
          </div>
          <div className="login-ticket-dates">
            <div><small>Depart</small>14 Mar</div>
            <div><small>Return</small>22 Mar</div>
            <div><small>Budget</small>$2,500</div>
          </div>
        </div>

        <ul className="login-ticket-checklist">
          <li>Flights</li>
          <li>Hotel</li>
          <li className="todo">Rail pass</li>
        </ul>
      </div>
    </aside>

    </div>

  );
}