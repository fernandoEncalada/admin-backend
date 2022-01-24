require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');


// Create Express Server
const app = express();

// CORS Config
app.use( cors() );

// Read and parse of Body
app.use( express.json() );

// DB Connection
dbConnection();

// Rutas
app.use( '/api/users', require('./routes/users'));
app.use( '/api/login', require('./routes/auth'));



app.listen( process.env.PORT, () =>{
    console.log('¿Server running in port:', process.env.PORT);
} );

