import { useState } from 'react';

import './Login.css'

import TextField from '../components/TextField';
import Login from './Login';

export default function Signup({navigatePage}) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDOB] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
        password: /^.{8,}$/,
        dob: /^(?<month>0[1-9]|1[0-2])\/(?<date>0[1-9]|[1-2]\d|3[0-1])\/(?<year>19\d{2}|20[0-2][0-9])$/,
    }

    const isFormValid = Object.values(validFields).every(value => value === true);

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
    <div className='login-page'>
        <div className = 'login-panel'>
        <h1>SIGN UP PAGE</h1>
        <form style={{ padding: '20px' }} onSubmit={handleSubmit} className='login-form'>
        <TextField
            fieldName="firstName"
            //value = {firstName}
            variable={firstName}
            handleEvent={handleFirstNameChange}
            type="text"
        />
        {validFields?.firstName? <p>VALID</p> : <p>INVALID</p> }

         

        <TextField
            fieldName="lastName"
            variable={lastName}
            handleEvent={handleLastNameChange}
            type="text"
        />
        {validFields?.lastName ? <p>VALID</p> : <p>INVALID</p> }

         

        <TextField
            fieldName="dob"
            variable={dob}
            handleEvent={handleDOBChange}
            type="text"
        />
        {validFields?.dob ? <p>VALID</p> : <p>INVALID</p> }


        <TextField
            fieldName="username"
            variable={username}
            handleEvent={handleUsernameChange}
            type="text"
        />
        {validFields?.username ? <h2>VALID</h2> : <h2>INVALID: Must be at least 4 characters</h2> }

         

        <TextField
            fieldName="password"
            variable={password}
            handleEvent={handlePasswordChange}
            type="password"
        />
        {validFields?.password ? <h2>VALID</h2> : <h2>INVALID: Must be at least 8 characters</h2> }

         

        <button 
            type="submit"
            /*className="signup-button"*/
            className="login-button login-button--full"
            disabled={!isFormValid}
        >
            Sign up
        </button>
        </form>

        <button 
            className="login-button login-button--full"
            onClick= {() => navigatePage("login")}
        >
            Return to Log In
        </button>

        </div>




    {/* Right: suitcase scene */}
    <aside className="login-scene" aria-hidden="true">
      <div className="login-sun" />

      <svg className="login-hills" viewBox="0 0 800 300" preserveAspectRatio="none">
        <path d="M0 120 C 200 40, 380 60, 560 130 S 760 120, 800 100 V300 H0Z" fill="#6d9db0" />
        <path d="M0 220 C 180 150, 360 170, 520 220 S 720 240, 800 200 V300 H0Z" fill="#2f5552" />
      </svg>

      <svg
        className="login-suitcase"
        viewBox="0 0 420 380"
        role="presentation"
      >
        {/* flight path */}
        <path
          d="M215 70 C 260 20, 330 30, 340 70 C 348 105, 300 115, 296 85 C 293 62, 330 50, 372 70"
          fill="none"
          stroke="#ffede5"
          strokeWidth="2.5"
          strokeDasharray="3 9"
          strokeLinecap="round"
        />

        {/* left sprig */}
        <g>
          <path d="M34 350 C 40 290, 48 230, 74 170" fill="none" stroke="#2f5552" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="52" cy="300" rx="9" ry="20" transform="rotate(-50 52 300)" fill="#ffede5" opacity="0.85" />
          <ellipse cx="30" cy="262" rx="9" ry="20" transform="rotate(35 30 262)" fill="#2f5552" opacity="0.7" />
          <ellipse cx="62" cy="235" rx="9" ry="20" transform="rotate(-45 62 235)" fill="#ffede5" opacity="0.85" />
          <ellipse cx="44" cy="200" rx="8" ry="18" transform="rotate(30 44 200)" fill="#2f5552" opacity="0.7" />
          <ellipse cx="76" cy="168" rx="8" ry="18" transform="rotate(-20 76 168)" fill="#ffede5" opacity="0.85" />
        </g>

        {/* right sprig */}
        <g>
          <path d="M392 350 C 384 300, 376 250, 356 200" fill="none" stroke="#2f5552" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="376" cy="310" rx="9" ry="20" transform="rotate(50 376 310)" fill="#ffede5" opacity="0.85" />
          <ellipse cx="398" cy="272" rx="9" ry="20" transform="rotate(-35 398 272)" fill="#2f5552" opacity="0.7" />
          <ellipse cx="366" cy="245" rx="9" ry="20" transform="rotate(45 366 245)" fill="#ffede5" opacity="0.85" />
          <ellipse cx="384" cy="212" rx="8" ry="18" transform="rotate(-30 384 212)" fill="#2f5552" opacity="0.7" />
        </g>

        {/* handle */}
        <path
          d="M165 118 V96 Q165 80 181 80 H239 Q255 80 255 96 V118"
          fill="none"
          stroke="#3a1f4a"
          strokeWidth="10"
          strokeLinecap="round"
        />

        {/* feet */}
        <rect x="105" y="316" width="36" height="12" rx="5" fill="#3a1f4a" />
        <rect x="279" y="316" width="36" height="12" rx="5" fill="#3a1f4a" />

        {/* body */}
        <rect x="70" y="116" width="280" height="204" rx="20" fill="#6d9db0" />
        <path d="M70 136 a20 20 0 0 1 20 -20 h240 a20 20 0 0 1 20 20 v22 H70Z" fill="#ffede5" opacity="0.2" />
        <rect x="84" y="130" width="252" height="176" rx="12" fill="none" stroke="#ffede5" strokeOpacity="0.55" strokeWidth="2" strokeDasharray="5 7" />

        {/* straps */}
        <rect x="132" y="116" width="24" height="204" fill="#3a1f4a" />
        <rect x="264" y="116" width="24" height="204" fill="#3a1f4a" />

        {/* buckles */}
        <rect x="126" y="206" width="36" height="40" rx="7" fill="#ffede5" />
        <rect x="136" y="216" width="16" height="20" rx="3" fill="#3a1f4a" />
        <rect x="258" y="206" width="36" height="40" rx="7" fill="#ffede5" />
        <rect x="268" y="216" width="16" height="20" rx="3" fill="#3a1f4a" />

        {/* corner guards */}
        <rect x="62" y="108" width="36" height="36" rx="11" fill="#3a1f4a" />
        <rect x="322" y="108" width="36" height="36" rx="11" fill="#3a1f4a" />
        <rect x="62" y="292" width="36" height="36" rx="11" fill="#3a1f4a" />
        <rect x="322" y="292" width="36" height="36" rx="11" fill="#3a1f4a" />
      </svg>
    </aside>
    </div>
    );
}