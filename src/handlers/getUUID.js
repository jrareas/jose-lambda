const tableName = process.env.SAMPLE_TABLE;
const { v4: uuidv4 } = require('uuid');
const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

exports.getUUIDHandler = async (event) => {
  uuid = uuidv4()
  console.log(tableName)
  var params = {
    TableName : tableName,
    Item: { uuid: uuid },
  };
  const data = await docClient.put(params).promise();

  // format expected by the api proxy
  const response = {
      isBase64Encoded: false,
      statusCode: 200,
      headers: {},
      body:JSON.stringify({uuid: uuid})
  };
  return response;
}