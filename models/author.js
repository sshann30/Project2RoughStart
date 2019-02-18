module.exports = function (sequelize, DataTypes) {
  var Author = sequelize.define("Author", {
    // Giving the Author model a name of type STRING
    name: DataTypes.STRING,
    // the wins (a integer)
    wins: DataTypes.INTEGER,
    // the winPercentage role (a integer)
    winPercentage: DataTypes.INTEGER,
    // the kills as integer
    kills: DataTypes.INTEGER,

    // and the gamers K/D (an int)
    kD: DataTypes.INTEGER
  });

  Author.associate = function (models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Author.hasMany(models.Post, {
      onDelete: "cascade"
    });
  };

  return Author;
};
