module.exports = function(sequelize, DataTypes) {
    const Plots = sequelize.define("plots", {

        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true 
        },

        status: {
            type: DataTypes.STRING,
            allowNull: false,
          },

        plotNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        plotX: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        plotY: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        clickable: {
            type: DataTypes.STRING,
            allowNull: false,
          },

        certificate: {
            type: DataTypes.STRING
        },

        reservedBy: {
            type: DataTypes.STRING
        },

        reservedDate: {
            type: DataTypes.STRING
        },

        numInterred: {
            type: DataTypes.STRING
        },

        notes: {
            type: DataTypes.STRING
        },

    });

    return Plots;
}