/**
 * @description 用户关系controller
 * @author Luo Wang
 */

const { getUsersByFollower, 
        addFollower, 
        deleteFollower,
        getFollowersByUser } = require('../services/user-relation')
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
        await addFollower(myUserId, curUserId)
        return new SuccessModel()
    } catch (err) {
        console.error(err)
        return new ErrorModel(addFollowerFailInfo)
    }
}

/**
 * 
 * @param {number} myUserId 
 * @param {number} curUserId 
 * @returns 
 */
async function unFollow(myUserId, curUserId) {
    const result = await deleteFollower(myUserId, curUserId)
    if (result) {
        return new SuccessModel()
    }
    return new ErrorModel(deleteFollowerFailInfo)
}

/**
 * 获取关注人列表
 * @param {number} userId 
 */
async function getFollowers(userId) {
    //service
    const { count, userList } = await getFollowersByUser(userId)
    return new SuccessModel({
        count, 
        followersList: userList
    })
}

module.exports = {
    getFans,
    follow,
    unFollow,
    getFollowers
}