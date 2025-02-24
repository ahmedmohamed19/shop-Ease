import React, { useState } from 'react';

export default function Wishlist({ addToCart }) {
    const [wishlist, setWishlist] = useState([
        { id: 1, name: "Product 1", price: 100, image: "https://via.placeholder.com/150" },
        { id: 2, name: "Product 2", price: 200, image: "https://via.placeholder.com/150" },
        { id: 3, name: "Product 3", price: 150, image: "https://via.placeholder.com/150" }
    ]);

    const removeFromWishlist = (id) => {
        setWishlist(wishlist.filter(item => item.id !== id));
    };

    return (
        <div className="container my-5">
            <h2 className="text-center text-primary fw-bold">Wishlist</h2>

            {wishlist.length === 0 ? (
                <p className="text-center mt-4">Your wishlist is empty.</p>
            ) : (
                <div className="row">
                    {wishlist.map((item) => (
                        <div key={item.id} className="col-md-4">
                            <div className="card shadow-lg mb-4">
                                <img src={item.image} className="card-img-top" alt={item.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text text-success fw-semibold">${item.price}</p>

                                    <button
                                        className="btn btn-success w-100 mb-2"
                                        onClick={() => addToCart(item)}
                                    >
                                        <i className="fa-solid fa-cart-plus"></i> Add to Cart
                                    </button>

                                    <button
                                        className="btn btn-danger w-100"
                                        onClick={() => removeFromWishlist(item.id)}
                                    >
                                        <i className="fa-solid fa-trash"></i> Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
