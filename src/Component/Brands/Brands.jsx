import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';

export default function Category() {
    const [loading, setLoading] = useState(true);
    const [brands, setBrands] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getBrands() {
            try {
                const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
                setBrands(data.data);
            } catch (error) {
                setError('Failed to load brands.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        getBrands();
    }, []);

    return (
        <div className="container mt-5">
            {loading ? (
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <ScaleLoader color="green" />
                </div>
            ) : error ? (
                <div className="text-center text-danger">{error}</div>
            ) : (
                <div className="row">
                    {brands.length > 0 ? (
                        brands.map((brand) => (
                            <div key={brand._id} className="col-md-3 col-sm-6 p-3">
                                <Link to={`/brandDetails/${brand._id}`} className="text-decoration-none text-dark">
                                    <div className="card shadow-lg rounded text-center p-3">
                                        <img src={brand.image} alt={brand.name} className="w-100 rounded" />
                                        <h5 className="mt-2 fw-bold">{brand.name}</h5>
                                    </div>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-muted w-100">No brands available.</div>
                    )}
                </div>
            )}
        </div>
    );
}
