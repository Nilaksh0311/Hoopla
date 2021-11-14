const collection = require( '../utilities/connection' );
const userData = [
  {
    "userId": "U1001",
    "uCredentials": {
      "uEmail": "john@gmail.com",
      "uPass": "John1111"
    },
    "uProfile": {
      "uName": "John",
      "uDOB": "2018-06-08",
      "uPhone": 8265839081,
      "uIsSeller": false,
      "uDateJoined": "2018-06-07T04:21:00.760Z",
      "uLastLogin": "2018-06-12T11:30:28.340Z"
    }
  }
]

let create = {}

create.setupDB = async () => {
  const userColl = await collection.getCollection();
  const data = await userColl.deleteMany();
  const result = await userColl.insertMany( userData );
  if( result && result.length > 0 )
    return result.length;
  else
    return null;
}

module.exports = create