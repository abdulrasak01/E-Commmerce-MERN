import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const ProductDetail = ({cartItems,setCartItems}) => {
    const [qty,setQty] = useState(1);
    const addToCart = ()=>{
      const itemExist  =  cartItems.find((item)=>item.product._id == product._id)
      if(!itemExist ) {
        const newItems = {
            product,qty
        }
        setCartItems([...cartItems,newItems])
    toast.success("Cart Item Added Successfully")
    }
    }
    const increaseQty = ()=>{
       if(product.stock == qty){
     return; 
    }
        setQty(qty+1)
    }
    const decreaseQty = ()=>{
        if(qty>1){
           setQty(qty-1)}
     }
    const [product, setProduct] = useState(null);
    const {id} = useParams();
    useEffect(()=>{
       fetch(process.env.REACT_APP_API_URL+'/products/'+id)
        .then(res =>res.json())
        .then(res => setProduct(res.product))
    },[])
  return (
    product &&
  <div className="container container-fluid">
  <div className="row f-flex justify-content-around">
      <div className="col-12 col-lg-5 img-fluid" id="product_image">
          <img src={product.images[0].image} alt="sdf" height="500" width="500"/>
      </div>
      <div className="col-12 col-lg-5 mt-5">
          <h3>{product.name}</h3>
          <p id="product_id">{product._id}</p>
          <div className="rating-outer">
              <div style={{width : `${product.ratings/5 *100}%`}} className="rating-inner"></div>
          </div>
          <div  id="product_price">${product.price}</div>
          <div className="stockCounter d-inline"> 
              <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>
              <input type="number" className="form-control count d-inline" value={qty} readOnly />
              <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
          </div>
           <button onClick={addToCart} type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" disabled={product.stock == 0}>Add to Cart</button>
          <p>Status: <span id="stock_status " className={ product.stock>0 ? 'text-success' : 'text-danger'}>{ product.stock>0 ? 'In Stock' : 'Out Of Stock'}</span></p>
          <h4 className="mt-2">Description:</h4>
          <p>{product.description}</p>
          <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
          <div className="rating w-50"></div>
      </div>
  </div>
</div>
    )
}
export default ProductDetail