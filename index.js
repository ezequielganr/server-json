const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// configure express
const app = express();

app.use(express.json());
app.use(cors());

const port = 8000;

// import the routes
const users = require('./users');
app.use('/api', users);

// configure morgan
app.use(morgan('dev'));

// start the server
app.listen(port, () => {
    console.log('server running on port', port);
});
