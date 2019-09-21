const async = require('async');
const cron = require('node-cron');
const DomainExpired = require('./scrappers/DomainExpired');
const DomainAuthority = require('./scrappers/DomainAuthority');
const { Domain } = require('./models');

const domainExpired = new DomainExpired();
const domainAuthority = new DomainAuthority();

const execute = async (extention) => {
  try {
    const domains = await domainExpired.execute(extention);
    async.each(domains, async (domain) => {

      const findDomain = await Domain.findOne({
        where: { sitename: domain.sitename }
      });

      if (!findDomain) await Domain.create(domain);
    
    }, (error) => {
      if (error) console.log(error);
    });
  } catch (error) { console.log(error) }
}

const domainCrawler1 = cron.schedule('*/30 * * * *', async () => {
  domainCrawler1.stop();
  await execute('com');
  domainCrawler1.start();
});

const domainCrawler2 = cron.schedule('*/30 * * * *', async () => {
  domainCrawler2.stop();
  await execute('net');
  domainCrawler2.start();
});

const daChecker = cron.schedule('* * * * * *', async () => {
  daChecker.stop();
  try {
    const domain = await Domain.findOne({
      where: { checked: false }
    });

    if (domain) {
      const daChecked = await domainAuthority.execute(domain.sitename);
    
      domain.da = daChecked.da;
      domain.pa = daChecked.pa;
      domain.alexa = daChecked.alexa;
      domain.moz_rank = daChecked.moz_rank;
      domain.backlink = daChecked.backlink;
      domain.checked = true;

      await domain.save();
    }

  } catch (error) { console.log(error) }
  daChecker.start();
});



domainCrawler1.start();
domainCrawler2.start();
daChecker.start();