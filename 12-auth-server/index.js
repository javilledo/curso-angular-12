const express = require('express');
const cors = require('cors');
const path = require('path');
const { dbConnection } = require('./db/config');
require('dotenv').config();

// console.log(process.env);

// Crear el servidor/aplicación de Express
const app = express();

// Base de datos
dbConnection();

// Directorio público
app.use( express.static('public') );

// CORS
app.use( cors() );

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use( '/api/auth', require('./routes/auth') );

// Manejar demás rutas
// (Al copiar el build de Angular en public de este backend, Angular solo maneja la principal, pero al recargar
// o ir a otra ruta válida en Angular pero no en el backend, trata de servir el resultado del servidor GET o POST)
// Para eso se incluye useHash:true en el app-routing, para que sean compatible las rutas de Angular y backend
// Lo anterior incluye un # intermedio para diferenciar las rutas de Angular de las del backend
app.get('*', (req, res)=> {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
})


app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`)
} )