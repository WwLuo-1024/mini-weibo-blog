/**
 * @description 微博缓存层
 * @author Luo Wang
 */

const { get, set } = require('./_redis')
const { getBlogListByUser } = require('../services/blog')

//redis key prefix
const KEY_PREFIX = 'weibo:square:'

/**
 * 
 * @param {number} pageIndex 
 * @param {number} pageSize 
 */
async function getSquareCacheList(pageIndex, pageSize) {
    const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`

    //尝试获取缓存
    const cacheResult = await get(key)
    if (cacheResult != null) {
        //获取缓存成功
        return cacheResult
    }

    //没有缓存，则读取数据库
    const result = await getBlogListByUser({ pageIndex, pageSize})
    //设置缓存, 过期时间1 Min
    set(key, result)

    return result
}

module.exports = {
    getSquareCacheList
}