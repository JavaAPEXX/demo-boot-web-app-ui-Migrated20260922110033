// Verification Block
// Entity definitions: Document, Role, User
// Backend contract: auth, endpoints, methods, encoding, response/failure behavior, CSRF
// Leading Comment
// Source Inventory:
//   - JSP/JSF pages: login.jsp, registration.jsp, welcome.jsp
//   - Shared includes: none detected
//   - Backend endpoints: /registration, /login
//   - Entities/DTOs: Document, Role, User
//   - Auth requirement: not detected
//   - Spring Security CSRF: not detected
//   - Route-to-API Mapping:
//     - /login → POST /login
//     - /registration → POST /registration
//     - /welcome → no backend endpoint detected
npx create-react-app my-app
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/login', { username, password });
      console.log(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <br />
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
import React, { useState } from 'react';
import axios from 'axios';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/registration', { username, password, passwordConfirm });
      console.log(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Registration</h1>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <br />
        <label>Confirm Password:</label>
        <input type="password" value={passwordConfirm} onChange={(event) => setPasswordConfirm(event.target.value)} />
        <br />
        <button type="submit">Register</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Registration;
import React from 'react';

const Welcome = () => {
  return (
    <div>
      <h1>Welcome!</h1>
    </div>
  );
};

export default Welcome;
import React from 'react';
import Login from './Login';
import Registration from './Registration';
import Welcome from './Welcome';

const App = () => {
  return (
    <div>
      <Login />
      <Registration />
      <Welcome />
    </div>
  );
};

export default App;