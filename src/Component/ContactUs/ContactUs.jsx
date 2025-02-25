import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Style from "./ContactUs.module.css";

export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [submitted, setSubmitted] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log("Form Submitted:", formData);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    }

    return (
        <div className="container my-5 py-3">
            <div className="row">
                {/* 🟢 Contact Form */}
                <div className="col-md-6">
                    <h2 className="mb-4 fw-bold">Get in Touch</h2>
                    {submitted && <p className="text-success">Message sent successfully!</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Name</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Message</label>
                            <textarea
                                name="message"
                                className="form-control"
                                rows="4"
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-success w-100">Send Message</button>
                    </form>
                </div>

                {/* 🔹 Contact Info */}
                <div className="col-md-6">
                    <h2 className="mb-4 fw-bold">Contact Information</h2>
                    <p><i className="fa-solid fa-phone"></i> +123 456 7890</p>
                    <p><i className="fa-solid fa-envelope"></i> support@ecommerce.com</p>
                    <p><i className="fa-solid fa-map-marker-alt"></i> 123 Street, City, Country</p>

                    <h4 className="mt-4">Follow Us</h4>
                    <div className="d-flex gap-3">
                        <a href="#" className="text-dark"><i className="fa-brands fa-facebook fa-lg"></i></a>
                        <a href="#" className="text-dark"><i className="fa-brands fa-twitter fa-lg"></i></a>
                        <a href="#" className="text-dark"><i className="fa-brands fa-instagram fa-lg"></i></a>
                        <a href="#" className="text-dark"><i className="fa-brands fa-linkedin fa-lg"></i></a>
                    </div>
                </div>
            </div>
        </div>
    );
}
