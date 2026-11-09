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

   
    const [validFields, setValidFields] = useState({
        firstName: false,
        lastName: false,
        username: false,
        password: false,
        dob: false,
    });

    
    const regexRules = {
        firstName: /^[a-zA-Z]+$/,
        lastName: /^[a-zA-Z]+$/,
        username: /^\w{4,}$/,
        password: /^(\w){8,}$/,
        dob: /^(?<month>0[1-9]|1[0-2])\/(?<date>0[1-9]|[1-2]\d|3[0-1])\/(<?year>19[\d{2}]|20[0-2][0-9])$/,
    }

    const isFormValid = Object.values(validFields).every(value => value === true);

    return (
    <>
        <h1>SIGN UP PAGE</h1>
        <form style={{ padding: '20px' }}>
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
            type="button"
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