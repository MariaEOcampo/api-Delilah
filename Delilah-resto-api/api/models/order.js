const mongoose = require ('mongoose');



const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    Items: [{product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    quantity: { type: Number, default: 1}}],
    Status:{
        type:String,
    enum: [
        "recieved", "confirmed", "preparing", "sended", "delivered"],
    default: "recieved"
},
date: {
    type: Date,
    default: Date.now,
    max: Date.now
  },
  paymentMethod: {
    type: String,
    enum: ["cash", "card"],
    required: [true, "Specify the payment method"]

  }



});


module.exports = mongoose.model('Order', orderSchema);




