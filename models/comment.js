const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            // commentID: {
            //     type: Sequelize.INTEGER,
            //     autoIncrement: true,
            //     allowNull: false,
            //     primaryKey: true,
            // },
            // userID: {
            //     type: Sequelize.INTEGER,
            //     allowNull: false
            // },
            // videoID: {
            //     type: Sequelize.INTEGER,
            //     allowNull: true
            // },
            comment: {
                type: Sequelize.STRING,
                allowNull: true
            },
            likeComment: {
                type: Boolean,
                allowNull: true
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.NOW
            },
        },{
            sequelize,
            timestamps: false,
            modelName:'Comment',
            tableName: 'comment',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });
    }
    static associate(db){
        db.Comment.belongsTo(db.User, {foreignKey: 'userID', targetKey: 'userID'});
    }

}