/**
 * @description user controller
 * @author Luo Wang
 */
const { getUserInfo, createUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExistInfo, 
        registerUserNameExistInfo,
        loginFailInfo } = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')
/**
 * 用户名是否存在
 * @param {string} userName 
 */
async function isExist(userName) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        //用户存在
        return new SuccessModel(userInfo)
    } else {
        //用户不存在
        return new ErrorModel(registerUserNameNotExistInfo)
    }
}

/**
 * Register
 * @param {string} userName 
 * @param {string} password
 * @param {number} gender 性别 (1男，2女，3保密)
 */
async function register({userName, password, gender}) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        //用户名已存在
        return new ErrorModel(registerUserNameExistInfo)
    }

    //注册service
    try{
        await createUser({
            userName,
            password: doCrypto(password),
            gender
        })
        return new SuccessModel()
    } catch (err) {
        console.error(err.messgae, err.stack)
        return new ErrorModel(registerFailInfo)
    }
}

/**
 * login
 * @param {Object} ctx koa2 ctx
 * @param {string} userName 
 * @param {string} password 
 */
async function login(ctx, userName, password) {
    //登录成功后 ctx.session.userInfo = xxx(session存入用户信息)
    const userInfo = await getUserInfo(userName, doCrypto(password))
    if (!userInfo) {
        //登陆失败
        return new ErrorModel(loginFailInfo)
    }

    //登陆成功
    if (ctx.session.userInfo == null) {
        ctx.session.userInfo = userInfo
    }

    return new SuccessModel()
}

module.exports = {
    isExist,
    register,
    login
}