'use strict'

module.exports = function(router) {

    router.get('/', function*() {
        yield this.render('index.html', {});
    })

    router.get('/weui', function*() {
        yield this.render('weui.html', {});
    })

    router.post('/login', function*(next) {

        console.log(JSON.stringify(this.request.body))
        this.body = {
            id: "",
            message: "hello world"
        }

        yield next
    })

}