import { useState } from 'react';

function Login() {
  // 1. Declare a state variable to hold the text field's value
  const [text, setText] = useState('');

  // 2. Create a handler function to update state when the user types
  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <form style={{ padding: '20px' }}>
      {/* 3. Bind the state and change handler to the input element */}
      <label htmlFor="name-input" style={{ display: 'block', marginBottom: '8px' }}>
        Enter Name:
      </label>
      <input
        id="name-input"
        type="text"
        value={text} 
        onChange={handleChange} 
        placeholder="Type something..."
        style={{ padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      
      {/* Real-time output demonstration */}
      <p><strong>Current value:</strong> {text}</p>
    </form>
  );
}

export default Login;
