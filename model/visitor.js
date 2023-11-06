const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const visitorSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    phoneNumber : {
        type: Number,
        required: true,
        min: 10
    },
    password:{
        type: String,
        required:true
    },
    category:{
        type:String,
        enum: ['admin', 'host','visitor']
    }
})

// presave middleware for hashing password
//modified the prefunction of 'save'
visitorSchema.pre('save',async function (next){
    if(this.isModified('password')){
        try{
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(this.password, saltRounds);
            this.password = hashedPassword;
        }catch(e){
            return next(e);
        }
    }
    next();
});

const Visitor = mongoose.model('Visitor', visitorSchema);

module.exports = Visitor;


// modify so that the phone number can start with 0