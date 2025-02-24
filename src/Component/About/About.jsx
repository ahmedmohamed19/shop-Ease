import React from "react";
import Style from "./About.module.css";

export default function About() {
    return (
        <div className="container my-5">
            {/* 🏢 Company Introduction */}
            <section className="text-center">
                <h1 className="fw-bold">About Us</h1>
                <p className="text-muted">Your trusted online shopping destination.</p>
            </section>

            {/* 🌟 Our Mission & Vision */}
            <section className="my-5 text-center">
                <div className="row">
                    <div className="col-md-6">
                        <h2 className="fw-bold">Our Mission</h2>
                        <p>
                            To provide high-quality products at affordable prices while ensuring an excellent shopping experience.
                        </p>
                    </div>
                    <div className="col-md-6">
                        <h2 className="fw-bold">Our Vision</h2>
                        <p>
                            To become a global leader in e-commerce, connecting people with products they love.
                        </p>
                    </div>
                </div>
            </section>

            {/* 🏆 Our Values */}
            <section className="my-5">
                <h2 className="fw-bold text-center">Our Values</h2>
                <div className="row text-center">
                    <div className="col-md-4">
                        <i className="fa-solid fa-user-check fa-3x text-success"></i>
                        <h4 className="mt-2">Customer First</h4>
                        <p>We prioritize customer satisfaction above all else.</p>
                    </div>
                    <div className="col-md-4">
                        <i className="fa-solid fa-gem fa-3x text-success"></i>
                        <h4 className="mt-2">Quality Products</h4>
                        <p>Only the best products, carefully selected for you.</p>
                    </div>
                    <div className="col-md-4">
                        <i className="fa-solid fa-truck-fast fa-3x text-success"></i>
                        <h4 className="mt-2">Fast Shipping</h4>
                        <p>We ensure quick and reliable delivery for all orders.</p>
                    </div>
                </div>
            </section>

            {/* 🔥 Why Choose Us? */}
            <section className="my-5 text-center">
                <h2 className="fw-bold">Why Choose Us?</h2>
                <div className="row">
                    <div className="col-md-4">
                        <p><i className="fa-solid fa-star text-warning"></i> Trusted by thousands of customers worldwide.</p>
                    </div>
                    <div className="col-md-4">
                        <p><i className="fa-solid fa-lock text-primary"></i> Secure payments and customer protection.</p>
                    </div>
                    <div className="col-md-4">
                        <p><i className="fa-solid fa-thumbs-up text-success"></i> Best prices and frequent discounts.</p>
                    </div>
                </div>
            </section>

            {/* 👥 Meet Our Team (Optional) */}
            <section className="my-5 text-center">
                <h2 className="fw-bold">Meet Our Team</h2>
                <div className="row">
                    <div className="col-md-4">
                        <img src="/path-to-team-member.jpg" alt="CEO" className={Style.teamImage} />
                        <h4 className="mt-2">John Doe</h4>
                        <p>Founder & CEO</p>
                    </div>
                    <div className="col-md-4">
                        <img src="/path-to-team-member.jpg" alt="CTO" className={Style.teamImage} />
                        <h4 className="mt-2">Jane Smith</h4>
                        <p>Chief Technology Officer</p>
                    </div>
                    <div className="col-md-4">
                        <img src="/path-to-team-member.jpg" alt="CMO" className={Style.teamImage} />
                        <h4 className="mt-2">Emily White</h4>
                        <p>Marketing Director</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
