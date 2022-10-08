import { stat } from 'fs';
import { useHistory } from 'react-router';
import {ADD_TO_CART, DONE_CHECK_OUT, DECREASE_QUANTITY, DELETE_PRODUCT, INCREASE_QUANTITY, TOGGLE_ADDED_STATE} from '../types'
let cart: any[] = []
const INITSTATE = {
    cart,
    added_success: false
}
const cartReducer = (state = INITSTATE, action:any) => {
    switch(action.type) {
        case ADD_TO_CART:
            if(state.cart.length === 0) {
                state.cart.push(action.payload);
                return {
                    ...state,
                    cart: [...state.cart],
                    added_success: true
                    
                }
            }
            for(let i = 0; i < state.cart.length; i++) {
                let item = state.cart[i] as any;
                if(item.product.productId === action.payload.product.productId) {
                    item.quantity = action.payload.quantity;
                    return {
                        ...state, 
                        cart: [
                            ...state.cart.slice(0, i),
                            item,
                            ...state.cart.slice(i + 1)
                        ],
                        added_success: true


                    }
                }
            };             
            state.cart.push(action.payload);
            return {
                ...state,
                cart: [...state.cart],
                added_success: true

            };
        case DECREASE_QUANTITY:{ 
            let newState:any; 
            for(let i = 0; i < state.cart.length; i++) {
                let item = state.cart[i] as any;
                if(item.product.productId === action.payload.product.productId) {
                    item.quantity = item.quantity - 1;
                    newState =  {
                        ...state, 
                        cart: [
                            ...state.cart.slice(0, i),
                            item,
                            ...state.cart.slice(i + 1)
                        ]

                    }
                }
            }
            return newState;
        }
        case INCREASE_QUANTITY:{ 
            let newState:any; 
            for(let i = 0; i < state.cart.length; i++) {
                let item = state.cart[i] as any;
                if(item.product.productId === action.payload.product.productId) {
                    item.quantity = item.quantity + 1;
                    newState =  {
                        ...state, 
                        cart: [
                            ...state.cart.slice(0, i),
                            item,
                            ...state.cart.slice(i + 1)
                        ]

                    }
                }
            }
            return newState;
        }
        case DELETE_PRODUCT: {
            let newState:any; 
            for(let i = 0; i < state.cart.length; i++) {
                let item = state.cart[i] as any;
                if(item.product.productId === action.payload.product.productId) {
                    item.quantity = item.quantity - 1;
                    newState =  {
                        ...state, 
                        cart: [
                            ...state.cart.slice(0, i),
                            ...state.cart.slice(i + 1)
                        ]

                    }
                }
            }
            return newState;
        }
        case DONE_CHECK_OUT: {
            return {
                ...state,
                cart: []
            }
        }
        case TOGGLE_ADDED_STATE: {
            return {
                ...state,
                added_success: false

            }
        }
        default: 
            return {
                ...state
            }
    }
}
export default cartReducer;