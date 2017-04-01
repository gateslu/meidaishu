"use strict"

var Koa = require('Koa')
var ejs = require('ejs')
var views = require('koa-views')
var staticCache = require('koa-static-cache')

var staticDir = __dirname + '/weui/src'

var app = new Koa()

//模板路径
var render = views(__dirname + '/weui/src/example', {
    map: { html: 'ejs' }
})
console.log(render)
app.use(render)

//解决ajax中跨域问题
var cors = require('koa-cors')
app.use(cors())

//静态文件cache
app.use(staticCache(staticDir));
app.use(staticCache(staticDir + '/example'));

//设置路由
var router = require('koa-router')()
app.use(router.routes())
app.use(router.allowedMethods())

var body = require('koa-better-body')
app.use(body())

var appRouter = require('./router/index')
appRouter(router)

//监听端口
app.listen(8080)
console.log('server listen 8080')