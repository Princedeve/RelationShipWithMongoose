const mongoose = require('mongoose');
const {Schema} = mongoose;

const MONGO_URL = "mongodb://127.0.0.1:27017/relationShipDemo";

main().then((res) => { console.log("connected to DB") }).catch((err) =>{ console.log(err)});

async function main() {
    await mongoose.connect(MONGO_URL);
}

