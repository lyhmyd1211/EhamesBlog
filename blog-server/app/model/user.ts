/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('user', {
    id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    describe: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    timestamps: false,
    tableName: 'user',
  });

  Model.associate = function() {

  };

  return Model;
};
