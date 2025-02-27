import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { authContextObj } from "../../Context/AuthContext";
import SocialIcons from "../SocialIcons/SocialIcons";
import { NumOfCartItemsContext } from "../../Context/NumOfCartItemsContext";

export default function Navbar() {
    const navigate = useNavigate();
    const { token, setToken } = useContext(authContextObj);
    const { numOfCartItems } = useContext(NumOfCartItemsContext);

    function logOut() {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/login");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top ">
            <div className="container">
                {token ? (
                    <Link className="navbar-brand fw-bold fs-4 text-success" to="/">
                        ShopEase
                    </Link>
                ) : (
                    <h1 className="navbar-brand text-success fs-2 fw-bold">ShopEase</h1>
                )}

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

                    <ul className="navbar-nav d-flex align-items-center gap-3">
                        {token && (
                            <>
                                {/* Cart Icon */}
                                <li className="nav-item">
                                    <Link className="nav-link position-relative " to="/cart">
                                        <i className={`fa-solid fa-cart-shopping fs-5 pt-2 ${numOfCartItems > 0 ? "text-success" : "text-dark"}`}></i>
                                        {numOfCartItems > 0 && (
                                            <span className="position-absolute top-0">
                                                {numOfCartItems}
                                            </span>
                                        )}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link d-flex align-items-center text-dark" to="/wishlist">
                                        <i className="fa-solid fa-heart text-danger fs-5 me-1"></i> Wishlist
                                    </NavLink>
                                </li>

                                <SocialIcons />
                            </>
                        )}

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
