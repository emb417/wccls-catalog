const log4js = require('log4js');
log4js.configure({
  appenders: {
    console: { type: 'console' }
  },
  categories: {
    default: { appenders: ['console'], level: 'debug' }
  }
});
const logger = log4js.getLogger();

const request = require('request');
const AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-west-2',
  endpoint: 'http://localhost:1338'
});
const docClient = new AWS.DynamoDB.DocumentClient();
const parser = require('./parser');

const pageUrl = 'https://catalog.wccls.org/Mobile/Search/Results/?t=ps4&f=a&s=KW&l=TOM%3dvgm&o=MP&ls=1.500';
request(pageUrl, function (error, response, body) {
  // Print the error if one occurred
  if( error ){ logger.error(error); }
  // Print the response status code if a response was received
  if( response ){

    logger.debug('statusCode:', response.statusCode);

    const allItems = parser.getItems(body);
      allItems.forEach(function(item) {
        const params = {
            TableName: 'wccls-catalog-ps4-items',
            Item: {
                'year':  item.year,
                'title': item.title,
                'itemId':  item.itemId
            }
        };

        docClient.put(params, function(err, data) {
            if (err) {
                logger.error(err);
            } else {
                logger.debug(data);
            }
        });
    });
  }
});
