import { useState } from 'react';

import TextField from '../components/TextField';

export default function Signup({navigatePage}) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDOB] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleDOBChange = (event) => {
        setDOB(event.target.value);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const res = await fetch('http://localhost:3001/signup', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    first_name: firstName, 
                    last_name:lastName, 
                    username:username,
                    password:password,
                    dob:dob,
                })
            });

            const data = await res.json();

            if (res.ok) {
                navigatePage("login")
            }
        } catch (err) {
            setMessage('error');
        }
    };

    return (
    <>
        <h1>SIGN UP PAGE</h1>
        <form style={{ padding: '20px' }} onSubmit={handleSubmit}>
        <TextField
            fieldName="firstName"
            variable={firstName}
            handleEvent={handleFirstNameChange}
            type="text"
        />

        <div style={{ padding: '10px' }}></div>

        <TextField
            fieldName="lastName"
            variable={lastName}
            handleEvent={handleLastNameChange}
            type="text"
        />

        <div style={{ padding: '10px' }}></div>

        <TextField
            fieldName="dob"
            variable={dob}
            handleEvent={handleDOBChange}
            type="text"
        />

        <div style={{ padding: '10px' }}></div>

        <TextField
            fieldName="username"
            variable={username}
            handleEvent={handleUsernameChange}
            type="text"
        />

        <div style={{ padding: '10px' }}></div>

        <TextField
            fieldName="password"
            variable={password}
            handleEvent={handlePasswordChange}
            type="password"
        />

        <div style={{ padding: '10px' }}></div>

        <button 
            type="submit"
            className="signup-button"
        >
            Sign up
        </button>
        </form>
    </>
    );
}