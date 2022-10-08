import { DONE_LOADING, GET_PRODUCTS, GET_PRODUCTS_SAGA, LOADING } from "../types";
import {call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios';
import { useDispatch } from "react-redux";
const AllProductsApi = 'http://localhost:4000/api/products'
function* getProducts():any {

    let res:any = yield axios.get(AllProductsApi);
    yield put({
        type: GET_PRODUCTS,
        payload: res.data
    })
}

export function* watchGetProductsSaga() {
    call(getProducts);
    yield takeEvery(GET_PRODUCTS_SAGA, getProducts);
} 
