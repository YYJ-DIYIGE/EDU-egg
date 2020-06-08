'use strict';
module.exports = app => {
  const {STRING,INTEGER, DATE} = app.Sequelize;
  const Users = app.model.define('users', {
    id: { type: INTEGER(11), primaryKey: true, autoIncrement: true },
    name: STRING,
    real_name: STRING,
    unionid: STRING,
    section_key: STRING,
    phone: STRING,
    avatar_url: STRING,
    sex: INTEGER,
    birthday: DATE,
    introduction:STRING(500),
    visit_at:DATE,
    created_at: DATE,
    updated_at: DATE,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
  );

  return Users;
}