const cheerio = require('cheerio');

exports.getItems = (response) => {
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
