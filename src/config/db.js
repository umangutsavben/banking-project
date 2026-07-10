const mongoose = require("mongoose");

function connectToDB(){
    mongoose.connect(process.env.MONGO_URL)
        .then(()=>{
            console.log("server is connected to db");
        })
        .catch(e =>{
            console.log("not connected");
            process.exit(1);
        })
}

module.exports = connectToDB