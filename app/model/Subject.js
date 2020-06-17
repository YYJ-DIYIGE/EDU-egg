'use strict';
module.exports = app => {
  const {TEXT,INTEGER, DATE} = app.Sequelize;
  const Subject = app.model.define('skill_questions', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    stem: TEXT,
    stack_id:INTEGER,
    level:INTEGER,
    option:TEXT,
    currect:INTEGER,
    created_time:DATE,
    updated_time: DATE,
  },
  {
    freezeTableName: true,
    timestamps: false,
    raw:true
  }
  );

  return Subject;
}