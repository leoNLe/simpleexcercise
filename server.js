const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

const app = express();

//Parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Deliver public folder
app.use(express.static(path.join(__dirname, '/public')));

require('./routes/html-routes')(app);
require('./routes/api-routes')(app);

//Make db is logged into before starting server
mongoose
  .connect('mongodb://localhost/workoutDB', { useNewUrlParser: true }, () => {
    console.log('Connected to DB');
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`listening on PORT ${PORT}`);
    })
  );
