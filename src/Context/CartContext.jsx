import axios from "axios";
import React, { createContext } from "react";

export let cartContext = createContext()

export default function CartContextProvider({ children }) {

    const headers = {
        token: localStorage.getItem('token')
    }

    async function addToCart(productId) {
        const cartResponse = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers });
        const isProductInCart = cartResponse.data.data.products.some(item => item.product._id === productId);

        if (isProductInCart) {
            return 'Product Already In Your Cart'
        }

        return await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId }, { headers })
            .then((res) => {
                return res
            })
            .catch((err) => err)

    }
    return <cartContext.Provider value={{ addToCart, headers }}>
        {children}
    </cartContext.Provider>
}
