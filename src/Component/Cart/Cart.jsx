import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import { cartContext } from '../../Context/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import toast from 'react-hot-toast';
import { NumOfCartItemsContext } from '../../Context/NumOfCartItemsContext';

export default function Cart() {
    const { setNumOfCartItems } = useContext(NumOfCartItemsContext)
    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(null);

    const { headers } = useContext(cartContext);

    useEffect(() => {
        fetchProducts();
    }, []);

    async function clearCart() {
        await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
            .then((response) => {
                console.log(response);
                toast.success('deleted')
                fetchProducts()
            })
            .catch((error) => {
                toast.error(error)
            })
    }

    async function fetchProducts() {
        setLoading(true);
        try {
            const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers });
            setNumOfCartItems(res.data.numOfCartItems)
            const fetchedProducts = res.data.data.products;
            setProducts(fetchedProducts);
            setTotalPrice(fetchedProducts.reduce((sum, product) => sum + product.price * product.count, 0));
        } catch (error) {
            console.error("Error fetching cart products:", error);
        }
        setLoading(false);
    }

    async function updateQuantity(productId, newQuantity) {
        if (newQuantity == 0) {
            removeFromCart(productId)
            return
        };
        setUpdating(productId);
        try {
            const response = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count: newQuantity }, { headers });
            if (response.data.status) {
                toast.success("Quantity updated!");
                fetchProducts();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
        setUpdating(null);
    }

    async function removeFromCart(productId) {
        try {
            const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers });

            if (response.data.status) {
                setNumOfCartItems(response.data.numOfCartItems)
                toast.success("Deleted Successfully");
                fetchProducts();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error removing product from cart:", error);
        }
    }

    return (
        <div className="container mt-5 min-vh-100">
            <h2 className="mb-4 text-center"> Your Cart 🛒</h2>

            {loading ? (
                <div className="text-center">
                    <i className="fa-solid fa-spinner fa-spin fa-3x text-success"></i>
                    <p className="mt-3">Loading your cart...</p>
                </div>
            ) : products.length > 0 ? (
                <>
                    <div className="row">
                        {products.map(product => (
                            <div key={product._id} className="col-12 col-md-6 col-lg-4 mb-4">
                                <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
                                    <Link to={`/ProductDetails/${product.id}`} className="text-decoration-none text-dark">
                                        <div className="position-relative">
                                            <img
                                                src={product.product.imageCover}
                                                alt={product.product.title}
                                                className="card-img-top img-fluid"
                                                style={{ height: "350px", objectFit: "cover" }}
                                            />
                                        </div>
                                    </Link>
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title text-truncate">{product.product.title}</h5>
                                        <p className="mb-2 text-muted">Category: {product.product.category.name}</p>

                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <span className="fw-bold text-success fs-5">${product.price}</span>
                                            <span className="badge bg-warning text-dark">
                                                <i className="fa-solid fa-star"></i> {product.product.ratingsAverage}
                                            </span>
                                        </div>

                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                            <button className="btn btn-outline-secondary btn-sm" onClick={() => updateQuantity(product.product.id, product.count - 1)}>
                                                <i className="fa-solid fa-minus"></i>
                                            </button>
                                            <span className="fw-bold fs-5 mx-2">{updating === product.product.id ? <i className="fa-solid fa-spinner fa-spin"></i> : product.count}</span>
                                            <button className="btn btn-outline-secondary btn-sm" onClick={() => updateQuantity(product.product.id, product.count + 1)}>
                                                <i className="fa-solid fa-plus"></i>
                                            </button>
                                        </div>

                                        <button className="btn btn-danger w-100" onClick={() => removeFromCart(product.product.id)}>
                                            <i className="fa-solid fa-trash"></i> Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button className="btn btn-danger px-4 py-2" onClick={clearCart}>
                            Clear Cart
                        </button>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-4">
                        <h4>Total: <span className="fw-bold text-success">${totalPrice}</span></h4>
                        <button className="btn btn-primary px-4 py-2">
                            <i className="fa-solid fa-credit-card"></i> Proceed to Checkout
                        </button>

                    </div>
                </>
            ) : (
                <div className="text-center text-muted">
                    <h4>Your cart is empty 😞</h4>
                    <Link to="/products" className="btn btn-success mt-3">
                        <i className="fa-solid fa-shopping-bag"></i> Go Shopping
                    </Link>
                </div>
            )}
        </div>
    );
}
