const express = require( "express" );
const{ addProductToCart } = require( "../service/user" );
const routing = express.Router();
const service = require( "../service/user" );

routing.get( "/dashboard/:userId", async ( req, res, next ) => {
  try{
    let userId = req.params.userId;
    let openCart = await service.getAllProducts( userId );
    //console.log(openCart)
    res.status( 200 );
    res.send( openCart )
  } catch( error ) {
    next( error );
  }
} );

routing.post( "/cart", async ( req, res, next ) => {
  try{
    let addToCart = await service.addProductToCart( req.body );
    res.status( 200 );
    res.json( {message: 'Product added to cart'} )
  } catch( error ) {
    next( error );
  }
} );

routing.delete( "/delete/:userId/:prodId", async ( req, res, next ) => {
  try{
    console.log( "Deleting" );
    let bodyObj = {
      userId: req.params.userId,
      prodId: req.params.prodId,
    };
    let deleteProductFromCart = await service.deleteProductFromCart( bodyObj );
    res.status( 200 )
    res.json( {message: `Product deleted`} )
  } catch( error ) {
    next( error );
  }
} );

routing.delete( "/deleteCart/:userId", async ( req, res, next ) => {
  try{
    let deleteProductFromCart = await service.deleteCart( req.params.userId );
    res.status( 200 );
    res.send( deleteProductFromCart );
  } catch( error ) {
    next( error );
  }
} );

routing.post( "**", async ( req, res, next ) => {
  try{
    let refreshCart = await service.refreshCart( req.body );
    res.status( 200 );
    res.send( refreshCart );
  } catch( err ) {
    next( err );
  }
} );

// ---> /cart

//---> **

module.exports = routing;
