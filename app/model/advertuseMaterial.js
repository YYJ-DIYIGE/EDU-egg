'use strict';
module.exports = app => {
  const {INTEGER} = app.Sequelize;
  const AdvertiseMaterial = app.model.define('advertise_material', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    advertise_id:INTEGER,
    material_id:INTEGER,
    sort:INTEGER
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
  );

  return AdvertiseMaterial;
}