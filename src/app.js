const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')

const { REDIS_CONF } = require('./conf/db')
const { isProd } = require('./utils/env')

//routes register
const index = require('./routes/index')
const users = require('./routes/users')
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
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

//session configuration
app.keys = ['UIsdf_7878#$'] //encryption
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

app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()) //404 route need to be used in the bottom

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
