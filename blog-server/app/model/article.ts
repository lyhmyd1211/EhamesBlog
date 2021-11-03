/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('article', {
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    timestamps: false,
    tableName: 'article',
  });

  Model.associate = function() {

  };

  return Model;
};
