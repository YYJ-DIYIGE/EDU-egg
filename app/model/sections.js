'use strict';
module.exports = app => {
  const {STRING,INTEGER, DATE} = app.Sequelize;
  const Sections = app.model.define('sections', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    chapter_id: INTEGER,
    name: STRING,
    content: STRING,
    video_url:STRING,
    sort:INTEGER,
    created_time: DATE,
    updated_time:DATE
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
  );

  return Sections;
}