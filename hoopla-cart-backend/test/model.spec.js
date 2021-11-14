const{ expect } = require( 'chai' )
const chai = require( 'chai' )
const chaiAsPromised = require( 'chai-as-promised' )
chai.use( chaiAsPromised )
const model = require( '../src/model/user' )

describe( 'Testing suite for model file',() => {
    it( 'Testing fetchProducts', async () => {
        let res = await model.fetchProducts( 'U101' )
        expect( res.userId ).to.be.equal( 'U101' )
    } )
    it( 'testing addProducts', async () => {
        let res = await model.addProduct( {
            userId: 'U101',
            prodId: 'P1111',
            prodName: 'lenova',
            qty: 3,
            price: 1000
        } )
        expect( res.userId ).to.be.equal( 'U101' )
    } )
    it( 'testing update Quantity', async () => {
        let res = await model.updateQuantity( {
            userId: 'U101',
            prodId: 'P1111'
        } )
        expect( res ).to.be.equal( true )
    } )
    it( 'testing delete product', async () => {
        let res = await model.deleteProduct( {
            userId: 'U101',
            prodId: 'P1111'
        } )
    } )
} )