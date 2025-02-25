import React from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Style from "./Footer.module.css";
import SocialIcons from "../SocialIcons/SocialIcons";

export default function Footer() {
    return (
        <footer className={`py-5 bg-dark text-light ${Style.footer}`}>
            <div className="container">
                <div className="row gy-4">
                    {/* 🏢 About Section */}
                    <div className="col-md-3">
                        <h5 className="fw-bold ">About Us</h5>
                        <p className="text-muted">
                            Your one-stop shop for all your needs. High-quality products at unbeatable prices!
                        </p>
                    </div>

                    {/* 🔗 Quick Links */}
                    <div className="col-md-3">
                        <h5 className="fw-bold ">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li>
                                <Link to="/" className="text-light text-decoration-none d-block py-1 footer-link">
                                    <i className="fa-solid fa-house me-2"></i> Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" className="text-light text-decoration-none d-block py-1 footer-link">
                                    <i className="fa-solid fa-box me-2"></i> Products
                                </Link>
                            </li>
                            <li>
                                <Link to="/category" className="text-light text-decoration-none d-block py-1 footer-link">
                                    <i className="fa-solid fa-list me-2"></i> Categories
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-light text-decoration-none d-block py-1 footer-link">
                                    <i className="fa-solid fa-envelope me-2"></i> Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* 📞 Contact Info */}
                    <div className="col-md-3">
                        <h5 className="fw-bold ">Contact Us</h5>
                        <p className="mb-1">
                            <i className="fa-solid fa-phone me-2 "></i> +123 456 7890
                        </p>
                        <p className="mb-1">
                            <i className="fa-solid fa-envelope me-2 "></i> support@ecommerce.com
                        </p>
                        <p>
                            <i className="fa-solid fa-map-marker-alt me-2 "></i> 123 Street, City
                        </p>
                    </div>

                    {/* 📩 Newsletter */}
                    <div className="col-md-3">
                        <h5 className="fw-bold ">Stay Connected</h5>
                        <div className="input-group">
                            <input type="email" className="form-control" placeholder="Enter your email" />
                            <button className="btn btn-success">
                                <i className="fa-solid fa-paper-plane"></i>
                            </button>
                        </div>
                        <div className="mt-3 d-flex gap-3">
                            <SocialIcons />
                        </div>
                    </div>
                </div>
            </div>

            {/* 🔻 Footer Bottom */}
            <div className="text-center mt-4 pt-3 border-top">
                <p className="mb-0">&copy; 2025 Your E-Commerce. All Rights Reserved.</p>
            </div>
        </footer>
    );
}
