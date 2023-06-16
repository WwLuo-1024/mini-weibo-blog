/**
 * @description error 404 route
 * @author Luo Wang
 */

const router = require('koa-router')()

//error
router.get('/error', async (ctx, next) => {
    await ctx.render('error')
})

//404
router.get('*', async (ctx, next) => {
    await ctx.render('404')
})

module.exports = router