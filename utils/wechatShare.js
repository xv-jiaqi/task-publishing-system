/**
 * Created by JQ on 2017/1/13.
 *
 * 微信分享
 */
'use strict';

module.exports = (params) => {

    const {title, desc, link, imgUrl, pars} = params;

    if (!link) return;

    // 微信分享参数
    let wxParams = {
        title,                          // 分享标题
        link,                           // 分享链接
        imgUrl,                         // 分享图标
        desc,                           // 分享描述

        // 部分分享需要
        type: pars && pars.type,        // 分享类型,music、video或link，不填默认为link
        dataUrl: pars && pars.dataUrl   // 如果type是music或video，则要提供数据链接，默认为空
    };

    if (window.wx) {
        // 分享到朋友圈
        wx.onMenuShareTimeline({
            title: wxParams.title,
            link: wxParams.link,
            imgUrl: wxParams.imgUrl,
            success: () => {
            },
            cancel: () => {
            }
        });

        // 分享给朋友
        wx.onMenuShareAppMessage({
            title: wxParams.title,
            desc: wxParams.desc,
            link: wxParams.link,
            imgUrl: wxParams.imgUrl,

            type: wxParams.type,        // 分享类型,music、video或link，不填默认为link
            dataUrl: wxParams.dataUrl,  // 如果type是music或video，则要提供数据链接，默认为空
            success: () => {
            },
            cancel: () => {
            }
        });

        // 分享到QQ
        wx.onMenuShareQQ({
            title: wxParams.title,
            desc: wxParams.desc,
            link: wxParams.link,
            imgUrl: wxParams.imgUrl,
            success: () => {
            },
            cancel: () => {
            }
        });

        // 分享到腾讯微博
        wx.onMenuShareWeibo({
            title: wxParams.title,
            desc: wxParams.desc,
            link: wxParams.link,
            imgUrl: wxParams.imgUrl,
            success: () => {
            },
            cancel: () => {
            }
        });

        // 分享到QQ空间
        wx.onMenuShareQZone({
            title: wxParams.title,
            desc: wxParams.desc,
            link: wxParams.link,
            imgUrl: wxParams.imgUrl,
            success: () => {
            },
            cancel: () => {
            }
        });

        // 分享出现错误
        wx.error((res) => console.log(res.errMsg));
    }
};