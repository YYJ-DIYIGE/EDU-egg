'use strict';
module.exports = app => {
  const {STRING,INTEGER, DATE} = app.Sequelize;
  const Stories = app.model.define('stories', {
    id: { type: INTEGER(11), primaryKey: true, autoIncrement: true },
    versions_id:INTEGER,
    name: STRING,
    content:INTEGER,
    sort:INTEGER,
    created_time:DATE,
    update_time: DATE,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
  );

  return Stories;
}