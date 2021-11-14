let{ expect } = require( 'chai' )
const request = require( 'supertest' )
const app = require( '../src/app' );

describe( 'testing routes in app.js', () => {
    it( 'testing login in route', async () => {
        const res = await request( app ).post( '/user/login/' ).send( {
            "email": "nilaksh@gmail.com",
            "password": "nilaksh@123"
        } );
        expect( res.body.data[0].userId ).to.equal( 'U1002' );
    } )

    it( 'testing register route', async () => {
        const res = await request( app ).post( '/user/register/' ).send( {
         
            "email": "johndoe@gmail.com",
            "password": "John111",
            "name": "John",
            "dateOfBirth": "2018-06-08",
            "phoneNo": 8265839081


        } )
        expect( res.body.data.userId ).to.be.a( 'string' )
    } )

    it( "test for user login with incorrect credentials", async () => {
        let res = await request( app ).post( '/user/login' ).send( {
            "email": "nilaksh@gmail.com",
            "password": "nilaksh123"
        } )
        expect( res.body.message ).to.equal( 'The password entered is incorrect!!' );
    } )

    it( "test for user login with incorrect credentials", async () => {
        let res = await request( app ).post( '/user/login' ).send( {
            "email": "nilaksh@gmail.com",
            "password": "nilaksh123"
        } )
        expect( res.body.message ).to.equal( 'You are not registered.Please register to login' );
    } )
} )