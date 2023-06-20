/**
 * @description user API router
 * @author Luo Wang
 */

const router = require('koa-router')()
const { isExist } = require('../../controller/user')
router.prefix('/api/user')

//register router
router.post('/register', async (ctx, next) => {

})

//whether user is exist or not
router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    //controller
    ctx.body = await isExist(userName)
})

module.exports = router