'use strict';
module.exports = app => {
  const {STRING,TEXT,INTEGER, DATE} = app.Sequelize;
  const Manage = app.model.define('manage', {
    id: { type: INTEGER(11), primaryKey: true, autoIncrement: true },
    name: TEXT,
    phone: STRING,
    password:STRING,
    role_id: INTEGER,
    created_time: DATE,
    updated_time: DATE
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
  );

  return Manage;
}