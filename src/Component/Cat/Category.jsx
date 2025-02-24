import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';
import Style from './categoryDetails.module.css';

export default function Category() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getCategories() {
      try {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
        setCategories(data.data);
      } catch (error) {
        setError('Failed to load categories.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getCategories();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <ScaleLoader color="green" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-danger mt-5">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div key={category._id} className="col-md-3 col-sm-6 p-3">
              <Link to={`/CategoryDetails/${category._id}`} className="text-decoration-none text-dark">
                <div className={`card shadow-lg rounded text-center p-3 ${Style.cardHover}`}>
                  <div className={Style.imageContainer}>
                    <img src={category.image} alt={category.name} className={Style.categoryImage} />
                  </div>
                  <h5 className="mt-2 fw-bold">{category.name}</h5>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="text-center text-muted w-100">No categories available.</div>
        )}
      </div>
    </div>
  );
}
