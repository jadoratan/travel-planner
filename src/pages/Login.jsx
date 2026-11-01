import { useState } from 'react';
import './Login.css';

import TextField from '../components/TextField';

export default function Login({ navigatePage }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [validFields, setValidFields] = useState({
    username: false,
    password: false,
  });

  // same rules as signup
  const regexRules = {
    username: /^\w{4,}$/,
    password: /^\w{8,}$/,
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setValidFields((prev) => ({ ...prev, username: regexRules.username.test(event.target.value) }));
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setValidFields((prev) => ({ ...prev, password: regexRules.password.test(event.target.value) }));
  };

  const isFormValid = Object.values(validFields).every((value) => value === true);

  return (
    <>
      <h1>LOG IN PAGE</h1>
      <form style={{ padding: '20px' }}>
        <TextField
          fieldName="username"
          variable={username}
          handleEvent={handleUsernameChange}
          type="text"
        />
        {username && !validFields.username && <p>Username must be at least 4 letters, numbers, or underscores</p>}

        <div style={{ padding: '10px' }}></div>

        <TextField
          fieldName="password"
          variable={password}
          handleEvent={handlePasswordChange}
          type="password"
        />
        {password && !validFields.password && <p>Password must be at least 8 characters</p>}
      </form>

      <button
        className="login-button"
        disabled={!isFormValid}
        onClick={() => navigatePage("dashboard")}
      >
        Log in
      </button>

      <h3>New to the app? Sign up here!</h3>
      <button className="login-button" onClick={() => navigatePage("signup")}>
        Sign up
      </button>
    </>
  );
}