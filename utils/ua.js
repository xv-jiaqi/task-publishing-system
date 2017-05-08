/**
 * Created by JQ on 2017/1/13.
 *
 * 终端判断
 */
'use strict';

module.exports = (() => {

    const u = navigator.userAgent;

    let browser = {
        weixin: u.indexOf('MicroMessenger') > -1,                   // 是否微信
        iPhone: u.indexOf('iPhone') > -1,                           // 是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1,                               // 是否iPad
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),            // iOS 终端
        android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,// Android 终端
        trident: u.indexOf('Trident') > -1,                         // IE内核
        presto: u.indexOf('Presto') > -1,                           // Opera内核
        webKit: u.indexOf('AppleWebKit') > -1,                      // Safari、Chrome...
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,// FireFox
        mobile: !!u.match(/AppleWebKit.*Mobile.*/),                 // 是否为移动终端
        webApp: u.indexOf('Safari') === -1,                         // 是否web应该程序，没有头部与底部
        qq: u.match(/\sQQ/i) === " qq"                              // 是否QQ
    };

    for(let i in browser) {
        if(browser[i])  return i;
    }
})();