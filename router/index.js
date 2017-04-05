'use strict'

let router = require('koa-router')();

router.get('/', async ctx => {

    if (!ctx.session.view) {
        ctx.state = {
            session: ctx.session,
            title: 'app'
        };

        await ctx.render('index.html', {})
        return
    }

    await ctx.render("weui.html", {})
})


router.get('/weui', async ctx => {

    if (!ctx.session.view) {
        ctx.state = {
            session: ctx.session,
            title: 'app'
        };

        await ctx.render('index.html', {})
        return
    }

    ctx.state = {
        session: ctx.session,
        title: 'app'
    };

    await ctx.render('weui.html', {});
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