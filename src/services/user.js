/**
 * @description user service
 * @author Luo Wang
 */

const { User } = require('../db/model/index')
const { formatUser } = require('./_format')
const { addFollower } = require('./user-relation')
/**
 * 获取用户信息
 * @param {string} userName 
 * @param {string} password 
 */
async function getUserInfo(userName, password) {
    //查询条件
    const whereOpt = {
        userName
    }
    if (password) {
        Object.assign(whereOpt, { password })
    }

    //查询
    const result = await User.findOne({
        attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
        where: whereOpt
    })
    
    if (result == null) {
        //未找到
        return result
    }

    //格式化
    const formatRes = formatUser(result.dataValues)
    
    return formatRes
}

/**
 * 
 * @param {string} userName 
 * @param {string} password 
 * @param {number} gender 
 * @param {string} nickName 
 */
async function createUser({userName, password, gender = 3, nickName}) {
    const result = await User.create({
        userName,
        password,
        nickName: nickName ? nickName : userName,
        gender
    })
    const data = result.dataValues
    //自己关注自己 （为了方便首页获取数据）
    addFollower(data.id, data.id)
    return data
}

/**
 * Delete User
 * @param {string} userName 
 */
async function deleteUser(userName) {
    const result = await User.destroy({
        where: {
            userName
        }
    })
    //result 删除的行数
    return result > 0
}

/**
 * 更新用户信息
 * @param {Object} param0 要修改的内容 { newPassword, newNickName, newPicture, newCity}
 * @param {Object} param1 查询条件 { userName, password}
 */
async function updateUser(
    { newPassword, newNickName, newPicture, newCity},
    { userName, password}
){
    //拼接修改内容
    const updateData = {}
    if (newPassword) {
        updateData.password = newPassword
    }
    if (newNickName) {
        updateData.nickName = newNickName
    }
    if (newPicture) {
        updateData.picture = newPicture
    }
    if (newCity) {
        updateData.city = newCity
    }
    //拼接查询条件
    const whereData = {
        userName
    }
    if (password) {
        whereData.password = password
    }
    //执行修改
    const result = await User.update(updateData, {
        where: whereData
    })

    return result[0] > 0 //result[0]修改行数
}

module.exports = {
    getUserInfo,
    createUser,
    deleteUser,
    updateUser
}