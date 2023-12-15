const Reporter = require('./services/reportGenService.js');

const express = require('express');
const app = express();
const routes = require('./routes/routes');

const PORT = 3001;

app.use(express.json());

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// Reporter.netIncomeMonthly(9, 2023);
