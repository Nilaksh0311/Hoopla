let{expect} = require( 'chai' )
const chai = require( 'chai' )
const chaiAsPromised = require( 'chai-as-promised' )
chai.use( chaiAsPromised )
const service = require( '../src/service/user' )

describe( 'Testing service file', ()=>{
    it( 'Testing getAllProducts Service', async () => {
        const res = await service.getAllProducts( 'U101' )
        //console.log(res[0])
        expect( res[0].userId ).to.be.equal( 'U101' )
    } )
    it( 'addProductToCart', async () =>{
        const res = await service.addProductToCart( {
            "userId": "U101",
            "prodId": "P1111",
            "prodName": "Shoes",
            "qty": 1,
            "price": 10
        }
        )
        expect( res.userId ).to.be.equal( 'U101' )
    } )
    it( 'delete product from cart', async () => {
        const res = await service.deleteProductFromCart( {
            "userId": "U101",
            "prodId": "P1111"
        } )
    } )
    it( 'delete whole cart', async () => {
        const res = await service.deleteCart( 'U101' )
        expect( res.n ).to.be.equal( 1 )
    } )
    
} )