// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    common: {
        port: 9090,
        proxyTable: {},
        assetsRoot: path.resolve(__dirname, process.env.NODE_ENV==='test'?'test':'dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: process.env.NODE_ENV==='dev'?'/':'../',
        productionSourceMap: true,
    },
    dev: {//开发环境
        NODE_ENV: '"dev"',
        //apiUrl: '"http://api.huala.com/"',
        apiUrl: '"//192.168.25.246:8080/huala-gly"',// 用户端接口地址
        //apiUrl: '"http://wxtest.huala.com:8081/huala"',// 接口地址
        sysApiUrl:'"//192.168.25.246:8080"',//后台系统接口地址
        imgUrl: '"//wxtest.huala.com/hlman-pic"',// 图片服务
        //imgUrl: 'http://wxtest.huala.com:8081/hlman-pic',  //后台手机端
        wxAppId: '"wx01f2ab6d9e41169a"',// 微信的appid
        aliAppId: '"2016051701410167"'// 支付宝appid
    },
    test: {//测试环境
        NODE_ENV: '"test"',
        apiUrl: '"//wxtest.huala.com/huala"',
        sysApiUrl:'"//apitest.huala.com"',
        imgUrl: '"//wxtest.huala.com/hlman-pic"',
        wxAppId: '"wx01f2ab6d9e41169a"',
        aliAppId: '"2016051701410167"'
    },
    build: {//正式环境
        NODE_ENV: '"prod"',
        apiUrl: '"//wx.huala.com/huala"',
        sysApiUrl:'"//api.huala.com"',
        imgUrl: '"//img.huala.com/hlman-pic"',
        wxAppId: '"wxbdba6ff864889c6b"',
        aliAppId: '"2016051701410167"'
    }
}
