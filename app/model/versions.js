'use strict';
module.exports = app => {
  const {STRING,INTEGER, DATE} = app.Sequelize;
  const Versions = app.model.define('versions', {
    id: { type: INTEGER(11), primaryKey: true, autoIncrement: true },
    project_id:INTEGER,
    name: STRING,
    sort:INTEGER,
    created_time:DATE,
    update_time: DATE,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
  );

  return Versions;
}