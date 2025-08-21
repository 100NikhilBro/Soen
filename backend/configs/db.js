const mongoose = require('mongoose');

require('dotenv').config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => { console.log("Connected Successfully") }).catch((e) => {
        console.log(`Error is ${e}`);
        console.log("Connection failed");
    })
}


module.exports = dbConnect;