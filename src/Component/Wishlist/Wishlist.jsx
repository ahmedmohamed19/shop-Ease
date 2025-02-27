import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

export default function Wishlist() {
    const [wishlist, setWishList] = useState([]);
    const { addToCart, headers, setNumOfCartItems } = useContext(cartContext);
    const [isLoading, setIsLoading] = useState(true);
    const [loadingStates, setLoadingStates] = useState({});

    useEffect(() => {
        getWishlist();
    }, []);

    function getWishlist() {
        setIsLoading(true);
        axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', { headers })
            .then((res) => setWishList(res.data.data))
            .catch(() => toast.error("Failed to load wishlist"))
            .finally(() => setIsLoading(false));
    }

    const removeFromWishlist = (productId) => {
        axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers })
            .then((res) => {
                toast.success(res.data.message);
                setWishList(prevWishlist => prevWishlist.filter(item => item.id !== productId));
            })
            .catch(() => toast.error("Failed to remove item from wishlist"));
    };

    async function handleAddToCart(productId) {
        setLoadingStates(prev => ({ ...prev, [productId]: true }));

        try {
            const response = await addToCart(productId);

            if (response === 'Product Already In Your Cart') {
                toast("Product Already In Your Cart 🛒", { icon: "ℹ️", style: { background: "#fff", color: "#3498db" } });
                removeFromWishlist(productId);
            } else if (response.data?.status) {
                setNumOfCartItems(response.data.numOfCartItems);
                toast.success(response.data.message);
                removeFromWishlist(productId); 
            } else {
                toast.error(response.data.message || "Failed to add to cart");
            }
        } catch (error) {
            toast.error("Error adding to cart");
        }

        setLoadingStates(prev => ({ ...prev, [productId]: false }));
    }

    return (
        <div className="container my-5">
            <h2 className="text-center text-primary fw-bold">Wishlist</h2>

            {isLoading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
                    <ClipLoader color="blue" size={50} />
                </div>
            ) : wishlist.length === 0 ? (
                <p className="text-center mt-4">Your wishlist is empty.</p>
            ) : (
                <div className="row">
                    {wishlist.map((item) => (
                        <div key={item.id} className="col-md-4">
                            <div className="card shadow-lg mb-4">
                                <img src={item.imageCover} className="card-img-top" alt={item.title} />
                                <div className="card-body">
                                    <h5 className="card-title">{item.title}</h5>
                                    <p className="card-text text-success fw-semibold">${item.price}</p>
                                    <button
                                        className="btn btn-success w-100 mb-2"
                                        onClick={() => handleAddToCart(item.id)}
                                        disabled={loadingStates[item.id]}
                                    >
                                        {loadingStates[item.id] ? (
                                            <ClipLoader color="white" size={20} />
                                        ) : (
                                            <><i className="fa-solid fa-cart-plus"></i> Add to Cart</>
                                        )}
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
