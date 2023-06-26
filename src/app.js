const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const koaStatic = require('koa-static')
const path = require('path')

const { REDIS_CONF } = require('./conf/db')
const { isProd } = require('./utils/env')
const { SESSION_SECRET_KEY } = require('./conf/secretKeys')

//routes register
const blogViewRouter = require('./routes/view/blog')
const userViewRouter = require('./routes/view/user')
const userAPIRouter = require('./routes/api/user')
const utilsAPIRouter = require('./routes/api/utils')
const blogHomeAPIRouter = require('./routes/api/blog-home')
const profileAPIRouter = require('./routes/api/blog-profile')
const squareAPIRouter = require('./routes/api/blog-square')
const errorViewRouter = require('./routes/view/error')

// error handler
let onerrorConf = {}
if (isProd) {
  onerrorConf = {
    redirect: '/error'
  }
}
onerror(app, onerrorConf)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

//session configuration
app.keys = [SESSION_SECRET_KEY] //encryption
app.use(session({
  key: 'weibo.sid', //cookie name (默认koa.sid)
  prefix: 'weibo:sess:', //prefix of redis key (默认为koa:sess:)
  cookie: {
    path: '/', //all routers
    httpOnly: true, //Only allowed to be edited in the server-side
    maxAge: 24 * 60 * 60 * 1000 //ms 一天
  },
  // ttl:  //redis过期时间默认与cookie时间相同
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))
// // logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods())
app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(utilsAPIRouter.routes(), errorViewRouter.allowedMethods())
app.use(blogHomeAPIRouter.routes(), blogHomeAPIRouter.allowedMethods())
app.use(profileAPIRouter.routes(), profileAPIRouter.allowedMethods())
app.use(squareAPIRouter.routes(), squareAPIRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()) //404 route need to be used in the bottom

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
