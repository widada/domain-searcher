const rp = require('request-promise');
const cheerio = require('cheerio');

class DomainExpired {
  
  async execute (extention) {
    const domains = [];
    for (let i = 0; i <= 12; i++) {
      console.log(`Grabbing data in page ${i + 1}`)
      const offset = i * 25;
      const domain = await crawler(offset, extention)
      domains.push(domain);
      console.log(`end page ${i + 1}`);
    }
    return domains;
  }
  
  crawler(offset = 0, extention = 'com') {
    const DOMAIN_EXTENTION = {
      com: 2,
      net: 3
    }
    const extention = DOMAIN_EXTENTION[extention];


    var options = {
      uri: "https://www.expireddomains.net/deleted-domains",
      qs: {
        start: offset,
        "ftlds[]": extention,
        fnumhost: 1,
        fsephost:1
      },
      transform: function (body) {
          return cheerio.load(body);
      }
    };
  
    return rp(options)
      .then(($) => {
        const domains = $('.base1 > tbody > tr');
  
        const domainData = [];
        domains.each((key, domain) => {
          const domain_name = $(domain).find('.field_domain > a').text().toLowerCase();
          const status = $(domain).find('.field_whois > a').text().toLowerCase();
          const backlink = $(domain).find('.field_bl > a').text().toLowerCase();
          const birth = $(domain).find('.field_abirth > a').text().toLowerCase();
          const alexa = $(domain).find('.field_alexa > a').text().toLowerCase();
  
          if (status === 'available') {
            const log = `Domain: ${domain_name} - Backlink: ${backlink} - Birth: ${birth} - Alexa: ${alexa}`;
            console.log(log);
            domainData.push({
              domain_name,
              backlink,
              birth,
              alexa,
            });
          }
        });
  
        return domainData.reduce((a, b) => a.concat(b));
      })
      .catch(console.log);
  }
}

module.exports = DomainExpired;