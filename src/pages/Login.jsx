import { useState } from 'react';
import './Login.css';

import TextField from '../components/TextField';

export default function Login({ navigatePage, onLogin }) {
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
        const data = await res.json();
        onLogin(data.id);
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
    <div className = "login-page">

    {/*left panel sign up form*/}
    <section className = "login-panel">
      <h1>Welcome!</h1>
      <p>Log in here</p>
      <form style={{ padding: '20px' }} onSubmit={handleSubmit} className = "login-form">
        <TextField
          fieldName="username"
          variable={username}
          handleEvent={handleUsernameChange}
          type = "text"
        />

        {username && !validFields.username && <p>Username must be at least 4 letters, numbers, or underscores</p>}

        <TextField
          fieldName="password"
          variable={password}
          handleEvent={handlePasswordChange}
          type = "password"
        />

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

    </section>


    {/*GEN AI USE right panel welcome visual*/}
    {/*prompt: [attached 2 images of our mockup]
      we want a split login layout like the first image for a travel planning website but with the colors of the second "wayfare" image.

      current jsx

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

      can you create the CSS for it?
      */}
      {/*response: [provided this jsx code below for the visual and the css in Login.css]*/}
      {/*prompt: wow but it's a little offcentered when the screen is smaller [attach picture of example]*/}
      {/* Part of the off-centering is the narrow-screen layout. The form's max-width and the panel's padding aren't centering the content, and some global styles in your app (centered headings and labels) are leaking in. Wrapping the content in one centered column and forcing left alignment inside it should fix it.

        1. JSX: wrap everything inside <section className="login-panel"> in one div:

        jsx
        <section className="login-panel">
          <div className="login-content">
            <p className="login-brand">Wayfare</p>

          </div>
        </section>

        2. CSS: add this, and remove max-width: 400px from .login-form and .login-signup since the wrapper handles it now:

        css
        .login-panel {
          align-items: center;
        }

        .login-content {
          width: 100%;
          max-width: 400px;
        }


        .login-panel h1,
        .login-panel h3,
        .login-panel p,
        .login-panel label {
          text-align: left;
        }

        .login-panel .login-form input {
          width: 100%;
          max-width: 100%;
        }

        @media (max-width: 820px) {
          .login-panel {
            padding: 32px 20px;
          }
        }

        In your screenshot the inputs are wider than the 400px I set, so another stylesheet is overriding the input width. The .login-panel .login-form input selector above is more specific and should win. If it doesn't, search your other CSS for a global input { width: ... } rule.

        The "Current username:" and "Current password:" lines look like they come from inside your TextField component. I didn't add them and can't see that component. If you don't want them, remove them there. */}
      {/*reflection: by providing Claude the structure of the jsx code and some pictures, 
      it was able to write the CSS to conform to our current code so we would not have
      to change the jsx and possibly mess up the functionality of the web app. providing it
      concrete pictures of what we wanted the layout to look like, using mockups with
      high contrast colors and accessible fonts helped decrease the amount of back-and-forth iterations
      of it generating the implementation for the layout.
      */}
     <aside className="login-scene" aria-hidden="true">
      <div className="login-sun" />

      <svg className="login-hills" viewBox="0 0 800 300" preserveAspectRatio="none">
        <path d="M0 120 C 200 40, 380 60, 560 130 S 760 120, 800 100 V300 H0Z" fill="#6d9db0" />
        <path d="M0 220 C 180 150, 360 170, 520 220 S 720 240, 800 200 V300 H0Z" fill="#2f5552" />
      </svg>

      <div className="login-ticket">
        <div className="login-ticket-main">
          <div className="login-ticket-route">
            <span>LAX</span>
            <span>HND</span>
          </div>
          <div className="login-ticket-cities">
            <span>Los Angeles</span>
            <span>Tokyo Haneda</span>
          </div>
          <div className="login-ticket-dates">
            <div><small>Depart</small>14 Mar</div>
            <div><small>Return</small>22 Mar</div>
            <div><small>Budget</small>$2,500</div>
          </div>
        </div>

        <ul className="login-ticket-checklist">
          <li>Flights</li>
          <li>Hotel</li>
          <li className="todo">Rail pass</li>
        </ul>
      </div>
    </aside>

    </div>

  );
}