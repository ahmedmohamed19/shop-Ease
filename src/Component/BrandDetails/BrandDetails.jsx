import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';

export default function BrandDetails() {
    const { id } = useParams();
    const [brand, setBrand] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getBrand() {
            try {
                const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
                setBrand(data.data);
            } catch (err) {
                setError('Failed to load brand details.');
            } finally {
                setLoading(false);
            }
        }
        getBrand();
    }, [id]);

    if (loading) {
        return <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>;
    }

    if (error) {
        return <div className="text-center text-red-500 mt-5">{error}</div>;
    }

    return <>
        {
            loading ?
                <div className="d-flex justify-content-center align-items-center vh-100">
                    < ScaleLoader color="green" />
                </div >
                : <>
                    <div className="flex flex-col items-center mt-10">
                        <div className="bg-white shadow-lg rounded-2xl p-5 w-96 text-center">
                            <img src={brand?.image} alt={brand?.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                            <h1 className="text-2xl font-semibold">{brand?.name}</h1>
                        </div>
                    </div>
                </>
        }
    </>

}
