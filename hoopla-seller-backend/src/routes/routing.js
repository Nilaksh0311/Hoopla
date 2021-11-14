const express = require( 'express' )
const routing = express.Router()
const service=require( '../service/user' );

routing.post( '/login', ( req, res, next ) => {
    return service.login( req.body ).then( ( item ) => {
      res.json( { data: item } );
    } ).catch( err => {
      next( err );
    } ); 
  } );
  
  routing.post( '/register', ( req, res, next )=>{
    return service.register( req.body ).then( ( item )=>{
      res.json( {data: item} )
    } ).catch( err => {
      next( err );
    } )
  } )
  
  module.exports = routing