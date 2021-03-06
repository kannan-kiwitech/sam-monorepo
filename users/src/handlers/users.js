const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();
//Table: marketItems

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };

  try {
    switch (event.routeKey) {
      case "DELETE /users/{id}":
        await dynamo
          .delete({
            TableName: "MyMarketItems",
            Key: {
              id: event.pathParameters.id
            }
          })
          .promise();
        body = `Deleted item ${event.pathParameters.id}`;
        break;
      case "GET /users/{id}":
        body = await dynamo
          .get({
            TableName: "MyMarketItems",
            Key: {
              id: event.pathParameters.id
            }
          })
          .promise();
        break;
      case "GET /users":
        body = await dynamo.scan({ TableName: "MyMarketItems" }).promise();
        break;
      case "PUT /users":
        let requestJSON = JSON.parse(event.body);
        await dynamo
          .put({
            TableName: "MyMarketItems",
            Item: requestJSON
          })
          .promise();
        body = `Put users ${requestJSON.pk}`;
        break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body );
  }

  return {
    statusCode,
    body,
    headers
  };
};
