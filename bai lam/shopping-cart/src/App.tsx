import React from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ReviewPage from './pages/ReviewPage';
import { Switch, Route, NavLink, Redirect, Link , useHistory} from 'react-router-dom';
import {FaShoppingCart} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import CheckOutPage from './pages/CheckOutPage';
import { toggleStateCheckout } from './redux/actions/checkOutActions';
import { BsHandThumbsUpFill } from 'react-icons/bs';
import { TOGGLE_CHECK_OUT } from './redux/types';
function App() {
  let history = useHistory();
  let cart = useSelector(state => {
    let stateNow = state as any;
    return stateNow.cart.cart;
  })
  
  let checkingOut = useSelector(state => {
    let stateNow = state as any;
    return stateNow.checkOut.checking_out
  });
  if(checkingOut) {
    history.push('/products');
  }
  return (
    <div className="App">
      
      <div className='app_header shadow py-2'>
        <div className="container">
          <div className="row">
            <div className="col-4 nav-links d-flex ">
              <NavLink 
                to="/home" 
                activeClassName='selected' 
                className='text-decoration-none align-self-center  me-3'
              >Home</NavLink>
              <NavLink 
                to="/products" 
                activeClassName='selected' 
                className='text-decoration-none align-self-center me-3'
              >Products</NavLink>
              <NavLink 
                to="/review" 
                activeClassName='selected' 
                className='text-decoration-none align-self-center me-3'
              >Review</NavLink>
              
            </div>
            <div className="col-4 beauty-title">
              <div className='text-center fw-bold text-primary'>Beauty.bd</div>
            </div>
            <div className="col-4 text-end align-self-center cart">
                <Link to='/checkout' className=''>
                  <div className='d-inline-block '>
                      <FaShoppingCart>
                      </FaShoppingCart>

                      {
                        cart.length !== 0? 
                        <span className='quantity-in-cart'>
                          {cart.length}
                        </span>
                        :null
                      }
                  </div>
                </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='app_body p-3'>
        
        <Switch>
          <Route path='/home' component={HomePage}></Route>
          <Route path='/products' component={ProductsPage}></Route>
          <Route path='/review' component={ReviewPage}></Route>
          <Route path='/checkout' component={CheckOutPage}></Route>
          <Redirect from='/' to='/products'></Redirect>
        </Switch>

      </div>
    </div>
  );
}

export default App;
