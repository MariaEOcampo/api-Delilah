const mongoose = require ('mongoose');

const userSchema = mongoose.Schema ({
    _id: mongoose.Schema.Types.ObjectId,
    fullname:{
        type: String,
        required:true
    },
    adress:{
        type: String,
        required: true
    },
    email:{
        type: String, required: true
    },
    password:{
        type: String, required: true
    },
    role:{
        type: String,
        default: 'user',
        enum:[
            'user',
            'admin'
        ]
    }
 
})


module.exports = mongoose.model('user', userSchema);