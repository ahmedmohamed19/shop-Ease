import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Style from './Register.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
export default function Register() {

    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: ''
        },
        validate: validate,
        onSubmit: handleSubmit,
    })
    async function handleSubmit(values) {
        const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
        console.log(data);
        if (data.message === 'success') {
            navigate('/login');
        }
    }

    function validate(values) {
        const error = {};
        if (!values.name) {
            error.name = 'Name is Required';
        } else if (values.name.length < 3) {
            error.name = 'Name must be at least 3 characters';
        }
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
        if (!values.rePassword) {
            error.rePassword = 'RePassword is Required';
        } else if (values.rePassword !== values.password) {
            error.rePassword = 'Password does not match';
        }
        if (!values.phone) {
            error.phone = 'Phone is Required';
        } else if (!/^\d{11}$/.test(values.phone)) {
            error.phone = 'Phone must be 11 digits';
        }
        return error;
    }

    return (
        <div className={`${Style.registerContainer}`}>
            <div className="card shadow-lg p-4 rounded w-100" style={{ maxWidth: '400px' }}>
                <h3 className="text-center text-primary fw-bold">Register</h3>
                <form className='py-5' onSubmit={formik.handleSubmit}>
                    <h1 className=' pb-3 text-success'>Register</h1>

                    <div className="form-floating mb-3">
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} type="text" className="form-control" id="name" name='name' placeholder="name" autoComplete="name" />
                        <label htmlFor="name">Enter Your Name</label>
                    </div>

                    {formik.touched.name && formik.errors.name && <div className="alert alert-danger">{formik.errors.name}</div>}
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
                    <div className="form-floating mb-3">
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} type="password" className="form-control" id="repassword" name='rePassword' placeholder="Password" autoComplete="new-password" />
                        <label htmlFor="repassword">RePassword</label>
                    </div>
                    {formik.touched.rePassword && formik.errors.rePassword && <div className="alert alert-danger">{formik.errors.rePassword}</div>}
                    <div className="form-floating mb-3">
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} type="tel" className="form-control" id="phone" name='phone' placeholder="" autoComplete='tel' />
                        <label htmlFor="phone">Enter Your Phone</label>
                    </div>
                    {formik.touched.phone && formik.errors.phone && <div className="alert alert-danger">{formik.errors.phone}</div>}
                    <p className='text-muted'>By clicking the submit button, you agree to our terms and conditions</p>
                    <div className="text-center">
                        <p>Already have an account? <a href="/login">Login</a></p>
                    </div>
                    <div className="text-center">
                        {formik.isSubmitting && <div className="spinner-border text-success" role="status"></div>}
                        {formik.errors.general && <div className="alert alert-danger">{formik.errors.general}</div>}
                        {formik.status === 400 && <div className="alert alert-danger">{formik.response.data.message}</div>}
                        {formik.status === 500 && <div className="alert alert-danger">Internal Server Error</div>}
                        <button className="btn btn-outline-success" type="submit" disabled={!formik.isValid || formik.isSubmitting}>
                            {formik.isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </form>

                <p className="mt-3 text-center">
                    Already have an account? <a href="/login" className="text-decoration-none text-primary fw-semibold">Login</a>
                </p>
            </div>
        </div>
    );
}
