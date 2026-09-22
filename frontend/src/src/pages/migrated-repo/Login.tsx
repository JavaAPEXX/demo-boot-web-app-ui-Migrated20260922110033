import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login: React.FC = () => {
  const navigate = useNavigate();

  // Form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // CSRF state – UNCONFIRMED
  const [csrfToken, setCsrfToken] = useState('');
  const [csrfParameterName, setCsrfParameterName] = useState(''); // UNCONFIRMED

  // Messages
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // Parse query params for error/message (mirrors GET /login behavior)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const err = params.get('error');
    const msg = params.get('message');
    if (err) setError(err);
    if (msg) setMessage(msg);
  }, []);

  // Set page title
  useEffect(() => {
    document.title = 'Log in with your account';
  }, []);

  // Optional: fetch CSRF token if an endpoint existed
  // useEffect(() => {
  //   fetch('/csrf')
  //     .then(res => res.json())
  //     .then(data => {
  //       setCsrfToken(data.token);
  //       setCsrfParameterName(data.parameterName);
  //     })
  //     .catch(() => {});
  // }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    if (csrfToken && csrfParameterName) {
      params.append(csrfParameterName, csrfToken);
    }

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
        credentials: 'include',
      });

      if (response.ok) {
        // Successful login – redirect to welcome page
        navigate('/welcome');
      } else {
        // Login failed – show generic error
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="container">
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark default-color-dark fixed-top">
          <a className="navbar-brand" href="/">App Name</a>
        </nav>
      </header>

      <form method="POST" action="/login" className="form-signin" onSubmit={handleSubmit}>
        <h2 className="form-heading">Log in</h2>

        <div className={`form-group ${error ? 'has-error' : ''}`}>
          {message && <span>{message}</span>}
          <input
            name="username"
            type="text"
            className="form-control"
            placeholder="Username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            name="password"
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <span>{error}</span>}
          {/* CSRF hidden input – UNCONFIRMED token handling */}
          {csrfParameterName && (
            <input type="hidden" name={csrfParameterName} value={csrfToken} />
          )}
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Log In
          </button>
          <h4 className="text-center">
            <a href="/registration">Create an account</a>
          </h4>
        </div>
      </form>
    </div>
  );
};

export default Login;