const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('type', {
     id: {
      type: DataTypes.INTEGER,
     /*  defaultValue: DataTypes.UUIDV4,  */
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    }, 
    name: {
      type: DataTypes.STRING,
      allowNull: false,
     /*  unique: true */
    },
  })
}