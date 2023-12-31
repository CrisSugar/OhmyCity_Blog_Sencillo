const Sequelize = require("sequelize");
const path = "mysql://root@localhost:3306/blogdb";
const sequelize = new Sequelize(path, { operatorAliases: false });

sequelize.authenticate()
    .then(() => {
        console.log("Conectado a base de datos: blogdb");
    })
    .catch(err => {
        console.error("Error de conexión:", err)
    })

module.exports = sequelize;