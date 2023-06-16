/**
 * @description Method of connecting Redis (get set)
 * @author Luo Wang
 */

const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

// //Crate Client (old version redis < 4.0)
// const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

// redisClient.on('error', err => {
//     console.error('redis error', err)
// })

// /**
//  * redis set
//  * @param {string} key 
//  * @param {string} val 
//  * @param {number} timeout //unit: second
//  */
// function set(key, val, timeout = 60 * 60) {
//     if (typeof val === 'object') {
//         val = JSON.stringify(val)
//     }
//     redisClient.set(key, val)
//     redisClient.expire(key, timeout)
// }

// /**
//  * redis get
//  * @param {string} key 
//  */
// function get(key) {
//     const promise = new Promise((resolve, reject) => {
//         redisClient.get(key, (err, val) => {
//             if (err) {
//                 reject(err)
//                 return
//             }
//             if (val == null) {
//                 resolve(null)
//                 return
//             }
//             try {
//                 resolve(
//                     JSON.parse(val)
//                 )
//             } catch(ex) {
//                 resolve(val)
//             }
//         })
//     })
//     return promise
// }

//Create Client
const url = `redis://${REDIS_CONF.host}:${REDIS_CONF.port}`
const redisClient = redis.createClient({
    url: url
})

//Connect Database
!(async function () {
    await redisClient.connect()
        .then(() => console.log('redis connect success!'))
        .catch(console.error)
})()

/**
 * redis set
 * @param {string} key 
 * @param {string} val 
 */
async function set(key, val) {
    let objVal
    if (typeof val === 'object') {
        objVal = JSON.stringify(val)
    } else {
        objVal = val
    }

    await redisClient.set(key, val)
}

/**
 * redis get
 * @param {string} key 
 */
async function get(key) {
    try {
        let val = await redisClient.get(key)

        if (val == null) return null

        try {
            val = JSON.parse(val) //Try to convert to JS objects
        } catch (err) {}

        return val
    } catch (err) {
        throw new Error(err)
    }
}

module.exports = {
    set,
    get
}