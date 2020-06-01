'use strict';
module.exports = app => {
  const { INTEGER } = app.Sequelize;
  const ZhiyeCourse = app.model.define('zhiye-courses', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    sort:INTEGER,
    zhiye_id: INTEGER,
    course_id: INTEGER,
    path_id:INTEGER,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
  );

  return ZhiyeCourse;
}