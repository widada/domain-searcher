const rp = require('request-promise');

class DomainAuthority {
  async execute(sitelink) {
    const url = ' https://www.checkmoz.com/bulktool';

    const data = {
      getStatus: 1,
      siteID: 1,
      sitelink: sitelink,
      da: 1,
      pa: 1,
      moz: 1,
      ml: 1,
      alexa: 1,
    }

    var options = {
      method: 'POST',
      uri: url,
      formData: data,
      headers: {
        'content-type': 'multipart/form-data'
      }
    };

    const rawResponse = await rp(options);
    const regex = /(<([^>]+)>)/ig; //remove html character
    const sanitize = rawResponse.replace(regex, "#")
    .split('#')
    .filter(word => word.length > 0);

    const response = {
      domain: sanitize[1],
      da: parseFloat(sanitize[2]),
      pa: parseFloat(sanitize[3]),
      moz_rank: parseFloat(sanitize[4]),
      backlink: parseFloat(sanitize[5]),
      alexa: parseFloat(sanitize[6]) || 0
    }

    console.log(`Authority = DA ${response.da} - PA ${response.pa} - Moz Rank ${response.moz_rank} - Backlink ${response.backlink} - Alexa ${response.alexa}`);

    return response;
  }
}

module.exports = DomainAuthority;
