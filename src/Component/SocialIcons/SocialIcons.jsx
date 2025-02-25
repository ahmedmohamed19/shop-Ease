import React from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function SocialIcons() {
    return (
        <div className="d-flex gap-3">
            <li className="nav-item d-flex gap-2">
                <Link to="http://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-facebook-f text-primary fa-lg"></i>
                </Link>
                <Link to="http://www.twitter.com" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-twitter text-info fa-lg"></i>
                </Link>
                <Link to="http://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-instagram text-danger fa-lg"></i>
                </Link>
                <Link to="http://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-linkedin text-primary fa-lg"></i>
                </Link>
            </li>
        </div>
    );
}
