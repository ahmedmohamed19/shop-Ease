import axios from 'axios'
import React, { useContext, useState } from 'react'
import { cartContext } from '../Context/CartContext';

export default function useNumOfCartItemsHook() {
    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const { headers } = useContext(cartContext);

    (async function getNumOfCartItems() {
        await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
            .then((res) => {
                setNumOfCartItems(res.data.numOfCartItems)
            })
            .catch((error) => {
                console.log(error);
            })
    })()
    return [numOfCartItems, setNumOfCartItems]
}
