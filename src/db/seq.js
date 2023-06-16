const Sequelize = require('sequelize')
const { MYSQL_CONF }  = require('../conf/db')

const conf = {
    host: MYSQL_CONF.host,
    dialect: 'mysql'
}

// //线上环境，使用连接池
// conf.pool = {
//     max: 5, //连接池最大的连接数量
//     min: 0, //最小
//     idle: 10000 //如果一个连接池(线程)10s之内没有使用则被释放
// }

const seq = new Sequelize(MYSQL_CONF.database, MYSQL_CONF.user, MYSQL_CONF.password, conf)

// //Test Connection
// seq.authenticate().then(() => {
//     console.log('ok')
// }).catch(() => {
//     console.log('err')
// })

module.exports = seq