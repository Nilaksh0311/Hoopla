const{ Schema } = require( 'mongoose' )
const mongoose = require( 'mongoose' )
mongoose.Promise = global.Promise;

mongoose.set( 'useCreateIndex', true );

const url = "mongodb://localhost:27017/UsersDB"

const productSchema = Schema( {
    "_id": { type: String },
    "pName": { type: String },
    "pDescription": { type: String },
    "pRating": { type: String },
    "pCategory": { type: String, enum: ['Electronics', 'Shoes', 'Furniture', 'Clothing'] },
    "price": { type: Number, min: [0, "Price can not be negative"]},
    "color": { type: String },
    "image": { type: String },
    "specification": { type: String },
    "dateFirstAvailable": { type: Date },
    "dateLastAvailable": { type: String },
    "pSeller": {
        "s_Id": { type: String },
        "pDiscount": { type: Number, min: [0, 'Discount can not be negative']},
        "pQuantity": { type: Number, min: [0, 'Quantity can not be negative']},
        "pShippingCharges": { type: Number }
    }
}, { collection: "Products" } );

let connection = {}

connection.getProductsCollection = async () => {
    try{
        console.log("Product connection")
        return mongoose.connect( url, { useNewUrlParser: true, useUnifiedTopology: true} ).then( database =>{
            return database.model( "Products", productSchema )
        } )
    } catch( err ) {
        let error = new Error( "Could not connect to database" )
        error.status = 500
        throw error   
    }
}
// t = connection.getProductsCollection()
// console.log(t);
module.exports = connection;