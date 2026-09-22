// Verified source inventory
// Field names: username, password, passwordConfirm, roles, title, link, description, userId, id
// $Ellipsis/ #Ellipsis expressions: none detected
// Unconfirmed backend contract:
//   - Auth: not detected
//   - Spring Security CSRF: not detected
//   - Backend endpoints: /registration, /login
//   - Entities/DTOs: Document, Role, User
//   - Auth requirement: not detected
//   - Spring Security CSRF: not detected
//   - Route-to-API mapping:
//     - /login → POST /login
//     - /registration → POST /registration
//     - /welcome → no backend endpoint detected
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { authentication } from '../services/auth.service';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await authentication.login(username, password);
    if (response.success) {
      history.push('/welcome');
    } else {
      setError(response.error);
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
        <label>Password Confirm:</label>
        <input type="password" value={passwordConfirm} onChange={(event) => setPasswordConfirm(event.target.value)} />
        <br />
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <p>
        Don't have an account? <Link to="/registration">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { authentication } from '../services/auth.service';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await authentication.register(username, password, passwordConfirm);
    if (response.success) {
      history.push('/welcome');
    } else {
      setError(response.error);
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
        <label>Password Confirm:</label>
        <input type="password" value={passwordConfirm} onChange={(event) => setPasswordConfirm(event.target.value)} />
        <br />
        <button type="submit">Register</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Registration;
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { authentication } from '../services/auth.service';

const Welcome = () => {
  const history = useHistory();

  const handleLogout = () => {
    authentication.logout();
    history.push('/login');
  };

  return (
    <div>
      <h1>Welcome</h1>
      <p>
        You are logged in as <Link to="/users">/users</Link>.
      </p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Welcome;