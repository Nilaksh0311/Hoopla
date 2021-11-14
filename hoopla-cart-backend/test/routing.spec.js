let{expect} = require( 'chai' )
const request = require( 'supertest' )
const app = require( '../src/app' )

describe( 'Testing routing file', () => {
    it( 'dashboard route', async () => {
        const res = await request( app ).get( '/dashboard/U101' )
        expect( res.status ).to.be.equal( 200 )
    } )
    it( 'insert product to cart', async () =>{
        const res = await request( app ).post( '/cart' ).send( {
            "userId": "U101",
            "prodId": "P1111",
            "prodName": "Shoes",
            "qty": 1,
            "price": 10
        } )
        expect( res.status ).to.be.equal( 200 )
    } )
    it( 'delete product from cart',async () =>{
        const res = await request( app ).delete( '/delete/U101/P1111' )
        expect( res.status ).to.be.equal( 200 )
    } )
    it( 'refresh cart', async () => {
        const res = await ( await request( app ).post( "/dashboard" ) ).body( [] )
        expect( res.status ).to.be.equal( 200 )
    } )
} )