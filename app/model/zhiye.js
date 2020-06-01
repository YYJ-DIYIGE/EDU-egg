'use strict';
module.exports = app => {
  const {STRING,INTEGER, DATE} = app.Sequelize;
  const Zhiye = app.model.define('zhiye', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING,
    description:STRING,
    sort:INTEGER,
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

  return Zhiye;
}