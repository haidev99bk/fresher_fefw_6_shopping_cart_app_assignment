import { useDispatch } from 'react-redux';
import {GET_PRODUCTS_SAGA} from '../types';
export const getProductAction = () => {
    return {
        type: GET_PRODUCTS_SAGA
    }
}
