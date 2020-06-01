'use strict';
module.exports = app => {
  const {STRING,INTEGER, DATE} = app.Sequelize;
  const Material = app.model.define('material', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING,
    link:STRING,
    image_url:STRING,
    window:STRING,
    created_time:DATE,
    updated_time: DATE,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
  );

  return Material;
}