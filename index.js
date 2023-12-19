const express = require('express');
const routes = require('./routes/routes');
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use('/api', routes);

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// module.exports = app;

module.exports = {
  app,
  closeServer: () => {
    return new Promise((resolve, reject) => {
      server.close((err) => {
        if (err) {
          reject(err);
        } else {
          console.log('Server has stopped listening');
          resolve();
        }
      });
    });
  },
};