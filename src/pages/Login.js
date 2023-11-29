import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { login } from '../auth';

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

            // Redirect to a protected route after successful login

        } catch (error) {
            console.log(error);
            setError('Invalid email or password. Please try again.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="button" onClick={handleLogin}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
