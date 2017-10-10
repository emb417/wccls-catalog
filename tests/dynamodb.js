var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "https://dynamodb.us-west-2.amazonaws.com"
});
//AWS.config.update({endpoint: "https://dynamodb.us-west-2.amazonaws.com"});
//arn:aws:dynamodb:us-west-2:627684009771:table/wccls-catalog-ps4-items
//var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

// var params = {
//     TableName : "wccls-catalog-ps4-items",
//     KeySchema: [
//         { AttributeName: "year", KeyType: "HASH"},  //Partition key
//         { AttributeName: "title", KeyType: "RANGE" }  //Sort key
//     ],
//     AttributeDefinitions: [
//         { AttributeName: "year", AttributeType: "N" },
//         { AttributeName: "title", AttributeType: "S" }
//     ],
//     ProvisionedThroughput: {
//         ReadCapacityUnits: 10,
//         WriteCapacityUnits: 10
//     }
// };
//
//
// dynamodb.createTable(params, function(err, data) {
//     if (err) {
//         console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//         console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
//     }
// });


// docClient.get(params, function(err, data) {
//     if (err) {
//         console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//         console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
//     }
// });
//
// console.log("Querying for movies from 1992 - titles A-L, with genres and lead actor");
//
var params = {
    TableName : "wccls-catalog-ps4-items",
    KeyConditionExpression: "#yr = :yyyy and title between :letter1 and :letter2",
    ExpressionAttributeNames:{
        "#yr": "year"
    },
    ExpressionAttributeValues: {
        ":yyyy":2017,
        ":letter1": "0",
        ":letter2": "Z"
    }
};
docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log(" -", item.year + ": " + item.title);
        });
    }
});
//
// docClient.put(params, function(err, data) {
//     if (err) {
//         console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//         console.log("Added item:", JSON.stringify(data, null, 2));
//     }
// });
//
//
// docClient.update(params, function(err, data) {
//     if (err) {
//         console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//         console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
//     }
// });
//
//
// docClient.delete(params, function(err, data) {
//     if (err) {
//         console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//         console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
//     }
// });
