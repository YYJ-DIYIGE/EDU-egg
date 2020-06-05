'use strict';
module.exports = app => {
  const {STRING,INTEGER, DATE} = app.Sequelize;
  const SmsModule = app.model.define('sms', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    template: STRING,
    content:STRING,
    phone:STRING,
    code:STRING,
    status:INTEGER,
    created_at:DATE,
    updated_at: DATE,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
  );

  return SmsModule;
}