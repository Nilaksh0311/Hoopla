let{ expect } = require( 'chai' )
let connect=require( '../src/utilities/connection' )

describe( 'testing connection file in utilities',()=>{
    it( "checking getCollection method", async ()=>{
        expect( await connect.getCollection() ).to.be.not.an( 'error' )
    } )
} )