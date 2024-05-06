
const orderModel = require('../models/orderModel')
const productModal = require('../models/productModel')
exports.createOrder = async(req,res,next)=>{
    // console.log(req.body,'DATA');
    // orderModel.create()
    const cartItems = req.body;
    const amount = Number(cartItems.reduce((acc,item)=>(acc + item.product.price * item.qty),0)).toFixed(2);
    const status = 'pending';
    const order = await orderModel.create({cartItems,amount,status})
    // console.log(amount,"AMOUNT");
    //Updating product stock
cartItems.forEach(async(item)=>{
const product = await productModal.findById(item.product._id)
product.stock = product.stock - item.qty;
await product.save()
})

    res.json({
        success:true,
        order
    })}
