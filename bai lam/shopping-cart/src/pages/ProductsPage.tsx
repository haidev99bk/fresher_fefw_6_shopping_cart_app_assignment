import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { DefaultRootState, useDispatch, useSelector } from "react-redux";
import { getProductAction } from "../redux/actions/productsActions";
import { addToCart } from "../redux/actions/cartActions";
import {
  DONE_LOADING,
  LOADING,
  TOGGLE_ADDED_STATE,
  TOGGLE_CHECK_OUT,
} from "../redux/types";
import { BsHandThumbsUpFill } from "react-icons/bs";

const ProductsPage = () => {
  let [productShowing, setProductShowing] = useState<any>();
  let [quantityArr, setQuantityArr] = useState<any[]>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductAction());
  }, []);

  const products = useSelector((state) => {
    let stateNow = state as any;
    return stateNow.products.products;
  });
  const loading = useSelector((state) => {
    let stateNow = state as any;
    return stateNow.products.loading;
  });
  const added_success = useSelector((state: any) => {
    // let stateNow = state as any;
    return state.cart.added_success;
  });
  let doneCheckOut = useSelector((state) => {
    let stateNow = state as any;
    return stateNow.checkOut.done_check_out;
  });
  let checkingOut = useSelector((state) => {
    let stateNow = state as any;
    return stateNow.checkOut.checking_out;
  });
  const cart = useSelector((state) => {
    let cartNow = state as any;
    return cartNow.cart.cart;
  });

  if (products.length !== 0) {
    dispatch({ type: DONE_LOADING });
  } else {
    dispatch({ type: LOADING });
  }
  if (products.length !== 0 && productShowing === undefined) {
    setProductShowing(products[0]);
    setQuantityArr(new Array(products.length).fill(1));
  }
  const changeProductShowing = (products: any) => {
    setProductShowing(products);
  };
  const increaseQuantity = () => {
    let index = Number(productShowing.productId) - 1;
    setQuantityArr([
      ...quantityArr.slice(0, index),
      quantityArr[index] + 1,
      ...quantityArr.slice(index + 1),
    ]);
  };
  const decreaseQuantity = () => {
    let index = Number(productShowing.productId) - 1;
    setQuantityArr([
      ...quantityArr.slice(0, index),
      quantityArr[index] - 1,
      ...quantityArr.slice(index + 1),
    ]);
  };
  if (added_success) {
    setTimeout(() => {
      dispatch({ type: TOGGLE_ADDED_STATE });
    }, 1500);
  }

  if (doneCheckOut && checkingOut) {
    setTimeout(() => {
      dispatch({ type: TOGGLE_CHECK_OUT });
    }, 2500);
  }
  return (
    <div className="ProductsPage ">
      {loading === true ? (
        <div className="loading-spiner">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : null}
      {added_success ? (
        <div className="added-toast">
          <span>
            <BsHandThumbsUpFill></BsHandThumbsUpFill>
          </span>
          Added Successfully!!!
        </div>
      ) : null}
      {checkingOut === true ? (
        <div className="loading-spiner">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : null}
      {doneCheckOut ? (
        <div className="checkOut-toast ">
          <span>
            <BsHandThumbsUpFill></BsHandThumbsUpFill>
          </span>
          Thank you for purchaseed!!!
        </div>
      ) : null}
      {}
      <div className="container h-full">
        <div className="row h-full">
          {productShowing ? (
            <div key={productShowing.productId} className="col-7 h-full">
              <div className="bg-white rounded shadow-lg h-full d-flex flex-column">
                <div className="image-product-showing">
                  <img src={productShowing.imageUrl}></img>
                </div>
                <div className="px-3">
                  <h5 className="card-title">{productShowing.productName}</h5>
                  <p className="card-text">{productShowing.description}</p>
                </div>
                {}
                <div className="d-flex pb-4 px-3 justify-content-between">
                  <div className="quantity d-flex align-items-center">
                    <button
                      className="minus-btn "
                      disabled={
                        quantityArr[Number(productShowing.productId) - 1] === 1
                      }
                      onClick={() => {
                        decreaseQuantity();
                      }}
                    >
                      -
                    </button>
                    <span className="">
                      {quantityArr[Number(productShowing.productId) - 1]}
                    </span>
                    <button
                      className="plus-btn"
                      disabled={
                        quantityArr[Number(productShowing.productId) - 1] === 99
                      }
                      onClick={() => {
                        increaseQuantity();
                      }}
                    >
                      +
                    </button>
                  </div>
                  <div className="d-flex ">
                    <div className="price-accordingly me-4 fw-bold">
                      ${" "}
                      {(
                        productShowing.price *
                        quantityArr[Number(productShowing.productId) - 1]
                      ).toFixed(2)}
                    </div>
                    <div
                      className="add-to-cart px-2 border rounded pointer"
                      onClick={() => {
                        dispatch(
                          addToCart(
                            productShowing,
                            quantityArr[Number(productShowing.productId) - 1]
                          )
                        );
                      }}
                    >
                      <FaShoppingCart></FaShoppingCart>
                      <span className="ps-2">Add to cart</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          <div className="product-list h-full col-5 overflow-auto">
            {products.length !== 0
              ? (products as any[]).map((product) => {
                  return (
                    <div
                      key={product.productId}
                      className="product-item shadow d-flex "
                    >
                      <div className="product-item-img col-4">
                        <img src={product.imageUrl} className=" "></img>
                      </div>
                      <div className=" col-8 ">
                        <h5
                          className="card-title"
                          onClick={() => {
                            changeProductShowing(product);
                          }}
                        >
                          {product.productName}
                        </h5>
                        <p className="card-text">{product.description}</p>
                        <div className="d-flex justify-content-between">
                          <span className="fw-bold">$ {product.price}</span>
                          <span
                            className="product-detail"
                            onClick={() => {
                              changeProductShowing(product);
                            }}
                          >
                            Details
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductsPage;
