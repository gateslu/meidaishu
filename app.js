"use strict"

var Koa = require('koa')
var ejs = require('ejs')
var views = require('koa-views')
var staticCache = require('koa-static-cache')
var path = require('path')

var staticDirRoot = __dirname

var app = new Koa()

//模板路径
const viewsPath = path.join(__dirname)
console.log(viewsPath)
var render = views(viewsPath, {
    map: { html: 'ejs' }
})
app.use(render)

//解决ajax中跨域问题
var cors = require('koa-cors')
app.use(cors())

// //静态文件cache
app.use(staticCache(staticDirRoot))
app.use(staticCache(path.join(staticDirRoot, 'lib')))

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