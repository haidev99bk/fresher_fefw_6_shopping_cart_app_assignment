import axios from "axios";
import { DONE_LOADING, GET_PRODUCTS, LOADING } from "../types";
const INITSTATE = {
    products: [],
    loading: false,
}
let url = 'http://localhost:4000/api/products';
let productsData:any[] = [];


const productsReducer = (state = INITSTATE, action: any) => {
    switch(action.type) {
        case GET_PRODUCTS: {
            return {
                ...state,
                products: action.payload
            }
        }
        case LOADING: {
            return {
                ...state,
                loading: true
            }
        }
        case DONE_LOADING: {
            return {
                ...state,
                loading: false
            }
        }
        default:
            return state
        
            
    }

}

export default productsReducer;