import {
  DONE_CHECK_OUT,
  CHECK_OUT_SAGA,
  CHECKING_OUT,
  TOGGLE_CHECKING_OUT,
} from "../types";
import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import store from "../store";
function* checkOut(): any {
  let state: any = store.getState();
  let cart = state.cart.cart;
  let productsInOrder = cart.map((item: any) => {
    return {
      productId: item.product.productId,
      quantity: item.quantity,
    };
  });
  // let body = JSON.stringify({
  //     paySuccess: true,
  //     productsInOrder: productsInOrder
  // })
  let body = {
    paySuccess: true,
    productsInOrder: productsInOrder,
  };
  if (!window.confirm("Do you want to purchase? ")) {
    return null;
  }
  console.log("body", body);
  let res = yield axios.post("http://localhost:4000/api/checkout", body);
  yield put({
    type: CHECKING_OUT,
  });
  // let res = yield fetch('http://localhost:4000/api/checkout', {
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'application/json'
  //         // 'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     body: body
  // })

  if (res.status === 201) {
    yield put({
      type: DONE_CHECK_OUT,
    });
  }
}

function* watchCheckOutSaga() {
  yield takeEvery(CHECK_OUT_SAGA, checkOut);
}

export default watchCheckOutSaga;
