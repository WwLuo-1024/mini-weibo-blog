/**
 * @description 用户关系controller
 * @author Luo Wang
 */

const { getUsersByFollower, addFollwer, deleteFollower } = require('../services/user-relation')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { addFollowerFailInfo, deleteFollowerFailInfo } = require('../model/ErrorInfo')
/** 根据userId获取粉丝列表
 * @param {number} userId 
 */
async function getFans(userId) {
    //service
    const { count, userList } = await getUsersByFollower(userId)
    return new SuccessModel({
        count,
        fansList: userList
    })
}

/**
 * 关注
 * @param {number} myUserId 当前登录的用户id
 * @param {number} curUserId 要被关注的用户 id
 */
async function follow(myUserId, curUserId) {
    //service
    try {
        await addFollwer(myUserId, curUserId)
        return new SuccessModel()
    } catch (err) {
        console.error(err)
        return new ErrorModel(addFollowerFailInfo)
    }
}

async function unFollow(myUserId, curUserId) {
    const result = await deleteFollower(myUserId, curUserId)
    if (result) {
        return new SuccessModel()
    }
    return new ErrorModel(deleteFollowerFailInfo)
}

module.exports = {
    getFans,
    follow,
    unFollow
}