/**
 * @description user API router
 * @author Luo Wang
 */

const router = require('koa-router')()
const { isExist, register, login, deleteCurUser } = require('../../controller/user')
const userValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')
const { isTest } = require('../../utils/env')
const { loginCheck } = require('../../middlewares/loginChecks')

router.prefix('/api/user')

//register router
router.post('/register', genValidator(userValidate), async (ctx, next) => {
    const { userName, password, gender } = ctx.request.body
    //controller
    ctx.body = await register({
        userName, 
        password, 
        gender
    })
})

//whether user is exist or not
router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    //controller
    ctx.body = await isExist(userName)
})

//Login
router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body
    //controller
    ctx.body = await login(ctx, userName, password)
})

//Delete
router.post('/delete', loginCheck, async (ctx, next) => {
    if (isTest) {
        //测试环境下，测试登录账号登陆之后删除自己
        const { userName } = ctx.session.userInfo
        //调用controller
        ctx.body = await deleteCurUser(userName)
    }
})

module.exports = router