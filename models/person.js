module.exports = function(sequelize, DataTypes) {
    const Person = sequelize.define("person", {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey : true
        },

        salutation: {
            type: DataTypes.STRING,
        },

        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        middleName: {
            type: DataTypes.STRING,
        },

        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        suffix: {
            type: DataTypes.STRING,
        },

        plotId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }

    });

    return Person;
}