import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ScaleLoader, ClipLoader } from 'react-spinners';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Style from './Products.module.css';
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { NumOfCartItemsContext } from '../../Context/NumOfCartItemsContext';

export default function Products() {
    const { addToCart, headers } = useContext(cartContext);
    const { setNumOfCartItems } = useContext(NumOfCartItemsContext);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [wishlist, setWishlist] = useState(new Set());

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loadingStates, setLoadingStates] = useState({});


    const getProducts = async (pageNum = 1) => {
        setLoading(true);
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${pageNum}`);
            setProducts((prevProducts) => [...prevProducts, ...data.data]);
            setHasMore(data.metadata?.nextPage !== null);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const getWishlist = async () => {
        try {
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers });
            const wishlistSet = new Set(data.data.map((item) => item.id)); // حفظ IDs فقط لسهولة البحث
            setWishlist(wishlistSet);
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        }
    };

    useEffect(() => {
        getProducts(page);
    }, [page]);

    useEffect(() => {
        getWishlist();
    }, []);

    async function handleAddToCart(productId) {
        setLoadingStates((prev) => ({ ...prev, [productId]: true }));

        try {
            const response = await addToCart(productId);
            if (response === "Product Already In Your Cart") {
                toast("Product Already In Your Cart 🛒", {
                    icon: "ℹ️",
                    style: { background: "#fff", color: "#3498db" },
                });
            } else if (response.data.status) {
                setNumOfCartItems(response.data.numOfCartItems);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error("Failed to add to cart.");
        }

        setLoadingStates((prev) => ({ ...prev, [productId]: false }));
    }

    const toggleWishlist = async (product) => {
        const isInWishlist = wishlist.has(product.id);

        try {
            if (isInWishlist) {
                await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${product.id}`, { headers });
                setWishlist((prev) => {
                    const newWishlist = new Set(prev);
                    newWishlist.delete(product.id);
                    return newWishlist;
                });
                toast.success(`${product.title} removed from wishlist.`);
            } else {
                await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist", { productId: product.id }, { headers });
                setWishlist((prev) => new Set([...prev, product.id]));
                toast.success(`${product.title} added to wishlist! ❤️`);
            }
        } catch (error) {
            console.error("Error toggling wishlist:", error);
            toast.error("Failed to update wishlist.");
        }
    };

    return (
        <div className="container mt-5">
            {loading && page === 1 ? (
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <ScaleLoader color="green" />
                </div>
            ) : (
                <div className="row">
                    {products.map((product, i) => (
                        <div key={`${product.id}${Date.now().toString()}${i}`} className="col-md-6 col-lg-4 col-xl-3 p-2">
                            <div className={`card shadow-lg p-3 rounded ${Style.productCard}`}>
                                <Link to={`/ProductDetails/${product.id}`} className="text-decoration-none text-dark">
                                    <div className={Style.imageContainer}>
                                        <img src={product.imageCover} alt={product.title} className={Style.productImage} />
                                    </div>
                                    <h5 className={Style.productTitle}>{product.title}</h5>
                                    <div className="d-flex justify-content-between align-items-center text-muted">
                                        <span>{product.category.name}</span>
                                        <span>{product.brand.name}</span>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="fw-bold">
                                            {product.price} $
                                            {product.priceAfterDiscount && (
                                                <span className={Style.discountedPrice}>{product.priceAfterDiscount} $</span>
                                            )}
                                        </span>
                                        <span className="fw-bold">
                                            {product.ratingsAverage}
                                            <span className="ps-2">
                                                {[1, 2, 3, 4, 5].map((i) => (
                                                    <i key={i} className={i <= Math.round(product.ratingsAverage) ? "fa-solid fa-star text-warning" : "fa-regular fa-star text-muted"}></i>
                                                ))}
                                            </span>
                                        </span>
                                    </div>
                                </Link>
                                <div className="d-flex justify-content-between mt-3">
                                    <button
                                        className="btn btn-success flex-grow-1 me-2"
                                        onClick={() => handleAddToCart(product.id)}
                                        disabled={loadingStates[product.id]}
                                    >
                                        {loadingStates[product.id] ? (
                                            <ClipLoader color="white" size={20} />
                                        ) : (
                                            <>
                                                <i className="fa-solid fa-cart-plus"></i> Add to Cart
                                            </>
                                        )}
                                    </button>
                                    <button
                                        className={`btn ${wishlist.has(product.id) ? "btn-danger" : "btn-outline-danger"}`}
                                        onClick={() => toggleWishlist(product)}
                                    >
                                        <i className="fa-solid fa-heart"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {hasMore && (
                <div className="text-center mt-4">
                    <button
                        className="btn btn-primary my-3"
                        onClick={() => setPage(page + 1)}
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Load More"}
                    </button>
                </div>
            )}
        </div>
    );
}
