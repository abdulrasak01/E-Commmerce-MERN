import React, { useState } from 'react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import {toast} from 'react-toastify'
const Cart = ({cartItems,setCartItems}) => {
    const increaseQty = (item)=>{
     
     if(item.product.stock == item.qty){
      return; 
     }
   const updatedItems =  cartItems.map((i)=>{
        if(i.product._id == item.product._id){
            i.qty++;
        }
        return i;
     })
         setCartItems(updatedItems)
     }
     const decreaseQty = (item)=>{
         if(item.qty>1){
             const updatedItems =  cartItems.map((i)=>{
        if(i.product._id == item.product._id){
            i.qty--;
        }
        return i;
     })
         setCartItems(updatedItems)
        }
      }
      const removeItem=(item)=>{

          const updatedItems =  cartItems.filter((i)=>{
        if(i.product._id !== item.product._id){
           return true;
        }
       
     })
         setCartItems(updatedItems)
      }
      const [complete,setComplete]=useState(false)
      const placeOrder=()=>{
        fetch(process.env.REACT_APP_API_URL+'/order',{
            method:'POST',
            headers:{'content-type':'application/json'},
            body:JSON.stringify(cartItems)
        }).then(()=>
           { setCartItems([])
            setComplete(true)
            toast.success('Order Success!')
           }
        )
      }
  return (
    cartItems.length > 0 ?
    <Fragment>
 <div>
         <div class="container container-fluid">
        <h2 class="mt-5">Your Cart: <b>{cartItems.length} items</b></h2>
        
        <div class="row d-flex justify-content-between">
            <div class="col-12 col-lg-8">
                
                {cartItems.map(item=>(<Fragment>
               <hr/>
                <div class="cart-item">
                    <div class="row">
                        <div class="col-4 col-lg-3">
                            <img src={item.product.images[0].image} alt={item.product.name} height="90" width="115"/>
                        </div>

                        <div class="col-5 col-lg-3">
                            <Link to={"/product/"+item.product._id}>{item.product.name}</Link>
                        </div>


                        <div class="col-4 col-lg-2 mt-4 mt-lg-0">
                            <p id="card_item_price">${item.product.price}</p>
                        </div>

                        <div class="col-4 col-lg-3 mt-4 mt-lg-0">
                            <div class="stockCounter d-inline">
                                <span class="btn btn-danger minus" onClick={()=>decreaseQty(item)}>-</span>
                                <input type="number" class="form-control count d-inline" value={item.qty} readOnly />

								<span class="btn btn-primary plus" onClick={()=>increaseQty(item)}>+</span>
                            </div>
                        </div>

                        <div class="col-4 col-lg-1 mt-4 mt-lg-0">
                            <i id="delete_cart_item" onClick={()=>removeItem(item)} class="fa fa-trash btn btn-danger"></i>
                        </div>

                    </div>
                </div>
                </Fragment>))}
            </div>

            <div class="col-12 col-lg-3 my-4">
                <div id="order_summary">
                    <h4>Order Summary</h4>
                  
                    <p>Subtotal:  <span class="order-summary-values">{cartItems.reduce((acc,item)=>(acc+item.qty),0)} (Units)</span></p>
                    <p>Est. total: <span class="order-summary-values">${cartItems.reduce((acc,item)=>(acc+item.product.price * item.qty),0)}</span></p>
    
                  
                    <button id="checkout_btn" class="btn btn-primary btn-block" onClick={placeOrder}>Place Order</button>
                </div>
            </div>
        </div>
    </div>
    </div>
    </Fragment>:  
   (
    !complete ?<p>Your Cart is Empty</p> :<Fragment><h2>Order Placed</h2><p>Your Order has been succesfully placed</p></Fragment> 
   )
        
  )
}

export default Cart