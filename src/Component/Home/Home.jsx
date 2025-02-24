import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ScaleLoader } from "react-spinners";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Style from "./Home.module.css";

export default function Home() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [categoryRes, productRes] = await Promise.all([
                    axios.get("https://ecommerce.routemisr.com/api/v1/categories"),
                    axios.get("https://ecommerce.routemisr.com/api/v1/products"),
                ]);
                setCategories(categoryRes.data.data);
                setProducts(productRes.data.data);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="container">
            {/* 🟢 Hero Section */}
            <section className={`${Style.hero} text-white text-center py-5`}>
                <h1 className="fw-bold">Welcome to Our E-Commerce Store</h1>
                <p>Find the best products at unbeatable prices!</p>
                <Link to="/products" className="btn btn-success mt-3">Shop Now</Link>
            </section>

            {/* 🔹 Featured Categories */}
            <section className="my-5">
                <h2 className="text-center fw-bold mb-4">Featured Categories</h2>
                {loading ? (
                    <div className="d-flex justify-content-center"><ScaleLoader color="green" /></div>
                ) : (
                    <div className="row flex-nowrap overflow-auto">
                        {categories.map((category) => (
                            <div key={category._id} className="col-md-3 col-sm-6 mb-3 ">
                                <Link to={`/CategoryDetails/${category._id}`} className="text-decoration-none">
                                    <div className="card shadow-sm text-center">
                                        <img src={category.image} alt={category.name} className={Style.categoryImage} />
                                        <h5 className="mt-2 p-2 fw-bold">{category.name}</h5>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* 🔥 Best-Selling Products */}
            <section className="my-5">
                <h2 className="text-center fw-bold mb-4">Best-Selling Products</h2>
                {loading ? (
                    <div className="d-flex justify-content-center"><ScaleLoader color="green" /></div>
                ) : (
                    <div className="row">
                        {products.slice(0, 8).map((product) => (
                            <div key={product.id} className="col-md-3 col-sm-6 mb-3">
                                <Link to={`/ProductDetails/${product.id}`} className="text-decoration-none text-dark">
                                    <div className="card shadow-sm p-3">
                                        <img src={product.imageCover} alt={product.title} className={Style.productImage} />
                                        <h5 className="mt-2">{product.title.split(" ").slice(0, 3).join(" ")}</h5>
                                        <p className="fw-bold">{product.price} $</p>
                                        <button className="btn btn-success w-100">Add to Cart</button>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* 🗣️ Testimonials */}
            <section className="my-5 text-center">
                <h2 className="fw-bold mb-4">What Our Customers Say</h2>
                <div className="row">
                    <div className="col-md-4">
                        <p><i className="fa-solid fa-quote-left"></i> Amazing quality and fast delivery! Highly recommend! <i className="fa-solid fa-quote-right"></i></p>
                        <p className="fw-bold">- Sarah J.</p>
                    </div>
                    <div className="col-md-4">
                        <p><i className="fa-solid fa-quote-left"></i> Best customer service and great prices! <i className="fa-solid fa-quote-right"></i></p>
                        <p className="fw-bold">- Mark T.</p>
                    </div>
                    <div className="col-md-4">
                        <p><i className="fa-solid fa-quote-left"></i> Absolutely love my purchase! Five stars! <i className="fa-solid fa-quote-right"></i></p>
                        <p className="fw-bold">- Lisa K.</p>
                    </div>
                </div>
            </section>

            {/* 📩 Newsletter Subscription */}
            <section className="text-center my-5">
                <h2 className="fw-bold mb-3">Subscribe to Our Newsletter</h2>
                <p>Get the latest deals and updates directly in your inbox.</p>
                <div className="d-flex justify-content-center">
                    <input type="email" className="form-control w-50" placeholder="Enter your email" />
                    <button className="btn btn-success ms-2">Subscribe</button>
                </div>
            </section>
        </div>
    );
}
