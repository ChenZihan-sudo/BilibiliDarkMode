// ==UserScript==
// @name         BTEST
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  null
// @author       Chen Zihan
// @match        https://*.bilibili.com/*
// @match         http://i0.hdslb.com/bfs/archive/*
// @match         http://i1.hdslb.com/bfs/archive/*
// @match         http://i2.hdslb.com/bfs/archive/*
// ==/UserScript==
(function() {
    let webHost = location.hostname
    let prt = console.log
    if (webHost != "i0.hdslb.com" && webHost != "i1.hdslb.com" && webHost != "i2.hdslb.com") {
        main()
    } else {
        down()
    }

    function main() {


        //位置代码
        let localCode = 0;


        //加载完成时
        window.onload = function() {
                //检查是否需要移入jquery
                prt(document.getElementsByTagName("script").length)
                for (var i = 0; i < document.getElementsByTagName("script").length; i++) {
                    console.log("a")
                    if (document.getElementsByTagName("script")[i].src === "https://static.hdslb.com/js/jquery.min.js") {
                        break;
                    } else if (i == document.getElementsByTagName("script").length - 1) {
                        //移入jquery
                        let jquery = document.createElement("script");
                        jquery.src = "//static.hdslb.com/js/jquery.min.js";
                        jquery.type = "text/javascript";
                        jquery.id = "jquery";
                        (document.querySelector("head") || document.documentElement).appendChild(jquery)
                        break;
                    }
                }
            }
            //启动时样式节点准备--加载样式节点 页面样式 工具样式
        function loadStyle() {
            prt("loadStyle()")

            //页面样式
            let styleNode = document.createElement("style");
            styleNode.id = "modeStyle";
            (document.querySelector("head") || document.documentElement).appendChild(styleNode);

            //工具CSS
            let kitStyle = document.createElement("style");
            document.querySelector("body").appendChild(kitStyle);
            kitStyle.id = "kitStyle"

            //工具HTML
            let kitHtml = document.createElement("div")
            document.querySelector("body").appendChild(kitHtml);
            kitHtml.id = "kitHtml";


        }

        //启动时页面位置检测--并返回位置代码--启动styleContent()
        function checkLocal() {
            prt("checkLocal()")
            let host = location.hostname //页面名
            let path = location.pathname //路径名
                //页面路径path查找
            function pSearch(value) {
                if (location.pathname.search(value) == 0) {
                    return true;
                }
            }
            //筛选并赋值
            if (path == "/") {
                prt("首页")
                localCode = 1;
            } else if (pSearch("/v/channel") == true) {
                prt("订阅及频道")
                localCode = 2;
            } else if (host == "t.bilibili.com" && path == "/") {
                prt("动态")
                localCode = 3;
            } else if (host == "t.bilibili.com" && pSearch("tab=2") == true) {
                prt("动态详细内容页面")
                localCode = 4;
            } else if (pSearch("/bangumi/play/") == true) {
                prt("番剧播放页面")
                localCode = 5;
            } else if (pSearch("/video/") == true) {
                prt("普通视频播放页")
                localCode = 6;
            } else if (pSearch("/v/popular/") == true) {
                prt("热门")
                localCode = 7;
            } else if (pSearch("/watchlater/") == true) {
                prt("稍后再看")
                localCode = 8;
            } else if (host == "live.bilibili.com" && path == "/") {
                prt("直播首页")
                localCode = 9;
            } else if (path == "/read/home") {
                prt("专栏首页")
                localCode = 10;
            } else if (pSearch("/read/cv") == true) {
                prt("专栏文章详细内容")
                localCode = 11;
            } else if (host == "space.bilibili.com") {
                prt("个人空间")
                localCode = 12;
            } else if (host == "account.bilibili.com") {
                prt("个人中心")
                localCode = 13;
            } else if (host == "t.bilibili.com" && pSearch("/topic/") == true) {
                prt("话题")
                localCode = 14;
            } else if (path == "/cheese/") {
                prt("课堂首页")
                localCode = 15;
            } else if (pSearch("/cheese/play/")) {
                prt("课堂视频页面")
                localCode = 16;
            } else if (path == "/anime/" || path == "/guochuang/" || pSearch("/v/") == true) {
                prt("频道")
                localCode = 17;
            } else if (pSearch("/blackboard/topic_list.html") == true) {
                prt("专题列表")
                localCode = 18;
            } else if (host == "message.bilibili.com" && path == "/") {
                prt("消息中心")
                localCode = 19;
            }

            if (localCode != 0) {
                styleContent()
            }
        }
        //根据返回的位置代码进行深色模式样式拼合--保存至finalStyle
        function styleContent() {
            prt("styleContent()")
            let finalStyle;
            //页面导航栏
            let mainNav = `.international-header .mini-type,.van-popover .mini-type{background:rgba(84,87,88,.36)!important;box-shadow:0 4px 4px 0 rgb(0 0 0/15%)!important}.mini-type .nav-user-center .user-con .item .name{color:#e1e1e1!important}.box{background:#222}.brief span{color:#e2e2e2}.all a{color:#ccc}.all a:hover{color:#00a1d6}.all a:hover,.brief a:hover{background-color:#403b3b}.live-box[data-v-5e2bd0c0]{background:#222;border-radius:20px}.room-list .list-item .uname[data-v-5e2bd0c0]{color:#e2e2e2}.act-list .list-item[data-v-5e2bd0c0]:hover{background:#403b3b}.app-layout[data-v-0b4aa428]{background-color:#222}.recommendation-list .list-item .item-title[data-v-7149acfe]{color:#e2e2e2}.popularity-list .item-list .list-item[data-v-499a5b95],.popularity-list .list-title[data-v-499a5b95]{color:#eee}.popularity-list .item-list .list-item[data-v-499a5b95]:hover,.recommendation-list .list-item[data-v-7149acfe]:before{background-color:#403b3b}.van-popper[x-placement^=bottom] .popper__arrow,.van-popper[x-placement^=bottom] .popper__arrow:after{border-bottom-color:#222!important}.van-popper-avatar .vip[data-v-5314bca5]{color:#222!important}.international-header a,.van-popover a,.van-popper-avatar .level-info .grade[data-v-5314bca5],.van-popper-avatar .level-info .progress[data-v-5314bca5]{color:#e1e1e1!important}.van-popper-avatar .coins .contact .contact-tips[data-v-5314bca5]{border:0!important;background-color:#141414!important;color:#e1e1e1!important;border-radius:10px!important}.van-popper-avatar .coins .contact .email-tips[data-v-5314bca5]:after,.van-popper-avatar .coins .contact .phone-tips[data-v-5314bca5]:after{background:#222!important}.van-popper-avatar .count-item .item-key[data-v-5314bca5],.van-popper-avatar .count-item .item-value[data-v-5314bca5],.van-popper-avatar .links .link-title[data-v-5314bca5]{color:#e1e1e1!important}.van-popper-avatar .link-icon[data-v-5314bca5]{color:#939393!important}.lang-change .lang-title{color:#e1e1e1!important}.lang-change .lang-icon,.lang-change .lang-icon-more{color:#939393!important}.van-popper-avatar .logout span[data-v-5314bca5]{color:#e1e1e1!important}.van-popper-avatar .links .link-item[data-v-5314bca5]:hover{background:#3b3e40!important}.lang-change .lang-intro{background:#222!important;color:#e1e1e1!important}.van-popper-avatar .logout span[data-v-5314bca5]:hover{color:#e1e1e1!important;background:#3b3e40!important}.van-popper-avatar .vp-container[data-v-5314bca5]{background:#222!important;border-radius:10px!important;box-shadow:0 3px 6px 0 rgb(0 0 0/75%)!important}.lang-change .lang-intro-item:hover,.lang-change .lang-item:hover{background:#3b3e40!important}.van-popper-avatar .level-intro[data-v-5314bca5]{background:#222!important;color:#e1e1e1!important;box-shadow:0 3px 6px 0 rgb(0 0 0/75%)!important;border-radius:10px!important}.van-popover.van-popper.van-popper-avatar{border-radius:12px!important}.international-header a:hover,.van-popover a:hover{color:#00a1d6!important}.van-popper-avatar .count-item:hover .item-key[data-v-5314bca5],.van-popper-avatar .count-item:hover .item-value[data-v-5314bca5]{color:#00a1d6!important;transition:color .3s}.van-popover{background:#222!important;border-radius:15px!important;color:#e1e1e1!important}.follow-dialog-wrap .follow-dialog-window{background:#222!important;border-radius:15px!important;box-shadow:0 3px 6px rgb(0 0 0/50%)!important}.vip-m .bubble-traditional .recommand .bubble-col .item .recommand-link,.vip-m .bubble-traditional .recommand .title{color:hsla(0,0%,100%,.94)!important}.im-list-box{color:rgba(229,233,239,.95)!important;background:#222!important;box-shadow:0 3px 6px 0 rgba(0,0,0,.2)}.i-frame iframe[data-v-01c9e08c]{background:hsla(0,0%,100%,0)!important;border-bottom-left-radius:15px!important;border-bottom-right-radius:15px!important;-webkit-box-shadow:0 3px 6px 0 #000!important;box-shadow:0 3px 6px 0 #000!important}.i-frame[data-v-01c9e08c]:before{background-color:#222!important;-webkit-box-shadow:0 1px 0 #222!important;box-shadow:0 1px 0 #222!important}.im-list:hover{color:#e1e1e1!important;background-color:#3b3e40!important}.i-frame[data-v-400d5653]:before{background-color:#222!important}.out-container[data-v-e99755ec]{background-color:#222;box-shadow:1px 6px 6px 0 rgb(0 0 0/50%);border-radius:15px}.content[data-v-2cacd430]{color:#e1e1e1}.list-item[data-v-2cacd430]:hover{background-color:#3b3e40}.more-btn[data-v-0de37f37]:hover{background-color:#505050}.more-btn[data-v-0de37f37]{border-radius:15px;color:#e1e1e1;background-color:#3b3b3b}.split-line .history-tip[data-v-213951fc],.split-line .history-tip[data-v-77141e7e]{background:#222;color:#e1e1e1}.name-line[data-v-2cacd430]{font-size:3.14136vw;color:#e7e7e7}.van-popper-favorite .tab-item .title[data-v-64b63b5f]{color:hsla(0,0%,100%,.94)!important}.header-video-card[data-v-37582e0a]:hover{background-color:hsla(0,0%,95.7%,.2)!important}.van-popper-favorite .tab-item--normal[data-v-e8d85714]{color:#e1e1e1!important}.van-popper-favorite .tab-item--normal[data-v-e8d85714]:hover{background-color:hsla(0,0%,95.7%,.2)!important}.header-video-card .video-info .line-2[data-v-37582e0a]{color:#e1e1e1!important}.van-popper-favorite .play-all[data-v-e8d85714]{background-color:transparent!important}.van-popper-favorite .play-all.view[data-v-e8d85714]{border-right:1px solid hsla(0,0%,90.6%,.5)!important}.van-popper-favorite .play-all[data-v-e8d85714]:hover{background-color:hsla(0,0%,95.7%,.2)!important}.header-video-card .video-info .desc[data-v-37582e0a],.header-video-card .video-info .line-1[data-v-37582e0a]{color:#e7e7e7!important}.bilifont[data-v-0fdc0c18]{color:#e1e1e1!important}.channel-menu-mini{border-radius:15px!important;background:#222!important;box-shadow:1px 3px 5px rgb(0 0 0/50%)!important}.channel-menu-mini .box a:hover{color:#e1e1e1!important;background:hsla(0,0%,95.7%,.1)!important}.popover-app-download{padding:0!important;background:url(//s1.hdslb.com/bfs/seed/jinkela/header-v2/images/app-download.png)!important;background-size:cover!important;background-position-y:-3px!important;opacity:.9}.bili-header-m .nav-search #nav_searchform,.international-header .nav-search #nav_searchform{border-radius:20px;background-color:#505050}.bili-header-m .nav-search .nav-search-keyword,.international-header .nav-search .nav-search-keyword{color:hsla(0,0%,100%,.8)!important}.bili-header-m .nav-search .nav-search-btn,.international-header .nav-search .nav-search-btn{border-top-right-radius:20px;border-bottom-right-radius:20px;background:#737373}.bili-header-m .nav-search .nav-search-submit,.international-header .nav-search .nav-search-submit{color:#c3c3c3}input::placeholder{color:#ababab}.bilibili-search-history .history-item a,.bilibili-search-suggest .suggest-item a{color:#e1e1e1}.bilibili-search-history,.bilibili-search-suggest{border:0;background:#222;border-radius:10px;box-shadow:0 2px 4px rgb(0 0 0/45%)}.bilibili-search-history .history-item.focus,.bilibili-search-history .history-item:hover,.bilibili-search-suggest .suggest-item.focus,.bilibili-search-suggest .suggest-item:hover{background-color:rgba(112,114,125,.13)}.bilibili-search-history .history-item a:hover,.bilibili-search-suggest .suggest-item a:hover{color:#e1e1e1}`

            //页面底部
            let footer = `.international-footer{background-color:#171617}.international-footer .link-box .link-item.link-c p,.international-footer a{color:#c1c1c1}.international-footer .link-box .link-item{border-right:1px solid #c1c1c1}.international-footer .link-box .link-item.link-c a.weixin:hover p{color:#00a1d6}.qrcode{opacity:.9}`;

            //频道导航栏
            let channelNav = `.international-header a{color:#e7e7e7}.page-tab .con li{border:0}.page-tab .con li .bilifont{color:#3e3e3e}a{color:#e1e1e1}.storey-title .no-link{color:#e7e7e7}.van-popper[x-placement^=top] .popper__arrow:after{bottom:0;border-top-color:#222}.van-popper-channel{border:0;box-shadow:0 2px 12px 0 rgb(0 0 0/50%)}.van-popper[x-placement^=bottom] .popper__arrow,.van-popper[x-placement^=bottom] .popper__arrow:after{border-bottom-color:#222!important}.van-popover{border-radius:15px!important;background:#222!important}.international-header a,.van-popover,.van-popover a{color:#e1e1e1!important}.international-header a:hover,.van-popover a:hover{color:#00a1d6!important}`

            //动态页面样式
            let dynamicPageStyle = `.fixed-bg[data-v-9197f874]{background:#161819}.card[data-v-b5713636],.home-page .home-container .home-content .center-panel .section-block[data-v-9197f874],.live-panel[data-v-621fee91],.most-viewed-panel[data-v-7d62e686],.new-topic-panel[data-v-367b7f8d],.notice-panel[data-v-5458153c],.tab-bar[data-v-58304b2a],.user-panel[data-v-7c810412]{background:#222;border-radius:10px;box-shadow:0 4px 6px 0 rgb(0 0 0/50%)}.user-panel .content .bottom .number-part .numbers[data-v-7c810412]{color:#e1e1e1}.tc-black{color:#e7e7e7}.live-panel-item .live-detail .up-name[data-v-139ef948]{color:#e1e1e1}.live-panel-item .live-detail .live-name[data-v-139ef948]{color:#bcbcbc}.most-viewed-panel .list-content .most-viewed-item .name[data-v-7d62e686]{color:#e1e1e1}.publish-panel[data-v-4531f45f]{background-color:#222}.indicator[data-v-d0fcfa2c]{color:#8e8e8e}.core-style[data-v-655ff91e]{color:#e1e1e1;background-color:#222}.bili-at-popup,.create-vote[data-v-4b97839a],.hash-popup[data-v-9f192432],.static-popup[data-v-268b12ee]{border:0;border-radius:10px;background-color:#2b2b2b;-webkit-box-shadow:0 3px 5px 0 rgb(0 0 0/30%);box-shadow:0 3px 5px 0 rgb(0 0 0/30%)}.title[data-v-268b12ee]{color:#e1e1e1}.static-popup.bp-arrow[data-v-268b12ee]:before{background:#222}.bili-at-popup__group-name,.bili-at-popup__hint{color:#e1e1e1}.bili-at-popup__user--selected{background-color:#3b3e40}.bili-at-popup__user-name{color:#e1e1e1}.bg-white{background-color:#2b2b2b}.hash-popup .topic-container .item.is-selected[data-v-9f192432]{color:#e1e1e1;background-color:#3b3e40}.bp-button[data-v-b26b5ce0],.bp-radio[data-v-55c64c29],.title[data-v-47d56164]{color:#e1e1e1}.bp-input .indicator[data-v-793bb182]{color:#e1e1e1;background-color:#2b2b2b}.selector[data-v-6aaa05f4]{color:#bcbcbc}.bp-input .input[data-v-793bb182],.bp-input .textarea[data-v-793bb182]{color:#e1e1e1}.core-style[data-v-655ff91e]:active,.core-style[data-v-655ff91e]:focus,.core-style[data-v-655ff91e]:hover{background:#222}.bp-vote-container button,.bp-vote-container input,.bp-vote-container input:focus,.bp-vote-container select,.bp-vote-container textarea,.bp-vote-container textarea:focus{background-color:transparent}.schedule-bar[data-v-af5aaec4]{background-color:#2b2b2b;border-radius:10px;margin-top:12px}.schedule-bar .dp-label[data-v-af5aaec4]{color:#bcbcbc}.static-popup[data-v-00b4b4ea]{border:0;border-radius:10px;background-color:#2b2b2b;-webkit-box-shadow:0 3px 5px 0 rgb(0 0 0/30%);box-shadow:0 3px 5px 0 rgb(0 0 0/30%)}.title[data-v-00b4b4ea]{padding:15px;font-size:14px;color:#e1e1e1;text-align:left}.emoji[data-v-60ae9c4d]{background-color:transparent}.emoji[data-v-60ae9c4d]:hover{background-color:#403b3b}.dp-i-block[data-v-60ae9c4d]{display:inline-block;color:#e1e1e1}.pagination[data-v-97c4281e]{position:relative;width:100%;border-bottom-left-radius:8px;border-bottom-right-radius:8px;background-color:#222}.emoji-cover.selected[data-v-97c4281e]{background-color:#403b3b}.page-controller .next[data-v-97c4281e]:hover,.page-controller .prev[data-v-97c4281e]:hover{background-color:#403b3b;color:#e1e1e1}.page-controller .next[data-v-97c4281e],.page-controller .prev[data-v-97c4281e]{color:#e1e1e1}.page-controller .next.disabled[data-v-97c4281e],.page-controller .prev.disabled[data-v-97c4281e]{color:#8e8e8e!important}.tc-slate{color:#e1e1e1}.new-notice-bar[data-v-fcbb045e]{opacity:.75;border-radius:10px}.card .main-content .user-name a[data-v-b5713636],.content-full[data-v-b3414e94]{color:#e1e1e1}.article-container[data-v-3d352df6],.bangumi-container[data-v-6d8fee64],.card-content .deleted[data-v-71b3c902],.card-content .not-support[data-v-71b3c902],.card-content .repost[data-v-71b3c902],.live-container[data-v-23b19018],.music-container[data-v-7d9db8c7],.video-container[data-v-0514ecc0],.video-container[data-v-4a97ece4]{background:#2b2b2b;border:0;box-shadow:0 2px 8px rgba(0,0,0,.19);border-radius:10px}.video-container .text-area .title[data-v-0514ecc0]{color:#e1e1e1}.video-container .text-area .content[data-v-0514ecc0]{color:#8e8e8e}.card-content .deleted[data-v-71b3c902],.card-content .not-support[data-v-71b3c902],.card-content .repost[data-v-71b3c902]{background-color:rgba(6,6,6,.19)}.content-ellipsis[data-v-b3414e94]{background-color:transparent;color:#e1e1e1}.like-users-panel[data-v-9f189eb0],.users-box .like-users-list[data-v-9f189eb0],.users-box .like-users-list[data-v-9f189eb0]:active,.users-box .like-users-list[data-v-9f189eb0]:link,.users-box .like-users-list[data-v-9f189eb0]:visited{color:#babec0}.shop-panel .shop-list[data-v-130673ff]{width:100%;background-color:#2b2b2b;border-radius:10px}.shop-panel .panel-desc[data-v-130673ff]{color:#bcbcbc}.shop-desc .desc-box .title[data-v-2277fe03]{color:#e1e1e1}.shop-desc .btn-box .jump-btn[data-v-2277fe03]{opacity:.9}.shop-panel .shop-list.is-repost[data-v-130673ff]{background-color:#2b2b2b}.imagesbox .boost-control[data-v-690d023e]{background:#2b2b2b}.imagesbox .boost-control li[data-v-690d023e]{color:#8e8e8e}.article-container .text-area .title[data-v-3d352df6]{color:#e1e1e1}.article-container .text-area .content[data-v-3d352df6]{color:#bcbcbc}.article-container .images-area img[data-v-3d352df6]:first-child{opacity:.9}.article-container:hover .text-area[data-v-3d352df6]{-webkit-box-shadow:0 3px 10px 0 rgb(0 0 0/50%);box-shadow:0 3px 10px 0 rgb(0 0 0/50%)}.bangumi-container .text-area .title[data-v-6d8fee64]{color:#e1e1e1;margin-top:9px}.video-container .text-area .title[data-v-4a97ece4]{color:#e1e1e1}.card .main-content .time .detail-link[data-v-b5713636],.video-container .text-area .content[data-v-4a97ece4]{color:#8e8e8e}.card .more-panel[data-v-b5713636]{background:#2b2b2b;border:0;-webkit-box-shadow:0 11px 12px 0 rgb(0 0 0/20%);box-shadow:0 11px 12px 0 rgb(0 0 0/20%);border-radius:10px;color:#e1e1e1}.card .more-panel[data-v-b5713636]:after{border-top:1px solid #2b2b2b;border-left:1px solid #2b2b2b;background:#2b2b2b}.new-topic-panel .tag-item .content[data-v-367b7f8d]{color:#e1e1e1}.new-topic-panel .tag-item .label[data-v-367b7f8d]{background:#3b3b3b;color:#ccc}.loading-img{display:none}.dynamic-link-hover-bg:hover{background-color:#3b3e40}.international-header .mini-type,.van-popover .mini-type{background:rgba(84,87,88,.36)!important;box-shadow:0 4px 4px 0 rgb(0 0 0/60%)!important}.mini-type .nav-user-center .user-con .item .name{color:#e1e1e1!important}.box{background:#222}.brief span{color:#e2e2e2}.all a{color:#ccc}.all a:hover{color:#00a1d6}.all a:hover,.brief a:hover{background-color:#403b3b}.live-box[data-v-5e2bd0c0]{background:#222;border-radius:20px}.room-list .list-item .uname[data-v-5e2bd0c0]{color:#e2e2e2}.act-list .list-item[data-v-5e2bd0c0]:hover{background:#403b3b}.app-layout[data-v-0b4aa428]{background-color:#222}.recommendation-list .list-item .item-title[data-v-7149acfe]{color:#e2e2e2}.popularity-list .item-list .list-item[data-v-499a5b95],.popularity-list .list-title[data-v-499a5b95]{color:#eee}.popularity-list .item-list .list-item[data-v-499a5b95]:hover,.recommendation-list .list-item[data-v-7149acfe]:before{background-color:#403b3b}.van-popper[x-placement^=bottom] .popper__arrow,.van-popper[x-placement^=bottom] .popper__arrow:after{border-bottom-color:#222!important}.van-popper-avatar .vip[data-v-5314bca5]{color:#222!important}.international-header a,.van-popover a,.van-popper-avatar .level-info .grade[data-v-5314bca5],.van-popper-avatar .level-info .progress[data-v-5314bca5]{color:#e1e1e1!important}.van-popper-avatar .coins .contact .contact-tips[data-v-5314bca5]{border:0!important;background-color:#141414!important;color:#e1e1e1!important;border-radius:10px!important}.van-popper-avatar .coins .contact .email-tips[data-v-5314bca5]:after,.van-popper-avatar .coins .contact .phone-tips[data-v-5314bca5]:after{background:#222!important}.van-popper-avatar .count-item .item-key[data-v-5314bca5],.van-popper-avatar .count-item .item-value[data-v-5314bca5],.van-popper-avatar .links .link-title[data-v-5314bca5]{color:#e1e1e1!important}.van-popper-avatar .link-icon[data-v-5314bca5]{color:#939393!important}.lang-change .lang-title{color:#e1e1e1!important}.lang-change .lang-icon,.lang-change .lang-icon-more{color:#939393!important}.van-popper-avatar .logout span[data-v-5314bca5]{color:#e1e1e1!important}.van-popper-avatar .links .link-item[data-v-5314bca5]:hover{background:#3b3e40!important}.lang-change .lang-intro{background:#222!important;color:#e1e1e1!important}.van-popper-avatar .logout span[data-v-5314bca5]:hover{color:#e1e1e1!important;background:#3b3e40!important}.van-popper-avatar .vp-container[data-v-5314bca5]{background:#222!important;border-radius:10px!important;box-shadow:0 3px 6px 0 rgb(0 0 0/75%)!important}.lang-change .lang-intro-item:hover,.lang-change .lang-item:hover{background:#3b3e40!important}.van-popper-avatar .level-intro[data-v-5314bca5]{background:#222!important;color:#e1e1e1!important;box-shadow:0 3px 6px 0 rgb(0 0 0/75%)!important;border-radius:10px!important}.van-popover.van-popper.van-popper-avatar{border-radius:12px!important}.international-header a:hover,.van-popover a:hover{color:#00a1d6!important}.van-popper-avatar .count-item:hover .item-key[data-v-5314bca5],.van-popper-avatar .count-item:hover .item-value[data-v-5314bca5]{color:#00a1d6!important;transition:color .3s}.van-popover{background:#222!important;border-radius:15px!important;color:#e1e1e1!important}.follow-dialog-wrap .follow-dialog-window{background:#222!important;border-radius:15px!important;box-shadow:0 3px 6px rgb(0 0 0/50%)!important}.vip-m .bubble-traditional .recommand .bubble-col .item .recommand-link,.vip-m .bubble-traditional .recommand .title{color:hsla(0,0%,100%,.94)!important}.im-list-box{color:rgba(229,233,239,.95)!important;background:#222!important;box-shadow:0 3px 6px 0 rgba(0,0,0,.2)}.i-frame iframe[data-v-01c9e08c]{background:hsla(0,0%,100%,0)!important;border-bottom-left-radius:15px!important;border-bottom-right-radius:15px!important;-webkit-box-shadow:0 3px 6px 0 #000!important;box-shadow:0 3px 6px 0 #000!important}.i-frame[data-v-01c9e08c]:before{background-color:#222!important;-webkit-box-shadow:0 1px 0 #222!important;box-shadow:0 1px 0 #222!important}.im-list:hover{color:#e1e1e1!important;background-color:#3b3e40!important}.i-frame[data-v-400d5653]:before{background-color:#222!important}.out-container[data-v-e99755ec]{background-color:#222;box-shadow:1px 6px 6px 0 rgb(0 0 0/50%);border-radius:15px}.content[data-v-2cacd430]{color:#e1e1e1}.list-item[data-v-2cacd430]:hover{background-color:#3b3e40}.more-btn[data-v-0de37f37]:hover{background-color:#505050}.more-btn[data-v-0de37f37]{border-radius:15px;color:#e1e1e1;background-color:#3b3b3b}.split-line .history-tip[data-v-213951fc],.split-line .history-tip[data-v-77141e7e]{background:#222;color:#e1e1e1}.name-line[data-v-2cacd430]{font-size:3.14136vw;color:#e7e7e7}.van-popper-favorite .tab-item .title[data-v-64b63b5f]{color:hsla(0,0%,100%,.94)!important}.header-video-card[data-v-37582e0a]:hover{background-color:hsla(0,0%,95.7%,.2)!important}.van-popper-favorite .tab-item--normal[data-v-e8d85714]{color:#e1e1e1!important}.van-popper-favorite .tab-item--normal[data-v-e8d85714]:hover{background-color:hsla(0,0%,95.7%,.2)!important}.header-video-card .video-info .line-2[data-v-37582e0a]{color:#e1e1e1!important}.van-popper-favorite .play-all[data-v-e8d85714]{background-color:transparent!important}.van-popper-favorite .play-all.view[data-v-e8d85714]{border-right:1px solid hsla(0,0%,90.6%,.5)!important}.van-popper-favorite .play-all[data-v-e8d85714]:hover{background-color:hsla(0,0%,95.7%,.2)!important}.header-video-card .video-info .desc[data-v-37582e0a],.header-video-card .video-info .line-1[data-v-37582e0a]{color:#e7e7e7!important}.bilifont[data-v-0fdc0c18]{color:#e1e1e1!important}.userinfo-content[data-v-5d2b75e8]{background:#222;color:#6d757a;border-radius:10px}.userinfo-wrapper[data-v-5e6ddf5c]{-webkit-box-shadow:0 2px 4px rgb(0 0 0/50%);box-shadow:0 2px 4px rgb(0 0 0/50%);border:0;border-radius:10px}.userinfo-content .info p[data-v-5d2b75e8]{color:#8e8e8e}.userinfo-content .bg[data-v-5d2b75e8]{border-top-left-radius:10px;border-top-right-radius:10px}.user-card .btn-box .like{color:#fff;background-color:#00a1d6;border-radius:15px}.user-card .btn-box .message,.userinfo-content .btn-box>a[data-v-5d2b75e8]{background-color:#505050;border-radius:15px}.user-card .btn-box a,.userinfo-content .btn-box>a[data-v-5d2b75e8]{border:0;color:hsla(0,0%,100%,.7);background-color:#676767}.userinfo-content .btn-box>a[data-v-5d2b75e8]:hover{color:hsla(0,0%,100%,.7)}.user-card .btn-box a:hover,.userinfo-content .btn-box>a.liked[data-v-5d2b75e8]:hover{color:hsla(0,0%,100%,.7);background-color:#676767}.user-card .btn-box a,.userinfo-content .btn-box>a.liked[data-v-5d2b75e8],.userinfo-content .btn-box>a[data-v-5d2b75e8]{background-color:#3b3b3b;color:hsla(0,0%,100%,.7)}.userinfo-content .btn-box>a.liked[data-v-5d2b75e8]:hover,.userinfo-content .btn-box>a[data-v-5d2b75e8]:hover{background-color:#505050;color:hsla(0,0%,100%,.7)}.userinfo-content .info .user .name[data-v-5d2b75e8]{color:#e1e1e1}.userinfo-content .info .sign[data-v-5d2b75e8]{color:#bcbcbc}`

            //根据位置信息赋值
            if (localCode == 1) {
                mainStyle = `.international-header a{color:#e7e7e7}.page-tab .con li{border:0}.page-tab .con li .bilifont{color:#3e3e3e}a{color:#e1e1e1}.storey-title .no-link{color:#e7e7e7}.storey-title .text-info a{color:#8e8e8e}.live-card .up .txt .desc,.live-rank .live-rank-item .txt p.p2,.storey-title .text-info{color:#bcbcbc}.rank-header .name{color:#e7e7e7}.manga-rank-item .rank-number,.pgc-rank-wrap .number,.rank-wrap .number{border-radius:10px;background:#999;color:#fff}.manga-panel .app-download-link,.tab-switch .tab-switch-item{color:#e7e7e7}.manga-panel .manga-list-box .manga-card .manga-title{color:#e1e1e1}.pgc-no-data{opacity:.5}.time-line .tl-link{border:0;border-radius:20px;background:#3b3b3b;color:hsla(0,0%,100%,.68)}.contact-help{border:0 solid #e7e7e7;background:#3b3b3b;box-shadow:0 6px 10px 0 #212121;color:#ccc}.international-footer{background-color:#171617}.international-footer .link-box .link-item.link-c p,.international-footer a{color:#c1c1c1}.international-footer .link-box .link-item{border-right:1px solid #c1c1c1}.international-footer .link-box .link-item.link-c a.weixin:hover p{color:#00a1d6}.qrcode{opacity:.9}.elevator .list-box{background:#222}.elevator .list-box .item{background:#222;color:hsla(0,0%,100%,.94)}.elevator .list-box .item.on,.elevator .list-box .item:hover{color:hsla(0,0%,100%,.94)}.exchange-btn .btn,.rank-header .more,.rcmd-box-wrap .change-btn{color:#ccc}.exchange-btn .btn:hover,.rank-header .more:hover,.rcmd-box-wrap .change-btn:hover{background-color:#282b2d!important}.bili-header-m .nav-search #nav_searchform,.international-header .nav-search #nav_searchform{border-radius:20px;background-color:#505050}.bili-header-m .nav-search .nav-search-keyword,.international-header .nav-search .nav-search-keyword{color:hsla(0,0%,100%,.8)!important}.bili-header-m .nav-search .nav-search-btn,.international-header .nav-search .nav-search-btn{border-top-right-radius:20px;border-bottom-right-radius:20px;background:#737373}.bili-header-m .nav-search .nav-search-submit,.international-header .nav-search .nav-search-submit{color:#c3c3c3}input::placeholder{color:#ababab}.bilibili-search-history .history-item a,.bilibili-search-suggest .suggest-item a{color:#e1e1e1}.bilibili-search-history,.bilibili-search-suggest{border:0;border-radius:10px;background:#222;box-shadow:0 2px 4px rgb(0 0 0/45%)}.bilibili-search-history .history-item.focus,.bilibili-search-history .history-item:hover,.bilibili-search-suggest .suggest-item.focus,.bilibili-search-suggest .suggest-item:hover{background-color:rgba(112,114,125,.13)}.bilibili-search-history .history-item a:hover,.bilibili-search-suggest .suggest-item a:hover{color:#e1e1e1}.bypb-window .online{border:0;border-radius:20px;background:#3b3b3b}.bypb-window .online a{font-size:13px}.box{background:#222}.brief span{color:#e2e2e2}.all a{color:#ccc}.all a:hover{color:#00a1d6}.all a:hover,.brief a:hover{background-color:#403b3b}.live-box[data-v-5e2bd0c0]{border-radius:20px;background:#222}.room-list .list-item .uname[data-v-5e2bd0c0]{color:#e2e2e2}.act-list .list-item[data-v-5e2bd0c0]:hover{background:#403b3b}.app-layout[data-v-0b4aa428]{background-color:#222}.recommendation-list .list-item .item-title[data-v-7149acfe]{color:#e2e2e2}.popularity-list .item-list .list-item[data-v-499a5b95],.popularity-list .list-title[data-v-499a5b95]{color:#eee}.popularity-list .item-list .list-item[data-v-499a5b95]:hover,.recommendation-list .list-item[data-v-7149acfe]:before{background-color:#403b3b}.van-popper[x-placement^=bottom] .popper__arrow,.van-popper[x-placement^=bottom] .popper__arrow:after{border-bottom-color:#222!important}.special-recommend header{color:#e1e1e1}.van-popper-avatar .vip[data-v-5314bca5]{color:#222!important}.international-header a,.van-popover a,.van-popper-avatar .level-info .grade[data-v-5314bca5],.van-popper-avatar .level-info .progress[data-v-5314bca5]{color:#e1e1e1!important}.van-popper-avatar .coins .contact .contact-tips[data-v-5314bca5]{border:0!important;border-radius:10px!important;background-color:#141414!important;color:#e1e1e1!important}.van-popper-avatar .coins .contact .email-tips[data-v-5314bca5]:after,.van-popper-avatar .coins .contact .phone-tips[data-v-5314bca5]:after{background:#222!important}.van-popper-avatar .count-item .item-key[data-v-5314bca5],.van-popper-avatar .count-item .item-value[data-v-5314bca5],.van-popper-avatar .links .link-title[data-v-5314bca5]{color:#e1e1e1!important}.van-popper-avatar .link-icon[data-v-5314bca5]{color:#939393!important}.lang-change .lang-title{color:#e1e1e1!important}.lang-change .lang-icon,.lang-change .lang-icon-more{color:#939393!important}.van-popper-avatar .logout span[data-v-5314bca5]{color:#e1e1e1!important}.van-popper-avatar .links .link-item[data-v-5314bca5]:hover{background:#3b3e40!important}.lang-change .lang-intro{background:#222!important;color:#e1e1e1!important}.van-popper-avatar .logout span[data-v-5314bca5]:hover{background:#3b3e40!important;color:#e1e1e1!important}.van-popper-avatar .vp-container[data-v-5314bca5]{border-radius:10px!important;background:#222!important;box-shadow:0 3px 6px 0 rgb(0 0 0/75%)!important}.lang-change .lang-intro-item:hover,.lang-change .lang-item:hover{background:#3b3e40!important}.van-popper-avatar .level-intro[data-v-5314bca5]{border-radius:10px!important;background:#222!important;box-shadow:0 3px 6px 0 rgb(0 0 0/75%)!important;color:#e1e1e1!important}.van-popover.van-popper.van-popper-avatar{border-radius:12px!important}.international-header a:hover,.van-popover a:hover{color:#00a1d6!important}.van-popper-avatar .count-item:hover .item-key[data-v-5314bca5],.van-popper-avatar .count-item:hover .item-value[data-v-5314bca5]{color:#00a1d6!important;transition:color .3s}.van-popover{border-radius:15px!important;background:#222!important;color:#e1e1e1!important}.follow-dialog-wrap .follow-dialog-window{border-radius:15px!important;background:#222!important;box-shadow:0 3px 6px rgb(0 0 0/50%)!important}.vip-m .bubble-traditional .recommand .bubble-col .item .recommand-link,.vip-m .bubble-traditional .recommand .title{color:hsla(0,0%,100%,.94)!important}.im-list-box{background:#222!important;box-shadow:0 3px 6px 0 rgba(0,0,0,.2);color:rgba(229,233,239,.95)!important}.i-frame iframe[data-v-01c9e08c]{border-bottom-right-radius:15px!important;border-bottom-left-radius:15px!important;background:hsla(0,0%,100%,0)!important;-webkit-box-shadow:0 3px 6px 0 #000!important;box-shadow:0 3px 6px 0 #000!important}.i-frame[data-v-01c9e08c]:before{background-color:#222!important;-webkit-box-shadow:0 1px 0 #222!important;box-shadow:0 1px 0 #222!important}.im-list:hover{background-color:#3b3e40!important;color:#e1e1e1!important}.i-frame[data-v-400d5653]:before{background-color:#222!important}.out-container[data-v-e99755ec]{border-radius:15px;background-color:#222;box-shadow:1px 6px 6px 0 rgb(0 0 0/50%)}.content[data-v-2cacd430]{color:#e1e1e1}.list-item[data-v-2cacd430]:hover{background-color:#3b3e40}.more-btn[data-v-0de37f37]:hover{background-color:#505050}.more-btn[data-v-0de37f37]{border-radius:15px;background-color:#3b3b3b;color:#e1e1e1}.split-line .history-tip[data-v-213951fc],.split-line .history-tip[data-v-77141e7e]{background:#222;color:#e1e1e1}.name-line[data-v-2cacd430]{color:#e7e7e7;font-size:3.14136vw}.van-popper-favorite .tab-item .title[data-v-64b63b5f]{color:hsla(0,0%,100%,.94)!important}.header-video-card[data-v-37582e0a]:hover{background-color:hsla(0,0%,95.7%,.2)!important}.van-popper-favorite .tab-item--normal[data-v-e8d85714]{color:#e1e1e1!important}.van-popper-favorite .tab-item--normal[data-v-e8d85714]:hover{background-color:hsla(0,0%,95.7%,.2)!important}.header-video-card .video-info .line-2[data-v-37582e0a]{color:#e1e1e1!important}.van-popper-favorite .play-all[data-v-e8d85714]{background-color:transparent!important}.van-popper-favorite .play-all.view[data-v-e8d85714]{border-right:1px solid hsla(0,0%,90.6%,.5)!important}.van-popper-favorite .play-all[data-v-e8d85714]:hover{background-color:hsla(0,0%,95.7%,.2)!important}.header-video-card .video-info .desc[data-v-37582e0a],.header-video-card .video-info .line-1[data-v-37582e0a]{color:#e7e7e7!important}.bilifont[data-v-0fdc0c18]{color:#e1e1e1!important}.van-popper[x-placement^=top] .popper__arrow:after{bottom:0;border-top-color:#222}.van-popper-channel{border:0;box-shadow:0 2px 12px 0 rgb(0 0 0/50%)}.popover-video-card,.video-info-module{border:0;border-radius:10px;background-color:#222;-webkit-box-shadow:rgb(0 0 0/50%) 0 2px 4px;box-shadow:0 2px 4px rgb(0 0 0/50%)}.popover-video-card .content .info .f-title,.video-info-module .v-title{color:#e7e7e7}`
                finalStyle = mainStyle
            } else if (localCode == 2) {
                mainStyle = `.category-container[data-v-17c2df7b],.detail-page-container[data-v-748372c9],.discovery-container[data-v-74951002],.main-container[data-v-748372c9],.play-selector__item[data-v-77de7349],.year-selector__item[data-v-cfdccf38]{background:#161819}.card--light[data-v-fde23d48],.channel-sidebar[data-v-0177db62],.discovery-panel__toggle[data-v-1dbd110a],.subscribe-panel[data-v-575ebe9e]{border-right:0;background:#222}.category-container .inner-container__header .title[data-v-17c2df7b],.channel-list-preview .header-info .title[data-v-72236eb8],.discovery-panel .content-item__name[data-v-1dbd110a],.discovery-panel__title[data-v-1dbd110a],.mini-channel-card .count[data-v-fde23d48],.mini-channel-card .name[data-v-fde23d48],.rank-card-panel .header .title[data-v-1669476f],.subscribe-panel .subscribe-item .name[data-v-575ebe9e],.subscribe-panel__title .text[data-v-575ebe9e],.type-header .header-info .title[data-v-4044b066],.type-header .header-info .title[data-v-748372c9],.video-card .video-name[data-v-6694beea]{color:#e1e1e1}.discovery-panel .content-item__count[data-v-1dbd110a],.discovery-panel__toggle[data-v-1dbd110a],.play-selector__item[data-v-77de7349],.rank-card-panel .header .desc[data-v-1669476f],.subscribe-panel__title .btn[data-v-575ebe9e],.subscribe-panel__title .count[data-v-575ebe9e],.video-card .up-name[data-v-6694beea],.year-selector__item[data-v-cfdccf38]{color:#bcbcbc}.discovery-panel .content-item--active[data-v-1dbd110a],.discovery-panel .content-item[data-v-1dbd110a]:hover,.discovery-panel__title--active[data-v-1dbd110a],.discovery-panel__title[data-v-1dbd110a]:hover,.subscribe-panel .subscribe-item--active[data-v-575ebe9e],.subscribe-panel .subscribe-item--active[data-v-575ebe9e] .discovery-panel .content-item[data-v-1dbd110a]:hover,.subscribe-panel .subscribe-item--active[data-v-575ebe9e] .discovery-panel__title[data-v-1dbd110a]:hover,.subscribe-panel .subscribe-item[data-v-575ebe9e]:hover{background:#3b3b3b}.back-top-btn{border:1px solid #3b3b3b!important;border-radius:5px!important;background:#3b3b3b!important}.sidebar-search-bar .inner-input[data-v-0693a90d]{background:#222;color:#e1e1e1}.discovery-panel__toggle[data-v-1dbd110a]{border-top:1px solid}.discovery-panel[data-v-1dbd110a]{border-bottom:1px solid #bcbcbc}.detail-banner[data-v-c5ca1424]{opacity:.85}.van-tabs-wrap .van-tabs-tab{color:#bcbcbc!important}.rank-card-panel .toggle>span[data-v-1669476f]{border-radius:10px;background:#161819;box-shadow:0 2px 4px 0 rgb(0 0 0/30%)}.card--light[data-v-fde23d48]{border-radius:10px}.gray-btn[data-v-72236eb8]{border:0;background:#bcbcbc;color:#7d7d7d}`
                finalStyle = mainStyle
            } else if (localCode == 3) {
                finalStyle = dynamicPageStyle
            } else if (localCode == 4) {
                mainStyle = `#app{background:#161819}.card[data-v-b5713636]{border:0!important;border-radius:15px!important}`
                finalStyle = dynamicPageStyle + mainStyle + mainNav
            } else if (localCode == 5) {
                mainStyle = `.bilibili-player{box-shadow:0 0 8px #040404!important}.bb-comment,.comment-bilibili-fold{background-color:#161819!important}.bb-comment .comment-list .list-item .text,.bb-comment .comment-list .list-item .user .text-con,.comment-bilibili-fold .comment-list .list-item .text,.comment-bilibili-fold .comment-list .list-item .user .text-con{color:hsla(0,0%,90.6%,.88)!important}.bb-comment .comment-list .list-item .info>span,.comment-bilibili-fold .comment-list .list-item .info>span{color:hsla(0,0%,100%,.7)!important}.bb-comment .comment-send .textarea-container textarea,.comment-bilibili-fold .comment-send .textarea-container textarea{border:0!important;background-color:#2b2b2b!important;color:#e2e2e2!important}.bb-comment .comment-send .textarea-container.focus textarea,.bb-comment .comment-send .textarea-container:hover textarea,.comment-bilibili-fold .comment-send .textarea-container.focus textarea,.comment-bilibili-fold .comment-send .textarea-container:hover textarea{border:1px solid #00a1d6!important;color:#505050!important}.bb-comment .comment-header .tabs-order li,.comment-bilibili-fold .comment-header .tabs-order li{color:hsla(0,0%,100%,.71)!important}.bb-comment .comment-header,.comment-bilibili-fold .comment-header{border-bottom:1px solid rgba(229,233,239,.54)!important}.bb-comment .comment-list .list-item .con,.comment-bilibili-fold .comment-list .list-item .con{border-top:1px solid rgba(229,233,239,.54)!important}.bb-comment .comment-list .list-item .user .name,.comment-bilibili-fold .comment-list .list-item .user .name{color:rgba(228,233,236,.95)}.bb-comment .comment-header .tabs-order li.on,.comment-bilibili-fold .comment-header .tabs-order li.on{color:#00a1d6!important}.bb-comment .comment-send .comment-emoji .face,.bb-comment .comment-send-lite .comment-emoji .face,.comment-bilibili-fold .comment-send .comment-emoji .face,.comment-bilibili-fold .comment-send-lite .comment-emoji .face{margin-right:0!important;width:0!important;height:0!important;background:#222!important}.bb-comment .comment-send .comment-emoji,.bb-comment .comment-send-lite .comment-emoji,.comment-bilibili-fold .comment-send .comment-emoji,.comment-bilibili-fold .comment-send-lite .comment-emoji{margin-top:8px!important;width:60px!important;border:1px solid #bcbcbc!important;border-radius:15px!important;color:#bcbcbc!important}.bb-comment .comment-send .comment-emoji .text,.bb-comment .comment-send-lite .comment-emoji .text,.comment-bilibili-fold .comment-send .comment-emoji .text,.comment-bilibili-fold .comment-send-lite .comment-emoji .text{vertical-align:inherit!important}.emoji-box{border:0!important;border-radius:10px!important;background-color:#2b2b2b!important;-webkit-box-shadow:0 3px 5px 0 rgb(0 0 0/30%)!important;box-shadow:0 3px 5px 0 rgb(0 0 0/30%)!important}.emoji-box .emoji-title,.title[data-v-00b4b4ea]{padding:15px;color:#e1e1e1;text-align:left;font-size:14px}.emoji[data-v-60ae9c4d]{background-color:transparent}.emoji-box .emoji-tabs .tab-link:hover,.emoji-box .emoji-text:hover,.emoji[data-v-60ae9c4d]:hover{background-color:#403b3b!important}.dp-i-block[data-v-60ae9c4d],.emoji-box .emoji-text{display:inline-block;color:#e1e1e1!important}.emoji-box .emoji-tabs,.pagination[data-v-97c4281e]{position:relative!important;width:100%!important;border-bottom-right-radius:8px!important;border-bottom-left-radius:8px!important;background-color:#222!important}.emoji-box .emoji-tabs .tab-link.on,.emoji-cover.selected[data-v-97c4281e]{background-color:#403b3b!important}.page-controller .next[data-v-97c4281e]:hover,.page-controller .prev[data-v-97c4281e]:hover{background-color:#403b3b;color:#e1e1e1}.page-controller .next[data-v-97c4281e],.page-controller .prev[data-v-97c4281e]{color:#e1e1e1}.page-controller .next.disabled[data-v-97c4281e],.page-controller .prev.disabled[data-v-97c4281e]{color:#8e8e8e!important}.emoji-box .emoji-tabs .emoji-tab-slider .prev{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+PHBhdGggZD0iTTkuMiA4bC0zLjQgMy40Yy0uMy4zLS4zLjggMCAxLjEuMy4zLjguMyAxLjEgMGwzLjktMy45Yy4zLS4zLjMtLjggMC0xLjFMNi45IDMuNmMtLjMtLjMtLjgtLjMtMS4xIDAtLjMuMy0uMy44IDAgMS4xTDkuMiA4eiIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiM3NTc1NzUiLz48L3N2Zz4=)!important;transform:rotate(180deg)!important}.emoji-box .emoji-tabs .emoji-tab-slider .next.on{background:url(//s1.hdslb.com/bfs/seed/jinkela/commentpc/img/left-arrow-disable.1c51ed4.svg) no-repeat!important;transform:rotate(180deg)!important}.bilibili-player-video-sendbar{background:#212121!important}.bilibili-player-video-info{color:#ded9d9!important}.bilibili-player-video-sendbar .bilibili-player-video-inputbar{background-color:#505050;color:#999!important}.bilibili-player-video-sendbar .bilibili-player-video-inputbar .bilibili-player-video-danmaku-input{color:#ccd0d7!important}.bilibili-player .bui-button.bui-button-blue,.bilibili-player .bui-button.bui-button-gray3:hover,.bilibili-player .bui-button.bui-button-gray:hover{opacity:.9!important}.bilibili-player-video-sendbar .bilibili-player-video-inputbar .bilibili-player-video-inputbar-wrap{border:0!important;background-color:#505050!important}.main-container .review-module .review-list .empty-wrapper .btn-go-write{border-radius:20px;background-color:#222}.main-container .tool-bar .mobile-info .mobile-more,.main-container .tool-bar .share-info .share-more,.main-container .tool-bar .watch-info .watch-more{border:0 solid #e5e9ef!important;border-radius:10px;background:#222;box-shadow:0 2px 4px 0 #131212!important}.main-container .tool-bar .watch-info .watch-more .title{color:#bbb}.main-container .tool-bar .watch-info .watch-more .action-wrap .watch-action .main-title,.main-container .tool-bar .watch-info .watch-more .action-wrap .watch-action .sub-title{color:#e2e2e2}.main-container .tool-bar .watch-info .watch-more .action-wrap .watch-action.create-watch,.main-container .tool-bar .watch-info .watch-more .action-wrap .watch-action.match-watch{opacity:.95}.main-container .tool-bar .mobile-info .mobile-more .top-wrapper{color:#fff!important}.main-container .tool-bar .coin-info i,.main-container .tool-bar .coin-info span,.main-container .tool-bar .like-info i,.main-container .tool-bar .like-info span,.main-container .tool-bar .mobile-info i,.main-container .tool-bar .mobile-info span,.main-container .tool-bar .share-info i,.main-container .tool-bar .share-info span,.main-container .tool-bar .watch-info span{color:hsla(0,0%,100%,.68)!important}.main-container .media-info .media-right .media-desc i{background-color:#151718!important}.main-container .media-info .media-right .media-tool-bar .btn-follow i,.main-container .media-info .media-right .media-tool-bar .btn-follow span{color:hsla(0,0%,100%,.8)}.main-container .media-info .media-right .media-tool-bar .btn-follow.active{background-color:#505050!important}.main-container .media-info .media-right .media-tool-bar .bangumi-options .opt-list{border:0;border-radius:10px;background-color:#222;box-shadow:0 2px 4px rgba(0,0,0,.76)!important}.main-container .media-info .media-right .media-tool-bar .bangumi-options .opt-list li{color:#bcbcbc}.main-container .media-info .media-right .media-tool-bar .bangumi-options .opt-list li.disabled{color:#999}.main-container .media-info .media-right .media-tool-bar .bangumi-options .opt-list li:hover{background-color:hsla(0,0%,60%,.51);color:rgba(0,160,214,.71)}.main-container .media-info .media-right .pub-wrapper .av-link{color:#d0c7c7}.ep-section-module,.main-container .ep-list-wrapper{border-radius:10px;background-color:#222}.ep-section-module .section-title,.main-container .ep-list-wrapper .list-title h4{color:hsla(0,0%,90.6%,.91)}.ep-list-wrapper .ep-item,.section-ep-wrapper .ep-item{color:hsla(0,0%,90.6%,.88)}.ep-list-wrapper .ep-item.cursor,.section-ep-wrapper .ep-item.cursor{background-color:#46484a}.ep-list-wrapper .ep-item:hover,.section-ep-wrapper .ep-item:hover{background-color:rgba(82,84,86,.74)}.main-container .ep-list-wrapper .list-wrapper.simple ul .ep-item{border:0;border-radius:4px;background-color:hsla(0,0%,100%,.29)}.bui-collapse .bui-collapse-header{border-radius:10px!important;background:#222!important}.player-auxiliary-area .player-auxiliary-filter-title{color:hsla(0,0%,90.6%,.91)!important}.bui-collapse .bui-collapse-header .bui-collapse-arrow{color:#8e8e8e!important}.player-auxiliary-area .player-auxiliary-danmaku .player-auxiliary-danmaku-function{background-color:#2b2b2b!important}.player-auxiliary-area .player-auxiliary-danmaku .player-auxiliary-danmaku-function [class*=player-auxiliary-danmaku-btn-]{color:#bcbcbc!important;background:#2b2b2b!important}.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap{background-color:#2b2b2b!important}.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row,.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row span.danmaku-info-danmaku{color:#bcbcbc!important}.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row .danmaku-info-block-btn,.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row .danmaku-info-protect-btn,.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row .danmaku-info-report-btn{background:#2b2b2b!important}.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row .danmaku-info-block-btn:hover,.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row .danmaku-info-protect-btn:hover,.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row .danmaku-info-report-btn:hover{background-color:rgba(0,161,214,.49)!important;color:#dcdcdc!important}.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row .danmaku-info-block-btn,.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row .danmaku-info-protect-btn,.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row .danmaku-info-report-btn{border:1px solid var(--bpx-primary-color,rgba(0,161,214,.49))!important}.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-btn-footer{background:#2b2b2b!important}.bui-button.bui-button-gray2,.bui-button.bui-button-gray2:hover{background-color:#505050!important;color:hsla(0,0%,100%,.7)!important}.player-auxiliary-area .player-auxiliary-filter .player-auxiliary-setting-menu-wrap{border:1px solid hsla(0,0%,95.7%,.2)!important;border-radius:10px!important;background-color:#222!important}.player-auxiliary-area .player-auxiliary-filter .player-auxiliary-setting-menu-wrap .player-auxiliary-setting-menu-list{background-color:#222!important;color:#bcbcbc!important}.player-auxiliary-area .player-auxiliary-filter .player-auxiliary-setting-menu-wrap .player-auxiliary-setting-menu-list:hover{background-color:#3b3b3b!important;color:#00a1d6!important}.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-load-status{background:rgba(43,43,43,.84)!important;color:#bcbcbc!important}.bui-collapse .bui-collapse-header,.player-auxiliary-area .player-auxiliary-filter{color:#222}.main-container .plp-r .danmaku-box .danmaku-wrap{border-radius:10px;background-color:#222}.player-auxiliary-area .player-auxiliary-filter{border-top-left-radius:10px}.bui-collapse .bui-collapse-header .bui-collapse-arrow{color:#a7a7a7}.player-auxiliary-area .player-auxiliary-filter .player-auxiliary-setting-menu-wrap{background-color:#4e4e4e;background-color:#798086;-webkit-box-shadow:0 2px 4px 0 #1b1b1b;box-shadow:0 2px 4px 0 #1b1b1b}.player-auxiliary-area .player-auxiliary-filter .player-auxiliary-setting-menu-wrap,.player-auxiliary-area .player-auxiliary-filter .player-auxiliary-setting-menu-wrap .player-auxiliary-setting-menu-list{background-color:#4e4e4e}.follow-dialog-wrap .follow-dialog-window{border-bottom:1px solid #505050!important;border-radius:15px!important;background:#222!important;color:hsla(0,0%,90.6%,.9)!important}.follow-dialog-wrap .follow-dialog-window .content .group-list li{color:hsla(0,0%,90.6%,.9)!important}.follow-dialog-wrap .follow-dialog-window .content .group-list li .special-tip{color:#b4bdc5!important}.follow-dialog-wrap .follow-dialog-window .content .info{color:#aeb8c1!important}.follow-dialog-wrap .follow-dialog-window .content .info .uname{color:#9aa4ab!important}.follow-dialog-wrap .follow-dialog-window .bottom{border-top:1px solid #505050!important}.follow-dialog-wrap .follow-dialog-window .content .group-list .add-group .add-btn{border:1px solid #adacac!important;color:#929ca2!important}.follow-dialog-wrap .follow-dialog-window .bottom .btn{opacity:.9!important}.follow-dialog-wrap .follow-dialog-window .bottom .btn:disabled{background-color:#525252!important;color:#a6a9af!important}.follow-dialog-wrap .follow-dialog-window .content .group-list .add-group .input-group{border:1px solid rgba(0,161,214,.7)!important}.follow-dialog-wrap .follow-dialog-window .content .group-list .add-group .input-group .submit{border-left:1px solid rgba(0,161,214,.7)!important;background:rgba(0,181,229,.11)!important;color:#00a1d6!important}.follow-dialog-wrap .follow-dialog-window .content .group-list .add-group .input-group input{background-color:#222!important;color:rgba(229,233,239,.91)!important}.follow-dialog-wrap .follow-dialog-window .content .group-list ul .follow-group-mask{background:hsla(0,0%,100%,0)!important}.short-review-masker .short-review-content{border-radius:20px;background:#222}.review-edit-header .review-edit-media-info h4{color:#e2e2e2}.review-edit-header .review-edit-media-info .rate-tip{color:hsla(0,0%,88.6%,.77)}.short-review-masker .short-review-content .review-body-wrap textarea{background:#222;color:#e2e2e2}.bb-comment .comment-send-lite.comment-send-lite,.bb-comment .comment-send.comment-send-lite,.comment-bilibili-fold .comment-send-lite.comment-send-lite,.comment-bilibili-fold .comment-send.comment-send-lite{background:#161819!important}.bb-comment .no-login .baffle,.comment-bilibili-fold .no-login .baffle{background-color:#505050!important;color:#e2e2e2!important}.main-container .media-info .media-right .media-title{color:hsla(0,0%,88.6%,.91)}.main-container .media-info .media-right .media-desc,.main-container .media-info .media-right .pub-wrapper .home-link,.main-container .media-info .media-right .pub-wrapper .pub-info{color:hsla(0,0%,88.6%,.94)}.main-container .media-info,.main-container .plp-l .comment-wrapper,.main-container .review-module{border-top:1px solid #6d757a}.main-container .review-module .review-list .review-item .review-body{border-radius:10px;background-color:#222}.main-container .review-module .review-list .review-item .review-title{color:#c7bcbc}.main-container .review-module .review-list .review-item .review-content{color:rgba(199,188,188,.89)}.main-container .plp-l .comment-wrapper .b-head,.main-container .recom-wrapper .recom-list .recom-item .info-wrapper .video-title,.main-container .recom-wrapper .recom-title,.main-container .review-module .module-title .more-link,.main-container .review-module .module-title h4{color:hsla(0,0%,90.6%,.92)}.follow-dialog-wrap .follow-dialog-window .title{border-bottom:1px solid #6d757a!important;color:#e5e9ef!important}.bb-comment .comment-send .textarea-container.focus textarea,.bb-comment .comment-send .textarea-container:hover textarea,.comment-bilibili-fold .comment-send .textarea-container.focus textarea,.comment-bilibili-fold .comment-send .textarea-container:hover textarea{color:#e2e2e2!important}.main-container .media-info .media-right .media-tool-bar .btn-rating{border:1px solid rgba(80,80,80,.62);color:hsla(0,0%,100%,.8);background-color:#505050}.main-container .media-info .media-right .media-tool-bar .btn-rating:hover{background-color:#4a4b4e}.main-container .pay-bar .vip .btn-pay.active{border:0;border-radius:10px;background-color:#222!important;color:hsla(0,0%,90.6%,.91)}.main-container .nav-tools .tool-item{border:0;background:#505050;color:hsla(0,0%,100%,.8)}.paging-box-big .current,.paging-box-big .dian,.paging-box-big .next,.paging-box-big .prev,.paging-box-big .tcd-number{border:0!important;background:#505050!important;color:hsla(0,0%,100%,.8)!important}.paging-box-big .page-jump input{border:1px solid #505050!important;background-color:#505050;color:hsla(0,0%,100%,.8)}.bb-comment .comment-list .list-item .info .btn-hover:hover,.comment-bilibili-fold .comment-list .list-item .info .btn-hover:hover{background:#161819;color:#00a1d6}.bb-comment .comment-send .textarea-container .ipt-txt,.bb-comment .comment-send-lite .textarea-container .ipt-txt,.comment-bilibili-fold .comment-send .textarea-container .ipt-txt,.comment-bilibili-fold .comment-send-lite .textarea-container .ipt-txt{border:0!important;border-radius:10px!important;background-color:#2b2b2b!important;color:#e1e1e1!important}.bb-comment .comment-send .textarea-container.focus textarea,.bb-comment .comment-send .textarea-container:hover textarea,.bb-comment .comment-send-lite .textarea-container.focus textarea,.bb-comment .comment-send-lite .textarea-container:hover textarea,.comment-bilibili-fold .comment-send .textarea-container.focus textarea,.comment-bilibili-fold .comment-send .textarea-container:hover textarea,.comment-bilibili-fold .comment-send-lite .textarea-container.focus textarea,.comment-bilibili-fold .comment-send-lite .textarea-container:hover textarea{border:1px solid #00a1d6!important;background-color:#505050!important}::placeholder{color:#8e8e8e!important}.main-container .tool-bar .mobile-info .mobile-more .top-wrapper .video-title{color:#e1e1e1}.main-container .tool-bar .mobile-info .mobile-more p{color:#bcbcbc}.main-container .tool-bar .mobile-info .mobile-more .top-wrapper .van-qrcode{opacity:.85}.bb-comment .comment-list .list-item .reply-box .reply-item .reply-con .user .name,.comment-bilibili-fold .comment-list .list-item .reply-box .reply-item .reply-con .user .name,.main-container .review-module .review-list .review-item .review-header .review-author{color:#bcbcbc}.bb-comment .comment-list .list-item .reply-box .view-more,.comment-bilibili-fold .comment-list .list-item .reply-box .view-more{color:#bcbcbc!important}.bb-comment .comment-list .list-item .info .btn-hover:hover,.bb-comment .comment-list .list-item .reply-box .view-more .btn-more:hover,.comment-bilibili-fold .comment-list .list-item .info .btn-hover:hover,.comment-bilibili-fold .comment-list .list-item .reply-box .view-more .btn-more:hover{background:#505050!important}.bb-comment .operation .opera-list,.comment-bilibili-fold .operation .opera-list{border-radius:10px!important;background:#222!important;box-shadow:0 2px 8px rgb(0 0 0/20%)!important;color:#bcbcbc!important}.bb-comment .operation .opera-list li:hover,.comment-bilibili-fold .operation .opera-list li:hover{background:#505050!important}.paging-box .current,.paging-box .dian,.paging-box .next,.paging-box .prev,.paging-box .result,.paging-box .tcd-number{color:#bcbcbc!important}.paging-box .current,.paging-box .current:hover,.paging-box .dian:hover,.paging-box .next:hover,.paging-box .prev:hover,.paging-box .tcd-number:hover{color:#00a1d6!important}`
                finalStyle = mainStyle + mainNav
            } else if (localCode == 6) {
                mainStyle = `a{color:#e1e1e1}.video-page-card .card-box .info .title{color:hsla(0,0%,90.6%,.92)}.multi-page{border-radius:10px;background:#222;box-shadow:0 1px 2px #0e0e0e}.multi-page .head-con .head-left h3{color:hsla(0,0%,90.6%,.91)}.multi-page .cur-list .list-box li.on{background:#46484a}.multi-page .cur-list .list-box li:hover{background:#595c5f}.multi-page .cur-list .list-box li a{color:hsla(0,0%,90.6%,.91)}.multi-page .cur-list .module-box li{border:1px solid #505050!important;background:#505050}.members-info .avatar .info-tag[data-v-97401e06]{background:#222}.members-info__header[data-v-97401e06]{background-color:rgba(80,80,80,.36)}.members-info__header .title[data-v-97401e06]{color:hsla(0,0%,88.6%,.94)}.bui-collapse .bui-collapse-header{border-radius:10px!important;background:#222!important}.player-auxiliary-area .player-auxiliary-filter-title{color:hsla(0,0%,90.6%,.91)!important}.bui-collapse .bui-collapse-header .bui-collapse-arrow{color:#8e8e8e!important}.player-auxiliary-area .player-auxiliary-danmaku .player-auxiliary-danmaku-function{background-color:#2b2b2b!important}.v-wrap .danmaku-wrap{border-radius:15px!important;background:#222!important}.player-auxiliary-area .player-auxiliary-danmaku .player-auxiliary-danmaku-function [class*=player-auxiliary-danmaku-btn-]{color:#bcbcbc!important;background:#2b2b2b!important}.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap{background-color:#2b2b2b!important}.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row,.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row span.danmaku-info-danmaku{color:#bcbcbc!important}.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row .danmaku-info-block-btn,.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row .danmaku-info-protect-btn,.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row .danmaku-info-report-btn{background:#2b2b2b!important}.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row .danmaku-info-block-btn:hover,.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row .danmaku-info-protect-btn:hover,.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row .danmaku-info-report-btn:hover{background-color:rgba(0,161,214,.49)!important;color:#dcdcdc!important}.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row .danmaku-info-block-btn,.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row .danmaku-info-protect-btn,.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row .danmaku-info-report-btn{border:1px solid var(--bpx-primary-color,rgba(0,161,214,.49))!important}.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-btn-footer{background:#2b2b2b!important}.bui-button.bui-button-gray2,.bui-button.bui-button-gray2:hover{background-color:#505050!important;color:hsla(0,0%,100%,.7)!important}.player-auxiliary-area .player-auxiliary-filter .player-auxiliary-setting-menu-wrap{border:1px solid hsla(0,0%,95.7%,.2)!important;border-radius:10px!important;background-color:#222!important}.player-auxiliary-area .player-auxiliary-filter .player-auxiliary-setting-menu-wrap .player-auxiliary-setting-menu-list{background-color:#222!important;color:#bcbcbc!important}.player-auxiliary-area .player-auxiliary-filter .player-auxiliary-setting-menu-wrap .player-auxiliary-setting-menu-list:hover{background-color:#3b3b3b!important;color:#00a1d6!important}.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-load-status{background:rgba(43,43,43,.84)!important;color:#bcbcbc!important}.bui-collapse .bui-collapse-header,.player-auxiliary-area .player-auxiliary-filter{color:#222}.main-container .plp-r .danmaku-box .danmaku-wrap{border-radius:10px;background-color:#222}.player-auxiliary-area .player-auxiliary-filter{border-top-left-radius:10px}.bui-collapse .bui-collapse-header .bui-collapse-arrow{color:#a7a7a7}.player-auxiliary-area .player-auxiliary-filter .player-auxiliary-setting-menu-wrap{background-color:#4e4e4e;background-color:#798086;-webkit-box-shadow:0 2px 4px 0 #1b1b1b;box-shadow:0 2px 4px 0 #1b1b1b}.player-auxiliary-area .player-auxiliary-filter .player-auxiliary-setting-menu-wrap,.player-auxiliary-area .player-auxiliary-filter .player-auxiliary-setting-menu-wrap .player-auxiliary-setting-menu-list{background-color:#4e4e4e}.video-info .video-title{color:#e5e9ef}.info .title[data-v-3a7137fb],.recommend-list .rec-title{color:hsla(0,0%,90.6%,.91)}.video-desc .info{color:hsla(0,0%,88.6%,.94)}.comment-m .b-head{color:hsla(0,0%,90.6%,.91)}.bb-comment .comment-list .list-item .info .reply-tags span,.comment-bilibili-fold .comment-list .list-item .info .reply-tags span{border-radius:12px!important;background:#505050!important;color:hsla(0,0%,100%,.8)!important}.s_tag .tag-area>li{border:1px solid #505050;background:#505050}.s_tag .tag-area>li .tag-link{color:hsla(0,0%,100%,.8)}.s_tag .btn-add{background:#505050}.s_tag .btn-add span{background:hsla(0,0%,100%,.8)}.up-info .btn-panel .not-follow-charge-btn{background:#161819}.video-toolbar .appeal-text,.video-toolbar .ops>span,.video-toolbar .ops>span i{color:#ddd}.video-desc .btn span{color:hsla(0,0%,88.6%,.94);cursor:pointer}.activity-m.act-now .l-inside .hinter-msg{color:hsla(0,0%,88.6%,.94);line-height:20px}.bb-comment .comment-list .list-item .text,.bb-comment .comment-list .list-item .user .text-con,.comment-bilibili-fold .comment-list .list-item .text,.comment-bilibili-fold .comment-list .list-item .user .text-con{color:hsla(0,0%,90.6%,.88)!important}.bb-comment .comment-list .list-item .info>span,.comment-bilibili-fold .comment-list .list-item .info>span{color:hsla(0,0%,100%,.7)!important}.bb-comment .comment-send .textarea-container textarea,.comment-bilibili-fold .comment-send .textarea-container textarea{border:0!important;background-color:#2b2b2b!important;color:#e2e2e2!important}.bb-comment .comment-send .textarea-container.focus textarea,.bb-comment .comment-send .textarea-container:hover textarea,.comment-bilibili-fold .comment-send .textarea-container.focus textarea,.comment-bilibili-fold .comment-send .textarea-container:hover textarea{border:1px solid #00a1d6!important;color:#e2e2e2!important;color:#505050!important}.bb-comment .comment-header .tabs-order li,.comment-bilibili-fold .comment-header .tabs-order li{color:hsla(0,0%,100%,.71)!important}.bb-comment .comment-header,.comment-bilibili-fold .comment-header{border-bottom:1px solid rgba(229,233,239,.54)!important}.bb-comment .comment-list .list-item .con,.comment-bilibili-fold .comment-list .list-item .con{border-top:1px solid rgba(229,233,239,.54)!important}.bb-comment .comment-list .list-item .user .name,.comment-bilibili-fold .comment-list .list-item .user .name{color:rgba(228,233,236,.95)}.bb-comment .comment-header .tabs-order li.on,.comment-bilibili-fold .comment-header .tabs-order li.on{color:#00a1d6!important}.bb-comment .comment-send .comment-emoji .face,.bb-comment .comment-send-lite .comment-emoji .face,.comment-bilibili-fold .comment-send .comment-emoji .face,.comment-bilibili-fold .comment-send-lite .comment-emoji .face{margin-right:0!important;width:0!important;height:0!important;background:#222!important}.bb-comment .comment-send .comment-emoji,.bb-comment .comment-send-lite .comment-emoji,.comment-bilibili-fold .comment-send .comment-emoji,.comment-bilibili-fold .comment-send-lite .comment-emoji{margin-top:8px!important;width:60px!important;border:1px solid #bcbcbc!important;border-radius:15px!important;color:#bcbcbc!important}.bb-comment .comment-send .comment-emoji .text,.bb-comment .comment-send-lite .comment-emoji .text,.comment-bilibili-fold .comment-send .comment-emoji .text,.comment-bilibili-fold .comment-send-lite .comment-emoji .text{vertical-align:inherit!important}.emoji-box{border:0!important;border-radius:10px!important;background-color:#2b2b2b!important;-webkit-box-shadow:0 3px 5px 0 rgb(0 0 0/30%)!important;box-shadow:0 3px 5px 0 rgb(0 0 0/30%)!important}.emoji-box .emoji-title,.title[data-v-00b4b4ea]{padding:15px;color:#e1e1e1;text-align:left;font-size:14px}.emoji[data-v-60ae9c4d]{background-color:transparent}.emoji-box .emoji-tabs .tab-link:hover,.emoji-box .emoji-text:hover,.emoji[data-v-60ae9c4d]:hover{background-color:#403b3b!important}.dp-i-block[data-v-60ae9c4d],.emoji-box .emoji-text{display:inline-block;color:#e1e1e1!important}.emoji-box .emoji-tabs,.pagination[data-v-97c4281e]{position:relative!important;width:100%!important;border-bottom-right-radius:8px!important;border-bottom-left-radius:8px!important;background-color:#222!important}.emoji-box .emoji-tabs .tab-link.on,.emoji-cover.selected[data-v-97c4281e]{background-color:#403b3b!important}.page-controller .next[data-v-97c4281e]:hover,.page-controller .prev[data-v-97c4281e]:hover{background-color:#403b3b;color:#e1e1e1}.page-controller .next[data-v-97c4281e],.page-controller .prev[data-v-97c4281e]{color:#e1e1e1}.page-controller .next.disabled[data-v-97c4281e],.page-controller .prev.disabled[data-v-97c4281e]{color:#8e8e8e!important}.emoji-box .emoji-tabs .emoji-tab-slider .prev{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+PHBhdGggZD0iTTkuMiA4bC0zLjQgMy40Yy0uMy4zLS4zLjggMCAxLjEuMy4zLjguMyAxLjEgMGwzLjktMy45Yy4zLS4zLjMtLjggMC0xLjFMNi45IDMuNmMtLjMtLjMtLjgtLjMtMS4xIDAtLjMuMy0uMy44IDAgMS4xTDkuMiA4eiIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiM3NTc1NzUiLz48L3N2Zz4=)!important;transform:rotate(180deg)!important}.emoji-box .emoji-tabs .emoji-tab-slider .next.on{background:url(//s1.hdslb.com/bfs/seed/jinkela/commentpc/img/left-arrow-disable.1c51ed4.svg) no-repeat!important;transform:rotate(180deg)!important}.bb-comment .comment-list .list-item .reply-box .reply-item .reply-con .user .name,.comment-bilibili-fold .comment-list .list-item .reply-box .reply-item .reply-con .user .name{color:#bcbcbc}.bb-comment .comment-list .list-item .reply-box .view-more,.comment-bilibili-fold .comment-list .list-item .reply-box .view-more{color:#bcbcbc!important}.bb-comment .comment-list .list-item .info .btn-hover:hover,.bb-comment .comment-list .list-item .reply-box .view-more .btn-more:hover,.comment-bilibili-fold .comment-list .list-item .info .btn-hover:hover,.comment-bilibili-fold .comment-list .list-item .reply-box .view-more .btn-more:hover{background:#505050!important}.bb-comment .operation .opera-list,.comment-bilibili-fold .operation .opera-list{border-radius:10px!important;background:#222!important;box-shadow:0 2px 8px rgb(0 0 0/20%)!important;color:#bcbcbc!important}.bb-comment .operation .opera-list li:hover,.comment-bilibili-fold .operation .opera-list li:hover{background:#505050!important}.paging-box .current,.paging-box .dian,.paging-box .next,.paging-box .prev,.paging-box .result,.paging-box .tcd-number{color:#bcbcbc!important}.paging-box .current,.paging-box .current:hover,.paging-box .dian:hover,.paging-box .next:hover,.paging-box .prev:hover,.paging-box .tcd-number:hover{color:#00a1d6!important}.bb-comment .comment-send .textarea-container .ipt-txt,.bb-comment .comment-send-lite .textarea-container .ipt-txt,.comment-bilibili-fold .comment-send .textarea-container .ipt-txt,.comment-bilibili-fold .comment-send-lite .textarea-container .ipt-txt{border:0!important;border-radius:10px!important;background-color:#2b2b2b!important;color:#e1e1e1!important}.bb-comment .comment-send .textarea-container.focus textarea,.bb-comment .comment-send .textarea-container:hover textarea,.bb-comment .comment-send-lite .textarea-container.focus textarea,.bb-comment .comment-send-lite .textarea-container:hover textarea,.comment-bilibili-fold .comment-send .textarea-container.focus textarea,.comment-bilibili-fold .comment-send .textarea-container:hover textarea,.comment-bilibili-fold .comment-send-lite .textarea-container.focus textarea,.comment-bilibili-fold .comment-send-lite .textarea-container:hover textarea{border:1px solid #00a1d6!important;background-color:#505050!important}::placeholder{color:#8e8e8e!important}.bb-comment .comment-list .list-item .info .btn-hover:hover,.comment-bilibili-fold .comment-list .list-item .info .btn-hover:hover{background:#161819;color:#00a1d6}.bb-comment,.bb-comment .comment-send-lite.comment-send-lite,.bb-comment .comment-send.comment-send-lite,.comment-bilibili-fold,.comment-bilibili-fold .comment-send-lite.comment-send-lite,.comment-bilibili-fold .comment-send.comment-send-lite{background:#161819!important}.bilibili-player-video-sendbar{background:#212121!important}.bilibili-player-video-info{color:#ded9d9!important}.bilibili-player-video-sendbar .bilibili-player-video-inputbar{background-color:#505050;color:#999!important}.bilibili-player-video-sendbar .bilibili-player-video-inputbar .bilibili-player-video-danmaku-input{color:#ccd0d7!important}.bilibili-player .bui-button.bui-button-blue,.bilibili-player .bui-button.bui-button-gray3:hover,.bilibili-player .bui-button.bui-button-gray:hover{opacity:.9!important}.bilibili-player-video-sendbar .bilibili-player-video-inputbar .bilibili-player-video-inputbar-wrap{border:0!important;background-color:#505050!important}.bilibili-player{box-shadow:0 0 8px #040404!important}.video-desc .desc-info,.video-desc .toggle-btn span{color:#bcbcbc}.tag-channel-pane .bg-image[data-v-7aa389d0],.tag-channel-pane .bg-mask[data-v-7aa389d0]{border-radius:10px 10px 0 0!important}.tag-channel-pane[data-v-7aa389d0]{border-radius:10px!important;background:#222!important}.tag-channel-pane .channel-title[data-v-7aa389d0]{color:#bcbcbc}.tag-info-pane{border-radius:10px;background:#222;box-shadow:0 0 5px rgb(0 0 0/20%)}.tag-info-pane .tag-header .tag-title,.tag-info-pane .tag-header .tag-title a,.tag-info-pane .text{color:#bcbcbc}.recommend-list .rec-footer{background:#3b3b3b;color:hsla(0,0%,100%,.7)}.float-nav .nav-menu .item{border:0;background:#505050;color:hsla(0,0%,100%,.8)}.more-ops-list{border:0;background:#222;box-shadow:0 2px 8px 0 rgb(0 0 0/20%)}.more-ops-list li:hover{background:#505050;color:#00a1d6}.more-ops-list li{color:#bcbcbc}`
                finalStyle = mainStyle + mainNav
            } else if (localCode == 7) {
                mainStyle = `.nav-tabs__item>div>span{color:#e1e1e1}.history-list .history-tips,.popular-list .popular-tips[data-v-59ee846d],.rank-container .rank-tips[data-v-9b180bbc],.weekly-header .update-tips[data-v-6b37fecd]{color:#bcbcbc}.rank-list .rank-item .content .info .title,.rank-tab-wrap .rank-tab,.video-card .video-name[data-v-a182333c],.weekly-header .current-tiem[data-v-6b37fecd]{color:#e1e1e1}.rank-tab-wrap,.video-card .history-hint[data-v-a182333c],.video-card .strong-tag[data-v-a182333c],.video-card .weekly-hint[data-v-a182333c]{background:#161819}.video-card .rcmd-tag[data-v-a182333c]{border:1px solid #f63}.weekly-header .panel .select-item[data-v-6b37fecd]{background:#222}.weekly-header .panel .item-title[data-v-6b37fecd]{color:#e1e1e1}.weekly-header .panel .select-item[data-v-6b37fecd]:not(.item-active):hover{background:rgba(0,0,0,.83)}.rank-list .rank-item:hover{box-shadow:0 2px 8px 1px rgb(0 0 0/40%)}.back-top-btn[data-v-6af406fd]{border:1px solid #3b3b3b!important;border-radius:5px!important;background:#3b3b3b!important}.rank-container .rank-tips .icon-tip[data-v-9b180bbc]{color:#e1e1e1;fill:#e1e1e1!important}`
                finalStyle = mainStyle + mainNav
            } else if (localCode == 8) {
                mainStyle = `.watch-later-list header .t{color:#e1e1e1}.watch-later-list .list-box .av-item .av-about .t{color:hsla(0,0%,90.6%,.88)}.watch-later-list .list-box .av-item .av-about .info .user span{color:#bcbcbc}.watch-later-list header .d-btn,.watch-later-list header .s-btn{background-color:#222}`
                finalStyle = mainStyle + mainNav + footer
            } else if (localCode == 9) {
                mainStyle = `.link-navbar[data-v-8c29c8b6]{background-color:rgba(84,87,88,.68)!important}.area-list-panel .list-item[data-v-645b9033],.link-navbar .main-ctnr .nav-logo[data-v-8c29c8b6],.link-navbar .nav-item[data-v-78f9fbb2]{color:#bcbcbc!important}.area-list-panel[data-v-645b9033],.link-navbar .main-ctnr .nav-items-ctnr.over-width[data-v-8c29c8b6]{background-color:#222!important}.area-list-panel .list-item[data-v-645b9033]:hover{background-color:#505050!important}.activity-item-ctnr .info-ctnr .first-line .username[data-v-04a0c570],.darkgray[data-v-e845f484],.user-item .username[data-v-0b886562]{color:#bcbcbc!important}.lightgray[data-v-e845f484],.user-level-detail .detail-link[data-v-e845f484]{color:#8e8e8e!important}.user-level-detail .detail-link[data-v-e845f484]{border-radius:30px!important;background:#3b3b3b!important}.user-level-detail .detail-link[data-v-e845f484]:hover{background-color:#505050!important;color:#23ade5!important}.info-item-ctnr[data-v-205650c3]:hover{color:#23ade5!important}.calendar-checkin[data-v-502ec807],.download-panel-ctnr[data-v-a2f1d3d2],.link-panel-ctnr[data-v-13f891d3],.user-level-detail[data-v-e845f484],.user-panel-ctnr .user-panel[data-v-43630178]{border-radius:10px!important;background-color:#222!important;box-shadow:0 2px 10px rgb(0 0 0/30%)!important}.user-level-detail[data-v-e845f484]{border:1px solid #222}.link-panel-ctnr .load-more .load-more-btn[data-v-13f891d3],.user-panel-ctnr .user-panel .content-ctnr .logout-btn[data-v-43630178]{background-color:#3b3b3b!important;color:#bcbcbc!important}.attention-live .switch-btn[data-v-13f891d3]:active,.attention-live .switch-btn[data-v-13f891d3]:hover{background-color:#3b3e40!important}.calendar-checkin .calendar-wrapper[data-v-502ec807],.calendar-checkin .title[data-v-502ec807]{background-color:#222!important}.calendar-checkin .calendar-wrapper .calendar .date-ctnr .day-item[data-v-502ec807]{background:#222!important;color:#bcbcbc;font-size:15px}.calendar-checkin .calendar-wrapper .calendar .date-ctnr .day-item.checked[data-v-502ec807]{border-radius:20px;background:rgba(36,148,191,.74)!important;font-size:10px}.calendar-checkin .calendar-wrapper[data-v-502ec807]{color:#8e8e8e!important}.download-panel-ctnr .download-item[data-v-a2f1d3d2]:hover{color:#3b3b3b!important}.user-panel-ctnr .user-panel .content-ctnr .logout-btn[data-v-43630178]:hover{color:#23ade5!important}.search-bar-ctnr .search-bar[data-v-2c8ee7e8]{border:1px solid rgba(80,80,80,.81)!important;background-color:rgba(80,80,80,.81)!important}.search-bar-ctnr .search-bar input[data-v-2c8ee7e8]{color:#bcbcbc!important}.area-title[data-v-eb8f2e28],.banner-title[data-v-5710e9d2],.item-title[data-v-663a232e],.room-anchor[data-v-d37dc90e],.room-title[data-v-31b5c868],.section-title[data-v-5710e9d2],.section-title[data-v-663a232e],.title-text[data-v-4d0c9584],.yzly-title[data-v-696ecdcd]{color:#e1e1e1}.item-title[data-v-663a232e],.v-middle{color:#bcbcbc}.hab-ctnr[data-v-0b3ef62c],.highlight-area-item[data-v-18c69ba8],.news-ctnr[data-v-663a232e],.rank-ctnr[data-v-d37dc90e],.rec-area-item[data-v-4d0c9584]{border-radius:10px;background-color:#222;box-shadow:0 2px 10px rgb(0 0 0/20%)}.text-info-ctnr.body-bg[data-v-31b5c868]{background-color:#161819}.hover-panel-wrapper[data-v-31b5c868]{border:0;border-radius:15px;background-color:#2b2b2b}.card-info-ctnr[data-v-31b5c868],.text-info-ctnr[data-v-31b5c868]{background-color:#2b2b2b}.hover-panel-wrap[data-v-18c69ba8]{border:1px solid #2b2b2b;background-color:#2b2b2b}.live-sidebar-ctnr[data-v-b5749cac]{background-color:#222!important}.btn[data-v-696ecdcd]{background:#3b3b3b}.btn[data-v-696ecdcd]:hover{background:#505050}.rec-area-item[data-v-4d0c9584]{border:0}.link-footer[data-v-ac47a3c2]{background-color:#131516!important}.link-footer .footer-img-linker .footer-qrcode.qr-weibo[data-v-ac47a3c2],.link-footer .footer-img-linker .footer-qrcode.qr-weixin[data-v-ac47a3c2],.link-footer .footer-img-linker .footer-qrcode.qr-zbj[data-v-ac47a3c2]{opacity:.8}`
                finalStyle = mainStyle
            } else if (localCode == 10) {
                mainStyle = `.nav-tab-bar .tab-item span,.page-content .left-side .article-list .article-list-holder .article-item .item-holder .article-title-holder,.page-content .left-side .partitio-name,.page-content .right-side .more .help .title,.page-content .right-side .more .link .title,.page-content .right-side .more .top-bar,.page-content .right-side .rank-module .rank-list .item a,.page-content .right-side .rank-module .rank-tabs-bar label,.page-content .right-side .search-module .search-block .search-word-panel .history-item,.page-content .right-side .search-module .search-block .search-word-panel .suggest-item,.page-content .right-side .up-list .title,.page-content .right-side .up-list .up-item .info-holder .head .nick-name{color:#e1e1e1}.page-content .left-side .article-list .article-list-holder .article-item .item-holder .article-desc,.page-content .right-side .more .help .info,.page-content .right-side .more .link .info,.page-content .right-side .rank-module .rank-tabs-bar .rank-tabs-list li,.page-content .right-side .up-list .up-item .info-holder .dynamic,.page-content .right-side .up-list .up-item .info-holder .dynamic .arc-title{color:#bcbcbc}.page-content .left-side .article-list .article-list-holder .article-item,.page-content .left-side .article-list .article-list-holder .article-item .item-holder .article-title-holder,.page-content .right-side .rank-module .rank-list .item,.page-content .right-side .search-module .search-block input,.page-content .right-side .up-list{background:#161819;background-color:#161819}.page-content .right-side .search-module .search-block input{color:#e1e1e1}.page-content .right-side .search-module .search-block .search-word-panel,.page-content .right-side .search-module .search-block .search-word-panel .panel-title p span{background:#222}.page-content .right-side .search-module .search-block .search-word-panel .history-item:hover,.page-content .right-side .search-module .search-block .search-word-panel .suggest-item:hover{background-color:#3b3b3b}.page-content .right-side .rank-module .rank-list .item .rank-index{border-radius:10px;background:#999;color:#fff}.to-top{border:0;background:rgba(80,80,80,.37)}.page-content .right-side .rank-module .complete-rank,.page-content .right-side .up-list .fresh-btn{border-radius:10px;background:#3b3b3b;color:#ccc}.page-content .right-side .up-list .fresh-btn{border:1px solid #3b3b3b}`
                finalStyle = mainStyle + mainNav
            } else if (localCode == 11) {
                mainStyle = `.article-container,.article-up-info[data-v-2724bf84],.recommend-list,.right-side-bar .side-toolbar[data-v-3ee147b6],.right-side-bar.on .to-top[data-v-3ee147b6]{border-radius:15px;background-color:#222;box-shadow:1px 3px 10px rgb(0 0 0/40%)}.article-container .title-container .title,.article-up-info .up-name[data-v-2724bf84],.normal-article-holder,.recommend-list .recommend-article-list .left-panel .article-desc,.recommend-list .recommend-article-list .left-panel .article-title,.recommend-list .recommend-header .title{color:#e1e1e1}.article-tags .tag-item,.interaction-info .hover-item,.interaction-info .toolbar .share-box,.normal-article-holder figcaption,.recommend-list .recommend-header .more,.recommend-list .recommend-header .more .iconfont,.right-side-bar .side-toolbar .toolbar-item[data-v-3ee147b6]{color:#bcbcbc}.article-breadcrumb .breadcrumb-name,.article-breadcrumb .slash,.right-side-bar .side-toolbar .toolbar-item .iconfont[data-v-3ee147b6],.right-side-bar .side-toolbar .toolbar-on>.iconfont[data-v-3ee147b6],.right-side-bar .side-toolbar .toolbar-on[data-v-3ee147b6],.right-side-bar .to-top .iconfont[data-v-3ee147b6]{color:#8e8e8e}.fixed-top-header{background:#141414}.fixed-top-header .inner .inner-title,.fixed-top-header .inner .up-info__name{color:#bcbcbc}`
                finalStyle = mainStyle + mainNav
            } else if (localCode == 12) {
                //!!!
                mainStyle = `body{background:#161819}.n .n-inner{background:#222;box-shadow:0 0 0 1px #222}.g-search input,.n .n-data .n-data-v{color:hsla(0,0%,90.6%,.91)}.g-search input{border:1px solid #222;background:#505050}#page-index .col-2 .section{border:1px solid #222;border-radius:10px;background:#222}.user .info .meta .row:first-child,section-title{color:hsla(0,0%,90.6%,.91)}#page-index .col-1{background:#222}.n .n-btn.active{color:#00a1d6!important}#page-index .col-2 .section .user-auth.no-auth .no-auth-title .goto-auth,#page-index .fav-item .name,.section-title,.section-title .t,.small-item .title,a{color:#e1e1e1}#page-index .bangumi .content .title{color:hsla(0,0%,90.6%,.88)}#page-index .channel .empty-state p,#page-index .fav-item .state,.i-m-text,.i-m-u-icon,.large-item .desc,.list-create .text,.n .n-data .n-data-k,.n .n-num,.n .n-text,.private-hint,.sec-empty-hint,.section .more{color:#bcbcbc}textarea::placeholder{color:hsla(0,0%,73.7%,.79)}#page-index #i-ann-content textarea{border:1px solid #424242;background:#222;color:hsla(0,0%,90.6%,.88)}.list-create{background:#222}.section .count{border:0 solid #ddd;border-radius:3px;background:#777;color:#f6fafb}.section .count:before{width:0;height:0}.large-item .cover img,.mini-item .cover img{box-shadow:0 0 0 0 #e5e9ef}#page-index .col-1,#page-index .fav-covers,.i-m-r2{border:0}.i-m-r2{border-radius:15px;background:#2b2b2b}.i-m-upload{border-right:1px solid #bcbcbc}#page-index .col-2 .section-title,#page-index .col-2 .section:last-child{border-bottom:0}.section .count:before,.section .more{background:#222}.section .more{padding:0 10px}.i-m-u-icon,.i-m-v-icon{width:0;height:0}.col-full{border-radius:15px;background:#222;box-shadow:0 0 0 #000}.pgc-space-follow-item .pgc-item-info .pgc-item-title,.sub-tabs span{color:#e1e1e1!important}.pgc-space-follow-item .pgc-item-info .pgc-item-desc{color:#bcbcbc!important}.bangumi-pagelistbox .p,.be-pager-item,.be-pager-next,.be-pager-prev{margin-right:8px!important;border:0!important;background-color:#2b2b2b!important;color:#bcbcbc!important}.bangumi-pagelistbox .p.active,.bangumi-pagelistbox .p:hover,.be-pager-item-active{border-color:rgba(0,161,214,.78)!important;background-color:rgba(0,161,214,.78)!important;color:hsla(0,0%,90.6%,.88)!important}.bangumi-pagelistbox .custom-right .custom-right-inner.custompage,.be-pager-options-elevator input{border:0!important;border-radius:10px!important;background-color:#3b3b3b!important;color:#e1e1e1!important}.be-pager-item a,.be-pager-next a,.be-pager-prev a,.pgc-space-follow-item .pgc-item-info .pgc-item-desc{color:hsla(0,0%,90.6%,.88)}.be-dropdown-menu,.pgc-space-follow-item .bangumi-options .opt-list{border:0!important;background-color:#2b2b2b!important;box-shadow:0 2px 4px rgb(0 0 0/30%)!important}.be-dropdown-item,.pgc-space-follow-item .bangumi-options .opt-list li{color:#bcbcbc!important}.pgc-space-follow-item .bangumi-options .opt-list li.disabled{color:#8e8e8e!important}.be-dropdown-item:hover,.pgc-space-follow-item .bangumi-options .opt-list li:hover{background-color:#3b3b3b!important;color:#00a1d6}#page-fav .fav-sidenav .fav-item:hover{background-color:#3b3b3b!important}#page-fav .fav-sidenav .nav-title .text,.favInfo-box .favInfo-details .fav-name,.small-item.disabled .title{color:#e1e1e1}#page-fav .fav-main .filter-item,#page-fav .fav-main .search-types,#page-fav .fav-sidenav .favlist-title,#page-fav .fav-sidenav .watch-later,input::placeholder{color:#bcbcbc}#page-fav .fav-main .small-item{border:0}#page-fav .fav-main .favList-info,#page-fav .fav-sidenav .nav-container,#page-fav .fav-sidenav .watch-later,.be-dropdown-item.be-dropdown-item-delimiter{border-bottom:1px solid hsla(0,0%,73.7%,.5)}#page-fav .fav-sidenav{border-right:1px solid hsla(0,0%,73.7%,.5)}#page-fav .fav-sidenav .watch-later{border-top:1px solid hsla(0,0%,73.7%,.5)}#page-fav .fav-main .search-input input{background:#222;color:#bcbcbc}.small-item .cover{background:#272727}#page-fav .fav-sidenav .icon-cursor{background-color:#2b2b2b}#page-fav .fav-main .filter-item .filter-type .be-dropdown-item span{color:hsla(0,0%,90.6%,.88)}#page-setting .setting-index-module,#page-setting .setting-privacy-item .setting-privacy-name{color:#e1e1e1}#page-setting #setting-new-tag{border:1px solid #3b3b3b;color:#bcbcbc}#page-setting #setting-new-tag-btn{border:1px solid #3b3b3b;border-radius:10px 0 0 10px;background:#3b3b3b}#page-setting .setting-tag-list a{border:1px solid #3b3b3b;border-radius:10px;background:#222}#page-setting .setting-index-module{border-bottom:1px solid #bcbcbc}.be-tab-item{color:#bcbcbc}#page-dynamic .col-2 .section{border:0;border-radius:10px;background-color:#222;box-shadow:0 2px 8px rgb(0 0 0/30%)}#page-video .page-head__left .video-title{color:#e1e1e1}#page-video #submit-video-type-filter{border-radius:15px;background-color:#2b2b2b}#page-video #submit-video-type-filter a,#page-video .page-head__left .be-tab-item{color:#bcbcbc}.contribution-sidenav .contribution-item:hover{background-color:#3b3b3b}.contribution-sidenav~.main-content{border-left:1px solid hsla(0,0%,73.7%,.5)}.contribution-sidenav{border-right:1px solid hsla(0,0%,73.7%,.5)}#page-index .channel .section-right-options .play-all-channel,#page-video .play-all-btn{border:1px solid #bcbcbc;border-radius:10px;color:#bcbcbc}#page-index .channel .section-right-options .play-all-channel .video-commonplayer_play,#page-index .channel .section-right-options .play-all-channel>span,#page-video .play-all-btn .video-commonplayer_play,.be-tab-input{color:#bcbcbc}#page-index .col-2 .section-title,.i-m-r2,.section,.section .more{border-bottom:1px solid #bcbcbc}.be-tab-item.is-active{color:#00a1d6!important}#page-index .col-1 .section .more{border-radius:10px}#page-index .channel.guest .channel-item .channel-title .channel-name{color:#e1e1e1}.i-pin-desc,.small-item .meta{color:#bcbcbc}#page-index .channel .channel-item,#page-index .col-2 .section-title,.article-content,.i-m-r2,.s-content,.section,.section .more{border-bottom:1px solid hsla(0,0%,73.7%,.5)}.i-pin-meta,.meta-col{color:#bcbcbc}#page-index .col-2 .section .user-auth .auth-description{color:hsla(0,0%,90.6%,.88)}.elec .elec-monthly-count,.i-live .i-live-fo-count,.i-live .i-live-off-guest p,.i-live .i-live-unfo-btn{color:#bcbcbc}#page-channel-index .channel-item .channel-name{color:#e1e1e1}`
                finalStyle = mainStyle + mainNav
            } else if (localCode == 13) {

            } else if (localCode == 14) {
                mainStyle = `.feed-topic .publish-panel-container[data-v-54d921ce],.feed-topic .separater-line[data-v-54d921ce]{border-radius:10px;background:#222;box-shadow:0 4px 6px 0 rgb(0 0 0/50%)}.card .focus-btn .focus[data-v-b5713636]{border:1px solid #ccd0d7;border-radius:20px;background-color:#222}.card .focus-btn .unfocus[data-v-b5713636]{border:1px solid #00a1d6;border-radius:20px;background-color:#222}.card .more-panel[data-v-b5713636]{border:0;border-radius:10px;background:#2b2b2b;-webkit-box-shadow:0 11px 12px 0 rgb(0 0 0/20%);box-shadow:0 11px 12px 0 rgb(0 0 0/20%);color:#e1e1e1}.card .more-panel[data-v-b5713636]:after{border-top:1px solid #2b2b2b;border-left:1px solid #2b2b2b;background:#2b2b2b}.card[data-v-b5713636]{border:0!important;border-radius:15px!important}.tc-dark-slate{color:#e1e1e1}.active-panel .show-more-button[data-v-07e05beb]{border-radius:10px;background-color:#3b3b3b}.tab-nav .tab .tab-text[data-v-21a80c3a]{color:#bcbcbc}.video-topic .video-list[data-v-479d07d0]{border-radius:15px;background-color:#222}.video-topic .video-list .video-title[data-v-479d07d0]{color:#e7e7e7}.v .t[data-v-23ab063d]{color:#e1e1e1}.page-list-box .page-item a[data-v-33234bd8]{color:#bcbcbc}.page-list-box .page-item[data-v-33234bd8]{border:0;background-color:#2b2b2b;color:#bcbcbc}.page-list-box .active a[data-v-33234bd8]{color:#e1e1e1!important}.page-list-box .active[data-v-33234bd8]{background:#00a1d6!important}.page-list-box .page-input[data-v-33234bd8]{border:0;border-radius:10px;background-color:#3b3b3b;color:#e1e1e1}.bp-popup-panel[data-v-3c863400]{background-color:#222}.selector-box[data-v-f55b66b8]{color:#e1e1e1}.content-text[data-v-f55b66b8]{color:#bcbcbc}bl-button--primary[data-v-65bda702]:disabled{background-color:#6f6f6f;color:#a2a2a2}.bp-popup-ctnr .popup-content-ctnr[data-v-b38bf146]{color:#e1e1e1}.tab-wrap .tab-item[data-v-479d07d0]{color:#bcbcbc}`
                finalStyle = mainStyle + mainNav
            } else if (localCode == 15) {
                mainStyle = `.block-page-progress,.block-title,.block-title .main,.title,.title_txt{color:#e1e1e1!important}.block-list-item-title[data-v-0a31c1fd],.block-list-item-title[data-v-2192be56],.block-title .sub-title[data-v-7d27b490],.myClassroom[data-v-768a6cdf],.rank-title[data-v-b576269e]{color:#e1e1e1}.block-list-item-desc[data-v-2192be56],.item[data-v-768a6cdf],.time-line-wrapper .time[data-v-29beee50]{color:#bcbcbc}.tags{background-color:#161819!important}.backTop-item.bor[data-v-dcae897a],.backTop-item[data-v-dcae897a]:nth-child(n+2){background:#3b3b3b}.backTop-item[data-v-dcae897a]{border-bottom:1px solid hsla(0,0%,100%,.12)}.backTop-item[data-v-dcae897a]:last-child{border:0}.block-list .slider-contro .slider-next{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAbUExURUxpcenp6efn5+fn5+fn5+fn5+fn5+fn5+fn5xbfqDMAAAAIdFJOUwAMIcPhqpvRy08zNQAAAC9JREFUKM9jYKApEE1A5TNaFKAKCLcooClworsCVjQFmAIYWjAMpaeSAgKBTE0AAPJKDR/znmWLAAAAAElFTkSuQmCC);-webkit-transform:rotate(180deg);transform:rotate(180deg);-ms-transform:rotate(180deg)}.block-list .slider-contro .slider-next:hover{background-color:#3b3b3b;-webkit-transform:rotate(0);transform:rotate(0);-ms-transform:rotate(0)}.block-list .slider-contro .slider-next.disabled{right:0;left:auto;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAbUExURUxpcSoqKiYmJiIiIiIiIiEhISIiIiIiIiEhIR/wiRkAAAAIdFJOUwAMIcPhqpvRy08zNQAAAC5JREFUKM9jYKAZYAtEE2BvFkAVYPIwRFOiMoBKAggIoGvBMJQOCjCCECOQqQwAa+IMp83lbxQAAAAASUVORK5CYII=);pointer-events:none}.block-list .slider-contro .slider-prev{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAbUExURUxpcenp6efn5+fn5+fn5+fn5+fn5+fn5+fn5xbfqDMAAAAIdFJOUwAMIcPhqpvRy08zNQAAAC9JREFUKM9jYKApEE1A5TNaFKAKCLcooClworsCVjQFmAIYWjAMpaeSAgKBTE0AAPJKDR/znmWLAAAAAElFTkSuQmCC);-webkit-transform:rotate(0);transform:rotate(0);-ms-transform:rotate(0)}.block-list .slider-contro .slider-prev:hover{background-color:#3b3b3b;-webkit-transform:rotate(180deg);transform:rotate(180deg);-ms-transform:rotate(180deg)}.block-list .slider-contro .slider-prev.disabled{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAbUExURUxpcSoqKiYmJiIiIiIiIiEhISIiIiIiIiEhIR/wiRkAAAAIdFJOUwAMIcPhqpvRy08zNQAAAC5JREFUKM9jYKAZYAtEE2BvFkAVYPIwRFOiMoBKAggIoGvBMJQOCjCCECOQqQwAa+IMp83lbxQAAAAASUVORK5CYII=);-webkit-transform:rotate(180deg);transform:rotate(180deg);pointer-events:none;-ms-transform:rotate(180deg)}.rank-index[data-v-b576269e]{border-radius:10px;background:#999;color:#fff}`
                finalStyle = mainStyle + mainNav
            } else if (localCode == 16) {

            } else if (localCode == 17) {
                mainStyle = `.exchange-btn .btn,.rank-header .more,.rcmd-box-wrap .change-btn{color:#ccc}.exchange-btn .btn:hover,.rank-header .more:hover,.rcmd-box-wrap .change-btn:hover{background-color:#282b2d!important}.bili-dropdown,.block-area .follow-wrapper .follow-head .follow-more,.new-stat-module .zone-title .headline .new-stat-more,.pgc-rank-dropdown,.pgc-rank-dropdown .dropdown-list,.random-change,.sec-rank .more-link,.video-floor-m .zone-title .headline .link-more{border:1px solid #3b3b3b;border-radius:15px;background-color:#3b3b3b;color:hsla(0,0%,100%,.68);font-size:13px}.bili-dropdown .dropdown-list .dropdown-item,.bili-dropdown .dropdown-list .dropdown-item:hover,.bili-dropdown:hover,.block-area .follow-wrapper .follow-head .follow-more:hover,.new-stat-module .zone-title .headline .new-stat-more:hover,.pgc-rank-dropdown .dropdown-list .dropdown-item:hover,.random-change:hover,.sec-rank .more-link:hover,.video-floor-m .zone-title .headline .link-more:hover{border-color:#505050;background-color:#505050}.bili-dropdown .dropdown-list{border:1px solid #505050!important}.dropdown-list{border-radius:0!important}.pgc-rank-list .rank-item .ri-num,.rank-list .rank-item .ri-num{border-radius:10px;background:#999;color:#fff}.bili-tab .bili-tab-item{color:#bcbcbc}.block-area .timeline-toggle-block .timeline-toggle-btn,.tag-more .b-toggle-btn{border-radius:0 0 15px 15px;background:#161819!important;background-color:#161819;box-shadow:0 3px 9px #131313;color:#ccc}.crumb ul .crumb-item a[data-v-71236f48],.index-entry-wrapper .filter-list .filter-item{color:#c3c3c3}bangumi-home-crumb .fcname ul.n_num li a{height:27px;color:hsla(0,0%,88.6%,.94);font-size:14px}.block-area .timeline-title .headline .name{float:left;color:hsla(0,0%,90.6%,.91);font-weight:400;font-size:24px;line-height:24px}.timeline-box .timeline-item .item-right a{display:block;height:100%;color:inherit;color:hsla(0,0%,90.6%,.91);text-align:left}.block-area .follow-wrapper .follow-head,.follow-item .details .season-title,.index-entry-wrapper .filter-block-title a,.index-entry-wrapper .filter-block-title span{color:hsla(0,0%,90.6%,.91)}.spread-module .num{background-color:#171819}.spread-module .t{color:hsla(0,0%,90.6%,.91)}.new-stat-module .zone-title .headline .name,.pgc-rank-list .rank-item .ri-detail .ri-title{color:#e7e7e8}.block-area .block-left .block-header .block-title,.handpick-right-module .block-header .block-title,.recom-right-head h3,.sec-rank .rank-head h3,.video-item-biref .biref-info .biref-title{color:hsla(0,0%,90.6%,.91)}.pgc-common-tab .bili-tab-item{color:hsla(0,0%,88.6%,.94)}.bangumi-home-crumb .fcname ul.n_num li,.bangumi-home-crumb .fcname ul.n_num li a,.sub-nav-m ul li a{color:hsla(0,0%,90.6%,.91)}.bili-tab .bili-tab-item,.energy-m .headline,.energy-m .hot-box li .txt,.energy-m .hot-box li:first-child .txt,.rank-list .rank-item .ri-detail .ri-title,.video-floor-m .zone-title .headline .name{color:#e2e2e2}.n .n-inner{background:#222;box-shadow:0 0 0 1px #222}.g-search input,.n .n-data .n-data-v{color:hsla(0,0%,90.6%,.91)}.g-search input{border:1px solid #222;background:#505050}#page-index .col-2 .section{border:1px solid #222;border-radius:10px;background:#222}.user .info .meta .row:first-child,section-title{color:hsla(0,0%,90.6%,.91)}#page-index .col-1{background:#222}.back-top-tools .tool-item,.go-top-m .go-top{border:0;background:rgba(80,80,80,.37)}.back-top-tools .tool-item:hover,.go-top-m .go-top:hover{background-color:#4a4b4e}.video-info-module{border:0;border-radius:10px;background-color:#222;-webkit-box-shadow:rgb(0 0 0/50%) 0 2px 4px;box-shadow:0 2px 4px rgb(0 0 0/50%)}.video-info-module .v-title{color:#e7e7e7}.mod-2 li .r .title,.tag-list-wrp .title .name,.video-floor-m .dynamic-title .title .name{color:#e1e1e1}.mod-2 li .r .up-info .v-author,.mod-2 li .r .v-desc,.mod-2 li .r .v-info .v-info-i,.tag-list li.tag-item .tag-a,.tag-list-wrp .title .small,.video-list .vl-hd .tab-list li{color:#bcbcbc}.tag-list li.tag-item{border:0;background-color:#3b3b3b}.mod-2 li,.video-list .vl-hd{border-bottom:1px solid hsla(0,0%,73.7%,.5)}.mod-2 li .l-item{border-right:1px solid hsla(0,0%,73.7%,.5)}.video-floor-m .dynamic-title .read-push{border:1px solid #3b3b3b;border-radius:15px;background-color:#3b3b3b}.video-floor-m .dynamic-title .read-push .info{color:#bcbcbc}.video-floor-m .dynamic-title .read-push:hover{border:1px solid #505050;background-color:#505050}.video-list .vl-hd .vl-hd-sub .selector-block .date-select{border-radius:15px;background:#3b3b3b;color:#bcbcbc}.mobile-link-l{opacity:.6}.pager .pages .page-item button:hover,.pager .pages .page-item.active button{border:1px solid rgba(0,161,214,.78);background:rgba(0,161,214,.78);color:hsla(0,0%,90.6%,.88)}.pager .pages .page-item button{margin-right:8px;border:1px solid #2b2b2b;background:#2b2b2b;color:#bcbcbc}.pager .jump-pager input[type=text]{border:0;border-radius:10px;background-color:#3b3b3b;color:#e1e1e1}`
                finalStyle = mainStyle + mainNav + footer + channelNav
            } else if (localCode == 18) {
                mainStyle = `.art_list li h2 a,.b-head .b-head-t,.topic-main .act-list ul li h2 a,.topic-main .topic-title .b-topic-t{color:#e1e1e1}.art_list li .info,.topic-main .act-list ul li .act-info,.topic-main .nav-tab li{color:#8e8e8e}.art_list li,.topic-main .act-list ul li{background:#222;margin:20px 0 0;padding:0 0 20px;border-bottom:1px solid #e5e9ef;border-radius:10px}.art_list li img,.topic-main .act-list ul li img{padding:10px 0 0 10px}.art_list li h2,.topic-main .act-list ul li h2{margin:25px 0 20px}.art_list li .info,.topic-main .act-list ul li .act-info,.topic-main .act-list ul li h2{padding:0 0 0 20px}.art_list li .artInfo,.topic-main .act-list ul li .found-time{padding:0 0 0 165px}`
                finalStyle = mainStyle + mainNav + footer
            } else if (localCode == 19) {
                mainStyle = `body{background:#161819!important}.card[data-v-fb77dc7a],.config[data-v-467e3e3e],.space-left[data-v-1c9150a9],.space-right .space-right-top .title[data-v-1c9150a9]{border-radius:15px;background-color:#222;-webkit-box-shadow:0 2px 4px 0 rgb(0 0 0/50%);box-shadow:0 2px 4px 0 rgb(0 0 0/50%)}.space-right[data-v-1c9150a9]{background-color:#2b2b2b}.link-progress-tv[data-v-42e02e95]{background-color:#222!important}.item a[data-v-7d37e619],.line-1 .name-field[data-v-657577a0],.title[data-v-7d37e619]{color:#bcbcbc}.line-1[data-v-657577a0]{color:#8e8e8e}.orginal-reply[data-v-8142435e],.text-box[data-v-8142435e],.text[data-v-e5050176]{color:#bcbcbc}.divider[data-v-1df9d092]{border-bottom:1px solid hsla(0,0%,73.7%,.5)}.side-bar .icon[data-v-7d37e619]{width:0;height:0;background:#222}.item[data-v-7d37e619]:before{color:hsla(0,0%,90.6%,.88)}`
                finalStyle = mainStyle + mainNav
            }
            // bug iframe框架 页面位置为0
            if (localCode == 0) {
                finalStyle = finalStyle + mainNav + `body{background:transparent;}`
            }
            //对深色模式样式进行保存
            sessionStorage.setItem("finalStyle", finalStyle);
        }

        //进行临时保存
        sessionStorage.setItem("kitDarkStyle", `
        .kitOuter[data-position*=center] {
            top: 95%;
            left: 3%;
            transform: translateY(-50%);
            -ms-transform: translateY(-50%);
            -moz-transform: translateY(-50%);
            -webkit-transform: translateY(-50%);
            -o-transform: translateY(-50%);
        }
        
        .kitOuter {
            position: fixed;
            z-index: 2333;
            top: 95%;
            left: 3%;
        }
        
        .kitOuterDark,
        .kit_dark {
            display: flex;
            flex-direction: column;
        }
        
        .kitOuterDark {
            display: none;
            width: 315px;
            height: 450px;
            border-radius: 15px;
            background-color: #222;
            box-shadow: 0 2px 4px #222;
        }
        
        .boxOuterDark,
        .center {
            display: flex;
        }
        
        .center {
            justify-content: center;
        }
        
        .boxSideLight {
            background-color: rgb(86 86 86);
        }
        
        .titleDark {
            color: #e1e1e1;
            padding: 10px;
            font-size: 13px;
        }
        
        .kit_getPic {
            margin-top: 8px;
        }
        
        .widthBox {
            display: flex;
            margin: 8px;
            margin-bottom: 0px;
            width: 298px;
            height: 50px;
            border-radius: 15px;
            background-color: #2b2b2b;
            box-shadow: 0 2px 8px #1d1d1d;
            border: 1px solid #2b2b2b;
        }
        
        .widthBox:hover {
            border: 1px solid #bcbcbc80;
        }
        
        .settingDark,
        .settingNormal {
            display: flex;
            margin: 10px;
            width: 40px;
            margin-left: -20px;
            height: 40px;
            border-radius: 10px;
        }
        
        .settingDark {
            background-color: #222;
            box-shadow: 0 2px 4px #222;
        }
        
        .boxSideDark {
            display: flex;
            width: 150px;
            height: 45px;
            border-radius: 15px;
            background-color: #2b2b2b;
            box-shadow: 0 2px 8px #1d1d1d;
            border: 1px solid #2b2b2b;
        }
        
        .boxSideDark:hover {
            border: 1px solid #bcbcbc80;
        }
        
        .boxMainDark:hover {
            border: 1px solid #bcbcbc80;
        }
        
        .boxMainDark {
            display: flex;
            margin: 0 8px 8px;
            width: 160px;
            height: 100px;
            border-radius: 15px;
            background-color: #2b2b2b;
            box-shadow: 0 2px 8px #1d1d1d;
            border: 1px solid #2b2b2b;
        }
        
        .icon_fix {
            display: flex;
            margin-left: 128px;
            color: #e1e1e1;
            font-size: 40px!important;
            justify-content: center!important;
            align-items: center!important;
        }
        
        .sideMargin {
            margin-right: 8px;
            margin-bottom: 8px;
        }
        
        .smallsize {
            font-size: 8px;
            margin-left: 10px;
        }
        
        .subtitleDark {
            color: #bcbcbc;
        }
        
        .icon_fix_dark_theme {
            display: flex;
            margin-left: 1px;
            color: #e1e1e1;
            font-size: 50px!important;
            justify-content: center!important;
            align-items: center!important;
        }
        
        .iconDark {
            padding: 10px 0 0 9px;
            color: #e1e1e1;
            font-size: 20px!important;
            width: 30px;
            height: 30px;
        }
        
        @font-face {
            font-family: "iconfont";
            /* Project id 2625254 */
            src: url('//at.alicdn.com/t/font_2625254_puryec1ehl.woff2?t=1624332498326') format('woff2'), url('//at.alicdn.com/t/font_2625254_puryec1ehl.woff?t=1624332498326') format('woff'), url('//at.alicdn.com/t/font_2625254_puryec1ehl.ttf?t=1624332498326') format('truetype');
        }
        
        .iconfont {
            font-family: "iconfont" !important;
            font-size: 16px;
            font-style: normal;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        
        .icon-shezhi:before {
            content: "\e6ed";
        }
        
        .icon-zhaopian:before {
            content: "\e64f";
        }
        
        .icon-zizhong:before {
            content: "\e603";
        }
        
        .icon-DarkTheme:before {
            content: "\e65a";
        }
    `); //工具栏深色模式应用的样式
        sessionStorage.setItem("kitDarkHtml", `
    <div class="kitOuter" data-position="left-center">
        <div class="kitOuterDark" id="kitCard">
            <div class="titleDark center">设置</div>
            <div class="kit_dark">
                <div class="titleDark">深色模式</div>
                <div class="boxOuterDark">
                    <div class="boxMainDark" id="0_tabs">
                        <div class="titleDark">Auto</div>
                        <div class="iconfont icon_fix_dark_theme">&#xe65a;</div>
                    </div>
                    <div class="sideOuter">
                        <div class="boxSideDark boxSideLight sideMargin" id="1_tabs">
                            <div class="titleDark">浅色</div>
                        </div>
                        <div class="boxSideDark" id="2_tabs">
                            <div class="titleDark">深色</div>
                        </div>
                    </div>
                </div>
                <div class="subtitleDark smallsize">*Auto:根据时区自动切换 日升时间 {{}} 日落时间{{}}</div>
            </div>
            <div class="kit_getPic">
                <div class="titleDark">提取视频封面</div>
                <div class="widthBox" id="3_tabs">
                    <div class="iconfont icon_fix">&#xe64f;</div>
                </div>
            </div>
            <div class="kit_getPic">
                <div class="titleDark">av/bv号获取</div>
                <div class="widthBox" id="4_tabs">
                    <div class="iconfont icon_fix">&#xe603;</div>
                </div>
            </div>
        </div>
    
    
        <div class="settingDark iconfont iconDark" id="setting">&#xe6ed;</div>
    </div>
    `); //工具栏深色模式HTML
        sessionStorage.setItem("kitLightStyle", `
    .kitOuter[data-position*=center] {
        top: 95%;
        left: 3%;
        transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        -o-transform: translateY(-50%);
    }
    
    .kitOuter {
        position: fixed;
        z-index: 2333;
        top: 95%;
        left: 3%;
    }
    
    .kitOuterDark,
    .kit_dark {
        display: flex;
        flex-direction: column;
    }
    
    .kitOuterDark {
        display: none;
        width: 315px;
        height: 450px;
        border-radius: 15px;
        background-color: #222;
        box-shadow: 0 2px 4px #222;
    }
    
    .titleLight {
        padding: 8px;
        color: #222;
    }
    
    .titleDark {
        color: #e1e1e1;
        padding: 10px;
        font-size: 13px;
    }
    
    .center {
        display: flex;
        justify-content: center;
    }
    
    .boxOuterDark {
        display: flex;
    }
    
    .boxMainLight {
        margin: 0 8px 8px;
        background-color: #a7a7a7!important;
        box-shadow: 0px 2px 4px #757575!important;
        border: 1px solid #a7a7a7;
    }
    
    .boxMainDark {
        display: flex;
        background-color: #2b2b2b;
        box-shadow: 0px 2px 8px #1d1d1d;
        border-radius: 15px;
        height: 100px;
        width: 140px;
        margin: 0 0 8px 8px!important;
        margin-top: 0px;
    }
    
    .icon_fix_dark_theme {
        display: flex;
        color: #e1e1e1;
        font-size: 50px !important;
        justify-content: center !important;
        align-items: center !important;
        margin-left: -3px;
    }
    
    .sideOuter {
        display: flex;
        flex-direction: column;
    }
    
    .boxSideLight {
        margin-left: 8px!important;
        background-color: rgb(86 86 86);
        border: 1px solid #a7a7a7;
    }
    
    .boxSideDark {
        display: flex;
        box-shadow: 0px 2px 8px #1d1d1d;
        border-radius: 15px;
        height: 45px;
        width: 150px;
    }
    
    .sideMargin {
        margin-right: 8px;
        margin-bottom: 8px;
    }
    
    .subtitleDark {
        color: #bcbcbc;
    }
    
    .smallsize {
        font-size: 8px;
        margin-left: 10px;
    }
    
    .kit_getPic {
        margin-top: 10px;
    }
    
    .widthBox {
        display: flex;
        background-color: #2b2b2b;
        box-shadow: 0px 2px 8px #1d1d1d;
        border-radius: 15px;
        width: 298px;
        height: 50px;
        margin-bottom: 0px;
        margin: 8px;
        border: 1px solid #2b2b2b;
    }
    
    .widthBox:hover {
        border: 1px solid #d4d1d1;
    }
    
    .boxSideDark:hover {
        border: 1px solid #d4d1d1;
    }
    
    .boxMainDark:hover {
        border: 1px solid #d4d1d1;
    }
    
    .icon_fix {
        display: flex;
        color: #e1e1e1;
        font-size: 40px !important;
        justify-content: center !important;
        align-items: center !important;
        margin-left: 128px;
    }
    
    .settingDark,
    .settingNormal {
        display: flex;
        margin: 10px;
        width: 40px;
        margin-left: -20px;
        height: 40px;
        border-radius: 10px;
    }
    
    .settingDark {
        background-color: #222;
        box-shadow: 0 2px 4px #222;
    }
    
    .settingNormal {
        background-color: rgb(196, 196, 196);
        box-shadow: 0px 2px 4px rgb(150, 150, 150);
    }
    
    .iconNormal {
        font-size: 21px !important;
        color: #202020;
        align-items: center;
        display: flex;
        padding-left: 8px;
        width: 30px;
    }
    
    @font-face {
        font-family: "iconfont";
        /* Project id 2625254 */
        src: url('//at.alicdn.com/t/font_2625254_puryec1ehl.woff2?t=1624332498326') format('woff2'), url('//at.alicdn.com/t/font_2625254_puryec1ehl.woff?t=1624332498326') format('woff'), url('//at.alicdn.com/t/font_2625254_puryec1ehl.ttf?t=1624332498326') format('truetype');
    }
    
    .iconfont {
        font-family: "iconfont" !important;
        font-size: 16px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    
    .icon-shezhi:before {
        content: "\e6ed";
    }
    
    .icon-zhaopian:before {
        content: "\e64f";
    }
    
    .icon-zizhong:before {
        content: "\e603";
    }
    
    .icon-DarkTheme:before {
        content: "\e65a";
    }
    
    .kitOuterLight {
        background-color: rgb(196, 196, 196);
        box-shadow: 0px 2px 4px rgb(168, 167, 167);
    }
    
    .subtitleLight {
        color: #3a3a3a!important;
    }
    
    .iconLight {
        color: #2b2b2b;
    }
    `); //工具栏深色模式应用的样式
        sessionStorage.setItem("kitLightHtml", `
    <div class="kitOuter" data-position="left-center">
    <div class="kitOuterLight kitOuterDark" id="kitCard">
        <div class="titleLight titleDark center">设置</div>
        <div class="kit_dark">
            <div class="titleLight titleDark">深色模式</div>
            <div class="boxOuterDark">
                <div class="boxMainLight boxMainDark" id="0_tabs">
                    <div class="titleLight titleDark">Auto</div>
                    <div class="iconfont icon_fix_dark_theme iconLight">&#xe65a;</div>
                </div>
                <div class="sideOuter">
                    <div class="boxMainLight boxSideDark boxSideLight sideMargin" id="1_tabs">
                        <div class="titleLight titleDark">浅色</div>
                    </div>
                    <div class="boxSideLight boxSideDark" id="2_tabs">
                        <div class="titleDark">深色</div>
                    </div>
                </div>
            </div>
            <div class="subtitleLight subtitleDark smallsize">*Auto:根据日升日落自动切换</div>
        </div>
        <div class="kit_getPic">
            <div class=" titleLight titleDark">提取视频封面</div>
            <div class="boxMainLight widthBox" id="3_tabs">
                <div class="iconfont icon_fix iconLight">&#xe64f;</div>
            </div>
        </div>
        <div class="kit_getPic">
            <div class="titleLight titleDark">av/bv号获取</div>
            <div class="boxMainLight widthBox" id="4_tabs">
                <div class="iconfont icon_fix iconLight">&#xe603;</div>
            </div>
        </div>
    </div>
    <div class="settingNormal iconfont iconNormal" id="setting">&#xe6ed;</div>
</div>
    `); //工具栏深色模式HTML

        //切换至深色模式
        function darkMode() {

            prt("darkMode()", localCode)

            //应用深色模式时 将页面背景颜色改为黑色
            document.body.style.backgroundColor = "#161819"
                //应用样式
            document.getElementById("modeStyle").innerHTML = sessionStorage.getItem("finalStyle");
            //切换前检查iframe框架
            if (localCode != 0) {
                //+应用工具栏深色模式样式 和 html
                document.getElementById("kitStyle").innerHTML = sessionStorage.getItem("kitDarkStyle");
                document.getElementById("kitHtml").innerHTML = sessionStorage.getItem("kitDarkHtml");
            }
        }
        //切换至浅色模式
        function lightMode() {
            prt("lightMode()")
                //应用浅色模式时 将页面背景颜色改为白色
            document.body.style.backgroundColor = "#fff"
                //应用样式
            document.getElementById("modeStyle").innerHTML = "";
            //切换前检查iframe框架
            // if (localCode != 0) {
            //+应用工具栏深色模式样式 和 html
            document.getElementById("kitStyle").innerHTML = sessionStorage.getItem("kitLightStyle");
            document.getElementById("kitHtml").innerHTML = sessionStorage.getItem("kitLightHtml");
            // }
        }

        //启动时对储存信息进行检测确认模式
        function checkStorage() {
            prt("checkStorage()")
            let value = localStorage.getItem("mode");
            if (value == "auto") {
                prt("自动模式")


                /*————————————————————————————————————————————————————————————————————
                SunRiseFallTime
                version: 0.2
                Author:ChenZihan
                License:GPL-3.0 License
                Github:https://github.com/ChenZihan-sudo/SunRiseFallTime
                ————————————————————————————————————————————————————————————————————*/
                var request = new XMLHttpRequest();
                request.open('GET', 'https://ip.seeip.org/geoip');
                request.send();
                request.onreadystatechange = function() {
                    var json = request.responseText;
                    var obj = eval('(' + json + ')');
                    // 经度
                    var longitude = obj.longitude;
                    //纬度
                    var latitude = obj.latitude;

                    var ip = obj.ip;

                    //时区计算
                    getZoneCode = longitude / 15
                    var zoneCodeB = -12.5
                    var zoneCodeE = -11.5
                    for (var i = 0; i < 40; i++) {
                        zoneCodeB++;
                        zoneCodeE++;
                        if (getZoneCode < zoneCodeB && getZoneCode < zoneCodeE) {
                            zoneCodeB--;
                            zoneCodeE--;
                            break;
                        }
                    }
                    //正午时间计算
                    zoneCode = zoneCodeB + 0.5;
                    zonelongitude = zoneCode * 15;
                    offsetLongitude = zonelongitude - longitude;
                    offsetTime = offsetLongitude / 15;
                    TimeOfNoonHour = 12 + offsetTime;

                    //太阳入射角a
                    var _date = new Date().getDate();
                    var _month = new Date().getMonth() + 1;

                    //获取当前月份的总天数
                    function getMonthDay() {
                        //https://blog.csdn.net/wanping321/article/details/78319638
                        //将月份下移到下一个月份，同时将日期设置为0；由于Date里的日期是1~31，所以Date对象自动跳转到上一个月的最后一天；getDate（）获取天数即可。
                        var date = new Date();
                        date.setMonth(date.getMonth() + 1);
                        date.setDate(0);
                        var days = date.getDate();
                        return days;
                    }

                    timeCode = _month + (_date / getMonthDay()) //可通过该月份具体天数提高精度

                    // console.log(_date, _month, timeCode)
                    //寿星公式计算 [Y×D+C]-L

                    //21世纪C值
                    var springC = 20.646
                    var summerC = 21.37
                    var autumnC = 23.042
                    var winterC = 21.94

                    var sY = new Date().getYear() - 100;
                    var sD = 0.2422;
                    var sL = sY / 4

                    function getSeasonalDay(C) {
                        day = (sY * sD + C) - sL
                        return day;
                    }

                    var sprDay = getSeasonalDay(springC)
                    var sumDay = getSeasonalDay(summerC)
                    var autDay = getSeasonalDay(autumnC)
                    var winDay = getSeasonalDay(winterC)

                    // console.log(sprDay, sumDay, autDay, winDay)

                    function getSeasonalCode(month, day) {
                        return month + (day / getMonthDay())
                    }
                    //可通过具体四时令时间提高精度
                    //春分
                    springCode = getSeasonalCode(3, sprDay)
                        //夏至
                    summerCode = getSeasonalCode(6, sumDay)
                        //秋分
                    autumnCode = getSeasonalCode(9, autDay)
                        //冬至
                    winterCode = getSeasonalCode(12, winDay)

                    // console.log(timeCode, springCode, summerCode, autumnCode, winterCode)

                    //角度转弧度
                    function radian(deg) {
                        var radian = deg * (Math.PI / 180)
                        return radian;
                    }
                    //弧度转角度
                    function deg(radian) {
                        var deg = radian * (180 / Math.PI)
                        return deg;
                    }

                    var α = null;
                    // var sunMaxDeg = 23.45; //可通过具体最大太阳入射角提高精度
                    var sunMaxDeg = 23.4333333;
                    // if (springCode < timeCode && timeCode < summerCode) {
                    //     var max = radian(90);
                    //     var min = radian(0);
                    //     var ratio = (timeCode - springCode) / (summerCode - springCode)
                    //     var toRadian = ratio * (max - min)
                    //     var transform = Math.sin(toRadian)
                    //     var finalDeg = transform * sunMaxDeg
                    //     α = finalDeg
                    //         //console.log(finalDeg)
                    // } else if (summerCode < timeCode && timeCode < autumnCode) {
                    //     var max = radian(90);
                    //     var min = radian(180);
                    //     var ratio = (timeCode - summerCode) / (autumnCode - summerCode)
                    //     var toRadian = ratio * (max - min)
                    //     var transform = Math.sin(toRadian)
                    //     var finalDeg = sunMaxDeg + (transform * sunMaxDeg)
                    //     α = finalDeg
                    //     console.log("--------", finalDeg)
                    // }
                    // 通过sin函数提高精度
                    if (springCode < timeCode && timeCode < summerCode) {
                        ratio = (timeCode - springCode) / (summerCode - springCode)
                        α = ratio * sunMaxDeg
                            // console.log("春-夏", α)
                    } else if (summerCode < timeCode && timeCode < autumnCode) {
                        ratio = (timeCode - summerCode) / (autumnCode - summerCode)
                        α = sunMaxDeg - (ratio * sunMaxDeg)
                            // console.log("夏-秋", α)
                    } else if (autumnCode < timeCode && timeCode < winterCode) {
                        ratio = (timeCode - autumnCode) / (winterCode - autumnCode)
                        α = -(ratio * sunMaxDeg)
                            // console.log("秋-冬", α)
                    } else if (timeCode < springCode || timeCode > winterCode) {
                        if (timeCode > winterCode) {
                            ratio = (timeCode - winterCode) / ((13 - winterCode) + (springCode - 1))
                        } else if (timeCode < springCode) {
                            ratio = ((timeCode - 1) + (13 - winterCode)) / ((13 - winterCode) + (springCode - 1))
                        }
                        α = -(sunMaxDeg - (ratio * sunMaxDeg))
                            // console.log("冬-春", α)
                    } else if (timeCode == springCode) {
                        α = 0;
                        // console.log("春分", α)
                    } else if (timeCode == summerCode) {
                        α = sunMaxDeg;
                        // console.log("夏至", α)
                    } else if (timeCode == autumnCode) {
                        α = 0;
                        // console.log("秋分", α)
                    } else if (timeCode == winterCode) {
                        α = sunMaxDeg;
                        // console.log("冬至", α)
                    }

                    //白天角度计算


                    var tanθ = Math.tan(radian(latitude))
                    var tanα = Math.tan(radian(α))
                    var cosβ = tanθ * tanα
                    if (cosβ > 1) {
                        // console.log("白昼或黑昼")
                        if (latitude > 0) { console.log("白昼") } else { console.log("黑昼") }
                    } else {
                        var doubleβ = 2 * deg(Math.acos(cosβ))
                        var lightDeg = 360 - doubleβ
                        var lightTime = (lightDeg / 360) * 24

                        // console.log(tanθ, tanα, cosβ, doubleβ, lightDeg, lightTime)

                        sunRiseTime = TimeOfNoonHour - (lightTime / 2)
                        sunFallTime = TimeOfNoonHour + (lightTime / 2)

                        var sunRiseTimeMinute = (sunRiseTime.toString().replace(/\d+\.(\d*)/, "$1") * 60).toString().substring(0, 4)
                        var sunFallTimeMinute = (sunFallTime.toString().replace(/\d+\.(\d*)/, "$1") * 60).toString().substring(0, 4)
                        var sunRiseTimeHour = parseInt(sunRiseTime)
                        var sunFallTimeHour = parseInt(sunFallTime)
                            // console.log(sunRiseTimeMinute, sunFallTimeMinute, sunRiseTimeHour, sunFallTimeHour)

                        // if (sunRiseTimeMinute > 6000) {
                        //     sunRiseTimeMinute = "0" + (sunRiseTimeMinute - 6000).toString()
                        //     var rounded = sunRiseTimeMinute.substring(2, 4)
                        //     console.log(rounded)
                        //     sunRiseTimeHour++;
                        // } else if (sunFallTimeMinute > 6000) {
                        //     sunFallTimeMinute = "0" + (sunFallTimeMinute - 6000).toString()
                        //     var rounded = sunRiseTimeMinute.substring(2, 4)
                        //     console.log(rounded)
                        //     sunFallTimeHour++;
                        // }
                        function handle(TimeMinute, TimeHour, code) {
                            if (TimeMinute > 6000) {
                                TimeMinute = "0" + (TimeMinute - 6000).toString()
                                TimeHour++;
                            }
                            var rounded = TimeMinute.substring(2, 4)
                            if (rounded > 44) { TimeMinute = TimeMinute.substring(0, 2) + 1 } else { TimeMinute = TimeMinute.substring(0, 2) }
                            if (code == 0) { sunRiseTimeMinute = TimeMinute, sunRiseTimeHour = TimeHour } else {
                                { sunFallTimeMinute = TimeMinute, sunFallTimeHour = TimeHour }
                            }
                        }
                        handle(sunRiseTimeMinute, sunRiseTimeHour, 0)
                        handle(sunFallTimeMinute, sunFallTimeHour, 1)
                        sunRiseDpy = sunRiseTimeHour + ":" + sunRiseTimeMinute
                        sunFallDpy = sunFallTimeHour + ":" + sunFallTimeMinute
                            // console.log(sunRiseTimeMinute, sunFallTimeMinute, sunRiseTimeHour, sunFallTimeHour)

                        // console.log("日出时间:", sunRiseDpy, "日落时间:", sunFallDpy, sunRiseTimeHour, sunFallTimeHour)
                        console.log("日出时间:", sunRiseDpy, "日落时间:", sunFallDpy, "本机ip:", ip)

                        var nowHour = new Date().getHours()
                        var nowMinute = new Date().getMinutes()

                        function getTimeCode(hour, minute) {
                            return hour + (minute / 60)
                        }
                        var nowTimeCode = getTimeCode(nowHour, nowMinute)
                        var sunRiseTimeCode = getTimeCode(sunRiseTimeHour, sunRiseTimeMinute)
                        var sunFallTimeCode = getTimeCode(sunFallTimeHour, sunRiseTimeMinute)
                        if (nowTimeCode > sunRiseTimeCode && nowTimeCode < sunFallTimeCode) {
                            console.log("浅色模式")
                            lightMode()
                        } else {
                            console.log("深色模式")
                            darkMode()
                        }
                    }
                }

                //————————————————————————————————————————————————————————————————————           
            } else if (value == "dark") {
                console.log(value)
                prt("深色模式", localStorage.getItem("mode"))
                darkMode()
            } else if (value == "light") {
                prt("浅色模式")
                lightMode()
            } else if (value == null) {
                //未设置时默认深色模式 启用深色模式
                prt("添加")
                localStorage.setItem("mode", "dark")
                darkMode()
            }
        }
        /*加载工具栏
          1.创建工具栏节点
          2.工具栏html
          3.工具栏js
        */

        function loadKit() {

            prt("loadKit")
                //bug iframe框架避免添加工具
            if (localCode != 0) {
                // //工具HTML
                // let kitHtml = document.createElement("div")
                // document.querySelector("body").appendChild(kitHtml);
                // kitHtml.id = "kitHtml";

                // //工具CSS
                // let kitStyle = document.createElement("style");
                // document.querySelector("body").appendChild(kitStyle);
                // kitStyle.id = "kitStyle"

                //工具JS
                let kitScript = document.createElement("script");
                document.querySelector("body").appendChild(kitScript);
                kitScript.id = "kitScript"
                kitScript.innerHTML = `
                setTimeout(() => {
                    //鼠标移动至按钮时-设置按钮-显示卡片
                    //鼠标移动至卡片时-传值给isOpen-取消关闭
                    let isOpen = null;
                    //自动模式计时器
                    let autoTimer;
                    //打印
                    let prt = console.log
                
                
                    prt("内置已启动")
                
                    console.log("启动---")
                
                    function mouseEvent() {
                        //鼠标进入按钮
                        $(document).ready(function() {
                            $("#setting").mouseenter(function() {
                                //显示卡片
                                document.getElementById("kitCard").style = "display:flex;"
                                document.getElementsByClassName("kitOuter")[0].style = "top: 61.4%;left: 3%;"
                                prt("鼠标进入按钮")
                            });
                        });
                        //鼠标移出按钮
                        $(document).ready(function() {
                            $("#setting").mouseleave(function() {
                                prt("鼠标移出按钮")
                                    //等待检查鼠标是否进入卡片
                                setTimeout(() => {
                                    if (isOpen == true) {
                                        //归位
                                        isOpen = null;
                                        document.getElementById("kitCard").style = "display:flex;"
                                        document.getElementsByClassName("kitOuter")[0].style = "top: 61.4%;left: 3%;"
                                    } else {
                                        document.getElementById("kitCard").style = "display:none;"
                                        document.getElementsByClassName("kitOuter")[0].style = "top: 95%;left: 3%;"
                                        isOpen = null;
                                    }
                                }, 300);
                            });
                        });
                        //鼠标进入卡片
                        $(document).ready(function() {
                
                            $("#kitCard").mouseenter(function() {
                                prt("鼠标进入卡片")
                                isOpen = true;
                            });
                        });
                
                        //鼠标移出卡片
                        $(document).ready(function() {
                
                            $("#kitCard").mouseleave(function() {
                                prt("鼠标移出卡片")
                                    //隐藏卡片
                                document.getElementById("kitCard").style = "display:none;"
                                document.getElementsByClassName("kitOuter")[0].style = "top: 95%;left: 3%;"
                
                            });
                        });
                
                    }
                
                    mouseEvent()
                
                    let modeNow = null;
                    //初始化-检查存储信息-对所选模式进行显示边框-引导运行
                    function checkStorage() {
                        prt("checkStorage")
                        let value = localStorage.getItem("mode");
                        //设置初始边框
                        for (i = 0; i < 3; i++) {
                            document.getElementById(i + "_tabs").style = ""
                        }
                        if (value == "auto") {
                            autoModeCheck()
                        } else if (value == "light") {
                            modeNow = "light";
                
                            document.getElementById("1_tabs").style = "border: 1px solid #efeeee80;"
                        } else if (value == "dark") {
                            modeNow = "dark"
                            document.getElementById("2_tabs").style = "border: 1px solid #bcbcbc80;"
                        }
                    }
                    checkStorage()
                
                    //自动模式检查
                    function autoModeCheck() {
                
                        prt("auto模式")
                        checkMode()
                            //检查模式
                
                        function checkMode() {
                            prt("auto模式->检查")
                
                
                            /*————————————————————————————————————————————————————————————————————
                            SunRiseFallTime
                            version: 0.2
                            Author:ChenZihan
                            License:GPL-3.0 License
                            Github:https://github.com/ChenZihan-sudo/SunRiseFallTime
                            ————————————————————————————————————————————————————————————————————*/
                            var request = new XMLHttpRequest();
                            request.open('GET', 'https://ip.seeip.org/geoip');
                            request.send();
                            request.onreadystatechange = function() {
                                var json = request.responseText;
                                var obj = eval('(' + json + ')');
                                // 经度
                                var longitude = obj.longitude;
                                //纬度
                                var latitude = obj.latitude;
                
                                var ip = obj.ip;
                
                                //时区计算
                                getZoneCode = longitude / 15
                                var zoneCodeB = -12.5
                                var zoneCodeE = -11.5
                                for (var i = 0; i < 40; i++) {
                                    zoneCodeB++;
                                    zoneCodeE++;
                                    if (getZoneCode < zoneCodeB && getZoneCode < zoneCodeE) {
                                        zoneCodeB--;
                                        zoneCodeE--;
                                        break;
                                    }
                                }
                                //正午时间计算
                                zoneCode = zoneCodeB + 0.5;
                                zonelongitude = zoneCode * 15;
                                offsetLongitude = zonelongitude - longitude;
                                offsetTime = offsetLongitude / 15;
                                TimeOfNoonHour = 12 + offsetTime;
                
                                //太阳入射角a
                                var _date = new Date().getDate();
                                var _month = new Date().getMonth() + 1;
                
                                //获取当前月份的总天数
                                function getMonthDay() {
                                    //https://blog.csdn.net/wanping321/article/details/78319638
                                    //将月份下移到下一个月份，同时将日期设置为0；由于Date里的日期是1~31，所以Date对象自动跳转到上一个月的最后一天；getDate（）获取天数即可。
                                    var date = new Date();
                                    date.setMonth(date.getMonth() + 1);
                                    date.setDate(0);
                                    var days = date.getDate();
                                    return days;
                                }
                
                                timeCode = _month + (_date / getMonthDay()) //可通过该月份具体天数提高精度
                
                                // console.log(_date, _month, timeCode)
                                //寿星公式计算 [Y×D+C]-L
                
                                //21世纪C值
                                var springC = 20.646
                                var summerC = 21.37
                                var autumnC = 23.042
                                var winterC = 21.94
                
                                var sY = new Date().getYear() - 100;
                                var sD = 0.2422;
                                var sL = sY / 4
                
                                function getSeasonalDay(C) {
                                    day = (sY * sD + C) - sL
                                    return day;
                                }
                
                                var sprDay = getSeasonalDay(springC)
                                var sumDay = getSeasonalDay(summerC)
                                var autDay = getSeasonalDay(autumnC)
                                var winDay = getSeasonalDay(winterC)
                
                                // console.log(sprDay, sumDay, autDay, winDay)
                
                                function getSeasonalCode(month, day) {
                                    return month + (day / getMonthDay())
                                }
                                //可通过具体四时令时间提高精度
                                //春分
                                springCode = getSeasonalCode(3, sprDay)
                                    //夏至
                                summerCode = getSeasonalCode(6, sumDay)
                                    //秋分
                                autumnCode = getSeasonalCode(9, autDay)
                                    //冬至
                                winterCode = getSeasonalCode(12, winDay)
                
                                // console.log(timeCode, springCode, summerCode, autumnCode, winterCode)
                
                                //角度转弧度
                                function radian(deg) {
                                    var radian = deg * (Math.PI / 180)
                                    return radian;
                                }
                                //弧度转角度
                                function deg(radian) {
                                    var deg = radian * (180 / Math.PI)
                                    return deg;
                                }
                
                                var α = null;
                                // var sunMaxDeg = 23.45; //可通过具体最大太阳入射角提高精度
                                var sunMaxDeg = 23.4333333;
                                // if (springCode < timeCode && timeCode < summerCode) {
                                //     var max = radian(90);
                                //     var min = radian(0);
                                //     var ratio = (timeCode - springCode) / (summerCode - springCode)
                                //     var toRadian = ratio * (max - min)
                                //     var transform = Math.sin(toRadian)
                                //     var finalDeg = transform * sunMaxDeg
                                //     α = finalDeg
                                //         //console.log(finalDeg)
                                // } else if (summerCode < timeCode && timeCode < autumnCode) {
                                //     var max = radian(90);
                                //     var min = radian(180);
                                //     var ratio = (timeCode - summerCode) / (autumnCode - summerCode)
                                //     var toRadian = ratio * (max - min)
                                //     var transform = Math.sin(toRadian)
                                //     var finalDeg = sunMaxDeg + (transform * sunMaxDeg)
                                //     α = finalDeg
                                //     console.log("--------", finalDeg)
                                // }
                                // 通过sin函数提高精度
                                if (springCode < timeCode && timeCode < summerCode) {
                                    ratio = (timeCode - springCode) / (summerCode - springCode)
                                    α = ratio * sunMaxDeg
                                        // console.log("春-夏", α)
                                } else if (summerCode < timeCode && timeCode < autumnCode) {
                                    ratio = (timeCode - summerCode) / (autumnCode - summerCode)
                                    α = sunMaxDeg - (ratio * sunMaxDeg)
                                        // console.log("夏-秋", α)
                                } else if (autumnCode < timeCode && timeCode < winterCode) {
                                    ratio = (timeCode - autumnCode) / (winterCode - autumnCode)
                                    α = -(ratio * sunMaxDeg)
                                        // console.log("秋-冬", α)
                                } else if (timeCode < springCode || timeCode > winterCode) {
                                    if (timeCode > winterCode) {
                                        ratio = (timeCode - winterCode) / ((13 - winterCode) + (springCode - 1))
                                    } else if (timeCode < springCode) {
                                        ratio = ((timeCode - 1) + (13 - winterCode)) / ((13 - winterCode) + (springCode - 1))
                                    }
                                    α = -(sunMaxDeg - (ratio * sunMaxDeg))
                                        // console.log("冬-春", α)
                                } else if (timeCode == springCode) {
                                    α = 0;
                                    // console.log("春分", α)
                                } else if (timeCode == summerCode) {
                                    α = sunMaxDeg;
                                    // console.log("夏至", α)
                                } else if (timeCode == autumnCode) {
                                    α = 0;
                                    // console.log("秋分", α)
                                } else if (timeCode == winterCode) {
                                    α = sunMaxDeg;
                                    // console.log("冬至", α)
                                }
                
                                //白天角度计算
                
                
                                var tanθ = Math.tan(radian(latitude))
                                var tanα = Math.tan(radian(α))
                                var cosβ = tanθ * tanα
                                if (cosβ > 1) {
                                    // console.log("白昼或黑昼")
                                    if (latitude > 0) { console.log("白昼") } else { console.log("黑昼") }
                                } else {
                                    var doubleβ = 2 * deg(Math.acos(cosβ))
                                    var lightDeg = 360 - doubleβ
                                    var lightTime = (lightDeg / 360) * 24
                
                                    // console.log(tanθ, tanα, cosβ, doubleβ, lightDeg, lightTime)
                
                                    sunRiseTime = TimeOfNoonHour - (lightTime / 2)
                                    sunFallTime = TimeOfNoonHour + (lightTime / 2)
                
                                    var sunRiseTimeMinute = (sunRiseTime.toString().replace(/\d+\.(\d*)/, "$1") * 60).toString().substring(0, 4)
                                    var sunFallTimeMinute = (sunFallTime.toString().replace(/\d+\.(\d*)/, "$1") * 60).toString().substring(0, 4)
                                    var sunRiseTimeHour = parseInt(sunRiseTime)
                                    var sunFallTimeHour = parseInt(sunFallTime)
                                        // console.log(sunRiseTimeMinute, sunFallTimeMinute, sunRiseTimeHour, sunFallTimeHour)
                
                                    // if (sunRiseTimeMinute > 6000) {
                                    //     sunRiseTimeMinute = "0" + (sunRiseTimeMinute - 6000).toString()
                                    //     var rounded = sunRiseTimeMinute.substring(2, 4)
                                    //     console.log(rounded)
                                    //     sunRiseTimeHour++;
                                    // } else if (sunFallTimeMinute > 6000) {
                                    //     sunFallTimeMinute = "0" + (sunFallTimeMinute - 6000).toString()
                                    //     var rounded = sunRiseTimeMinute.substring(2, 4)
                                    //     console.log(rounded)
                                    //     sunFallTimeHour++;
                                    // }
                                    function handle(TimeMinute, TimeHour, code) {
                                        if (TimeMinute > 6000) {
                                            TimeMinute = "0" + (TimeMinute - 6000).toString()
                                            TimeHour++;
                                        }
                                        var rounded = TimeMinute.substring(2, 4)
                                        if (rounded > 44) { TimeMinute = TimeMinute.substring(0, 2) + 1 } else { TimeMinute = TimeMinute.substring(0, 2) }
                                        if (code == 0) { sunRiseTimeMinute = TimeMinute, sunRiseTimeHour = TimeHour } else {
                                            { sunFallTimeMinute = TimeMinute, sunFallTimeHour = TimeHour }
                                        }
                                    }
                                    handle(sunRiseTimeMinute, sunRiseTimeHour, 0)
                                    handle(sunFallTimeMinute, sunFallTimeHour, 1)
                                    sunRiseDpy = sunRiseTimeHour + ":" + sunRiseTimeMinute
                                    sunFallDpy = sunFallTimeHour + ":" + sunFallTimeMinute
                                        // console.log(sunRiseTimeMinute, sunFallTimeMinute, sunRiseTimeHour, sunFallTimeHour)
                
                                    // console.log("日出时间:", sunRiseDpy, "日落时间:", sunFallDpy, sunRiseTimeHour, sunFallTimeHour)
                                    console.log("日出时间:", sunRiseDpy, "日落时间:", sunFallDpy, "本机ip:", ip)
                
                                    var nowHour = new Date().getHours()
                                    var nowMinute = new Date().getMinutes()
                
                                    function getTimeCode(hour, minute) {
                                        return hour + (minute / 60)
                                    }
                                    var nowTimeCode = getTimeCode(nowHour, nowMinute)
                                    var sunRiseTimeCode = getTimeCode(sunRiseTimeHour, sunRiseTimeMinute)
                                    var sunFallTimeCode = getTimeCode(sunFallTimeHour, sunRiseTimeMinute)
                                    if (nowTimeCode > sunRiseTimeCode && nowTimeCode < sunFallTimeCode) {
                                        console.log("浅色模式")
                                        lightMode()
                                        document.getElementById("0_tabs").style = "border: 1px solid #efeeee80;"
                                        modeNow = "light"
                                    } else {
                                        console.log("深色模式")
                                        darkMode()
                                        document.getElementById("0_tabs").style = "border: 1px solid #bcbcbc80;"
                                        modeNow = "dark"
                                    }
                                }
                            }
                
                            //————————————————————————————————————————————————————————————————————
                        }
                        autoTimer = setInterval(function() { checkMode() }, 60000);
                    }
                
                
                    //切换至深色模式
                    function darkMode() {
                        prt("深色模式")
                            //应用深色模式时 将页面背景颜色改为黑色
                        document.body.style.backgroundColor = "#161819"
                            //应用样式
                        document.getElementById("modeStyle").innerHTML = sessionStorage.getItem("finalStyle");
                        // //+应用工具栏深色模式样式 和 html
                        document.getElementById("kitStyle").innerHTML = sessionStorage.getItem("kitDarkStyle");
                        document.getElementById("kitHtml").innerHTML = sessionStorage.getItem("kitDarkHtml");
                        mouseEvent()
                        listener()
                    }
                    //切换至浅色模式
                    function lightMode() {
                        prt("浅色模式")
                            //应用浅色模式时 将页面背景颜色改为白色
                        document.body.style.backgroundColor = "#fff"
                            //应用样式
                        document.getElementById("modeStyle").innerHTML = "";
                        // //+应用工具栏深色模式样式 和 html
                        document.getElementById("kitStyle").innerHTML = sessionStorage.getItem("kitLightStyle");
                        document.getElementById("kitHtml").innerHTML = sessionStorage.getItem("kitLightHtml");
                        mouseEvent()
                        listener()
                    }
                
                
                    function listener() {
                        console.log("添加监听器")
                            //模式被点击后设置边框并应用模式以及启用工具-先遍历后应用
                        document.getElementById("0_tabs").addEventListener('click', function() { click(0) }); //添加按钮监听
                        document.getElementById("1_tabs").addEventListener('click', function() { click(1) }); //添加按钮监听
                        document.getElementById("2_tabs").addEventListener('click', function() { click(2) }); //添加按钮监听
                        document.getElementById("3_tabs").addEventListener('click', function() { click(3) }); //添加按钮监听
                        document.getElementById("4_tabs").addEventListener('click', getAid); //添加按钮监听
                    }
                    listener()
                
                    // //事件转接
                    // function getPic() {
                    //     click(3)
                    // }
                    function getAid() {
                        click(4)
                    }
                
                    function click(numId) {
                        prt("接收到的模式id", numId)
                
                        //模式切换
                        if (numId < 3) {
                            for (var i = 0; i < 3; i++) {
                                document.getElementById(i + "_tabs").style = ""
                            }
                            let color = null;
                            if (modeNow = "dark") {
                                color = "#bcbcbc80;"
                            } else if (modeNow = "light") {
                                color = "#efeeee80;"
                            }
                            if (numId == 0) {
                                console.log(numId)
                                localStorage.setItem("mode", "auto")
                                autoModeCheck()
                                document.getElementById("0_tabs").style = "border: 1px solid " + color
                            } //auto
                            else if (numId == 1) {
                                console.log(numId)
                                localStorage.setItem("mode", "light")
                                clearInterval(autoTimer)
                                lightMode()
                                document.getElementById("1_tabs").style = "border: 1px solid " + color
                            } //浅色模式
                            else if (numId == 2) {
                                console.log(numId)
                                localStorage.setItem("mode", "dark")
                                clearInterval(autoTimer)
                                darkMode()
                                document.getElementById("2_tabs").style = "border: 1px solid " + color
                            } //深色模式
                
                        } else if (numId == 3) {
                            console.log("提取视频封面")
                            if (window.bvid != undefined || window.aid != undefined) {
                
                                var request = new XMLHttpRequest();
                                if (window.bvid != undefined) {
                                    request.open('GET', 'https://api.bilibili.com/x/web-interface/view?bvid=' + window.bvid);
                                } else if (window.aid != undefined) {
                                    request.open('GET', 'https://api.bilibili.com/x/web-interface/view?aid=' + window.aid);
                                }
                                request.send();
                
                                request.onreadystatechange = function() {
                                    var parent = document.getElementById("3_tabs");
                                    var childLength = parent.childNodes.length
                                    for (var i = 0; i < childLength; i++) {
                                        parent.removeChild(parent.childNodes[0]);
                                    }
                                    var json = request.responseText;
                                    var obj = JSON.parse(json);
                                    var aid = obj.data.aid
                                    var bvid = obj.data.bvid
                                    var url = obj.data.pic;
                                    var node = document.createElement("div");
                                    var node1 = document.createElement("a");
                                    var node2 = document.createElement("a");
                                    node1.innerText = "打开";
                                    node2.innerText = "下载";
                                    node1.id = "openPic";
                                    node2.id = "downPic";
                                    node.style = "display: flex;height: inherit;width: inherit;justify-content: space-evenly;justify-content: space-evenly;align-items: center;";
                                    node1.style = "color: rgb(225, 225, 225);font-size: 13px;height: 40px;width: 60px;display: flex;align-items: center;background: #333333;border-radius: 12px;justify-content: center;";
                                    node2.style = "color: rgb(225, 225, 225);font-size: 13px;height: 40px;width: 60px;display: flex;align-items: center;background: #333333;border-radius: 12px;justify-content: center;";
                                    node.appendChild(node1);
                                    node.appendChild(node2);
                                    parent.appendChild(node);
                                    document.getElementById("openPic").addEventListener('click', function() { openPic(url) }); //添加按钮监听
                                    document.getElementById("downPic").addEventListener('click', function() {
                                        window.open(url + "?download=true&aid=" + aid + "&bvid=" + bvid)
                                    });
                                    node2.href = url;
                                    node2.download = "cover_" + bvid + ".png"
                                }
                
                            } else {
                                // ------------------
                                var parent = document.getElementById("3_tabs");
                                var childLength = parent.childNodes.length
                                for (var i = 0; i < childLength; i++) {
                                    parent.removeChild(parent.childNodes[0]);
                                }
                
                                var node = document.createElement("div");
                                node.innerText = "未在视频页"
                                node.style = "color: #e1e1e1;font-size: 13px;"
                                var divNode = document.createElement("div");
                                divNode.style = "display: flex;height: inherit;width: inherit;flex-direction: column;align-items: center;justify-content: center;"
                                divNode.appendChild(node);
                                parent.appendChild(divNode);
                                // ------------------
                            }
                        } else if (numId == 4) {
                            //av/bv号获取
                            console.log("av/bv号获取")
                                //终止点击事件
                            document.getElementById("4_tabs").removeEventListener('click', getAid);
                            var parent = document.getElementById("4_tabs");
                            var childLength = parent.childNodes.length
                            for (var i = 0; i < childLength; i++) {
                                parent.removeChild(parent.childNodes[0]);
                            }
                            if (window.bvid != undefined || window.aid != undefined) {
                                var node1 = document.createElement("div");
                                node1.innerText = "av" + window.aid
                                node1.style = "color: #e1e1e1;font-size: 13px;"
                                var node2 = document.createElement("div");
                                node2.innerText = window.bvid
                                node2.style = "color: #e1e1e1;font-size: 13px;"
                                var divNode = document.createElement("div");
                                divNode.style = "display: flex;height: inherit;width: inherit;flex-direction: column;align-items: center;justify-content: center;"
                                divNode.appendChild(node1);
                                divNode.appendChild(node2);
                                parent.appendChild(divNode);
                            } else {
                                var node = document.createElement("div");
                                node.innerText = "未在视频页"
                                node.style = "color: #e1e1e1;font-size: 13px;"
                                var divNode = document.createElement("div");
                                divNode.style = "display: flex;height: inherit;width: inherit;flex-direction: column;align-items: center;justify-content: center;"
                                divNode.appendChild(node);
                                parent.appendChild(divNode);
                            }
                        }
                    }
                
                    function openPic(url) {
                        window.open(url)
                    }
                }, 3000);
            `
            }
            // for (var i = 0; i < 5; i++) {
            //     document.getElementById(i + "_tabs").addEventListener('click', prt('hello')); //添加按钮监听
            // }

        }

        /*
        工具栏js
        1.网页悬浮
        2.设置触发器 1min 在自动模式下 切换深浅色->
        3.提取视频封面
        4.av/bv号获取
        */

        //引导-计数-避免重复加载
        function guide() {
            //避免重复加载
            if (sessionStorage.getItem("loadTimes") == null) {
                sessionStorage.setItem("loadTimes", 1);
                loadStyle()
                checkLocal()
                checkStorage()
                loadKit()
            } else {
                prt("重复刷新")
            }
        }
        guide()

        window.onbeforeunload = function() {
            sessionStorage.removeItem("loadTimes");
        }
    }

    function down() {
        var w = location.search
        if (w.search("download") == 1) {

            function whichApp() {
                var appName = window.clientInformation.userAgent

                if (appName.search("Chrome")) return "Chrome";
                else if (appName.search("Firefox")) return "Firefox";
            }
            prt(whichApp())

            if (whichApp() == "Chrome") {
                var times = 0;
                var timer = setInterval(() => {
                    prt("启动")
                    location.replace = "about:blank";
                    main();
                    times++;
                }, 100);
                if (times > 7) clearInterval(timer);
            } else main();

            function main() {
                function getQueryString(name) {
                    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                    var r = window.location.search.substr(1).match(reg);
                    if (r !== null) return unescape(r[2]);
                    return null;
                };
                var frame = `
                    <div></div>
                    <script>
                        var node = document.createElement("a");
                        node.innerText = "下载";
                        node.id = "downPic";
                        node.style = "color: rgb(225, 225, 225);font-size: 13px;height: 40px;width: 60px;display: flex;align-items: center;background: #333333;border-radius: 12px;justify-content: center;";
                        node.href = "` + location.href + `";
                        node.download = "Bilibili_` + getQueryString("bvid") + `.png";
                        document.body.appendChild(node);
                        var img = document.createElement("img");
                        img.id = "imgPic";
                        img.src = "` + location.href + `";
                        document.body.appendChild(img);
                    </script>`;

                with(document) {
                    write(frame);
                    void(close());
                };
                downPic.click();
            }
        }
    }
})();