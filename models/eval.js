const Sequelize = require('sequelize');

module.exports = class Eval extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            evalID: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            }
        },{
            sequelize,
            timestamps: false,
            modelName:'Eval',
            tableName: 'eval',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });
    }
    static associate(db){
        db.Eval.belongsTo(db.User, {foreignKey: 'userID', targetKey: 'userID'});
    }
    static associate(db){
        db.Eval.belongsTo(db.Video, {foreignKey: 'videoID', targetKey: 'videoID'});
    }

}