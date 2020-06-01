'use strict';
module.exports = app => {
  const {STRING,INTEGER, DATE} = app.Sequelize;
  const Advertise = app.model.define('advertise', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING,
    slug:STRING,
    width:STRING,
    height:STRING,
    created_time:DATE,
    updated_time: DATE,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
  );

  return Advertise;
}