const cron = require('node-cron');
const DomainExpired = require('./scrappers/DomainExpired');
const DomainAuthority = require('./scrappers/DomainAuthority');
const { Domain } = require('./models');

const domainExpired = new DomainExpired();
const domainAuthority = new DomainAuthority();

// crawler for .com extention
const domainCrawler1 = cron.schedule('* * * * * *', async () => {
  try {
    domainCrawler1.stop();
    const domains = await domainExpired.execute('com');
    
  } catch (error) { console.log(error) }
  domainCrawler1.start();
});

domainCrawler1.start();

