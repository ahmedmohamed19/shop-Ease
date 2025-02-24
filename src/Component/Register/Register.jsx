import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Style from './Register.module.css';
export default function Register() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleRegister = (e) => {
        e.preventDefault();

        if (!user.name || !user.email || !user.password || !user.confirmPassword) {
            setError('All fields are required.');
            return;
        }
        if (user.password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }
        if (user.password !== user.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        console.log('Registering user:', user);
        setError('');

        setTimeout(() => navigate('/login'), 1000);
    };

    return (
        <div className={`${Style.registerContainer}`}>
            <div className="card shadow-lg p-4 rounded w-100" style={{ maxWidth: '400px' }}>
                <h3 className="text-center text-primary fw-bold">Register</h3>
                <form onSubmit={handleRegister}>
                    {error && <div className="alert alert-danger">{error}</div>}

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your full name"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm password"
                            name="confirmPassword"
                            value={user.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        <i className="fa-solid fa-user-plus"></i> Register
                    </button>
                </form>

                <p className="mt-3 text-center">
                    Already have an account? <a href="/login" className="text-decoration-none text-primary fw-semibold">Login</a>
                </p>
            </div>
        </div>

    );
}
