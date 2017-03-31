'use strict'

module.exports = function(router) {

    router.get('/', function *(){
        // this.set('Access-Control-Allow-Origin', 'https://weui.io')
        // this.set('Access-Control-Allow-Origin', '*')
        yield this.render('index.html',{});
    })

    router.get('/weui', function *(){
        // this.set('Access-Control-Allow-Origin', 'https://weui.io')
        // this.set('Access-Control-Allow-Origin', '*')
        yield this.render('weui.html',{});
    })

}