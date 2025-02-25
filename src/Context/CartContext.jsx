import axios from "axios";
import { createContext } from "react";

export let cartContext = createContext()
import React from 'react'

export default function CartContextProvider({ children }) {
    const headers = {
        token: localStorage.getItem('token')
    }

    async function addToCart(productId) {
        return await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId }, { headers })
            .then((res) => res)
            .catch((err) => err)

    }
    return <cartContext.Provider value={{ addToCart, headers }}>
        {children}
    </cartContext.Provider>
}
