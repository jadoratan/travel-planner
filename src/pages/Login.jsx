import { useState } from 'react';
import './Login.css';

import TextField from '../components/TextField';


export default function Login({navigatePage}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  return (
    <>
    <h1>LOG IN PAGE</h1>
    <form style={{ padding: '20px' }}>
      <TextField
        fieldName="username"
        variable={username}
        handleEvent={handleUsernameChange}
        type = "text"
      />

      <div style = {{padding: '10px'}}></div>

      <TextField
        fieldName="password"
        variable={password}
        handleEvent={handlePasswordChange}
        type = "password"
      />


    </form>


    <button 
      className="login-button"
      onClick={navigatePage}
    >
      Log in
    </button>
    </>
  );
}