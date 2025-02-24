import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Style from './Products.module.css';

export default function Products() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    // جلب المنتجات مع دعم التصفح بين الصفحات
    const getProducts = async (pageNum = 1) => {
        setLoading(true);
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${pageNum}`);
            setProducts((prevProducts) => [...prevProducts, ...data.data]); // إضافة المنتجات الجديدة
            setHasMore(data.metadata?.nextPage !== null); // التحقق من وجود صفحة تالية
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        getProducts(page);
    }, [page]);

    // إضافة المنتج إلى السلة
    const handleAddToCart = (product) => {
        if (!cart.includes(product.id)) {
            setCart([...cart, product.id]);
            toast.success(`${product.title} added to cart! 🛒`);
        } else {
            toast.info(`${product.title} is already in your cart.`);
        }
    };

    // إضافة المنتج إلى المفضلة
    const handleAddToWishlist = (product) => {
        if (!wishlist.includes(product.id)) {
            setWishlist([...wishlist, product.id]);
            toast.success(`${product.title} added to wishlist! ❤️`);
        } else {
            toast.info(`${product.title} is already in your wishlist.`);
        }
    };

    return (
        <div className="container mt-5">
            <ToastContainer position="top-right" autoClose={2000} />

            {loading && page === 1 ? (
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <ScaleLoader color="green" />
                </div>
            ) : (
                <div className="row">
                    {products.map((product) => (
                        <div key={product.id} className="col-6 col-md-4 col-xl-3 p-2">
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
                                                {[1, 2, 3, 4, 5].map(i => (
                                                    <i key={i} className={i <= Math.round(product.ratingsAverage) ? "fa-solid fa-star text-warning" : "fa-regular fa-star text-muted"}></i>
                                                ))}
                                            </span>
                                        </span>
                                    </div>
                                </Link>
                                <div className="d-flex justify-content-between mt-3">
                                    <button className="btn btn-success flex-grow-1 me-2" onClick={() => handleAddToCart(product)}>
                                        <i className="fa-solid fa-cart-plus"></i> Add to Cart
                                    </button>
                                    <button className="btn btn-outline-danger" onClick={() => handleAddToWishlist(product)}>
                                        <i className="fa-solid fa-heart"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* زر تحميل المزيد */}
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
