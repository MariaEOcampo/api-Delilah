const express = require ('express');
const router = express.Router();
const mongoose = require ('mongoose');
const checkAuth = require('../middleware/check-auth')
const checkLogin = require ('../middleware/check-login')

const Order = require ('../models/order');
const Product = require ('../models/product');


router.get('/',checkAuth,( req, res, next )=>{
  Order.find()
  .select("product quantity _id")
  .populate('product', 'name')
  .exec()
  .then(docs => {
    res.status(200).json({
      count: docs.length,
      orders: docs.map(doc => {
        return {
          _id: doc._id,
          product: doc.product,
          quantity: doc.quantity,
          request: {
            type: "GET",
            url: "http://localhost:8080/orders/" + doc._id
          }
        };
      })
    });
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

router.post("/",checkLogin, (req, res, next) => {
  Product.find(req.body.productId)
    .then(product => {
      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        });
      }
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        user: req.body.user,
        Items:req.body.cart,
        paymentMethod:req.body.paymentMethod
      });
      return order.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Order stored",
        order: {
          _id: result._id,
          user:result.user,
          Items: result.Items,
          paymentMethod: result.paymentMethod
        },
        request: {
          type: "GET",
          url: "http://localhost:8080/orders/" + result._id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


router.get('/:orderId',checkAuth,( req, res, next )=>{
        Order.findById(req.params.orderId)
        .exec()
        .then(
            order=> {
                if(!order){
                    return res.status(404).json({
                        message:'Order not found'
                    })
                }
                res.status(200).json({
                    order: order,
                    request:{
                        type:'GET',
                        url:'http://localhost:8080/orders'
                    }
                })
            }
        )
        .catch( err=>{
            res.status(500).json({
                error: err
            })
        })
    
    })      

router.delete('/:orderId',checkAuth,( req, res, next )=>{
    Order.remove({
        _id: req.body.params.orderId})
        .exec()
        .then( result =>{
            res.status(200).json({
                message: 'Order deleted'
            })
            
        })
        .catch( err=>{
            res.status(500).json({
                error:err
            })
        })
    
    
    }) 
    
    router.patch("/:orderId",checkAuth , (req, res, next) => {
      const id = req.params.orderId;
      const updateOps = {};
      for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
      }
      Order.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
          res.status(200).json({
            message:'Order updated',
            request:{
              type:'GET',
              url:'http://localhost:8080/orders/' + id
            }
    
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
    });


module.exports = router;