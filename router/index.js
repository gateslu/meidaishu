'use strict'

module.exports = function(router) {

    router.get('/', function*() {
        // this.set('Access-Control-Allow-Origin', 'https://weui.io')
        // this.set('Access-Control-Allow-Origin', '*')
        yield this.render('index.html', {});
    })

    router.get('/weui', function*() {
        // this.set('Access-Control-Allow-Origin', 'https://weui.io')
        // this.set('Access-Control-Allow-Origin', '*')
        yield this.render('weui.html', {});
    })

    router.post('/login', function*(next) {
        // this.set('Access-Control-Allow-Origin', 'https://weui.io')
        // this.set('Access-Control-Allow-Origin', '*')
        console.log(this.request.body)
        this.body = {
            id: "",
            message: "hello world"
        }

        yield next
    })

}