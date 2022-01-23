require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');


// Create Express Server
const app = express();

// CORS Config
app.use( cors() );

// DB Connection
dbConnection();

// Rutas
app.get( '/', (req, res) =>{

    res.json({
        ok: true,
        mgs: 'Hello World'
    })

});

app.listen( process.env.PORT, () =>{
    console.log('¿Server running in port:', process.env.PORT);
} );

