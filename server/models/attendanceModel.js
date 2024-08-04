const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Attendance = sequelize.define(
  'attendance',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = Attendance;
