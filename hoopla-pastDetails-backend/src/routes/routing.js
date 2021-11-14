const{ response } = require( "express" );
const express = require( "express" );
const pastOrdersService = require( "../service/pastOrdersS" );
const routing = express.Router();

routing.get( "/getAllOrders/:emailId", async ( req, res, next ) => {
  try{
    let allOrders = await pastOrdersService.getPastOrders( req.params.emailId );
    allOrders.length > 0
      ? res.status( 200 ).send( allOrders )
      : res.status( 400 ).send( [] );
  } catch( error ) {
    next( error );
  }
} );

routing.post( "/purchaseOrders", async ( req, res, next ) => {
  try{
    let insertedProduct = await pastOrdersService.insertOrders( req.body );
    res.status( 200 ).send( { message: "Product added" } );
    //res.send(insertedProduct);
  } catch( error ) {
    //res.json({ message: "No data found" });
    console.log( error );
    next( error );
  }
} );

module.exports = routing;
