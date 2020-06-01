'use strict';
module.exports = app => {
  const {STRING,INTEGER, DATE} = app.Sequelize;
  const Tasks = app.model.define('tasks', {
    id: { type: INTEGER(11), primaryKey: true, autoIncrement: true },
    story_id: INTEGER,
    versions_id: INTEGER,
    project_id: INTEGER,
    name: STRING,
    content: STRING,
    status: INTEGER,
    level: INTEGER,
    platform: INTEGER,
    sort: INTEGER,
    created_time: DATE,
    update_time: DATE,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
  );

  return Tasks;
}