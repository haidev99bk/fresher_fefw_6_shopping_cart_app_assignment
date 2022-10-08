import { useDispatch, useSelector } from "react-redux";
import {BsFillTrashFill} from 'react-icons/bs'
import { decreaseQuantityAction, deleteProductAction, increaseQuantityAction } from "../redux/actions/cartActions";
import { Link } from "react-router-dom";
import { checkoutAction } from "../redux/actions/checkOutActions";
const CheckOutPage = () => {
    const cart = useSelector(state => {
        let cartNow = state as any;
        return cartNow.cart.cart;

    })
    const products  = useSelector(state => {
        let stateNow = state as any;
        return stateNow.products.products}
    );
    console.log('cart in checkout', cart);
    const listInCart:any[] = [];
    const dispatch = useDispatch();
    if(cart.length !== 0) {
        cart.forEach((item:any) => {
            listInCart.push(
                <div key={item.product.productId} className="product-item  d-flex ">
                    <div className="product-item-img ">
                        <img src={item.product.imageUrl} className=" col-4"></img>

                    </div>
                    <div className=" col-8 px-4 ">
                        <div className="d-flex justify-content-between">
                            <h5 
                                className="card-title"
                            
                            >{item.product.productName}</h5>
                            <div onClick={() => {dispatch(deleteProductAction(item.product))}}>
                                <div className="delete-btn">
                                    <BsFillTrashFill></BsFillTrashFill>

                                </div>

                            </div>

                        </div>
                        <p className="card-text">{item.product.description}</p>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="quantity quantity-checkout-btns d-flex align-items-center justify-content-around rounded">
                                <button 
                                    className="minus-btn px-2" 
                                    onClick = {() => {
                                        if(item.quantity === 1) {
                                            dispatch(deleteProductAction(item.product))
                                        } else dispatch(decreaseQuantityAction(item.product))
                                    }}
                                >-</button>
                                <span>{item.quantity}</span>
                                <button 
                                    className="plus-btn px-2"
                                    disabled={item.quantity === 99}
                                    onClick = {() => {dispatch(increaseQuantityAction(item.product))}}

                                >+</button>
                            </div>
                            <span className="fw-bold">$ {(item.product.price * item.quantity).toFixed(2)}</span>
                           
                        </div>
                    </div>
                </div> 
            )
        })
    } else {
        listInCart.push(
            <div key={1} className='fw-bold text-center'>You have no products in cart</div>
        )
    }
    let subTotal:number = 0;
    let total:number = 0;
    if(cart.length > 0) {
        subTotal = cart.reduce((subTotal:number, item:any) => {
            return subTotal + (item.product.price * item.quantity)
        }, 0);
        subTotal = Number(subTotal.toFixed(2))
        total = Number((subTotal + 10).toFixed(2));
    }
    return (
        <div className="CheckOutPage">
            <div className="container">
                <div className="text-center p-2 mb-4 rounded bg-white">My Shopping Cart</div>
                <div className="row">
                    <div className="col-8">
                        {listInCart}
                    </div>
                    <div className="col-4">
                        <div className="order-infor text-secondary ">
                            <h5 className="text-dark">Order Info</h5>
                            <div className="d-flex justify-content-between">
                                <span>Subtotal:</span>
                                <span className="text-dark">$ {subTotal}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Shipping Cost:</span>
                                <span className="text-dark">$ {subTotal? 10: 0}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span className="total-text">Total:</span>
                                <span className="total-text">$ {subTotal? total: 0}</span>
                            </div>
                        </div>
                        <div className="checkout-btns d-flex flex-column">
                            <button 
                                disabled={cart.length === 0}
                                onClick={() => {dispatch(checkoutAction())}}
                            >Checkout</button>
                            <div>
                                <Link to="/products">Continue Shopping</Link>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default CheckOutPage;