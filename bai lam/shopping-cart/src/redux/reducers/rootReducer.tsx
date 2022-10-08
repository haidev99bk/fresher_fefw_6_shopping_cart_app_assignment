import {combineReducers} from 'redux';
import productsReducer from './productsReducer';
import cartReducer from './cartReducer';
import checkOutReducer from './checkOutReducer';
let products:any = productsReducer;
let cart:any = cartReducer;
let checkOut: any = checkOutReducer
const rootReducer = combineReducers({
    products,
    cart, 
    checkOut
})
export default rootReducer;