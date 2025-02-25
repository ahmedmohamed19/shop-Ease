import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Style from './Login.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import { authContextObj } from '../../Context/AuthContext';

export default function Login() {
    const { setToken } = useContext(authContextObj)
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState(null);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate: validate,
        onSubmit: handleSubmit,
    });

    function handleSubmit(values, { setSubmitting }) {
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
            .then(({ data }) => {
                setToken(data.token)
                localStorage.setItem('token', data.token);
                setMessage("Login successful! Redirecting...");
                setMessageType("success");
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            })
            .catch((error) => {
                setMessage("Login failed. Please check your email and password.");
                setMessageType("danger");
                console.log(error);

            })
            .finally(() => {
                setSubmitting(false);
            });
    }

    function validate(values) {
        const error = {};
        if (!values.email) {
            error.email = 'Email is Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            error.email = 'Invalid Email';
        }
        if (!values.password) {
            error.password = 'Password is Required';
        } else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(values.password)) {
            error.password = 'Password must be at least 8 characters, contain one uppercase letter, one number, and one special character';
        }
        return error;
    }

    return (
        <div className={Style.loginContainer}>
            <div className={`card shadow-lg p-4 rounded w-100 ${Style.cardContainer}`}>
                <h3 className="text-center text-success fw-bold">Login</h3>
                <form className='py-5' onSubmit={formik.handleSubmit}>
                    {message && <div className={`alert alert-${messageType}`} role="alert">{message}</div>}

                    <h1 className=' pb-3 text-success'>Login</h1>

                    <div className="form-floating mb-3">
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" className="form-control" id="mail" name='email' placeholder="name@example.com" autoComplete="email" />
                        <label htmlFor="mail">Enter Your Email</label>
                    </div>
                    {formik.touched.email && formik.errors.email && <div className="alert alert-danger">{formik.errors.email}</div>}

                    <div className="form-floating mb-3">
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" className="form-control" id="password" name='password' placeholder="Password" autoComplete="new-password" />
                        <label htmlFor="password">Password</label>
                    </div>
                    {formik.touched.password && formik.errors.password && <div className="alert alert-danger">{formik.errors.password}</div>}

                    <div className="form-check mb-3">
                        <input className="form-check-input" type="checkbox" id="rememberMe" />
                        <label className="form-check-label" htmlFor="rememberMe">
                            Remember Me
                        </label>
                    </div>

                    <div className="text-center">
                        <a href="/forgot-password">Forgot Password?</a>
                    </div>

                    <hr className="my-4" />
                    <div className="text-center mb-4">
                        <button className="btn btn-outline-primary" type="submit" disabled={!formik.isValid || formik.isSubmitting}>
                            {formik.isSubmitting ? "Submitting..." : "Login"}
                        </button>
                    </div>

                    <div className="text-center mb-3">
                        <p className="text-muted">Or login with</p>
                        <a href="#" className="btn btn-outline-primary btn-sm me-2">Facebook</a>
                        <a href="#" className="btn btn-outline-primary btn-sm">Google</a>
                    </div>

                    <div className="text-center">
                        <p className="text-muted">By clicking the "Login" button, you agree to our <a href="#">Terms & Conditions</a> and <a href="#">Privacy Policy</a></p>
                    </div>
                </form>

                <p className="mt-3 text-center">
                    Don't have an account? <Link to="/register" className="text-decoration-none text-success fw-semibold">Register</Link>
                </p>
            </div>
        </div>
    );
}
