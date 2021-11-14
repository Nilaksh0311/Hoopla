const express = require( 'express' )
const routing = express.Router()
const service = require( '../service/user' );


routing.get( '/setupdb', async ( req, res, next )=>{
    try{
        let allProducts = await service.insertAllProducts();
        res.status( 200 )
        res.send( allProducts )
        // console.log(allProducts.length)
    } catch( error ) {
        next( error );
    }
} )

routing.get( '/getAllProducts', async ( req, res, next )=>{
    try{
        let allProducts = await service.getProducts();
        res.status( 200 )
        res.send( allProducts )
        // console.log( 'All products length',allProducts.length )
    } catch( error ){
        next( error )
    }
} )

routing.get( '/product/:id', async ( req, res, next )=>{
    try{
        let id = req.params.id;
        let product = await service.getSingleProduct( id );
        res.status( 200 )
        res.send( product )
    } catch( error ){
        next( error )
    }
} )

routing.post( '/add', async ( req, res, next )=>{
    try{
        let insertedProduct = await service.addProduct( req.body );
        res.status( 200 );
        res.json( {message: "Product inserted suceesfully"} );
    } catch( error ){
        next( error )
    }
} )

routing.post( '/update', async ( req, res, next )=>{
    try{
        let data = await service.changeDetails( req.body )
        res.json( {message: `Data updated successfully`} )
    } catch( error ){
        next( error )
    }
} )

routing.post( '/orderProducts', async ( req, res, next )=>{
    try{
        let data = await service.orderProducts( req.body )
        res.status( 200 )
        res.send( 'Products ordered' )
    } catch( error ){
        next( error )
    }
} )

routing.delete( '/delete/:productId', async ( req, res, next )=>{
    try{
        let productId = req.params.productId;
        let deletedData = await service.deleteProduct( productId )
        res.status( 200 )
        console.log( `Deleted ${productId}` )
        res.json( {message: `Successfully deleted product with productId: ${productId}`} )
    } catch( error ){
        next( error )
    }
} )


module.exports = routing;