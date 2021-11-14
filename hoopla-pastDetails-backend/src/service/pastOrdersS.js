const{ response } = require( "express" );
const db = require( "../model/pastOrdersM" );

let pastOrdersService = {};

pastOrdersService.insertOrders = async ( obj ) => {
  try{
    let data = await db.insertOrders( obj );
    if( data ) {
      return data;
    }
  } catch( err ) {
    err = new Error( "Unable to insert all products" );
    err.status = 400;
    return err;
  }
};

pastOrdersService.getPastOrders = async ( emailId ) => {
  let data = await db.getPastOrders( emailId );
  if( data ) {
    return data;
  } else{
    let err = new Error( "No orders found for this user" );
    err.status = 400;
    throw err;
  }
};

module.exports = pastOrdersService;
