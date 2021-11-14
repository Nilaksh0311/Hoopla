let{ expect } = require( "chai" );
let chaiHttp = require( "chai-http" );
const{ app } = require( "../app" );

describe( "App", () => {
  it( "App should contain express", () => {
    expect( app ).to.have.instanceOf( express ).to.be( truthy );
  } );
} );
