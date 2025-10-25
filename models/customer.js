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

const customerSchema = new Schema({ // >100s: array objectId reference
    name: String,
    oders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Oder"// refrence pointing Order model to extract order id
        },
    ],
});

// customerSchema.pre("findOneAndDelete", async(customer)=>{
//     console.log(customer);//PRE MIDDLEWARE
// });

customerSchema.post("findOneAndDelete", async(customer)=>{
    //POST MIDDLEWARE
    if(customer.oders.length){
      let res = await Oder.deleteMany({_id: { $in: customer.oders } });//oder list delete using $in operator
      console.log(res);
    }
});

const Oder = mongoose.model("Oder", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

// const addCustomer = async ()=>{
    // let cust1 = new Customer({
    //     name: "Rahul Kumar",
    // });

    // let order1 = await Oder.findOne({ item: "Chips" });
    // let order2 = await Oder.findOne({ item: "Chocolate" });

    // cust1.orders.push(order1);
    // cust1.orders.push(order2);

    // let result = await cust1.save();
    // console.log(result);

// };

// addCustomer();

// const findCustomer = async () =>{
//     let res = await Customer.find({}).populate("orders");//populate use for getting info of object not only id
//     console.log(res[0]);
// }

// findCustomer();

// const addOrders = async ()=>{
//    let res = await Oder.insertMany([
//     { item: "Samosa", price: 15 },
//     { item: "Chips", price: 10 },
//     { item: "Chocolate", price: 40},
//    ]
//    );
//    console.log(res);
// };

// addOrders();

const addCust = async () =>{
    let newCust = new Customer({
        name: "Aman Thakur"
    });

    let newOrder = new Oder({
        item: "Burger",
        price: 250
    });

    newCust.oders.push(newOrder);

    let resC = await newCust.save();
    let  resO = await newOrder.save();
    console.log("added new customer");
    console.log(resC);
    console.log(resO);
}

const delCust = async () => {
    let data = await Customer.findByIdAndDelete("68fcbb7a4b8c1a179ee642aa");
    console.log(data);

};

// addCust();
delCust();