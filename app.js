const AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-west-2',
  endpoint: "https://dynamodb.us-west-2.amazonaws.com"
});
const docClient = new AWS.DynamoDB.DocumentClient();

const cheerio = require('cheerio');
const getItems = ( response ) => {
  const $ = cheerio.load(response);
  const items = [];
  $('#main tr').each(function(i, element) {
      let item = {};

      const href = $(this).find('a').attr('href');
      item.id = href.substr(href.lastIndexOf(".")+1);
      item.id = item.id - 0;

      item.title = $(this).find('.nsm-brief-primary-title-group').find('.nsm-short-item').text();
      item.title = item.title.replace(/\s*\[electronic\sresource\s*\(game\)\]/,'');
      item.title = item.title.replace(/\)\]/,'');

      item.year = $(this).find('.nsm-brief-secondary-zone').find('.nsm-short-item').text();
      item.year = item.year - 0;

      items.push(item);
  });

  return items;
};


exports.handler = function (event, context) {

  const request = require('request');
  const pageUrl = 'https://catalog.wccls.org/Mobile/Search/Results/?t=ps4&f=a&s=KW&l=TOM%3dvgm&o=MP&ls=1.500';
  request(pageUrl, ( error, response, body ) => {
    // Print the error if one occurred
    if( error ){ return error; }
    // Print the response status code if a response was received
    if( response ){

      const allItems = getItems(body);
        allItems.forEach( item => {
          const params = {
              TableName: 'wccls-catalog-ps4-items',
              Item: {
                  'year':  item.year,
                  'title': item.title,
                  'itemId':  item.itemId
              }
          };

          docClient.put(params, ( err, data ) => {
              if (err) {
                  context.error(err);
              }
              else {
                context.succeed('Success: ' + data);
              }
          });
      });
    }
  });
};
