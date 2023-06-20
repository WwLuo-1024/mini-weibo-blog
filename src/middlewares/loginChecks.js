/**
 * @description 登录验证的中间键
 * @author Luo Wang
 */

const { ErrorModel } = require("../model/ResModel")
const { loginCheckFailInfo } = require('../model/ErrorInfo')

/**
 * API login validation
 * @param {Object} ctx 
 * @param {function} next 
 */
async function loginCheck(ctx, next) {
    if (ctx.session && ctx.session.userInfo) {
        //已登录
        await next()
        return
    }

    //未登录
    ctx.body = new ErrorModel(loginCheckFailInfo)
}

/**
 * Page Login validation
 * @param {Object} ctx 
 * @param {function} next 
 */
async function loginRedirect(ctx, next) {
    if (ctx.session && ctx.session.userInfo) {
        //已登录
        await next()
        return
    }

    //未登录
    const curUrl = ctx.url //获取当前访问的页面
    ctx.redirect('/login?url='+encodeURIComponent(curUrl)) //在完成登录后自动跳转之前想要访问的页面
}

module.exports = {
    loginCheck,
    loginRedirect
}