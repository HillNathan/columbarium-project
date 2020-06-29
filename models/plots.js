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

        plot_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        plot_X: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        plot_Y: {
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

        reserved_by: {
            type: DataTypes.STRING
        },

        reserved_date: {
            type: DataTypes.STRING
        },

        num_interred: {
            type: DataTypes.STRING
        },

        notes: {
            type: DataTypes.STRING
        },

    });

    return Plots;
}