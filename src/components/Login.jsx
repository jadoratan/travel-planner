import { useState } from 'react';
import './Login.css';


function TextField({fieldName, variable, handleEvent, type}){
    return(
      <>
        <label htmlFor={`${fieldName}-input`} className="text-field-label">
          Enter {fieldName}:
        </label>
        <input
          id={`${fieldName}-input`}
          type={type}
          value={variable} 
          onChange={handleEvent} 
          placeholder={`enter ${fieldName}`}
          className='text-fields'
        />

        {/*for testing purposes*/}
        <p><strong>Current {fieldName}:</strong> {variable}</p>
      </>
    );
  }


export default function Login() {
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


    <button className="login-button">Log in</button>
    </>
  );
}