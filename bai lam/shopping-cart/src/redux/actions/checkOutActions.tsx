import { CHECK_OUT_SAGA, TOGGLE_CHECK_OUT } from "../types"

export const checkoutAction = () => {
    console.log('tao checkout action')
    return {
        type: CHECK_OUT_SAGA
    }
}
export const toggleStateCheckout = () => {
    return {
        type: TOGGLE_CHECK_OUT
    }
}