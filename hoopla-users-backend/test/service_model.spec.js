let{ expect } = require( 'chai' )
const request = require( 'supertest' )
const user = require( '../src/service/user' );
const model=require( '../src/model/user' );

describe( 'testing routes in app.js', () => {
    it( "testing loginUser method in service", async ()=>{
        const email = "nilaksh@gmail.com";
        const password = "nilaksh@123";
        expect( await user.loginUser( email,password ) ).to.be.a( 'Array' );
    } )

    // it("testing loginUser method in service for error", async()=>{
    //     const email = "nilaksh@gmail.com";
    //     const password = "Nilaksh123";
    //     await expect(await model.userLogin.bind(email,password)).throws.an('error')
    // })

    it( "testing register user method in service",async ()=>{
        const data={
         
            "email": "johndoe@gmail.com",
            "password": "John111",
            "name": "John",
            "dateOfBirth": "2018-06-08",
            "phoneNo": 8265839081


        }
        expect( await user.register( data ) ).to.be.a( 'Object' )
    } )

    it( "testing generate Id method in model", async ()=>{
        expect( await model.generateId() ).to.be.length( 5 );
    } )
} )