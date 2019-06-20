module.exports = function (sequelize, DataTypes) {
    var Quote = sequelize.define("Quote", {
        author: DataTypes.STRING,
        quote: DataTypes.STRING,
        image: DataTypes.STRING
    }, {

            timestamps: false

        });
    return Quote;
};
