const Sequelize = require('sequelize')
const { MYSQL_CONF }  = require('../conf/db')
const { isProd, isTest } = require('../utils/env')

const conf = {
    host: MYSQL_CONF.host,
    dialect: 'mysql'
}

// No log output when testing
if (isTest) {
    conf.logging = () => {}
}

// //线上环境，使用连接池
if (isProd) {
    conf.pool = {
        max: 5, //连接池最大的连接数量
        min: 0, //最小
        idle: 10000 //如果一个连接池(线程)10s之内没有使用则被释放
    }
}


const seq = new Sequelize(MYSQL_CONF.database, MYSQL_CONF.user, MYSQL_CONF.password, conf)

// //Test Connection
// seq.authenticate().then(() => {
//     console.log('ok')
// }).catch(() => {
//     console.log('err')
// })

module.exports = seq