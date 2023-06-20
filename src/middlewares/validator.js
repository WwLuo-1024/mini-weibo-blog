/**
 * @description json schema validator middleware
 * @author Luo Wang
 */

const { ErrorModel } = require("../model/ResModel")
const { jsonSchemaFileInfo } = require('../model/ErrorInfo')

/**
 * generate json schema validation middleware
 * @param {function} validateFn validation function
 * @returns 
 */
function genValidator(validateFn) {
    async function validator(ctx, next) {
        const data = ctx.request.body
        const error = validateFn(data)
        if (error) {
            //验证失败
            ctx.body = new ErrorModel(jsonSchemaFileInfo)
            return
        }
        await next()
    }

    //返回中间件
    return validator
}

module.exports = {
    genValidator
}