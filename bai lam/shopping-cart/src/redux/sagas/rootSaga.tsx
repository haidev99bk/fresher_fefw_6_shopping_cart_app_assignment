import {all, call} from 'redux-saga/effects';
import {watchGetProductsSaga} from './productsSagas';
import watchCheckOutSaga from './checkOutSagas';
function* rootSaga() {
    yield all([
        call(watchGetProductsSaga),
        call(watchCheckOutSaga)
    ])
}
export default rootSaga;