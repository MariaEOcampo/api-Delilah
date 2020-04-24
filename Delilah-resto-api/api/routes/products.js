const express = require ('express');
const router = express.Router();
const mongoose = require ('mongoose')
const checkAuth = require('../middleware/check-auth')
const checkLogin = require ('../middleware/check-login')

const Product = require ('../models/product');

router.get('/',checkLogin,(req, res, next)=>{
  Product.find()
  .select('name price _id')
  .exec()
  .then(docs =>{
      const response ={
        count: docs.length,
        products: docs.map( doc =>{
          return{
            name:doc.name,
            price:doc.price,
            _id:doc._id,
            request: {
                type: 'GET',
                url:'http://localhost:8080/products/' 
            }
          }
        })
      };

      console.log(docs);
      res.status(200).json(docs);

  })

  .catch (err=> {
      console.log(err);
      res.status(500).json({
          error:err
      })
  })
});

router.post('/',checkAuth, (req, res, next) =>{
    const product = new Product ({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product.save()
    .then(product =>{
        console.log(product)
    })
    .catch (err => console.log(err))
    res.status(201).json({
      message: "Created product succesfully!",
      createdProduct: {
        name: product.name,
        _id: product._id,
        request:{
          type: 'GET',
          url:'http://localhost:8080/products/' + product._id
       }
      } 
      })

})


router.get("/:productId",checkLogin, (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
      .select('name price_id')
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
            product: doc,
            request:{
              type: 'GET',
              description: 'Get all products',
              url:'http://localhost:8080/products/' 

            }
          });
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  });




  router.patch("/:productId", checkAuth, (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    Product.update({ _id: id }, { $set: updateOps })
      .exec()
      .then(result => {
        res.status(200).json({
            message: 'Product updated',
            request: {
                type: 'GET',
                url: 'http://localhost:8080/products/' + id
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
  
  router.delete("/:productId", checkAuth, (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
            message: 'Product deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:8080/products',
                body: { name: 'String', price: 'Number' }
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