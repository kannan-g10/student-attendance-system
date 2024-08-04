const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Student = sequelize.define(
  'student',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'absent',
    },
  },
  { timestamps: false }
);

module.exports = Student;
