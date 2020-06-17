'use strict';
module.exports = app => {
  const {STRING,INTEGER, DATE} = app.Sequelize;
  const Stacks = app.model.define('stacks', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING,
    slug:STRING,
    status:INTEGER,
    description:STRING,
    image_url:STRING,
    created_time:DATE,
    updated_time: DATE,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
  );

  return Stacks;
}