import React from "react";
import Style from "./About.module.css";
import CEO from '../../assets/CEO.jpg'
import COO from '../../assets/COO.jpg'
import CFO from '../../assets/CFO.jpg'
import CMO from '../../assets/CMO.jpg'
import CTO from '../../assets/CTO.jpg'
import CIO from '../../assets/CIO.jpg'

export default function About() {
    return (
        <div className="container my-5">
            <section className="text-center">
                <h1 className="fw-bold">About Us</h1>
                <p className="text-muted">Your trusted online shopping destination.</p>
            </section>

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

            <section className="my-5 text-center">
                <h2 className="fw-bold">Meet Our Team</h2>
                <div className="row">
                    <div className="col-md-4">
                        <img src={CEO} alt="CEO" className={Style.teamImage} />
                        <h4 className="mt-2">Ahmed Mohamed</h4>
                        <p>Founder & CEO</p>
                    </div>
                    <div className="col-md-4">
                        <img src={COO} alt="CTO" className={Style.teamImage} />
                        <h4 className="mt-2">Ahmed ElSheikh</h4>
                        <p>Chief Operating Officer</p>
                    </div>
                    <div className="col-md-4">
                        <img src={CIO} alt="CIO" className={Style.teamImage} />
                        <h4 className="mt-2">Mohamed Ommar</h4>
                        <p>Chief Information Officer</p>
                    </div>
                    <div className="col-md-4">
                        <img src={CFO} alt="CFO" className={Style.teamImage} />
                        <h4 className="mt-2">Ibrahim Eltbakh</h4>
                        <p>Chief Financial Officer</p>
                    </div>
                    <div className="col-md-4">
                        <img src={CTO} alt="CTO" className={Style.teamImage} />
                        <h4 className="mt-2">Ahmed Fouda</h4>
                        <p>Chief Technology Officer</p>
                    </div>
                    <div className="col-md-4">
                        <img src={CMO} alt="CMO" className={Style.teamImage} />
                        <h4 className="mt-2">Mohamed Nsr</h4>
                        <p>Marketing Director</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
