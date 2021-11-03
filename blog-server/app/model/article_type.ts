/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('article_type', {
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'article_type',
  });

  Model.associate = function() {

  };

  return Model;
};
