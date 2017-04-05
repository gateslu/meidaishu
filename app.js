"use strict"

var Koa = require('koa')
var ejs = require('ejs')
var views = require('koa-views')
var staticCache = require('koa-static-cache')
var path = require('path')

var staticDir = __dirname + '/weui/src'

var app = new Koa()

//模板路径
console.log(path.join(__dirname, 'weui', 'src', 'example'))
var render = views(path.join(__dirname, 'weui', 'src', 'example'), {
    map: { html: 'ejs' }
})
app.use(render)

//解决ajax中跨域问题
var cors = require('koa-cors')
app.use(cors())

// //静态文件cache
app.use(staticCache(staticDir))
app.use(staticCache(path.join(staticDir, 'style')))
app.use(staticCache(path.join(staticDir, 'lib')))

const Store = require("./store");
const session = require('koa-session2')

app.use(session({
    store: new Store()
}))

var formParser = require('koa-router-form-parser')
app.use(formParser())

//设置路由
var userRouter = require('./router/index')
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

//监听端口
app.listen(9090)
console.log('server listen 9090')