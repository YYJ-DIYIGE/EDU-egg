'use strict';
module.exports = app => {
  const {STRING,INTEGER, DATE} = app.Sequelize;
  const Chapters = app.model.define('chapters', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    course_id: INTEGER,
    name: STRING,
    sort:INTEGER,
    created_time:DATE,
    updated_time: DATE,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
  );

  return Chapters;
}