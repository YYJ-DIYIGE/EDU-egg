'use strict';
module.exports = app => {
  const {STRING,INTEGER, DATE} = app.Sequelize;
  const ZhiyePath = app.model.define('zhiye-path', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING,
    sort:INTEGER,
    zhiye_id:INTEGER,
    description:STRING,
    created_time:DATE,
    updated_time: DATE,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
  );

  return ZhiyePath;
}