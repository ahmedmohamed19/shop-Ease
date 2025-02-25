import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {
    const { id } = useParams();
    const [productLoading, setProductLoading] = useState(true);
    const [allProductsLoading, setAllProductsLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [allProducts, setAllProducts] = useState([]);
    const { addToCart } = useContext(cartContext)
    const [loadingStates, setLoadingStates] = useState({});

    async function handleAddToCart(productId) {
        setLoadingStates(prev => ({ ...prev, [productId]: true })); // ⬅️ تفعيل التحميل للمنتج المحدد

        try {
            const response = await addToCart(productId);
            if (response.data.status) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error("Failed to add to cart.");
        }

        setLoadingStates(prev => ({ ...prev, [productId]: false })); // ⬅️ إيقاف التحميل بعد انتهاء العملية
    }

    useEffect(() => {
        async function getProduct() {
            try {
                const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
                setProduct(data.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setProductLoading(false);
            }
        }
        async function getAllProducts() {
            try {
                const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
                setAllProducts(data.data);
            } catch (error) {
                console.error('Error fetching all products:', error);
            } finally {
                setAllProductsLoading(false);
            }
        }
        getProduct();
        getAllProducts();
    }, [id]);



    const handleAddToWishlist = () => {
        console.log(`Added ${product?.title} to wishlist`);
        alert('Item added to wishlist!');
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                {productLoading ? (
                    <div className="d-flex justify-content-center align-items-center vh-100">
                        <ScaleLoader color="green" />
                    </div>
                ) : (
                    <>
                        <div className="col-md-6 p-3">
                            {product?.images && product.images.length > 0 ? (
                                <div id="carouselExampleIndicators" className="carousel slide shadow-lg rounded" >
                                    <div className="carousel-indicators">
                                        {product.images.map((_, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                className={`bg-danger ${index === 0 ? 'active' : ''}`}
                                                data-bs-target="#carouselExampleIndicators"
                                                data-bs-slide-to={index}
                                                aria-label={`Slide ${index + 1}`}
                                            ></button>
                                        ))}
                                    </div>
                                    <div className="carousel-inner">
                                        {product.images.map((image, index) => (
                                            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                                <img src={image} className="d-block w-100 rounded" alt={`Product ${index}`} />
                                            </div>
                                        ))}
                                    </div>
                                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon"></span>
                                    </button>
                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                        <span className="carousel-control-next-icon"></span>
                                    </button>
                                </div>
                            ) : (
                                <h3 className="text-center text-muted">No images available</h3>
                            )}
                        </div>

                        <div className="col-md-6 d-flex flex-column justify-content-center">
                            <h2 className="fw-bold">{product?.title}</h2>
                            <p className="text-muted">{product?.description}</p>
                            <h4 className="text-success">{product?.price} $</h4>


                            <div className="d-flex align-items-center">
                                <span className="fw-bold me-2">{product?.ratingsAverage}</span>
                                {[1, 2, 3, 4, 5].map(i => (
                                    <i key={i} className={i <= Math.round(product?.ratingsAverage) ? "fa-solid fa-star text-warning" : "fa-regular fa-star text-muted"}></i>
                                ))}
                            </div>

                            <div className="mt-4">
                                <button className="btn btn-success me-3" onClick={() => handleAddToCart(product.id)}>
                                    <i className="fa-solid fa-cart-shopping me-2"></i> Add to Cart
                                </button>
                                <button className="btn btn-outline-danger" onClick={handleAddToWishlist}>
                                    <i className="fa-solid fa-heart me-2"></i> Add to Wishlist
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>


            <div className="row mt-5  ">
                <h3 className="fw-bold text-center mb-4">Related Products</h3>
                <div className="d-flex mt-5 flex-nowrap overflow-x-auto gap-3">

                    {allProductsLoading ? (
                        <div className="d-flex justify-content-center align-items-center vh-100">
                            <ScaleLoader color="green" />
                        </div>
                    ) : (
                        allProducts
                            .filter(currProduct => currProduct.category.name === product.category.name && currProduct.id !== product.id)
                            .map(currProduct => (
                                <div key={currProduct.id} className="col-md-3">
                                    <Link to={`/ProductDetails/${currProduct.id}`} className="text-decoration-none text-dark">
                                        <div className="card shadow-sm p-2 rounded  h-100 d-flex flex-column">
                                            <img src={currProduct.imageCover} className="card-img-top rounded" alt={currProduct.title} />
                                            <div className="card-body text-center">
                                                <h5 className="card-title">{currProduct.title}</h5>
                                                <p className="text-muted mb-1">{currProduct.category.name}</p>
                                                <p className="text-success fw-bold">{currProduct.price} $</p>
                                                <button className="btn btn-primary btn-sm">
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))
                    )}
                </div>
            </div>
        </div>
    );
}
