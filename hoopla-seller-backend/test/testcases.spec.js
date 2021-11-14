let{ expect } = require( 'chai' )
const request = require( 'supertest' )
const route = require( '../src/app' )
const connect = require( '../src/utilities/connection' )

describe( "testing seller login and registration", () => {
    it( "test for seller login in route", async () => {
        let res = await request( route ).post( '/seller/login' ).send( {
            "email": "nilaksh@gmail.com",
            "password": "nilaksh@123"
        } )
        expect( res.body.data.sEmail ).to.equal( 'nilaksh@gmail.com' );
    } )

    it( "test for seller register", async () => {
        let res = await request( route ).post( '/seller/register' ).send( {
            "email": "nilaksh@gmail.com ",
            "name": "nilaksh",
            "password": "nilaksh@654",
            "phoneNumber": 8761111111,
            "accountNumber": 45678966632455,
            "tan": "AAAA1234BT",
            "gstNumber": "12ABCDE1234A1Z1"

        } )
        expect( res.body.data.sName ).to.equal( 'nilaksh' );
    } )

    it( "test for seller login with incorrect credentials", async () => {
        let res = await request( route ).post( '/seller/login' ).send( {
            "email": "nilaksh@gmail.com",
            "password": "nilaksh123"
        } )
        expect( res.body.message ).to.equal( 'You are not registered! Please register to LogIn' );
    } )

    it( "checking getCollection method", async () => {
        expect( await connect.getCollection() ).to.be.not.an( 'error' )
    } )



} )