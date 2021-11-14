const collection = require( '../utilities/connection' );
const userData = [
  {
    "sEmail": 'nilaksh0311@gmail.com',
    "sName": 'nilaksh',
    "sPassword": 'Nilaksh0311@gmail.com',
    "sPhone": 1234567890,
    "sAccountNumber": 645645748,
    "sTan": "nnhu7",
    "sGSTNumber": '567bhygr'
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