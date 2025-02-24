import { useEffect, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Component/Layout/Layout'
import Home from './Component/Home/Home'
import About from './Component/About/About'
import Login from './Component/Login/Login'
import Register from './Component/Register/Register'
import Products from './Component/Products/Products'
import Category from './Component/Cat/Category'
import Brands from './Component/Brands/Brands'
import ProductDetails from './Component/ProductDetails/ProductDetails'
import CategoryDetails from './Component/CategoryDetails/CategoryDetails'
import BrandDetails from './Component/BrandDetails/BrandDetails'
import ContactUs from './Component/ContactUs/ContactUs'
import Cart from './Component/Cart/Cart'
import Wishlist from './Component/Wishlist/Wishlist'

let router = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'Products', element: <Products /> },
      { path: 'ProductDetails/:id', element: <ProductDetails /> },
      { path: 'Category', element: <Category /> },
      { path: 'CategoryDetails/:id', element: <CategoryDetails /> },
      { path: 'Brand', element: <Brands /> },
      { path: 'brandDetails/:id', element: <BrandDetails /> },
      { path: 'Contact', element: <ContactUs /> },
      { path: 'Cart', element: <Cart /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ]
  }
])
function App() {


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
