# wccls-catalog

Crawl wccls catalog to build data store using DynamoDB.

[Local DynamoDB Guide](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html)

To start local dynamo listening to port 1338:
```
java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb -port 1338
```

For various DynamoDB commands, uncomment or comment code in tests/dynamodb.js

Uses Claudia.js for deployments.

claudia create --region us-west-2 --handler app.handler

//--policies
//--role
//--timeout in seconds
