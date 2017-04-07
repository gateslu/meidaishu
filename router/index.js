'use strict'
var querystring = require('querystring')
let router = require('koa-router')();

function checkSession(ctx) {

    return true

    if (!ctx.session.view) {
        ctx.state = {
            session: ctx.session,
            title: 'app'
        }

        return false
    }

    return true
}

router.get('/', async ctx => {

    if (!checkSession(ctx)) {
        await ctx.render('index.html', {})
        return
    }

    await ctx.render("index.html", {})
})


router.get('/weui', async ctx => {

    if (!checkSession(ctx)) {
        await ctx.render('index.html', {})
        return
    }

    ctx.state = {
        session: ctx.session,
        title: 'app'
    }

    await ctx.render('weui.html', {});
})

router.get('/main', async ctx => {

    if (!checkSession(ctx)) {
        await ctx.render('index.html', {})
        return
    }

    ctx.state = {
        session: ctx.session,
        title: 'app'
    }

    await ctx.render('main.html', {});
})

router.get('/get_tab', async ctx => {

    if (!checkSession(ctx)) {
        return
    }
    var fullUrl = ctx.originalUrl
    fullUrl = fullUrl.replace("/get_tab?", "")
    var params = querystring.parse(fullUrl)

    ctx.state = {
        session: ctx.session,
        title: 'app'
    }

    // console.log(params)
    if (params.page === "home") {
        await ctx.render('tab_home.html', {});
    } else if (params.page === "shop") {
        await ctx.render('tab_shop.html', {});
    } else if (params.page === "mine") {
        await ctx.render('tab_mine.html', {});
    }

})

router.post('/login', async ctx => {

    let form = await ctx.formParse({ onlyPathReturned: false })
    console.log(form)
    if (form.fields.username !== '123' || form.fields.password !== '123') {
        ctx.body = {
            code: "1",
            url: "",
            message: ""
        }
        return
    }

    ctx.session.clientIp = ctx.request.ip
    ctx.session.user = form.fields.username
    ctx.session.view = "index"

    ctx.body = {
        code: "0",
        url: "/weui",
        message: ""
    }
})

module.exports = router