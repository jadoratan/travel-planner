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
    <>
    <h1>LOG IN PAGE</h1>
    <form style={{ padding: '20px' }} onSubmit={handleSubmit}>
      <TextField
        fieldName="username"
        variable={username}
        handleEvent={handleUsernameChange}
        type = "text"
      />

      {username && !validFields.username && <p>Username must be at least 4 letters, numbers, or underscores</p>}

      <div style = {{padding: '10px'}}></div>

      <TextField
        fieldName="password"
        variable={password}
        handleEvent={handlePasswordChange}
        type = "password"
      />

      <div style = {{padding: '10px'}}></div>

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

    </>
  );
}