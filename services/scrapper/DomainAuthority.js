const rp = require('request-promise');

class DomainAuthority {
  constructor(sitelink) {
    this.sitelink = sitelink;
  }

  async crawler() {
    const url = ' https://www.checkmoz.com/bulktool';

    const data = {
      getStatus: 1,
      siteID: 1,
      sitelink: this.sitelink,
      da: 1,
      pa: 1,
      moz: 1,
      ml: 1,
      alexa: 1,
      google: 1,
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
    return rawResponse;
  }
}

const domainAuthority = new DomainAuthority('paguponku.com');
domainAuthority.crawler();
// module.exports = DomainAuthority;