import { useSelector } from "react-redux"
import { ADD_TO_CART, DECREASE_QUANTITY, DELETE_PRODUCT, INCREASE_QUANTITY } from "../types"

export const addToCart = (product: any, quantity: number) => {
    return (
        {
            type: ADD_TO_CART,
            payload: {
                product: product,
                quantity: quantity
            }
        }
    )
}
export const decreaseQuantityAction = (product: any) => {
    return (
        {
            type: DECREASE_QUANTITY,
            payload: {
                product: product
            }
        }
    )
}
export const increaseQuantityAction = (product: any) => {
    return (
        {
            type: INCREASE_QUANTITY,
            payload: {
                product: product
            }
        }
    )
}
export const deleteProductAction = (product: any) => {
    return {
        type: DELETE_PRODUCT,
        payload: {
            product : product
        }
    }
}