const express = require('express');
const path = require('path');
require('dotenv').config();
const cors = require('cors');

const { dbConnection } = require('./database/config');

const app = express();

dbConnection();

app.use(cors());

app.use( express.static('public') );

app.use( express.json() );

app.use('/api/auth', require('./routes/auth'));

app.use('/api/events', require('./routes/events'));
// Corregir el problema de la ruta, cualquier ruta que no este definida anteriormente, lo llevare a servir el contenido de la carpeta publica
app.use('*', ( req, res ) => {
    res.sendFile( path.join(__dirname, 'public/index.html') )
})

app.listen( process.env.PORT , () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
} );