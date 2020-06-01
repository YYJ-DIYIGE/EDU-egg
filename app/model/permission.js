'use strict';
module.exports = app => {
  const {STRING,INTEGER} = app.Sequelize;
  const Permissions = app.model.define('permissions', {
    id: { type: INTEGER(11), primaryKey: true, autoIncrement: true },
    name: STRING,
    slug: STRING,
    group_id:INTEGER
  },
  {
    freezeTableName: true,
    timestamps: false,
  });

  return Permissions;
}