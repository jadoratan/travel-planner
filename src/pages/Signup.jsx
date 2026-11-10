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
        const isValid = firstName.trim === "" ? false : regexRules.firstName.test(event.target.value);
        setValidFields((prev) => ({...prev, firstName: isValid}));
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
        setValidFields((prev) => ({...prev, lastName: regexRules.lastName.test(event.target.value)}));
    };

    const handleDOBChange = (event) => {
        setDOB(event.target.value);
        setValidFields((prev) => ({...prev, dob: regexRules.dob.test(event.target.value)}));
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
        setValidFields((prev) => ({...prev, username: regexRules.username.test(event.target.value)}));
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setValidFields((prev) => ({...prev, password: regexRules.password.test(event.target.value)}));
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
            //value = {firstName}
            variable={firstName}
            handleEvent={handleFirstNameChange}
            type="text"
        />
        {validFields?.firstName? <h2>VALID</h2> : <h2>INVALID</h2> }

        <div style={{ padding: '10px' }}></div>

        <TextField
            fieldName="lastName"
            variable={lastName}
            handleEvent={handleLastNameChange}
            type="text"
        />
        {validFields?.lastName ? <h2>VALID</h2> : <h2>INVALID</h2> }

        <div style={{ padding: '10px' }}></div>

        <TextField
            fieldName="dob"
            variable={dob}
            handleEvent={handleDOBChange}
            type="text"
        />
        {validFields?.dob ? <h2>VALID</h2> : <h2>INVALID</h2> }

        <div style={{ padding: '10px' }}></div>

        <TextField
            fieldName="username"
            variable={username}
            handleEvent={handleUsernameChange}
            type="text"
        />
        {validFields?.username ? <h2>VALID</h2> : <h2>INVALID</h2> }

        <div style={{ padding: '10px' }}></div>

        <TextField
            fieldName="password"
            variable={password}
            handleEvent={handlePasswordChange}
            type="password"
        />
        {validFields?.password ? <h2>VALID</h2> : <h2>INVALID</h2> }

        <div style={{ padding: '10px' }}></div>

        <button 
            type="submit"
            className="signup-button"
            disabled={!isFormValid}
            onClick={() => {navigatePage("login")}}
        >
            Sign up
        </button>
        </form>
    </>
    );
}