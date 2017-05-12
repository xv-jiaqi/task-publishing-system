/**
 * uc分享到朋友圈或发送给朋友
 */
onShare('.shareTimeLine', 'click', {
    title: '任务分发系统',
    url: location.href,
    img: 'https://static.segmentfault.com/v-590a963a/global/img/fool/welcome@2x.png'
});

function onShare(elementNode, event = 'click', config = {}) {
    let nodes = document.querySelectorAll(elementNode);

    const {title, url, desc, img} = config;

    let ua = navigator.userAgent;

    const isUcBrowser = ua.indexOf('UCBrowser') > -1;
    const isIos = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    const isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;

    // 终端类型     ios    android
    // 分享给朋友 kWeixin WechatFriends
    // 分享到朋友圈 kWeixinFriend WechatTimeline
    let arr = {
        friend: ['kWeixin', 'WechatFriends'],
        timeLine: ['kWeixinFriend', 'WechatTimeline']
    };

    if (nodes && nodes.length && isUcBrowser) return false;

    for (let i = 0, len = nodes.length; i < len; i++) {
        addEvent(nodes[i], event, onBind);
    }

    // 封装事件绑定方法
    function addEvent(obj, event, fn) {
        obj.removeEventListener(event, fn);

        obj.addEventListener(event, fn);
    }

    function onBind(type = 'timeLine') {
        if (isIos && typeof ucbrowser !== 'undefined')
            ucbrowser.web_share(title, img, url, arr[type][0], '', '', '');
        else if (isAndroid && typeof ucweb !== 'undefined')
            ucweb.startRequest("shell.page_share", [title, img, url, arr[type][1], '', '', '']);
        else
            alert('请在uc浏览器中打开:)');
    }
}
