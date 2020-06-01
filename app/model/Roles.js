'use strict';
module.exports = app => {
  const {STRING,INTEGER, DATE} = app.Sequelize;
  const Roles = app.model.define('roles', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING,
    desc: STRING,
    permission_slug:STRING,
    created_time: DATE,
    updated_time:DATE
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
  );

  return Roles;
}