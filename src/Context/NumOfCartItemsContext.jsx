import React, { createContext, useContext, useState, useEffect } from "react";
import { cartContext } from "./CartContext";
import axios from "axios";

// Create the context
export const NumOfCartItemsContext = createContext();

export default function NumOfCartItemsProvider({ children }) {
    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const { headers } = useContext(cartContext);

    useEffect(() => {
        const getNumOfCartItems = async () => {
            try {
                const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers });
                setNumOfCartItems(res.data.numOfCartItems);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        getNumOfCartItems();
    }, []);

    return (
        <NumOfCartItemsContext.Provider value={{ numOfCartItems, setNumOfCartItems }}>
            {children}
        </NumOfCartItemsContext.Provider>
    );
}
