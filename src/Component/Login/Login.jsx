import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Style from './Login.module.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }

        console.log('Logging in with:', { email, password });
        setError('');

        setTimeout(() => navigate('/'), 1000);
    };

    return (
        <div className={Style.loginContainer}>
            <div className={`card shadow-lg p-4 rounded w-100 ${Style.cardContainer}`}>
                <h3 className="text-center text-success fw-bold">Login</h3>
                <form onSubmit={handleLogin}>
                    {error && <div className="alert alert-danger">{error}</div>}

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-success w-100">
                        <i className="fa-solid fa-sign-in-alt"></i> Login
                    </button>
                </form>

                <p className="mt-3 text-center">
                    Don't have an account? <a href="/register" className="text-decoration-none text-success fw-semibold">Register</a>
                </p>
            </div>
        </div>
    );
}
