const Sequelize = require('sequelize')
const seq = require('./seq')

//创建User模型
const User = seq.define('user', {
    // id -- automatic
    userName: {
        type: Sequelize.STRING, //varchar(255)
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nickName: {
        type: Sequelize.STRING,
        comment: '昵称'
    }
    //cratedAt and updatedAt -- automatic
})

//创建Blog
const Blog = seq.define('blog', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

//Foreign Key
Blog.belongsTo(User, {
    // Blog.userId -> User.id
    foreignKey: 'userId'
})

User.hasMany(Blog, {
    foreignKey: 'userId'
})

module.exports = {
    User,
    Blog
}