'use strict';
module.exports = app => {
  const {STRING,INTEGER, DATE} = app.Sequelize;
  const Company = app.model.define('company', {
    id: { type: INTEGER(11), primaryKey: true, autoIncrement: true },
    name: STRING,
    abridge: STRING,
    slogan:STRING,
    socialNumber:STRING,
    boss:STRING,
    phone:STRING,
    desc:STRING,
    image:STRING,
    created_time:DATE,
    update_time: DATE,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
  );

  return Company;
}