import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Style from './Cart.module.css';

export default function Cart() {
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

    useEffect(() => {
        if (cart.length > 0) {
            fetchProducts();
        } else {
            setProducts([]);
            setTotalPrice(0);
        }
    }, [cart]);

    async function fetchProducts() {
        try {
            const responses = await Promise.all(
                cart.map(id => fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`).then(res => res.json()))
            );
            const productData = responses.map(res => res.data);
            setProducts(productData);
            calculateTotal(productData);
        } catch (error) {
            console.error('Error fetching cart products:', error);
        }
    }

    function calculateTotal(productData) {
        const total = productData.reduce((acc, product) => acc + product.price, 0);
        setTotalPrice(total);
    }

    function removeFromCart(productId) {
        const updatedCart = cart.filter(id => id !== productId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">🛒 Your Cart</h2>
            {products.length > 0 ? (
                <>
                    <div className="row">
                        {products.map(product => (
                            <div key={product.id} className="col-12 col-md-6 col-lg-4 mb-4">
                                <div className={`card shadow-lg p-3 ${Style.cartCard}`}>
                                    <Link to={`/ProductDetails/${product.id}`} className="text-decoration-none text-dark">
                                        <div className={Style.imageContainer}>
                                            <img src={product.imageCover} alt={product.title} className={Style.productImage} />
                                        </div>
                                        <h5 className="mt-2">{product.title.split(' ').slice(0, 2).join(' ')}</h5>
                                    </Link>
                                    <div className="d-flex justify-content-between align-items-center mt-2">
                                        <span className="fw-bold">{product.price} $</span>
                                        <button className="btn btn-danger" onClick={() => removeFromCart(product.id)}>
                                            <i className="fa-solid fa-trash"></i> Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-4">
                        <h4>Total: <span className="fw-bold text-success">{totalPrice} $</span></h4>
                        <button className="btn btn-primary">Proceed to Checkout</button>
                    </div>
                </>
            ) : (
                <div className="text-center text-muted">
                    <h4>Your cart is empty 😞</h4>
                    <Link to="/products" className="btn btn-success mt-3">Go Shopping</Link>
                </div>
            )}
        </div>
    );
}
