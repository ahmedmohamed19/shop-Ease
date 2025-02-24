import React from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Style from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={`py-4 bg-dark  text-light ${Style.footer} `}>
            <div className="container">
                <div className="row">
                    {/* 🟢 Company Info */}
                    <div className="col-md-3">
                        <h5 className="fw-bold">About Us</h5>
                        <p className="text-muted">
                            Your one-stop shop for all your needs. High-quality products at unbeatable prices!
                        </p>
                    </div>

                    {/* 🔗 Quick Links */}
                    <div className="col-md-3">
                        <h5 className="fw-bold">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/" className="text-light text-decoration-none">Home</Link></li>
                            <li><Link to="/Products" className="text-light text-decoration-none">Products</Link></li>
                            <li><Link to="/Category" className="text-light text-decoration-none">Categories</Link></li>
                            <li><Link to="/contact" className="text-light text-decoration-none">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* 📞 Contact Info */}
                    <div className="col-md-3">
                        <h5 className="fw-bold">Contact Us</h5>
                        <p><i className="fa-solid fa-phone"></i> +123 456 7890</p>
                        <p><i className="fa-solid fa-envelope"></i> support@ecommerce.com</p>
                        <p><i className="fa-solid fa-map-marker-alt"></i> 123 Street, City</p>
                    </div>

                    {/* 📩 Newsletter */}
                    <div className="col-md-3">
                        <h5 className="fw-bold">Subscribe to Newsletter</h5>
                        <div className="input-group">
                            <input type="email" className="form-control" placeholder="Enter your email" />
                            <button className="btn btn-success"><i className="fa-solid fa-paper-plane"></i></button>
                        </div>
                        <div className="mt-3">
                            <Link to="#" className="text-light me-3"><i className="fa-brands fa-facebook fa-lg"></i></Link>
                            <Link to="#" className="text-light me-3"><i className="fa-brands fa-twitter fa-lg"></i></Link>
                            <Link to="#" className="text-light me-3"><i className="fa-brands fa-instagram fa-lg"></i></Link>
                            <Link to="#" className="text-light"><i className="fa-brands fa-linkedin fa-lg"></i></Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* 🔻 Footer Bottom */}
            <div className="text-center mt-4 pt-3 border-top">
                <p className="mb-0">© 2025 Your E-Commerce. All Rights Reserved.</p>
            </div>
        </footer>
    );
}
