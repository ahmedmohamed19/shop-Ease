import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { authContextObj } from "../../Context/AuthContext";
import SocialIcons from "../SocialIcons/SocialIcons";

export default function Navbar() {
    const navigate = useNavigate();
    const { token, setToken } = useContext(authContextObj);

    function logOut() {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/login");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div className="container">
                {/* Logo */}
                {token ? (
                    <Link className="navbar-brand fw-bold fs-4 text-success" to="/">
                        ShopEase
                    </Link>
                ) : (
                    <h1 className="navbar-brand text-success fs-2 fw-bold">ShopEase</h1>
                )}

                {/* Navbar Toggler for Mobile */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {/* Main Navigation Links */}
                    {token && (
                        <ul className="navbar-nav m-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link text-dark fw-semibold" to="/">
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-dark fw-semibold" to="/about">
                                    About
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-dark fw-semibold" to="/products">
                                    Products
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-dark fw-semibold" to="/category">
                                    Category
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-dark fw-semibold" to="/brand">
                                    Brands
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-dark fw-semibold" to="/contact">
                                    Contact
                                </NavLink>
                            </li>
                        </ul>
                    )}

                    {/* Right Section (Cart, Wishlist, Social Icons, Auth Buttons) */}
                    <ul className="navbar-nav d-flex align-items-center gap-3">
                        {token && (
                            <>
                                {/* Cart Icon */}
                                <li className="nav-item">
                                    <Link className="nav-link text-dark" to="/cart">
                                        <i className="fa-solid fa-cart-shopping fs-5"></i>
                                    </Link>
                                </li>

                                {/* Wishlist Icon with text beside it */}
                                <li className="nav-item">
                                    <NavLink className="nav-link d-flex align-items-center text-dark" to="/wishlist">
                                        <i className="fa-solid fa-heart text-danger fs-5 me-1"></i> Wishlist
                                    </NavLink>
                                </li>

                                {/* Social Media Icons */}
                                <SocialIcons />
                            </>
                        )}

                        {/* Auth Buttons */}
                        {!token ? (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link text-dark fw-semibold" to="/register">
                                        Register
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link text-dark fw-semibold" to="/login">
                                        Login
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <button className="btn btn-outline-danger fw-semibold" onClick={logOut}>
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
