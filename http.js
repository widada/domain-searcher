const express = require('express');
const path = require('path');
const { Domain } = require('./models');
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/api', async (req, res) => {

  const offset = req.query.start || 0;
  const limit = req.query.length || 10;

  const columenOrder = ['sitename', 'da', 'pa', 'backlink', 'birth', 'alexa', 'moz_rank', 'taken', 'checked'];
  const order = [];

  if (req.query.order) {
    const filterColumn = parseInt(req.query.order[0].column);
    const ascDesc = req.query.order[0].dir;
    const columnName = columenOrder[filterColumn];

    order.push([columnName, ascDesc]);
  }

  const domains = await Domain.findAndCountAll({
    order,
    offset,
    limit,
    raw: true
  });

  const mapping = domains.rows.map(domain => {
    return [
      domain.sitename,
      domain.da,
      domain.pa,
      domain.backlink,
      domain.birth,
      domain.alexa,
      domain.moz_rank,
      domain.taken,
      domain.checked
    ];
  });

  const response = {
    draw: req.query.draw,
    recordsTotal: domains.count,
    recordsFiltered: domains.count,
    data: mapping
  }

  res.json(response);
});

app.post('/api/:domain', async (req, res) => {
  const domain = req.params.domain;
  const findDomain = await Domain.findOne({
    where: {
      sitename: domain
    }
  });
  let message = '';
  if (!findDomain) {
    message = 'Domain not found!';
  } else {
    findDomain.taken = true;
    await findDomain.save();
    message = 'Taken domain is success!';
  }

  console.log(domain);
  return res.json({ message });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))