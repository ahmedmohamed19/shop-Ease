import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';

export default function CategoryDetails() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getCategory() {
            try {
                const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
                setCategory(data.data);
            } catch (error) {
                setError('Failed to fetch category details.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        getCategory();
    }, [id]);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center align-items-center">
                {loading ? (
                    <div className="d-flex justify-content-center align-items-center vh-100">
                        <ScaleLoader color="green" />
                    </div>
                ) : error ? (
                    <div className="text-center text-danger">{error}</div>
                ) : (
                    <div className="col-md-6 text-center">
                        <div className="shadow-lg rounded p-4 bg-white">
                            {category?.image && <img src={category.image} alt={category.name} className="w-100 rounded mb-3" />}
                            <h1 className="fw-bold">{category?.name}</h1>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
