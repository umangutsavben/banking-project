const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:[true,"email is required for creating a user"],
        trim:true,
        lowercase:true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Invalid email"],
        unique:[true,"email already exist"]
    },
    name:{
        type:String,
        required:[true,"name is must"]
    },
    password:{
        type:String,
        required:[true,"password is a must"],
        minlenght:[6,"password should be of 6 char"]
    }
},{
    timestamps:true
})



userSchema.pre("save",async function(){
    // to hash the password 
    if(!this.isModified("password")){
        return 
    }
    const hash = await bcrypt.hash(this.password,10);
    this.password = hash;
    return 

});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password,this.password)
}

const userModel = mongoose.model("user",userSchema); 


module.exports = userModel;