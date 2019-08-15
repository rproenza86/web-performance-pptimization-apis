const express = require('express');
const serverTiming = require('server-timing');
 
const app = express();
app.use(serverTiming());
 
app.use((req, res, next) => {
  res.setMetric('db', 100.0, 'Test: DB metric');
  res.setMetric('api', 200.0, 'Test: API metric');
  res.setMetric('cache', 300.0, 'Test: Cache metric');
  next();
});
app.use(express.static("./"));

app.listen(4000);