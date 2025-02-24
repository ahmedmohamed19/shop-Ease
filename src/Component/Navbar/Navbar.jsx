import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-white shadow-sm">
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-4 text-success" to="/">ShopEase</NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav m-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link text-dark fw-semibold" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-dark fw-semibold" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-dark fw-semibold" to="/products">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-dark fw-semibold" to="/category">Category</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-dark fw-semibold" to="/brand">Brands</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-dark fw-semibold" to="/contact">Contact</NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link text-dark" to="/cart">
                                <i className="fa-solid fa-cart-shopping fs-5"></i>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/wishlist">
                                <i className="fa-solid fa-heart text-danger"></i> Wishlist
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-dark fw-semibold" to="/register">Register</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-dark fw-semibold" to="/login">Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-outline-danger fw-semibold ms-2" onClick={() => console.log('logout')}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
