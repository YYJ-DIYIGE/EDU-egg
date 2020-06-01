'use strict';
module.exports = app => {
  const {STRING,INTEGER} = app.Sequelize;
  const PermissionGroips = app.model.define('permission_groips', {
    id: { type: INTEGER(11), primaryKey: true, autoIncrement: true },
    name: STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  });

  return PermissionGroips;
}