import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../auth';
import '../App.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [, setCookie] = useCookies(['auth']);  // Note the comma before setCookie

    const handleLogin = async () => {
        try {
            const response = await login(email, password);
            console.log(response);

            setCookie('auth', response.token);
            toast.success('Login successful');
            // Redirect to a protected route after successful login
            window.location.href = '/';
        } catch (error) {
            console.log(error);
            setError('Invalid email or password. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-heading">Login</h2>
            <form className="login-form">
                <div>
                    <label className="login-label">Email:</label>
                    <input
                        className="login-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label className="login-label">Password:</label>
                    <input
                        className="login-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p className="login-error-message">{error}</p>}
                <button className="login-button" type="button" onClick={handleLogin}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
