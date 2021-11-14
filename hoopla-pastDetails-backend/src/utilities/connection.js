const{ Schema } = require( "mongoose" );
const mongoose = require( "mongoose" );
mongoose.Promise = global.Promise;

mongoose.set( "useCreateIndex", true );

const url = "mongodb://localhost:27017/PastOrdersDB";

const pastOrdersSchema = Schema(
  {
    prodId: { type: String, required: [true, "productId is required"] },
    prodName: { type: String, required: [true, "productName is required"] },
    uEmail: { type: String, required: [true, "uMail is required"] },
    price: { type: Number, required: [true, "totalPrice is required"] },
    qty: { type: Number, required: [true, "quantity is required"] },
  },
  { collection: "PastOrders", timestamps: true }
);

let connection = {};

//Returns model object of "PastOrders" collection
connection.getPastOrdersConnection = () => {
  //Establish connection and return model as promise
  return mongoose
    .connect( url, { useNewUrlParser: true, useUnifiedTopology: true } )
    .then( ( database ) => {
      return database.model( "PastOrders", pastOrdersSchema );
    } )
    .catch( ( error ) => {
      let err = new Error( "Could not connect to the database" );
      err.status = 500;
      throw err;
    } );
};

module.exports = connection;
