import { useState } from 'react';

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
        <label htmlFor="name-input" style={{ display: 'block', marginBottom: '8px' }}>
        Enter Username:
      </label>
      <input
        id="name-input"
        type="text"
        value={username} 
        onChange={handleUsernameChange} 
        placeholder="enter username"
        style={{ padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <p><strong>Current Username:</strong> {username}</p>

        <div style = {{padding: '10px'}}></div>

        <label htmlFor="name-input" style={{ display: 'block', marginBottom: '8px' }}>
        Password:
        </label>
      <input
        id="password-input"
        type="password"
        value={password} 
        onChange={handlePasswordChange} 
        placeholder="enter password"
        style={{ padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      
      <p><strong>Current Password:</strong> {password}</p>


    </form>


    <button>Sign in</button>
    </>
  );
}