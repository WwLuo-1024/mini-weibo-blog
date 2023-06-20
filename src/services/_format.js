/**
 * @description data formation
 * @author Luo Wang
 */

const { DEFAULT_PICTURE } = require('../conf/constant')

/**
 * 用户默认头像
 * @param {Object} obj 
 */
function _formatUserPicture(obj) {
    if (obj.picture == null) {
        obj.picture = DEFAULT_PICTURE
    } 
    return obj
}

/**
 * 格式化用户信息
 * @param {Array | Object} list 用户列表或者单个用户对象
 */
function formatUser(list) {
    if(list == null) return list
    if (list instanceof Array) {
        //数组 用户列表（多个用户对象
        return list.map(_formatUserPicture)
    }

    //单个对象
    result = _formatUserPicture(list)
}

module.exports = {
    formatUser
}