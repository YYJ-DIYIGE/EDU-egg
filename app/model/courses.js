'use strict';
module.exports = app => {
  const {STRING,INTEGER, DATE} = app.Sequelize;
  const Courses = app.model.define('courses', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING,
    short_name: STRING,
    tips:STRING,
    description:STRING,
    status:INTEGER,
    image_url:STRING,
    created_time:DATE,
    updated_time: DATE,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
  );

  return Courses;
}