const express = require('express');
const app = express();

const cors = require('cors');
const mysql2 = require('mysql2')
const sequelize = require('./dbConn');
const db = require('./Models/Post');



app.use(express.json());
app.use(cors())
/* app.use((req,res,next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin', Content-TypeError, Accept, Authorization);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, DELETE');
  next();
}) */
/* app.use(express.static(path.join(__dirname, 'public'))); */
app.use(express.static('/'));
app.use('/public', express.static('public'))
app.use(express.static('public'));





// Initialize Sequelize models
const Post = require("./Models/Post");

// Sync the database
sequelize.sync()
  .then(() => {
    console.log("Sincronizado con la base de datos");
  })
  .catch((err) => {
    console.log("Fallo en la sincronización con la base de datos: " + err.message);
  });



app.use(require('./routes/routes'))

app.listen(9000, () => {
    console.log('Servidor ejecutándose en', 'http://localhost:' + 9000)
})