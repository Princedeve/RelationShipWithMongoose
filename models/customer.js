const mongoose = require('mongoose');
const {Schema} = mongoose;

const MONGO_URL = "mongodb://127.0.0.1:27017/relationShipDemo";

main().then((res) => { console.log("connected to DB") }).catch((err) =>{ console.log(err)});

async function main() {
    await mongoose.connect(MONGO_URL);
}

const orderSchema = new Schema({
    item: String,
    price: Number,
});

const customerSchema = new Schema({
    name: String,
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order"
        },
    ],
});

const Order = mongoose.model("Oder", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

const addOrders = async ()=>{
   let res = await Order.insertMany([
    { item: "Samosa", price: 15 },
    { item: "Chips", price: 10 },
    { item: "Chocolate", price: 40},
   ]
   );
   console.log(res);
};

addOrders();