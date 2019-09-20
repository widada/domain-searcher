const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = (sequelize, DataTypes) => {
  const Domain = sequelize.define('Domain', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    sitename: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    da: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    pa: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    backlink: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    birth: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    alexa: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    moz_rank: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0
    },
    taken: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    checked: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    createdAt: {
      type: withDateNoTz(DataTypes).DATE_NO_TZ,
      field: 'created_at',
      allowNull: false,
    },
    updatedAt: {
      type: withDateNoTz(DataTypes).DATE_NO_TZ,
      field: 'updated_at',
      allowNull: false,
    }
  }, {
    tableName: 'domains'
  });

  return Domain;
};