'use strict';
module.exports = app => {
  const {STRING,INTEGER, DATE} = app.Sequelize;
  const Projects = app.model.define('projects', {
    id: { type: INTEGER(11), primaryKey: true, autoIncrement: true },
    name: STRING,
    desc:STRING,
    content:STRING,
    status:INTEGER,
    image:STRING,
    created_time:DATE,
    update_time: DATE,
  },
  {
    freezeTableName: true,
    timestamps: false,
  });

  return Projects;
}