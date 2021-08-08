// ==UserScript==
// @name         BTEST
// @namespace    https://github.com/ChenZihan-sudo/BilibiliDarkMode
// @version      0.5.1
// @description  熬夜必备 呵护眼睛 沉浸体验 优化布局 适用于网页端 深色/夜间/黑色/暗色模式  （新增工具箱：深色模式可以选择随日出日落自动切换及自由切换深浅色 调节页面亮度 关闭广告 提取封面 等功能）
// @author       ChenZihan
// @match        https://*.bilibili.com/*
// @match        http://*.hdslb.com/bfs/archive/*
// @grant        none
// @license      GPL-3.0
// ==/UserScript==
(function () {
    //查找域名
    var webHost = location.hostname;
    //调试用
    var prt = console.log;
    if (webHost != "i0.hdslb.com" && webHost != "i1.hdslb.com" && webHost != "i2.hdslb.com")
        main();
    else down();

    function main() {

        //globalVarible
        var mainBg, sty;
        var isOnLoad = false;

        window.onload = function () {
            isOnLoad = true;
            //add kit card btn and mouse on event
            kit_mouseEvent();
            kit_addE();

            if (i == 5) {
                document.getElementsByClassName("plp-r")[0].addEventListener("click", Local_tranE);
            }
            if (i == 6) {
                document.getElementById("reco_list").addEventListener("click", Local_tranE);
            }
            if (i == 12) {
                setTimeout(() => {
                    document.getElementsByClassName("n-tab-links")[0].addEventListener("click", function () {
                        setTimeout(() => {
                            location.reload();
                        }, 100);
                    });
                    document.getElementsByClassName("n-tab-links")[1].addEventListener("click", function () {
                        setTimeout(() => {
                            location.reload();
                        }, 100);
                    });
                }, 500);
            }
            if (i == 25) {
                jsFix_25();
            }

            // load auto mode to check sun rise or fall, then set information on kit
            auto(false, false, false);

        };

        //add style and event of kit
        function Local_tranE() {
            index();
            kit_addE();
            kit_mouseEvent();
        }

        //set position of card and setting
        function kit_setP() {
            var timer = setInterval(() => {
                if (document.getElementsByClassName("set_Pfix")[0] != (null || undefined)) {
                    clearInterval(timer);
                    //get page height and width
                    var height = document.documentElement.clientHeight;
                    // var width = document.documentElement.clientWidth

                    //get setting outer
                    var setting = document.getElementsByClassName("set_Pfix")[0];

                    var distance = 10; //distance to the bottom and left of page
                    var settingHeight = 43;//setting height
                    var top = height - (settingHeight / 2) - distance;
                    var left = (settingHeight / 2) + distance;
                    setting.style = "top:" + top + "px;left:" + left + "px;";

                    //get kit outer
                    var card = document.getElementsByClassName("card_Pfix")[0];
                    var cardHeight = 450;
                    // var cardWidth = 315;

                    //keep the card on the top (5px) of setting 
                    var card_top = height - (cardHeight / 2) - distance;
                    var card_left = distance;
                    card.style = "top:" + card_top + "px;left:" + card_left + "px;";
                }
            }, 100);
        }
        //window size changed set position of kit
        window.onresize = function () {
            kit_setP();
        };
        //await isOnLoad is true, then add it again
        var mouseETimer = setInterval(() => {
            if (isOnLoad == true) {
                clearInterval(mouseETimer);
                setTimeout(() => {
                    kit_mouseEvent();
                }, 1000);
            }
        }, 100);


        //kit_mouseEvent
        function kit_mouseEvent() {
            if (i != 0) {
                //interval: avoid set event of null
                // var mETimer = setInterval(() => {
                // if (document.getElementById("setting") != null) {
                // clearInterval(mETimer);
                kit_setP();
                tran_kit_mouseEvent();
                //     }
                // }, 100);
            }
        }

        var isDisplayNone = false;
        function tran_kit_mouseEvent() {

            var setting = document.getElementById("setting");
            var kitCard = document.getElementById("kitCard");

            setting.onmouseover = function () {
                //show card
                document.getElementById("kitCard").style = "display:flex;";
            }

            kitCard.onmouseout = function (e) {
                //Mouseout when element have child, use relatedTarget to find which element out.
                //If out is its child, not set display none

                //find which element is out 
                var outElement = "e.relatedTarget";
                var indexId = "kitCard";
                isDisplayNone = true;
                for (var i = 0; i < 10; i++) {
                    var checkNode = outElement + mixtureParent(i + 1)
                    var checkId = checkNode + ".id"
                    //avoid to find invalid element then report an error
                    if (eval(checkNode) == null) {
                        break;
                    }
                    else if (eval(checkId) == indexId) {
                        isDisplayNone = false;
                        break;
                    }

                }
                displayNone();
            }
        }

        function mixtureParent(length) {
            var prentNode = ".parentNode"
            var finalParent = "";

            for (var i = 0; i < length; i++) {
                finalParent = finalParent + prentNode
            }
            return finalParent;
        }

        //kit card display none
        function displayNone() {
            //1.make a opacity from 1 to 0
            //2.then set it display none
            //3.recover to opacity 1
            if (isDisplayNone == true) {
                //hide card
                isDisplayNone == false;
                var nowtimes = 0;
                var times = 35;//render accuracy
                var timer = setInterval(() => {
                    nowtimes++;
                    var level = 100 / times
                    var opacity = ((nowtimes / 100) * level).toFixed(2)

                    opacity = (1 - opacity).toFixed(2)
                    document.getElementById("kitCard").style = "opacity:" + opacity + ";display:flex;";
                    if (times == nowtimes) {
                        clearInterval(timer);
                        document.getElementById("kitCard").style = "display:none;";
                        nowtimes = 0;
                    }
                }, 3);
            }
        }


        //kit_bind btn of event
        function kit_addE() {
            var addE_Timer = setInterval(() => {
                if (document.getElementById("kitCard") != null) {
                    document.getElementById("0_tabs").addEventListener('click', function () { click(0); });
                    document.getElementById("1_tabs").addEventListener('click', function () { click(1); });
                    document.getElementById("2_tabs").addEventListener('click', function () { click(2); });
                    document.getElementById("3_tabs").addEventListener('click', function () { click(3); });
                    document.getElementById("4_tabs").addEventListener('click', getAid);
                    document.getElementById("5_tabs").addEventListener('click', kit_brightnessE);
                    document.getElementById("6_tabs").addEventListener('click', kit_remAdE);
                    document.getElementById("queClear").addEventListener("click", clearCache);

                    clearInterval(addE_Timer);
                }
            }, 50);
        }


        function getAid() { click(4); };
        function kit_brightnessE() { click(5); };
        function kit_remAdE() { click(6); }
        var ckAtTimer;

        function click(id) {
            if (id < 3) {
                for (var i = 0; i < 3; i++) {
                    document.getElementById(i + "_tabs").style = "";
                }
            }

            if (id == 0) {
                localStorage.setItem("mode", "auto");
                auto(true, true);
                document.getElementById("0_tabs").style = "border: 1px solid #bcbcbc80";
                ckAtTimer = setInterval(() => { auto(true, true); }, 60000);

                kit_mouseEvent();
                kit_addE();
                adMdBd(0);

            } //auto
            else if (id == 1) {
                localStorage.setItem("mode", "light");
                sty_on(0);
                document.getElementById("1_tabs").style = "border: 1px solid bcbcbc80";
                clearInterval(ckAtTimer);

                kit_mouseEvent();
                kit_addE();
                adMdBd(1);
                auto();

            } //浅色模式
            else if (id == 2) {
                localStorage.setItem("mode", "dark");
                sty_on(1);
                document.getElementById("2_tabs").style = "border: 1px solid bcbcbc80";
                clearInterval(ckAtTimer);
                kit_mouseEvent();
                kit_addE();
                adMdBd(2);
                auto();
            } //深色模式
            else if (id == 3) {
                if (window.bvid != undefined || window.aid != undefined || document.getElementsByClassName("av-link")[0] != (undefined || null)) {

                    var request = new XMLHttpRequest();
                    if (window.bvid != undefined) {
                        request.open('GET', 'https://api.bilibili.com/x/web-interface/view?bvid=' + window.bvid);
                    } else if (window.aid != undefined) {
                        request.open('GET', 'https://api.bilibili.com/x/web-interface/view?aid=' + window.aid);
                    } else if (document.getElementsByClassName("av-link")[0] != (undefined || null)) {
                        request.open('GET', 'https://api.bilibili.com/x/web-interface/view?bvid=' + document.getElementsByClassName("av-link")[0].innerHTML);
                    }

                    request.send();
                    request.onreadystatechange = function () {
                        var parent = document.getElementById("3_tabs");
                        var childLength = parent.childNodes.length;
                        for (var i = 0; i < childLength; i++) {
                            parent.removeChild(parent.childNodes[0]);
                        }
                        var json = request.responseText;
                        var obj = JSON.parse(json);
                        var aid = obj.data.aid;
                        var bvid = obj.data.bvid;
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
                        document.getElementById("openPic").addEventListener('click', function () { window.open(url); }); //添加按钮监听
                        document.getElementById("downPic").addEventListener('click', function () {
                            window.open(url + "?download=true&aid=" + aid + "&bvid=" + bvid);
                        });
                    };
                } else {
                    // ------------------
                    var parent = document.getElementById("3_tabs");
                    var childLength = parent.childNodes.length;
                    for (var i = 0; i < childLength; i++) {
                        parent.removeChild(parent.childNodes[0]);
                    }

                    no_T_hint("未在视频页");
                }
            } // 提取视频封面
            else if (id == 4) {
                //av/bv号获取
                //stop click event
                document.getElementById("4_tabs").removeEventListener('click', getAid);
                var parent = document.getElementById("4_tabs");
                var childLength = parent.childNodes.length
                for (var i = 0; i < childLength; i++) {
                    parent.removeChild(parent.childNodes[0]);
                }
                if (window.bvid != undefined || window.aid != undefined || document.getElementsByClassName("av-link")[0] != (undefined || null)) {
                    var node1 = document.createElement("div");
                    if (document.getElementsByClassName("av-link")[0] != (undefined || null)) {
                        var request = new XMLHttpRequest();
                        request.open('GET', 'https://api.bilibili.com/x/web-interface/view?bvid=' + document.getElementsByClassName("av-link")[0].innerHTML);
                        request.send();
                        request.onreadystatechange = function () {
                            var json = request.responseText;
                            var obj = JSON.parse(json);
                            var aid = obj.data.aid;
                            setTimeout(() => {
                                node1.innerHTML = "av" + aid;

                            }, 20);
                        };
                    } else {
                        node1.innerText = "av" + window.aid;
                    }
                    node1.style = "color: #e1e1e1;font-size: 13px;";

                    var node2 = document.createElement("div");
                    if (document.getElementsByClassName("av-link")[0] != (undefined || null)) {
                        node2.innerText = document.getElementsByClassName("av-link")[0].innerHTML;
                    } else {
                        node2.innerText = window.bvid;
                    }
                    node2.style = "color: #e1e1e1;font-size: 13px;";

                    var divNode = document.createElement("div");
                    divNode.style = "display: flex;height: inherit;width: inherit;flex-direction: column;align-items: center;justify-content: center;";
                    divNode.appendChild(node1);
                    divNode.appendChild(node2);
                    parent.appendChild(divNode);
                } else {
                    no_T_hint("未在视频页");
                }
            } //av/bv获取
            else if (id == 5) {
                //stop click event and clear inside node
                document.getElementById("5_tabs").removeEventListener('click', kit_brightnessE);
                var parent = document.getElementById("5_tabs");
                var childLength = parent.childNodes.length
                for (var i = 0; i < childLength; i++) {
                    parent.removeChild(parent.childNodes[0]);
                }

                var check = sessionStorage.getItem("kitBrightnessCheckDark");
                if (check == "true") {
                    parent.innerHTML = `<div class="brightOuter"><div class="brightSetOuter"><div class="brightSet" id="brightDec">-</div></div><div class="brightTitle" id="brightNum">1</div><div class="brightSetOuter"><div class="brightSet" id="brightAdd">+</div></div></div>`;

                    setTimeout(() => {
                        document.getElementById("brightDec").addEventListener("click", function () { kit_bright(0); });
                        document.getElementById("brightAdd").addEventListener("click", function () { kit_bright(1); });
                    }, 10);
                } else {
                    no_T_hint("请开启深色模式");
                }


            } //亮度调节
            else if (id == 6) {
                //stop click event and clear inside node
                document.getElementById("6_tabs").removeEventListener('click', kit_remAdE);
                var parent = document.getElementById("6_tabs");
                var childLength = parent.childNodes.length
                for (var i = 0; i < childLength; i++) {
                    parent.removeChild(parent.childNodes[0]);
                }
                var remAd = localStorage.getItem("remAd");
                //kit_remAd CLICK -> 0:CLOSE IT 1:OPEN IT 
                if (remAd == "true") {
                    parent.innerHTML = `<div class="cAdOuter"><div class="cAd" id="cAd">已开启，点击关闭</div></div>;`;
                    kit_remAdT(0);
                } else {
                    parent.innerHTML = `<div class="cAdOuter"><div class="cAd" id="cAd">已关闭，点击开启</div></div>;`;
                    kit_remAdT(1);
                }
            } //关闭广告

            function no_T_hint(Text) {
                var node = document.createElement("div");
                node.innerText = Text;
                node.style = "color: #e1e1e1;font-size: 13px;";
                var divNode = document.createElement("div");
                divNode.style = "display: flex;height: inherit;width: inherit;flex-direction: column;align-items: center;justify-content: center;";
                divNode.appendChild(node);
                parent.appendChild(divNode);
            }
        }

        //remAd 
        function kit_remAdT(action) {
            setTimeout(() => {
                if (action == 0) {
                    document.getElementById("cAd").addEventListener("click", function () {
                        document.getElementById("cAd").innerHTML = "已关闭，点击开启";
                        localStorage.setItem("remAd", "false");
                        kit_remAdE(1);
                    });
                } else {
                    document.getElementById("cAd").addEventListener("click", function () {
                        document.getElementById("cAd").innerHTML = "已关闭，点击开启";
                        localStorage.setItem("remAd", "true");
                        kit_remAdE(0);
                    });
                }
            }, 10);
        }

        //亮度调节

        function gradBgColor(level, r1, g1, b1, r2, g2, b2) {
            var r_averDec = ((r1 - r2) / 9).toFixed();
            var g_averDec = ((g1 - g2) / 9).toFixed();
            var b_averDec = ((b1 - b2) / 9).toFixed();
            var dec = (1 - level) * 10;
            var outR1 = r1 - (r_averDec * dec).toFixed();
            var outG1 = g1 - (g_averDec * dec).toFixed();
            var outB1 = b1 - (b_averDec * dec).toFixed();
            function va(value) {
                if (value < 0) { return 0; }
                else { return value; }
            }
            mainBg = "rgb(" + va(outR1) + "," + va(outG1) + "," + va(outB1) + ")";
            styleContent();
            index(false);
            document.querySelector("html").style = "filter: brightness(" + level + ");";
        }

        function kit_bright(value) {
            var bright = Number(document.getElementById("brightNum").innerHTML);

            if (value == 0 && bright > 0.1) {
                bright = bright - 0.1;
                document.getElementById("brightNum").innerHTML = bright.toFixed(1);
                gradBgColor(bright, 22, 24, 25, 0, 0, 0);

            }
            if (value == 1 && bright < 1) {
                bright = bright + 0.1;
                document.getElementById("brightNum").innerHTML = bright.toFixed(1);
                gradBgColor(bright, 22, 24, 25, 0, 0, 0);
            }
        }
        //Add node of dark style, kit style and kit html

        //页面样式
        let styleNode = document.createElement("style");
        styleNode.id = "modeStyle";
        (document.querySelector("head") || document.documentElement).appendChild(styleNode);

        //工具CSS
        let kitStyle = document.createElement("style");
        document.querySelector("body").appendChild(kitStyle);
        kitStyle.id = "kitStyle";

        //工具HTML
        let kitHtml = document.createElement("div")
        document.querySelector("body").appendChild(kitHtml);
        kitHtml.id = "kitHtml";


        //Check the location of page
        let host = location.hostname;
        let path = location.pathname;

        //Find the page by search specify pathname
        function pSearch(value) {
            if (location.pathname.search(value) > -1) {
                return true;
            }
        }

        //Location sheet
        var loc = new Array(
            "path == '/page-proxy/game-nav.html' || path == '/blackboard/dropdown-menu.html' || path == '/eden/bilibili-nav-panel.html' || path == '/pages/nav/index_new' || path == '/pages/nav/index_new_pc_sync'", //"导航栏iframe"
            "host == 'www.bilibili.com' && path == '/'", //"首页",
            "pSearch('/v/channel') == true", //"订阅及频道",
            "host == 't.bilibili.com' && path == '/'", //"动态",
            "host == 't.bilibili.com' && pSearch('tab=2') == true", // "动态详细内容页面",
            "pSearch('/bangumi/play/')", //"番剧播放页面"
            "pSearch('/video/') == true && path != '/video/online.html'", //"普通视频播放页" -排除视频列表
            "pSearch('/v/popular/') == true", //热门
            "pSearch('/watchlater/') == true", //稍后再看
            "host == 'live.bilibili.com' && path == '/'", //直播首页
            "path == '/read/home'", //"专栏首页"
            "pSearch('/read/cv') == true || pSearch('/read/readlist/') == true", //"专栏文章详细内容+文集页"
            "host == 'space.bilibili.com'", //"个人空间"
            "host == 'account.bilibili.com'", //"个人中心"
            "host == 't.bilibili.com' && pSearch('/topic/') == true", //"话题"
            "host == 'www.bilibili.com' && path == '/cheese/'", //"课堂首页"
            "host == 'www.bilibili.com' && pSearch('/cheese/play/')", //"课堂视频页面"
            "(path == '/anime/' || path == '/guochuang/' || pSearch('/v/') == true) && (path != '/anime/timeline/' || path != '/anime/index/' || path !='/guochuang/index/' || path != '/guochuang/timeline/')", //"频道" -排除番剧、国创 时间表、索引
            "path == '/blackboard/topic_list.html' || path == '/blackboard/activity-list.html' || path == '/topic/integrated-1.html'", //"专题、活动、话题列表"
            "host == 'message.bilibili.com' && path == '/'", //"消息中心"
            "(host == 'www.bilibili.com' && path =='/anime/index/') || (host == 'www.bilibili.com' && path =='/guochuang/index/')", //"番剧索引"
            "host =='search.bilibili.com'", //"搜索"
            "host == 'www.bilibili.com' && path == '/account/history'", //"历史记录"
            "host == 'www.bilibili.com' && pSearch('blackroom') == true", //"小黑屋"
            "host == 'manga.bilibili.com'", //"漫画"
            "(host == 'www.bilibili.com' && path == '/anime/timeline/') || (host == 'www.bilibili.com' && path == '/guochuang/timeline/')", //"新番时间表"
            "host == 'www.bilibili.com' && path == '/video/online.html'" //”观看列表“
        );

        //Page explain
        var locExp = new Array(
            "导航栏iframe",
            "首页",
            "订阅及频道",
            "动态",
            "动态详细内容页面",
            "番剧播放页面",
            "普通视频播放页",
            "热门",
            "稍后再看",
            "直播首页",
            "专栏首页",
            "专栏文章详细内容+文集页",
            "个人空间",
            "个人中心",
            "话题",
            "课堂首页",
            "课堂视频页面",
            "频道",
            "专题、活动、话题列表",
            "消息中心",
            "番剧索引(/国创)",
            "搜索",
            "历史记录",
            "小黑屋",
            "漫画",
            "新番时间表(/国创)",
            "观看列表"
        );

        //mixture the style

        // 1.导航栏
        // 2.尾部
        // 3.频道导航栏
        // 4.评论
        // 5.主样式
        var mainNav = `.international-header .mini-type,.van-popover .mini-type{background:rgba(84,87,88,.36)!important;box-shadow:0 4px 4px 0 rgb(0 0 0/15%)!important}.mini-type .nav-user-center .user-con .item .name{color:#e1e1e1!important}.box{background:#222}.brief span{color:#e2e2e2}.all a{color:#ccc}.all a:hover{color:#00a1d6}.all a:hover,.brief a:hover{background-color:#403b3b}.live-box[data-v-5e2bd0c0]{border-radius:20px;background:#222}.room-list .list-item .uname[data-v-5e2bd0c0]{color:#e2e2e2}.act-list .list-item[data-v-5e2bd0c0]:hover{background:#403b3b}.app-layout[data-v-0b4aa428]{background-color:#222}.recommendation-list .list-item .item-title[data-v-7149acfe]{color:#e2e2e2}.popularity-list .item-list .list-item[data-v-499a5b95],.popularity-list .list-title[data-v-499a5b95]{color:#eee}.popularity-list .item-list .list-item[data-v-499a5b95]:hover,.recommendation-list .list-item[data-v-7149acfe]:before{background-color:#403b3b}.van-popper[x-placement^=bottom] .popper__arrow,.van-popper[x-placement^=bottom] .popper__arrow:after{border-bottom-color:#222!important}.van-popper-avatar .vip[data-v-5314bca5]{color:#222!important}.international-header a,.van-popover a,.van-popper-avatar .level-info .grade[data-v-5314bca5],.van-popper-avatar .level-info .progress[data-v-5314bca5]{color:#e1e1e1!important}.van-popper-avatar .coins .contact .contact-tips[data-v-5314bca5]{border:0!important;border-radius:10px!important;background-color:#141414!important;color:#e1e1e1!important}.van-popper-avatar .coins .contact .email-tips[data-v-5314bca5]:after,.van-popper-avatar .coins .contact .phone-tips[data-v-5314bca5]:after{background:#222!important}.van-popper-avatar .count-item .item-key[data-v-5314bca5],.van-popper-avatar .count-item .item-value[data-v-5314bca5],.van-popper-avatar .links .link-title[data-v-5314bca5]{color:#e1e1e1!important}.van-popper-avatar .link-icon[data-v-5314bca5]{color:#939393!important}.lang-change .lang-title{color:#e1e1e1!important}.lang-change .lang-icon,.lang-change .lang-icon-more{color:#939393!important}.van-popper-avatar .logout span[data-v-5314bca5]{color:#e1e1e1!important}.van-popper-avatar .links .link-item[data-v-5314bca5]:hover{background:#3b3e40!important}.lang-change .lang-intro{background:#222!important;color:#e1e1e1!important}.van-popper-avatar .logout span[data-v-5314bca5]:hover{background:#3b3e40!important;color:#e1e1e1!important}.van-popper-avatar .vp-container[data-v-5314bca5]{border-radius:10px!important;background:#222!important;box-shadow:0 3px 6px 0 rgb(0 0 0/75%)!important}.lang-change .lang-intro-item:hover,.lang-change .lang-item:hover{background:#3b3e40!important}.van-popper-avatar .level-intro[data-v-5314bca5]{border-radius:10px!important;background:#222!important;box-shadow:0 3px 6px 0 rgb(0 0 0/75%)!important;color:#e1e1e1!important}.van-popover.van-popper.van-popper-avatar{border-radius:12px!important}.international-header a:hover,.van-popover a:hover{color:#00a1d6!important}.van-popper-avatar .count-item:hover .item-key[data-v-5314bca5],.van-popper-avatar .count-item:hover .item-value[data-v-5314bca5]{color:#00a1d6!important;transition:color .3s}.van-popover{border-radius:15px!important;background:#222!important;color:#e1e1e1!important}.follow-dialog-wrap .follow-dialog-window{border-radius:15px!important;background:#222!important;box-shadow:0 3px 6px rgb(0 0 0/50%)!important}.vip-m .bubble-traditional .recommand .bubble-col .item .recommand-link,.vip-m .bubble-traditional .recommand .title{color:hsla(0,0%,100%,.94)!important}.im-list-box{background:#222!important;box-shadow:0 3px 6px 0 rgba(0,0,0,.2);color:rgba(229,233,239,.95)!important}.i-frame iframe[data-v-01c9e08c]{border-bottom-right-radius:15px!important;border-bottom-left-radius:15px!important;background:hsla(0,0%,100%,0)!important;-webkit-box-shadow:0 3px 6px 0 #000!important;box-shadow:0 3px 6px 0 #000!important}.i-frame[data-v-01c9e08c]:before{background-color:#222!important;-webkit-box-shadow:0 1px 0 #222!important;box-shadow:0 1px 0 #222!important}.im-list:hover{background-color:#3b3e40!important;color:#e1e1e1!important}.i-frame[data-v-400d5653]:before{background-color:#222!important}.out-container[data-v-e99755ec]{border-radius:15px;background-color:#222;box-shadow:1px 6px 6px 0 rgb(0 0 0/50%)}.content[data-v-2cacd430]{color:#e1e1e1}.list-item[data-v-2cacd430]:hover{background-color:#3b3e40}.more-btn[data-v-0de37f37]:hover{background-color:#505050}.more-btn[data-v-0de37f37]{border-radius:15px;background-color:#3b3b3b;color:#e1e1e1}.split-line .history-tip[data-v-213951fc],.split-line .history-tip[data-v-77141e7e]{background:#222;color:#e1e1e1}.name-line[data-v-2cacd430]{color:#e7e7e7;font-size:3.14136vw}.van-popper-favorite .tab-item .title[data-v-64b63b5f]{color:hsla(0,0%,100%,.94)!important}.header-video-card[data-v-37582e0a]:hover{background-color:hsla(0,0%,95.7%,.2)!important}.van-popper-favorite .tab-item--normal[data-v-e8d85714]{color:#e1e1e1!important}.van-popper-favorite .tab-item--normal[data-v-e8d85714]:hover{background-color:hsla(0,0%,95.7%,.2)!important}.header-video-card .video-info .line-2[data-v-37582e0a]{color:#e1e1e1!important}.van-popper-favorite .play-all[data-v-e8d85714]{background-color:transparent!important}.van-popper-favorite .play-all.view[data-v-e8d85714]{border-right:1px solid hsla(0,0%,90.6%,.5)!important}.van-popper-favorite .play-all[data-v-e8d85714]:hover{background-color:hsla(0,0%,95.7%,.2)!important}.header-video-card .video-info .desc[data-v-37582e0a],.header-video-card .video-info .line-1[data-v-37582e0a]{color:#e7e7e7!important}.bilifont[data-v-0fdc0c18]{color:#e1e1e1!important}.channel-menu-mini{border-radius:15px!important;background:#222!important;box-shadow:1px 3px 5px rgb(0 0 0/50%)!important}.channel-menu-mini .box a:hover{background:hsla(0,0%,95.7%,.1)!important;color:#e1e1e1!important}.popover-app-download{padding:0!important;background:url(//s1.hdslb.com/bfs/seed/jinkela/header-v2/images/app-download.png)!important;background-size:cover!important;opacity:.9;background-position-y:-3px!important}.bili-header-m .nav-search #nav_searchform,.international-header .nav-search #nav_searchform{border:1px solid #505050!important;border-radius:20px!important;background-color:#505050!important}.bili-header-m .nav-search .nav-search-keyword,.international-header .nav-search .nav-search-keyword{color:hsla(0,0%,100%,.8)!important}.bili-header-m .nav-search .nav-search-btn,.international-header .nav-search .nav-search-btn{border-top-right-radius:20px!important;border-bottom-right-radius:20px!important;background:#737373!important}.bili-header-m .nav-search .nav-search-submit,.international-header .nav-search .nav-search-submit{color:#c3c3c3!important}.bili-header-m .nav-search .nav-search-btn:hover .nav-search-submit,.international-header .nav-search .nav-search-btn:hover .nav-search-submit{color:#00a1d6!important}input::placeholder{color:#ababab}.bilibili-search-history .history-item a,.bilibili-search-suggest .suggest-item a{color:#e1e1e1}.bilibili-search-history,.bilibili-search-suggest{border:0!important;border-radius:10px!important;background:#222!important;box-shadow:0 2px 4px rgb(0 0 0/45%)!important}.bilibili-search-history .history-item.focus,.bilibili-search-history .history-item:hover,.bilibili-search-suggest .suggest-item.focus,.bilibili-search-suggest .suggest-item:hover{background-color:rgba(112,114,125,.13)!important}.bilibili-search-history .history-item a:hover,.bilibili-search-suggest .suggest-item a:hover{color:#e1e1e1}.van-popper-history .tab-header{border-bottom:1px solid hsla(0,0%,73.7%,.5)!important}.van-popper-favorite .tabs-panel{border-right:1px solid hsla(0,0%,73.7%,.5)!important}.van-popper-upload .upload-item:hover{background-color:#1f1f1f!important}.bilifont[data-v-8b01bddc]{color:hsla(0,0%,88.2%,.88)}.content,.split-line .history-tip[data-v-213951fc],.tip-box{color:#bcbcbc!important}.list-item:hover{background-color:rgba(112,114,125,.13)!important}.tab-bar{border-bottom:1px solid hsla(0,0%,73.7%,.5)!important}.split-line:before{border-top:1px solid hsla(0,0%,73.7%,.5)!important}.content{color:#c2c8d0!important}.loading-tip:before{display:none!important}.name-line{color:hsla(0,0%,90.6%,.88)!important}.van-popper-history .view-all{border-radius:15px!important;background:#3b3b3b!important}.van-popper-history .view-all:hover{background:#505050!important}.lang-change,.van-popper-avatar .coins,.van-popper-avatar .counts,.van-popper-avatar .links,.van-popper-history .tab-header{border-bottom:1px solid hsla(0,0%,73.7%,.5)!important}.header-video-card .video-info .line-2{color:#e1e1e1!important}.header-video-card:hover{background-color:#2c2c2c!important}.van-popper-favorite .play-all{border-top:1px solid hsla(0,0%,73.7%,.5)!important}.van-popper-upload .upload-item:hover{background-color:#050505}.international-header .mini-type .nav-search #nav_searchform,.van-popover .mini-type .nav-search #nav_searchform{border:1px solid #505050;background:#505050}.channel-menu-mini .r-box{border-left:1px solid hsla(0,0%,73.7%,.5)!important}.unlogin-avatar{background:#5c5c5c!important}.international-header.fixed-top .mini-header{background:#222}.international-header.fixed-top .mini-type .nav-link .nav-link-ul .nav-link-item .link,.international-header.fixed-top .mini-type .nav-user-center .user-con .item .name{color:#e1e1e1}.van-popover{border:0!important}.unlogin-popover{background:#222!important}.content .lt-text,.unlogin-popover-avatar .register-tip,.unlogin-popover-avatar .title{color:hsla(0,0%,88.2%,.88)!important}.login-btn[data-v-eef987ee]{opacity:.8!important}.login-tip{background:#222}.content .lt-text{color:hsla(0,0%,88.2%,.88)!important}.login-tip .login-btn{opacity:.9!important}.unlogin-popover:before{background:#222!important}`;
        var footer = `.international-footer{background-color:#171617}.international-footer .link-box .link-item.link-c p,.international-footer a{color:#c1c1c1}.international-footer .link-box .link-item{border-right:1px solid #c1c1c1}.international-footer .link-box .link-item.link-c a.weixin:hover p{color:#00a1d6}.qrcode{opacity:.9}.international-footer .link-box .link-item{border-right:1px solid hsla(0,0%,73.7%,.5)}`;
        var channelNav = `.international-header a{color:#e7e7e7}.page-tab .con li{border:0}.page-tab .con li .bilifont{color:#3e3e3e}a{color:#e1e1e1}.storey-title .no-link{color:#e7e7e7}.van-popper[x-placement^=top] .popper__arrow:after{bottom:0;border-top-color:#222}.van-popper-channel{border:0;box-shadow:0 2px 12px 0 rgb(0 0 0/50%)}.van-popper[x-placement^=bottom] .popper__arrow,.van-popper[x-placement^=bottom] .popper__arrow:after{border-bottom-color:#222!important}.van-popover{border-radius:15px!important;background:#222!important}.international-header a,.van-popover,.van-popover a{color:#e1e1e1!important}.international-header a:hover,.van-popover a:hover{color:#00a1d6!important}.tab-line-itnl{border-left:1px solid hsla(0,0%,73.7%,.5)}.international-header .primary-menu-itnl{border-bottom:1px solid hsla(0,0%,73.7%,.5)}`;

        var comment = `.bb-comment .comment-list .list-item .text,.bb-comment .comment-list .list-item .user .text-con,.comment-bilibili-fold .comment-list .list-item .text,.comment-bilibili-fold .comment-list .list-item .user .text-con{color:hsla(0,0%,90.6%,.88)!important}.bb-comment .comment-list .list-item .info>span,.comment-bilibili-fold .comment-list .list-item .info>span{color:hsla(0,0%,100%,.7)!important}.bb-comment .comment-send .textarea-container textarea,.comment-bilibili-fold .comment-send .textarea-container textarea{border:0!important;background-color:#2b2b2b!important;color:#e2e2e2!important}.bb-comment .comment-send .textarea-container.focus textarea,.bb-comment .comment-send .textarea-container:hover textarea,.comment-bilibili-fold .comment-send .textarea-container.focus textarea,.comment-bilibili-fold .comment-send .textarea-container:hover textarea{border:1px solid #00a1d6!important;color:#e2e2e2!important;color:#505050!important}.bb-comment .comment-header .tabs-order li,.comment-bilibili-fold .comment-header .tabs-order li{color:hsla(0,0%,100%,.71)!important}.bb-comment .comment-list .list-item .user .name,.comment-bilibili-fold .comment-list .list-item .user .name{color:rgba(228,233,236,.95)}.bb-comment .comment-header .tabs-order li.on,.comment-bilibili-fold .comment-header .tabs-order li.on{color:#00a1d6!important}.bb-comment .comment-send .comment-emoji .face,.bb-comment .comment-send-lite .comment-emoji .face,.comment-bilibili-fold .comment-send .comment-emoji .face,.comment-bilibili-fold .comment-send-lite .comment-emoji .face{margin-right:0!important;width:0!important;height:0!important;background:#222!important}.bb-comment .comment-send .comment-emoji,.bb-comment .comment-send-lite .comment-emoji,.comment-bilibili-fold .comment-send .comment-emoji,.comment-bilibili-fold .comment-send-lite .comment-emoji{margin-top:8px!important;width:60px!important;border:1px solid #bcbcbc!important;border-radius:15px!important;color:#bcbcbc!important}.bb-comment .comment-send .comment-emoji .text,.bb-comment .comment-send-lite .comment-emoji .text,.comment-bilibili-fold .comment-send .comment-emoji .text,.comment-bilibili-fold .comment-send-lite .comment-emoji .text{vertical-align:inherit!important}.emoji-box{border:0!important;border-radius:10px!important;background-color:#2b2b2b!important;-webkit-box-shadow:0 3px 5px 0 rgb(0 0 0/30%)!important;box-shadow:0 3px 5px 0 rgb(0 0 0/30%)!important}.emoji-box .emoji-title,.title[data-v-00b4b4ea]{padding:15px;color:#e1e1e1;text-align:left;font-size:14px}.emoji[data-v-60ae9c4d]{background-color:transparent}.emoji-box .emoji-tabs .tab-link:hover,.emoji-box .emoji-text:hover,.emoji[data-v-60ae9c4d]:hover{background-color:#403b3b!important}.dp-i-block[data-v-60ae9c4d],.emoji-box .emoji-text{display:inline-block;color:#e1e1e1!important}.emoji-box .emoji-tabs,.pagination[data-v-97c4281e]{position:relative!important;width:100%!important;border-bottom-right-radius:8px!important;border-bottom-left-radius:8px!important;background-color:#222!important}.emoji-box .emoji-tabs .tab-link.on,.emoji-cover.selected[data-v-97c4281e]{background-color:#403b3b!important}.page-controller .next[data-v-97c4281e]:hover,.page-controller .prev[data-v-97c4281e]:hover{background-color:#403b3b;color:#e1e1e1}.page-controller .next[data-v-97c4281e],.page-controller .prev[data-v-97c4281e]{color:#e1e1e1}.page-controller .next.disabled[data-v-97c4281e],.page-controller .prev.disabled[data-v-97c4281e]{color:#8e8e8e!important}.emoji-box .emoji-tabs .emoji-tab-slider .prev{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+PHBhdGggZD0iTTkuMiA4bC0zLjQgMy40Yy0uMy4zLS4zLjggMCAxLjEuMy4zLjguMyAxLjEgMGwzLjktMy45Yy4zLS4zLjMtLjggMC0xLjFMNi45IDMuNmMtLjMtLjMtLjgtLjMtMS4xIDAtLjMuMy0uMy44IDAgMS4xTDkuMiA4eiIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiM3NTc1NzUiLz48L3N2Zz4=)!important;transform:rotate(180deg)!important}.emoji-box .emoji-tabs .emoji-tab-slider .next.on{background:url(//s1.hdslb.com/bfs/seed/jinkela/commentpc/img/left-arrow-disable.1c51ed4.svg) no-repeat!important;transform:rotate(180deg)!important}.bilibili-player-video-sendbar{background:#212121!important}.bilibili-player-video-info{color:#ded9d9!important}.bilibili-player-video-sendbar .bilibili-player-video-inputbar{background-color:#505050;color:#999!important}.bilibili-player-video-sendbar .bilibili-player-video-inputbar .bilibili-player-video-danmaku-input{color:#ccd0d7!important}.bilibili-player .bui-button.bui-button-blue,.bilibili-player .bui-button.bui-button-gray3:hover,.bilibili-player .bui-button.bui-button-gray:hover{opacity:.9!important}.bilibili-player-video-sendbar .bilibili-player-video-inputbar .bilibili-player-video-inputbar-wrap{border:0!important;background-color:#505050!important}.bb-comment .comment-list .list-item .info .btn-hover:hover,.comment-bilibili-fold .comment-list .list-item .info .btn-hover:hover{background:` + mainBg + `;color:#00a1d6}.bb-comment .comment-send .textarea-container .ipt-txt,.bb-comment .comment-send-lite .textarea-container .ipt-txt,.comment-bilibili-fold .comment-send .textarea-container .ipt-txt,.comment-bilibili-fold .comment-send-lite .textarea-container .ipt-txt{border:0!important;border-radius:10px!important;background-color:#2b2b2b!important;color:#e1e1e1!important}.bb-comment .comment-send .textarea-container.focus textarea,.bb-comment .comment-send .textarea-container:hover textarea,.bb-comment .comment-send-lite .textarea-container.focus textarea,.bb-comment .comment-send-lite .textarea-container:hover textarea,.comment-bilibili-fold .comment-send .textarea-container.focus textarea,.comment-bilibili-fold .comment-send .textarea-container:hover textarea,.comment-bilibili-fold .comment-send-lite .textarea-container.focus textarea,.comment-bilibili-fold .comment-send-lite .textarea-container:hover textarea{border:1px solid #00a1d6!important;background-color:#505050!important}::placeholder{color:#8e8e8e!important}.bb-comment .comment-list .list-item .reply-box .reply-item .reply-con .user .name,.comment-bilibili-fold .comment-list .list-item .reply-box .reply-item .reply-con .user .name{color:#bcbcbc}.bb-comment .comment-list .list-item .reply-box .view-more,.comment-bilibili-fold .comment-list .list-item .reply-box .view-more{color:#bcbcbc!important}.bb-comment .comment-list .list-item .info .btn-hover:hover,.bb-comment .comment-list .list-item .reply-box .view-more .btn-more:hover,.comment-bilibili-fold .comment-list .list-item .info .btn-hover:hover,.comment-bilibili-fold .comment-list .list-item .reply-box .view-more .btn-more:hover{background:#505050!important}.bb-comment .operation .opera-list,.comment-bilibili-fold .operation .opera-list{border-radius:10px!important;background:#222!important;box-shadow:0 2px 8px rgb(0 0 0/20%)!important;color:#bcbcbc!important}.bb-comment .operation .opera-list li:hover,.comment-bilibili-fold .operation .opera-list li:hover{background:#505050!important}.paging-box .current,.paging-box .dian,.paging-box .next,.paging-box .prev,.paging-box .result,.paging-box .tcd-number{color:#bcbcbc!important}.paging-box .current,.paging-box .current:hover,.paging-box .dian:hover,.paging-box .next:hover,.paging-box .prev:hover,.paging-box .tcd-number:hover{color:#00a1d6!important}.bb-comment .comment-list .list-item .info .reply-tags span,.comment-bilibili-fold .comment-list .list-item .info .reply-tags span{border-radius:12px!important;background:#505050!important;color:hsla(0,0%,100%,.8)!important}.comment-m .b-head{color:hsla(0,0%,90.6%,.91)}.bb-comment .comment-send .textarea-container.focus textarea,.bb-comment .comment-send .textarea-container:hover textarea,.bb-comment .comment-send-lite .textarea-container.focus textarea,.bb-comment .comment-send-lite .textarea-container:hover textarea,.comment-bilibili-fold .comment-send .textarea-container.focus textarea,.comment-bilibili-fold .comment-send .textarea-container:hover textarea,.comment-bilibili-fold .comment-send-lite .textarea-container.focus textarea,.comment-bilibili-fold .comment-send-lite .textarea-container:hover textarea{color:hsla(0,0%,88.2%,.88)!important}.bb-comment .comment-list .list-item .user .name,.comment-bilibili-fold .comment-list .list-item .user .name{color:hsla(0,0%,88.2%,.88)}.bb-comment .comment-list .list-item .con,.comment-bilibili-fold .comment-list .list-item .con{border-top:1px solid hsla(0,0%,73.7%,.18)!important}.bb-comment .comment-header,.comment-bilibili-fold .comment-header{border-bottom:1px solid hsla(0,0%,73.7%,.18)!important}.activity-m.act-now .l-inside .b-btn-praise.voted{border:1px solid hsla(0,0%,73.7%,.5);color:hsla(0,0%,88.2%,.88)}.list-item:hover{background-color:transparent!important}.bb-comment .no-login .baffle,.comment-bilibili-fold .no-login .baffle{background-color:#222}.bb-comment .no-login .comment-emoji,.comment-bilibili-fold .no-login .comment-emoji{background-color:transparent}.bb-comment .no-login .comment-submit,.comment-bilibili-fold .no-login .comment-submit{border-color:#222!important;background-color:#222!important}`;

        //set the background of comment
        function commentBg(bg) {
            var commentBg = `.bb-comment,.bb-comment .comment-send-lite.comment-send-lite,.bb-comment .comment-send.comment-send-lite,.comment-bilibili-fold,.comment-bilibili-fold .comment-send-lite.comment-send-lite,.comment-bilibili-fold .comment-send.comment-send-lite{background:` + bg + `!important;}`;
            return commentBg;
        }

        var style_0, style_1, style_2, style_3, style_4, style_5, style_6, style_7, style_8, style_9, style_10, style_11, style_12, style_13, style_14, style_15, style_16, style_17, style_18, style_19, style_20, style_21, style_22, style_23, style_24, style_25, style_26;

        mainBg = "#161819";

        styleContent();

        function styleContent() {
            style_0 = mainNav;
            style_1 = `.international-header a{color:#e7e7e7}.page-tab .con li{border:0}.page-tab .con li .bilifont{color:#3e3e3e}a{color:#e1e1e1}.storey-title .no-link{color:#e7e7e7}.storey-title .text-info a{color:#8e8e8e}.live-card .up .txt .desc,.live-rank .live-rank-item .txt p.p2,.storey-title .text-info{color:#bcbcbc}.rank-header .name{color:#e7e7e7}.manga-rank-item .rank-number,.pgc-rank-wrap .number,.rank-wrap .number{border-radius:10px;background:#999;color:#fff}.manga-panel .app-download-link,.tab-switch .tab-switch-item{color:#e7e7e7}.manga-panel .manga-list-box .manga-card .manga-title{color:#e1e1e1}.pgc-no-data{opacity:.5}.time-line .tl-link{border:0;border-radius:20px;background:#3b3b3b;color:hsla(0,0%,100%,.68)}.contact-help{border:0 solid #e7e7e7;background:#3b3b3b;box-shadow:0 6px 10px 0 #212121;color:#ccc}.international-footer{background-color:#171617}.international-footer .link-box .link-item.link-c p,.international-footer a{color:#c1c1c1}.international-footer .link-box .link-item{border-right:1px solid #c1c1c1}.international-footer .link-box .link-item.link-c a.weixin:hover p{color:#00a1d6}.qrcode{opacity:.9}.elevator .list-box{background:#222}.elevator .list-box .item{background:#222;color:hsla(0,0%,100%,.94)}.elevator .list-box .item.on,.elevator .list-box .item:hover{color:hsla(0,0%,100%,.94)}.exchange-btn .btn,.rank-header .more,.rcmd-box-wrap .change-btn{color:#ccc}.exchange-btn .btn:hover,.rank-header .more:hover,.rcmd-box-wrap .change-btn:hover{background-color:#282b2d!important}.bili-header-m .nav-search #nav_searchform,.international-header .nav-search #nav_searchform{border-radius:20px;background-color:#505050}.bili-header-m .nav-search .nav-search-keyword,.international-header .nav-search .nav-search-keyword{color:hsla(0,0%,100%,.8)!important}.bili-header-m .nav-search .nav-search-btn,.international-header .nav-search .nav-search-btn{border-top-right-radius:20px;border-bottom-right-radius:20px;background:#737373}.bili-header-m .nav-search .nav-search-submit,.international-header .nav-search .nav-search-submit{color:#c3c3c3}input::placeholder{color:#ababab}.bilibili-search-history .history-item a,.bilibili-search-suggest .suggest-item a{color:#e1e1e1}.bilibili-search-history,.bilibili-search-suggest{border:0;border-radius:10px;background:#222;box-shadow:0 2px 4px rgb(0 0 0/45%)}.bilibili-search-history .history-item.focus,.bilibili-search-history .history-item:hover,.bilibili-search-suggest .suggest-item.focus,.bilibili-search-suggest .suggest-item:hover{background-color:rgba(112,114,125,.13)}.bilibili-search-history .history-item a:hover,.bilibili-search-suggest .suggest-item a:hover{color:#e1e1e1}.bypb-window .online{border:0;border-radius:20px;background:#3b3b3b}.bypb-window .online a{font-size:13px}.box{background:#222}.brief span{color:#e2e2e2}.all a{color:#ccc}.all a:hover{color:#00a1d6}.all a:hover,.brief a:hover{background-color:#403b3b}.live-box[data-v-5e2bd0c0]{border-radius:20px;background:#222}.room-list .list-item .uname[data-v-5e2bd0c0]{color:#e2e2e2}.act-list .list-item[data-v-5e2bd0c0]:hover{background:#403b3b}.app-layout[data-v-0b4aa428]{background-color:#222}.recommendation-list .list-item .item-title[data-v-7149acfe]{color:#e2e2e2}.popularity-list .item-list .list-item[data-v-499a5b95],.popularity-list .list-title[data-v-499a5b95]{color:#eee}.popularity-list .item-list .list-item[data-v-499a5b95]:hover,.recommendation-list .list-item[data-v-7149acfe]:before{background-color:#403b3b}.van-popper[x-placement^=bottom] .popper__arrow,.van-popper[x-placement^=bottom] .popper__arrow:after{border-bottom-color:#222!important}.special-recommend header{color:#e1e1e1}.van-popper-avatar .vip[data-v-5314bca5]{color:#222!important}.international-header a,.van-popover a,.van-popper-avatar .level-info .grade[data-v-5314bca5],.van-popper-avatar .level-info .progress[data-v-5314bca5]{color:#e1e1e1!important}.van-popper-avatar .coins .contact .contact-tips[data-v-5314bca5]{border:0!important;border-radius:10px!important;background-color:#141414!important;color:#e1e1e1!important}.van-popper-avatar .coins .contact .email-tips[data-v-5314bca5]:after,.van-popper-avatar .coins .contact .phone-tips[data-v-5314bca5]:after{background:#222!important}.van-popper-avatar .count-item .item-key[data-v-5314bca5],.van-popper-avatar .count-item .item-value[data-v-5314bca5],.van-popper-avatar .links .link-title[data-v-5314bca5]{color:#e1e1e1!important}.van-popper-avatar .link-icon[data-v-5314bca5]{color:#939393!important}.lang-change .lang-title{color:#e1e1e1!important}.lang-change .lang-icon,.lang-change .lang-icon-more{color:#939393!important}.van-popper-avatar .logout span[data-v-5314bca5]{color:#e1e1e1!important}.van-popper-avatar .links .link-item[data-v-5314bca5]:hover{background:#3b3e40!important}.lang-change .lang-intro{background:#222!important;color:#e1e1e1!important}.van-popper-avatar .logout span[data-v-5314bca5]:hover{background:#3b3e40!important;color:#e1e1e1!important}.van-popper-avatar .vp-container[data-v-5314bca5]{border-radius:10px!important;background:#222!important;box-shadow:0 3px 6px 0 rgb(0 0 0/75%)!important}.lang-change .lang-intro-item:hover,.lang-change .lang-item:hover{background:#3b3e40!important}.van-popper-avatar .level-intro[data-v-5314bca5]{border-radius:10px!important;background:#222!important;box-shadow:0 3px 6px 0 rgb(0 0 0/75%)!important;color:#e1e1e1!important}.van-popover.van-popper.van-popper-avatar{border-radius:12px!important}.international-header a:hover,.van-popover a:hover{color:#00a1d6!important}.van-popper-avatar .count-item:hover .item-key[data-v-5314bca5],.van-popper-avatar .count-item:hover .item-value[data-v-5314bca5]{color:#00a1d6!important;transition:color .3s}.van-popover{border-radius:15px!important;background:#222!important;color:#e1e1e1!important}.follow-dialog-wrap .follow-dialog-window{border-radius:15px!important;background:#222!important;box-shadow:0 3px 6px rgb(0 0 0/50%)!important}.vip-m .bubble-traditional .recommand .bubble-col .item .recommand-link,.vip-m .bubble-traditional .recommand .title{color:hsla(0,0%,100%,.94)!important}.im-list-box{background:#222!important;box-shadow:0 3px 6px 0 rgba(0,0,0,.2);color:rgba(229,233,239,.95)!important}.i-frame iframe[data-v-01c9e08c]{border-bottom-right-radius:15px!important;border-bottom-left-radius:15px!important;background:hsla(0,0%,100%,0)!important;-webkit-box-shadow:0 3px 6px 0 #000!important;box-shadow:0 3px 6px 0 #000!important}.i-frame[data-v-01c9e08c]:before{background-color:#222!important;-webkit-box-shadow:0 1px 0 #222!important;box-shadow:0 1px 0 #222!important}.im-list:hover{background-color:#3b3e40!important;color:#e1e1e1!important}.i-frame[data-v-400d5653]:before{background-color:#222!important}.out-container[data-v-e99755ec]{border-radius:15px;background-color:#222;box-shadow:1px 6px 6px 0 rgb(0 0 0/50%)}.content[data-v-2cacd430]{color:#e1e1e1}.list-item[data-v-2cacd430]:hover{background-color:#3b3e40}.more-btn[data-v-0de37f37]:hover{background-color:#505050}.more-btn[data-v-0de37f37]{border-radius:15px;background-color:#3b3b3b;color:#e1e1e1}.split-line .history-tip[data-v-213951fc],.split-line .history-tip[data-v-77141e7e]{background:#222;color:#e1e1e1}.name-line[data-v-2cacd430]{color:#e7e7e7;font-size:3.14136vw}.van-popper-favorite .tab-item .title[data-v-64b63b5f]{color:hsla(0,0%,100%,.94)!important}.header-video-card[data-v-37582e0a]:hover{background-color:hsla(0,0%,95.7%,.2)!important}.van-popper-favorite .tab-item--normal[data-v-e8d85714]{color:#e1e1e1!important}.van-popper-favorite .tab-item--normal[data-v-e8d85714]:hover{background-color:hsla(0,0%,95.7%,.2)!important}.header-video-card .video-info .line-2[data-v-37582e0a]{color:#e1e1e1!important}.van-popper-favorite .play-all[data-v-e8d85714]{background-color:transparent!important}.van-popper-favorite .play-all.view[data-v-e8d85714]{border-right:1px solid hsla(0,0%,90.6%,.5)!important}.van-popper-favorite .play-all[data-v-e8d85714]:hover{background-color:hsla(0,0%,95.7%,.2)!important}.header-video-card .video-info .desc[data-v-37582e0a],.header-video-card .video-info .line-1[data-v-37582e0a]{color:#e7e7e7!important}.bilifont[data-v-0fdc0c18]{color:#e1e1e1!important}.van-popper[x-placement^=top] .popper__arrow:after{bottom:0;border-top-color:#222}.van-popper-channel{border:0;box-shadow:0 2px 12px 0 rgb(0 0 0/50%)}.popover-video-card,.video-info-module{border:0;border-radius:10px;background-color:#222;-webkit-box-shadow:rgb(0 0 0/50%) 0 2px 4px;box-shadow:0 2px 4px rgb(0 0 0/50%)}.popover-video-card .content .info .f-title,.video-info-module .v-title{color:#e7e7e7}.elevator .list-box,.elevator .list-box .item.back-top,.exchange-btn .btn,.rank-header .more,.rcmd-box-wrap .change-btn{border:1px solid hsla(0,0%,73.7%,.5)}.elevator .list-box .item.sort,.exchange-btn .btn{border-top:1px solid hsla(0,0%,73.7%,.5)}.tab-line-itnl{border-left:1px solid hsla(0,0%,73.7%,.5)}.contact-help:hover{background:#2b2b2b;color:hsla(0,0%,88.2%,.88)}`;
            style_2 = mainNav + `.category-container[data-v-17c2df7b],.detail-page-container[data-v-748372c9],.discovery-container[data-v-74951002],.main-container[data-v-748372c9],.play-selector__item[data-v-77de7349],.year-selector__item[data-v-cfdccf38]{background:` + mainBg + `}.card--light[data-v-fde23d48],.channel-sidebar[data-v-0177db62],.discovery-panel__toggle[data-v-1dbd110a],.subscribe-panel[data-v-575ebe9e]{border-right:0;background:#222}.category-container .inner-container__header .title[data-v-17c2df7b],.channel-list-preview .header-info .title[data-v-72236eb8],.discovery-panel .content-item__name[data-v-1dbd110a],.discovery-panel__title[data-v-1dbd110a],.mini-channel-card .count[data-v-fde23d48],.mini-channel-card .name[data-v-fde23d48],.rank-card-panel .header .title[data-v-1669476f],.subscribe-panel .subscribe-item .name[data-v-575ebe9e],.subscribe-panel__title .text[data-v-575ebe9e],.type-header .header-info .title[data-v-4044b066],.type-header .header-info .title[data-v-748372c9],.video-card .video-name[data-v-6694beea]{color:#e1e1e1}.discovery-panel .content-item__count[data-v-1dbd110a],.discovery-panel__toggle[data-v-1dbd110a],.play-selector__item[data-v-77de7349],.rank-card-panel .header .desc[data-v-1669476f],.subscribe-panel__title .btn[data-v-575ebe9e],.subscribe-panel__title .count[data-v-575ebe9e],.video-card .up-name[data-v-6694beea],.year-selector__item[data-v-cfdccf38]{color:#bcbcbc}.discovery-panel .content-item--active[data-v-1dbd110a],.discovery-panel .content-item[data-v-1dbd110a]:hover,.discovery-panel__title--active[data-v-1dbd110a],.discovery-panel__title[data-v-1dbd110a]:hover,.subscribe-panel .subscribe-item--active[data-v-575ebe9e],.subscribe-panel .subscribe-item--active[data-v-575ebe9e] .discovery-panel .content-item[data-v-1dbd110a]:hover,.subscribe-panel .subscribe-item--active[data-v-575ebe9e] .discovery-panel__title[data-v-1dbd110a]:hover,.subscribe-panel .subscribe-item[data-v-575ebe9e]:hover{background:#3b3b3b}.back-top-btn{border:1px solid #3b3b3b!important;border-radius:5px!important;background:#3b3b3b!important}.sidebar-search-bar .inner-input[data-v-0693a90d]{background:#222;color:#e1e1e1}.discovery-panel__toggle[data-v-1dbd110a]{border-top:1px solid}.discovery-panel[data-v-1dbd110a]{border-bottom:1px solid #bcbcbc}.detail-banner[data-v-c5ca1424]{opacity:.85}.van-tabs-wrap .van-tabs-tab{color:#bcbcbc!important}.rank-card-panel .toggle>span[data-v-1669476f]{border-radius:10px;background:` + mainBg + `;box-shadow:0 2px 4px 0 rgb(0 0 0/30%)}.card--light[data-v-fde23d48]{border-radius:10px}.gray-btn[data-v-72236eb8]{border:0;background:#bcbcbc;color:#7d7d7d}`;
            style_3 = mainNav + commentBg("#222") + comment + `.fixed-bg{background:` + mainBg + `!important}.card,.home-page .home-container .home-content .center-panel .section-block,.live-panel,.most-viewed-panel,.new-topic-panel,.notice-panel,.tab-bar,.user-panel{border-radius:10px!important;background:#222!important;box-shadow:0 4px 6px 0 rgb(0 0 0/50%)!important}.user-panel .content .bottom .number-part .numbers,.user-panel .content .bottom .number-part .numbers[data-v-7c810412]{color:#e1e1e1}.tc-black{color:#e7e7e7!important}.live-panel-item .live-detail .up-name{color:#e1e1e1!important}.live-panel-item .live-detail .live-name{color:#bcbcbc!important}.most-viewed-panel .list-content .most-viewed-item .name{color:#e1e1e1!important}.publish-panel{background-color:#222!important}.indicator{color:#8e8e8e!important}.core-style{background-color:#222!important;color:#e1e1e1!important}.bili-at-popup,.create-vote,.hash-popup,.static-popup{border:0!important;border-radius:10px!important;background-color:#2b2b2b!important;-webkit-box-shadow:0 3px 5px 0 rgb(0 0 0/30%)!important;box-shadow:0 3px 5px 0 rgb(0 0 0/30%)!important}.static-popup.bp-arrow:before{background:#222!important}.bili-at-popup__group-name,.bili-at-popup__hint{color:#e1e1e1!important}.bili-at-popup__user--selected{background-color:#3b3e40!important}.bili-at-popup__user-name{color:#e1e1e1!important}.bg-white{background-color:#2b2b2b!important}.hash-popup .topic-container .item.is-selected{background-color:#3b3e40!important;color:#e1e1e1!important}.bp-button,.bp-input .indicator,.bp-radio,.title{color:#e1e1e1!important}.bp-input .indicator{background-color:#2b2b2b!important}.selector{color:#bcbcbc!important}.bp-input .input,.bp-input .textarea{color:#e1e1e1!important}.core-style:active,.core-style:focus,.core-style:hover{background:#222!important}.bp-vote-container button,.bp-vote-container input,.bp-vote-container input:focus,.bp-vote-container select,.bp-vote-container textarea,.bp-vote-container textarea:focus{background-color:transparent!important}.schedule-bar{margin-top:12px!important;border-radius:10px!important;background-color:#2b2b2b!important}.schedule-bar .dp-label{color:#bcbcbc!important}.static-popup{border:0!important;border-radius:10px!important;background-color:#2b2b2b!important;-webkit-box-shadow:0 3px 5px 0 rgb(0 0 0/30%)!important;box-shadow:0 3px 5px 0 rgb(0 0 0/30%)!important}.title{color:#e1e1e1!important;font-size:14px!important}.emoji{background-color:transparent!important}.emoji:hover{background-color:#403b3b!important}.dp-i-block{display:inline-block!important;color:#e1e1e1!important}.pagination{position:relative!important;width:100%!important;border-bottom-right-radius:8px!important;border-bottom-left-radius:8px!important;background-color:#222!important}.emoji-cover.selected{background-color:#403b3b!important}.page-controller .next:hover,.page-controller .prev:hover{background-color:#403b3b!important;color:#e1e1e1!important}.page-controller .next,.page-controller .prev{color:#e1e1e1!important}.page-controller .next.disabled,.page-controller .prev.disabled{color:#8e8e8e!important}.tc-slate{color:#e1e1e1}.new-notice-bar{border-radius:10px!important;opacity:.75!important}.card .main-content .user-name a,.content-full{color:#e1e1e1!important}.article-container,.bangumi-container,.card-content .deleted,.card-content .not-support,.card-content .repost,.live-container,.music-container,.video-container{border:0!important;border-radius:10px!important;background:#2b2b2b!important;box-shadow:0 2px 8px rgba(0,0,0,.19)!important}.card-content .deleted,.card-content .not-support,.card-content .repost{background-color:rgba(6,6,6,.19)!important}.content-ellipsis{background-color:transparent;color:#e1e1e1!important}.like-users-panel,.users-box .like-users-list,.users-box .like-users-list:active,.users-box .like-users-list:link,.users-box .like-users-list:visited{color:#babec0!important}.shop-panel .shop-list{width:100%!important;border-radius:10px!important;background-color:#2b2b2b!important}.shop-panel .panel-desc{color:#bcbcbc!important}.shop-desc .desc-box .title{color:#e1e1e1!important}.shop-desc .btn-box .jump-btn{opacity:.9!important}.shop-panel .shop-list.is-repost{background-color:#2b2b2b!important}.imagesbox .boost-control{background:#2b2b2b!important}.imagesbox .boost-control li{color:#8e8e8e!important}.article-container .text-area .title{color:#e1e1e1!important}.article-container .text-area .content{color:#bcbcbc!important}.article-container .images-area img:first-child{opacity:.9!important}.article-container:hover .text-area{-webkit-box-shadow:0 3px 10px 0 rgb(0 0 0/50%)!important;box-shadow:0 3px 10px 0 rgb(0 0 0/50%)!important}.bangumi-container .text-area .title{color:#e1e1e1!important;margin-top:9px!important}.video-container .text-area .title{color:#e1e1e1!important}.card .main-content .time .detail-link,.video-container .text-area .content{color:#8e8e8e!important}.card .more-panel{border:0!important;border-radius:10px!important;background:#2b2b2b!important;-webkit-box-shadow:0 11px 12px 0 rgb(0 0 0/20%)!important;box-shadow:0 11px 12px 0 rgb(0 0 0/20%)!important;color:#e1e1e1!important}.card .more-panel:after{border-top:1px solid #2b2b2b!important;border-left:1px solid #2b2b2b!important;background:#2b2b2b!important}.new-topic-panel .tag-item .content{color:#e1e1e1!important}.new-topic-panel .tag-item .label{background:#3b3b3b!important;color:#ccc!important}.loading-img{display:none}.dynamic-link-hover-bg:hover{background-color:#3b3e40}.userinfo-content{border-radius:10px!important;background:#222!important;color:#6d757a!important}.userinfo-wrapper{border:0!important;border-radius:10px!important;-webkit-box-shadow:0 2px 4px rgb(0 0 0/50%)!important;box-shadow:0 2px 4px rgb(0 0 0/50%)!important}.userinfo-content .info p{color:#8e8e8e!important}.userinfo-content .bg{border-top-right-radius:10px!important;border-top-left-radius:10px!important}.user-card .btn-box .like{border-radius:15px;background-color:#00a1d6;color:#fff}.user-card .btn-box .message,.userinfo-content .btn-box>a{border-radius:15px!important;background-color:#505050!important}.user-card .btn-box a,.userinfo-content .btn-box>a{border:0!important;background-color:#676767!important;color:hsla(0,0%,100%,.7)!important}.userinfo-content .btn-box>a:hover{color:hsla(0,0%,100%,.7)!important}.user-card .btn-box a:hover,.userinfo-content .btn-box>a.liked:hover{background-color:#676767!important;color:hsla(0,0%,100%,.7)!important}.user-card .btn-box a,.userinfo-content .btn-box>a,.userinfo-content .btn-box>a.liked{background-color:#3b3b3b!important;color:hsla(0,0%,100%,.7)!important}.userinfo-content .btn-box>a.liked:hover,.userinfo-content .btn-box>a:hover{background-color:#505050!important;color:hsla(0,0%,100%,.7)!important}.userinfo-content .info .user .name{color:#e1e1e1!important}.userinfo-content .info .sign{color:#bcbcbc!important}`;
            style_4 = commentBg("#222") + comment + style_3 + `#app{background:` + mainBg + `}.card{border:0!important;border-radius:15px!important}`
            style_5 = mainNav + commentBg(mainBg) + comment + `.bilibili-player{box-shadow:0 0 8px #040404!important}.bb-comment,.comment-bilibili-fold{background-color:` + mainBg + `!important}.main-container .review-module .review-list .empty-wrapper .btn-go-write{border-radius:20px;background-color:#222}.main-container .tool-bar .mobile-info .mobile-more,.main-container .tool-bar .share-info .share-more,.main-container .tool-bar .watch-info .watch-more{border:0 solid #e5e9ef!important;border-radius:10px;background:#222;box-shadow:0 2px 4px 0 #131212!important}.main-container .tool-bar .watch-info .watch-more .title{color:#bbb}.main-container .tool-bar .watch-info .watch-more .action-wrap .watch-action .main-title,.main-container .tool-bar .watch-info .watch-more .action-wrap .watch-action .sub-title{color:#e2e2e2}.main-container .tool-bar .watch-info .watch-more .action-wrap .watch-action.create-watch,.main-container .tool-bar .watch-info .watch-more .action-wrap .watch-action.match-watch{opacity:.95}.main-container .tool-bar .mobile-info .mobile-more .top-wrapper{color:#fff!important}.main-container .tool-bar .coin-info i,.main-container .tool-bar .coin-info span,.main-container .tool-bar .like-info i,.main-container .tool-bar .like-info span,.main-container .tool-bar .mobile-info i,.main-container .tool-bar .mobile-info span,.main-container .tool-bar .share-info i,.main-container .tool-bar .share-info span,.main-container .tool-bar .watch-info span{color:hsla(0,0%,100%,.68)!important}.main-container .media-info .media-right .media-desc i{background-color:#151718!important}.main-container .media-info .media-right .media-tool-bar .btn-follow i,.main-container .media-info .media-right .media-tool-bar .btn-follow span{color:hsla(0,0%,100%,.8)}.main-container .media-info .media-right .media-tool-bar .btn-follow.active{background-color:#505050!important}.main-container .media-info .media-right .media-tool-bar .bangumi-options .opt-list{border:0;border-radius:10px;background-color:#222;box-shadow:0 2px 4px rgba(0,0,0,.76)!important}.main-container .media-info .media-right .media-tool-bar .bangumi-options .opt-list li{color:#bcbcbc}.main-container .media-info .media-right .media-tool-bar .bangumi-options .opt-list li.disabled{color:#999}.main-container .media-info .media-right .media-tool-bar .bangumi-options .opt-list li:hover{background-color:hsla(0,0%,60%,.51);color:rgba(0,160,214,.71)}.main-container .media-info .media-right .pub-wrapper .av-link{color:#d0c7c7}.ep-section-module,.main-container .ep-list-wrapper{border-radius:10px;background-color:#222!important}.ep-section-module .section-title,.main-container .ep-list-wrapper .list-title h4{color:hsla(0,0%,90.6%,.91)!important}.ep-list-wrapper .ep-item,.section-ep-wrapper .ep-item{color:hsla(0,0%,90.6%,.88)!important}.ep-list-wrapper .ep-item.cursor,.section-ep-wrapper .ep-item.cursor{background-color:#46484a!important}.ep-list-wrapper .ep-item:hover,.section-ep-wrapper .ep-item:hover{background-color:rgba(82,84,86,.74)!important}.main-container .ep-list-wrapper .list-wrapper.simple ul .ep-item{border:0;border-radius:4px;background-color:hsla(0,0%,100%,.29)!important}.bui-collapse .bui-collapse-header{border-radius:10px!important;background:#222!important}.player-auxiliary-area .player-auxiliary-filter-title{color:hsla(0,0%,90.6%,.91)!important}.bui-collapse .bui-collapse-header .bui-collapse-arrow{color:#8e8e8e!important}.bpx-player-auxiliary .bpx-player-dm-function,.bpx-player-dm-btn-date,.bpx-player-dm-btn-dm,.bpx-player-dm-btn-time,.player-auxiliary-area .player-auxiliary-danmaku .player-auxiliary-danmaku-function{background-color:#2b2b2b!important}.bpx-player-auxiliary .bpx-player-dm-function .bpx-player-dm-btn-date,.bpx-player-auxiliary .bpx-player-dm-function .bpx-player-dm-btn-dm,.bpx-player-auxiliary .bpx-player-dm-function .bpx-player-dm-btn-time,.player-auxiliary-area .player-auxiliary-danmaku .player-auxiliary-danmaku-function [class*=player-auxiliary-danmaku-btn-]{color:#bcbcbc!important}.player-auxiliary-area .player-auxiliary-danmaku .player-auxiliary-danmaku-function [class*=player-auxiliary-danmaku-btn-]{background:#2b2b2b!important}.bpx-player-dm-wrap,.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap{background-color:#2b2b2b!important}.bpx-player-auxiliary .bpx-player-dm-container .dm-info-row,.bpx-player-auxiliary .bpx-player-dm-container .dm-info-row .dm-info-dm,.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row,.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row span.danmaku-info-danmaku{color:#bcbcbc!important}.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row .danmaku-info-block-btn,.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row .danmaku-info-protect-btn,.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row .danmaku-info-report-btn{background:#2b2b2b!important}.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row .danmaku-info-block-btn:hover,.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row .danmaku-info-protect-btn:hover,.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row .danmaku-info-report-btn:hover{background-color:rgba(0,161,214,.49)!important;color:#dcdcdc!important}.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row .danmaku-info-block-btn,.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row .danmaku-info-protect-btn,.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row .danmaku-info-report-btn{border:1px solid var(--bpx-primary-color,rgba(0,161,214,.49))!important}.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-btn-footer{background:#2b2b2b!important}.bui-button.bui-button-gray2,.bui-button.bui-button-gray2:hover{background-color:#505050!important;color:hsla(0,0%,100%,.7)!important}.player-auxiliary-area .player-auxiliary-filter .player-auxiliary-setting-menu-wrap{border:1px solid hsla(0,0%,95.7%,.2)!important;border-radius:10px!important;background-color:#222!important}.player-auxiliary-area .player-auxiliary-filter .player-auxiliary-setting-menu-wrap .player-auxiliary-setting-menu-list{background-color:#222!important;color:#bcbcbc!important}.player-auxiliary-area .player-auxiliary-filter .player-auxiliary-setting-menu-wrap .player-auxiliary-setting-menu-list:hover{background-color:#3b3b3b!important;color:#00a1d6!important}.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-load-status{background:rgba(43,43,43,.84)!important;color:#bcbcbc!important}.bui-collapse .bui-collapse-header,.player-auxiliary-area .player-auxiliary-filter{color:#222}.main-container .plp-r .danmaku-box .danmaku-wrap{border-radius:10px;background-color:#222}.player-auxiliary-area .player-auxiliary-filter{border-top-left-radius:10px}.bui-collapse .bui-collapse-header .bui-collapse-arrow{color:#a7a7a7}.player-auxiliary-area .player-auxiliary-filter .player-auxiliary-setting-menu-wrap{background-color:#4e4e4e;background-color:#798086;-webkit-box-shadow:0 2px 4px 0 #1b1b1b;box-shadow:0 2px 4px 0 #1b1b1b}.player-auxiliary-area .player-auxiliary-filter .player-auxiliary-setting-menu-wrap,.player-auxiliary-area .player-auxiliary-filter .player-auxiliary-setting-menu-wrap .player-auxiliary-setting-menu-list{background-color:#4e4e4e}.follow-dialog-wrap .follow-dialog-window{border-bottom:1px solid #505050!important;border-radius:15px!important;background:#222!important;color:hsla(0,0%,90.6%,.9)!important}.follow-dialog-wrap .follow-dialog-window .content .group-list li{color:hsla(0,0%,90.6%,.9)!important}.follow-dialog-wrap .follow-dialog-window .content .group-list li .special-tip{color:#b4bdc5!important}.follow-dialog-wrap .follow-dialog-window .content .info{color:#aeb8c1!important}.follow-dialog-wrap .follow-dialog-window .content .info .uname{color:#9aa4ab!important}.follow-dialog-wrap .follow-dialog-window .bottom{border-top:1px solid #505050!important}.follow-dialog-wrap .follow-dialog-window .content .group-list .add-group .add-btn{border:1px solid #adacac!important;color:#929ca2!important}.follow-dialog-wrap .follow-dialog-window .bottom .btn{opacity:.9!important}.follow-dialog-wrap .follow-dialog-window .bottom .btn:disabled{background-color:#525252!important;color:#a6a9af!important}.follow-dialog-wrap .follow-dialog-window .content .group-list .add-group .input-group{border:1px solid rgba(0,161,214,.7)!important}.follow-dialog-wrap .follow-dialog-window .content .group-list .add-group .input-group .submit{border-left:1px solid rgba(0,161,214,.7)!important;background:rgba(0,181,229,.11)!important;color:#00a1d6!important}.follow-dialog-wrap .follow-dialog-window .content .group-list .add-group .input-group input{background-color:#222!important;color:rgba(229,233,239,.91)!important}.follow-dialog-wrap .follow-dialog-window .content .group-list ul .follow-group-mask{background:hsla(0,0%,100%,0)!important}.short-review-masker .short-review-content{border-radius:20px;background:#222}.review-edit-header .review-edit-media-info h4{color:#e2e2e2}.review-edit-header .review-edit-media-info .rate-tip{color:hsla(0,0%,88.6%,.77)}.short-review-masker .short-review-content .review-body-wrap textarea{background:#222;color:#e2e2e2}
                    .bb-comment .comment-send-lite.comment-send-lite,.bb-comment .comment-send.comment-send-lite,.comment-bilibili-fold .comment-send-lite.comment-send-lite,.comment-bilibili-fold .comment-send.comment-send-lite{background:` + mainBg + `!important}.bb-comment .no-login .baffle,.comment-bilibili-fold .no-login .baffle{background-color:#505050!important;color:#e2e2e2!important}.main-container .media-info .media-right .media-title{color:hsla(0,0%,88.6%,.91)}.main-container .media-info .media-right .media-desc,.main-container .media-info .media-right .pub-wrapper .home-link,.main-container .media-info .media-right .pub-wrapper .pub-info{color:hsla(0,0%,88.6%,.94)}.main-container .media-info,.main-container .plp-l .comment-wrapper,.main-container .review-module{border-top:1px solid #6d757a}.main-container .review-module .review-list .review-item .review-body{border-radius:10px;background-color:#222}.main-container .review-module .review-list .review-item .review-title{color:#c7bcbc}.main-container .review-module .review-list .review-item .review-content{color:rgba(199,188,188,.89)}.main-container .plp-l .comment-wrapper .b-head,.main-container .recom-wrapper .recom-list .recom-item .info-wrapper .video-title,.main-container .recom-wrapper .recom-title,.main-container .review-module .module-title .more-link,.main-container .review-module .module-title h4{color:hsla(0,0%,90.6%,.92)}.follow-dialog-wrap .follow-dialog-window .title{border-bottom:1px solid #6d757a!important;color:#e5e9ef!important}.bb-comment .comment-send .textarea-container.focus textarea,.bb-comment .comment-send .textarea-container:hover textarea,.comment-bilibili-fold .comment-send .textarea-container.focus textarea,.comment-bilibili-fold .comment-send .textarea-container:hover textarea{color:#e2e2e2!important}.main-container .media-info .media-right .media-tool-bar .btn-rating{border:1px solid rgba(80,80,80,.62);color:hsla(0,0%,100%,.8);background-color:#505050}.main-container .media-info .media-right .media-tool-bar .btn-rating:hover{background-color:#4a4b4e}.main-container .pay-bar .vip .btn-pay.active{border:0;border-radius:10px;background-color:#222!important;color:hsla(0,0%,90.6%,.91)}.main-container .nav-tools .tool-item{border:0;background:#505050;color:hsla(0,0%,100%,.8)}.paging-box-big .current,.paging-box-big .dian,.paging-box-big .next,.paging-box-big .prev,.paging-box-big .tcd-number{border:0!important;background:#505050!important;color:hsla(0,0%,100%,.8)!important}.paging-box-big .page-jump input{border:1px solid #505050!important;background-color:#505050;color:hsla(0,0%,100%,.8)}.bb-comment .comment-list .list-item .info .btn-hover:hover,.comment-bilibili-fold .comment-list .list-item .info .btn-hover:hover{background:` + mainBg + `;color:#00a1d6}.main-container .tool-bar .mobile-info .mobile-more .top-wrapper .video-title{color:#e1e1e1}.main-container .tool-bar .mobile-info .mobile-more p{color:#bcbcbc}.main-container .tool-bar .mobile-info .mobile-more .top-wrapper .van-qrcode{opacity:.85}.main-container .review-module .review-list .review-item .review-header .review-author{color:#bcbcbc}.bpx-docker-minor{border-radius:10px;background-color:#222!important}.bpx-player-auxiliary .bpx-player-filter{border-radius:10px 10px;background:#222!important}span.bui-dropdown-name{color:hsla(0,0%,90.6%,.91)!important}.bpx-player-sending-bar{background:#212121!important}.bpx-player-sending-bar .bpx-player-video-inputbar .bpx-player-dm-input,.bpx-player-video-info{color:hsla(0,0%,88.2%,.88)!important}.bpx-player-sending-bar .bpx-player-dm-root .bpx-player-dm-setting,g#watch-together-icon-1,span.bpx-common-svg-icon{fill:hsla(0,0%,100%,.68)!important}.bpx-player-sending-bar .bpx-player-video-inputbar,.bpx-player-sending-bar .bpx-player-video-inputbar-wrap{background:#505050!important}.bpx-player-sending-bar .bpx-player-video-inputbar-wrap{border:1px solid #505050!important}.bpx-player-sending-bar .bpx-player-video-inputbar .bpx-player-dm-hint a>span,input::-webkit-input-placeholder{color:hsla(0,0%,73.7%,.88)!important}.bui svg{fill:#585858!important}.bpx-player-container{box-shadow:0 0 8px #040404!important}.ep-list-wrapper .ep-item a,.section-ep-wrapper .ep-item a{color:#e1e1e1!important}.bpx-docker-minor,.main-container .media-info .media-cover,.main-container .pre-mask,.player-module .player-tool-bar{background-color:#222!important}textarea.ipt-txt{color:#e1e1e1!important}.bpx-player-auxiliary .bpx-player-filter{border-radius:10px 0 0 10px!important}.up-info>a .up-name{color:hsla(0,0%,88.2%,.88)}.main-container .plp-l .player-mask .bar-wrapper{background-color:#2b2b2b}.main-container .plp-l .player-mask .bar-wrapper .left-bar,.main-container .plp-l .player-mask .bar-wrapper .right-bar{background-color:#232323}.main-container .season-list .ss-list-wrapper .ss-item .ss-info .ss-title{color:hsla(0,0%,88.2%,.88)}.main-container .season-list .ss-list-wrapper .ss-item .ss-info .pub-info{color:#bcbcbc}.main-container .season-list .series-title{color:hsla(0,0%,88.2%,.88)}.main-container .media-info,.main-container .plp-l .comment-wrapper,.main-container .review-module{border:0!important}.bpx-player-auxiliary .bpx-player-dmP{background:#222!important}.bpx-player-auxiliary .bpx-player-dm-btn-history{background-color:#3b3b3b!important;color:#bcbcbc!important}.bpx-player-auxiliary .bpx-player-dm-btn-history:hover{color:#bcbcbc!important}span.dm-info-report-btn.bpx-player-db-btn{background:0 0!important}.bpx-player-auxiliary .bpx-player-dm-container .dm-info-row .dm-info-block-btn:hover,.bpx-player-auxiliary .bpx-player-dm-container .dm-info-row .dm-info-protect-btn:hover,.bpx-player-auxiliary .bpx-player-dm-container .dm-info-row .dm-info-recall-btn:hover,.bpx-player-auxiliary .bpx-player-dm-container .dm-info-row .dm-info-report-btn:hover{background-color:rgba(0,161,214,.62)!important}.bpx-player-auxiliary .bpx-player-dm-load-status{background:0 0!important;color:#bcbcbc!important}.bpx-player-auxiliary .bpx-player-dm-btn-footer{background:#3b3b3b!important}`;
            style_6 = mainNav + commentBg(mainBg) + comment + `a{color:#e1e1e1}.video-page-card .card-box .info .title{color:hsla(0,0%,90.6%,.92)}.multi-page{border-radius:10px;background:#222;box-shadow:0 1px 2px #0e0e0e}.multi-page .head-con .head-left h3{color:hsla(0,0%,90.6%,.91)}.multi-page .cur-list .list-box li.on{background:#46484a}.multi-page .cur-list .list-box li:hover{background:#595c5f}.multi-page .cur-list .list-box li a{color:hsla(0,0%,90.6%,.91)}.multi-page .cur-list .module-box li{border:1px solid #505050!important;background:#505050}.members-info .avatar .info-tag[data-v-97401e06]{background:#222}.members-info__header[data-v-97401e06]{background-color:rgba(80,80,80,.36)}.members-info__header .title[data-v-97401e06]{color:hsla(0,0%,88.6%,.94)}.bui-collapse .bui-collapse-header{border-radius:10px!important;background:#222!important}.player-auxiliary-area .player-auxiliary-filter-title{color:hsla(0,0%,90.6%,.91)!important}.bui-collapse .bui-collapse-header .bui-collapse-arrow{color:#8e8e8e!important}.player-auxiliary-area .player-auxiliary-danmaku .player-auxiliary-danmaku-function{background-color:#2b2b2b!important}.v-wrap .danmaku-wrap{border-radius:15px!important;background:#222!important}.player-auxiliary-area .player-auxiliary-danmaku .player-auxiliary-danmaku-function [class*=player-auxiliary-danmaku-btn-]{color:#bcbcbc!important;background:#2b2b2b!important}.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap{background-color:#2b2b2b!important}.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row,.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row span.danmaku-info-danmaku{color:#bcbcbc!important}.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row .danmaku-info-block-btn,.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row .danmaku-info-protect-btn,.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row .danmaku-info-report-btn{background:#2b2b2b!important}.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row .danmaku-info-block-btn:hover,.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row .danmaku-info-protect-btn:hover,.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row .danmaku-info-report-btn:hover{background-color:rgba(0,161,214,.49)!important;color:#dcdcdc!important}.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row .danmaku-info-block-btn,.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row .danmaku-info-protect-btn,.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-list .danmaku-info-row .danmaku-info-report-btn{border:1px solid var(--bpx-primary-color,rgba(0,161,214,.49))!important}.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-btn-footer{background:#2b2b2b!important}.bui-button.bui-button-gray2,.bui-button.bui-button-gray2:hover{background-color:#505050!important;color:hsla(0,0%,100%,.7)!important}.player-auxiliary-area .player-auxiliary-filter .player-auxiliary-setting-menu-wrap{border:1px solid hsla(0,0%,95.7%,.2)!important;border-radius:10px!important;background-color:#222!important}.player-auxiliary-area .player-auxiliary-filter .player-auxiliary-setting-menu-wrap .player-auxiliary-setting-menu-list{background-color:#222!important;color:#bcbcbc!important}.player-auxiliary-area .player-auxiliary-filter .player-auxiliary-setting-menu-wrap .player-auxiliary-setting-menu-list:hover{background-color:#3b3b3b!important;color:#00a1d6!important}.danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-load-status{background:rgba(43,43,43,.84)!important;color:#bcbcbc!important}.bui-collapse .bui-collapse-header,.player-auxiliary-area .player-auxiliary-filter{color:#222}.main-container .plp-r .danmaku-box .danmaku-wrap{border-radius:10px;background-color:#222}.player-auxiliary-area .player-auxiliary-filter{border-top-left-radius:10px}.bui-collapse .bui-collapse-header .bui-collapse-arrow{color:#a7a7a7}.player-auxiliary-area .player-auxiliary-filter .player-auxiliary-setting-menu-wrap{background-color:#4e4e4e;background-color:#798086;-webkit-box-shadow:0 2px 4px 0 #1b1b1b;box-shadow:0 2px 4px 0 #1b1b1b}.player-auxiliary-area .player-auxiliary-filter .player-auxiliary-setting-menu-wrap,.player-auxiliary-area .player-auxiliary-filter .player-auxiliary-setting-menu-wrap .player-auxiliary-setting-menu-list{background-color:#4e4e4e}.video-info .video-title{color:#e5e9ef}.info .title[data-v-3a7137fb],.recommend-list .rec-title{color:hsla(0,0%,90.6%,.91)}.video-desc .info{color:hsla(0,0%,88.6%,.94)}.comment-m .b-head{color:hsla(0,0%,90.6%,.91)}.s_tag .tag-area>li{border:1px solid #505050;background:#505050}.s_tag .tag-area>li .tag-link{color:hsla(0,0%,100%,.8)}.s_tag .btn-add{background:#505050}.s_tag .btn-add span{background:hsla(0,0%,100%,.8)}.up-info .btn-panel .not-follow-charge-btn{background:` + mainBg + `}.video-toolbar .appeal-text,.video-toolbar .ops>span,.video-toolbar .ops>span i{color:#ddd}.video-desc .btn span{color:hsla(0,0%,88.6%,.94);cursor:pointer}.activity-m.act-now .l-inside .hinter-msg{color:hsla(0,0%,88.6%,.94);line-height:20px}.bilibili-player-video-sendbar{background:#212121!important}.bilibili-player-video-info{color:#ded9d9!important}.bilibili-player-video-sendbar .bilibili-player-video-inputbar{background-color:#505050;color:#999!important}.bilibili-player-video-sendbar .bilibili-player-video-inputbar .bilibili-player-video-danmaku-input{color:#ccd0d7!important}.bilibili-player .bui-button.bui-button-blue,.bilibili-player .bui-button.bui-button-gray3:hover,.bilibili-player .bui-button.bui-button-gray:hover{opacity:.9!important}.bilibili-player-video-sendbar .bilibili-player-video-inputbar .bilibili-player-video-inputbar-wrap{border:0!important;background-color:#505050!important}.bilibili-player{box-shadow:0 0 8px #040404!important}.video-desc .desc-info,.video-desc .toggle-btn span{color:#bcbcbc}.tag-channel-pane .bg-image[data-v-7aa389d0],.tag-channel-pane .bg-mask[data-v-7aa389d0]{border-radius:10px 10px 0 0!important}.tag-channel-pane[data-v-7aa389d0]{border-radius:10px!important;background:#222!important}.tag-channel-pane .channel-title[data-v-7aa389d0]{color:#bcbcbc}.tag-info-pane{border-radius:10px;background:#222;box-shadow:0 0 5px rgb(0 0 0/20%)}.tag-info-pane .tag-header .tag-title,.tag-info-pane .tag-header .tag-title a,.tag-info-pane .text{color:#bcbcbc}.recommend-list .rec-footer{background:#3b3b3b;color:hsla(0,0%,100%,.7)}.float-nav .nav-menu .item{border:0;background:#505050;color:hsla(0,0%,100%,.8)}.more-ops-list{border:0;background:#222;box-shadow:0 2px 8px 0 rgb(0 0 0/20%)}.more-ops-list li:hover{background:#505050;color:#00a1d6}.more-ops-list li{color:#bcbcbc}.player-auxiliary{background-color:transparent}.pic-box .pic[data-v-91571770],.video-page-card .card-box .pic-box{background:#353434}.mini-header[data-v-c00a7aa4],.up-info .btn-panel .default-btn,.up-info .u-face .fa,.vcd .cover[data-v-2202ce1b]{background:#222}.nav-link-item .link[data-v-c00a7aa4]{color:#e1e1e1}.activity-m .inside-wrp .hinter-msg,.activity-m .inside-wrp .l-inside,.activity-m .onlytip,.bb-comment .comment-list .list-item .user .name,.comment-bilibili-fold .comment-list .list-item .user .name{color:hsla(0,0%,88.2%,.88)}#bilibili-player.mini-player:before{box-shadow:0 0 5px #212121}#bilibili-player.mini-player .player{box-shadow:0 2px 8px 0 rgb(0 0 0)}.player-auxiliary{border-radius:15px;background-color:#222;background:0 0}.recommend-list .split-line{background:hsla(0,0%,73.7%,.5)}.video-toolbar .appeal-text,.video-toolbar .ops>span,.video-toolbar .ops>span i{color:hsla(0,0%,88.2%,.88)}.up-info .btn-panel .following{border:0;color:#bcbcbc}.up-info .btn-panel .following-charge-btn{background:#fb7299!important;color:#fff!important;opacity:.8!important}.next-button .switch-button{border:1px solid #bcbcbc;background:#2b2b2b}.next-button .switch-button:after{background-color:#bcbcbc}.next-button .switch-button.on:after{background:hsla(0,0%,88.2%,.88)}.up-info .up-info_right .name .message{color:#bcbcbc}.player-auxiliary{background-color:#222!important}.bilibili-player-video-sendbar.bilibili-player-normal-mode{background:0 0!important}.pl__head,p.pl__title{color:hsla(0,0%,88.2%,.88)!important}.activity-m .inside-wrp,.pop-live .pl__card{border:1px solid hsla(0,0%,73.7%,.5)}.van-popover.van-followed{border:1px solid #222;border-radius:8px;background-color:#222}ul.follow_dropdown{color:hsla(0,0%,88.2%,.88)!important}.van-popover.van-followed .follow_dropdown li:hover{background-color:#1a1b1d}.members-info__header{background-color:#222!important}.members-info__header .title[data-v-5c3ceb82]{color:hsla(0,0%,88.2%,.88)!important}.members-info .avatar .info-tag{background:#222!important}.bilibili-player .bilibili-player-video-sendbar .bilibili-player-video-inputbar .bilibili-player-video-btn-send.bui-button-disabled{background-color:#222}.video-info .video-title .activity{background-color:#ff82aa;opacity:.8}.v-wrap .s_tag,.video-toolbar{border-bottom:0!important}.up-info .up-info_right .name .username,a.username{color:hsla(0,0%,88.2%,.88)}.up-info .btn-panel .not-follow{background:#00a1d6!important;color:#e8e8e8;opacity:.9}.pop-live .pl__card{border:1px solid hsla(0,0%,73.7%,.5)!important}`;
            style_7 = mainNav + footer + `.nav-tabs__item>div>span{color:#e1e1e1}.history-list .history-tips,.popular-list .popular-tips,.rank-container .rank-tips,.weekly-header .update-tips{color:#bcbcbc!important}.rank-list .rank-item .content .info .title,.rank-tab-wrap .rank-tab,.video-card .video-name,.weekly-header .current-tiem{color:#e1e1e1!important}.rank-tab-wrap,.video-card .history-hint,.video-card .strong-tag,.video-card .weekly-hint{background:` + mainBg + `!important}.video-card .rcmd-tag{border:1px solid #f63!important}.weekly-header .panel .select-item{background:#222!important}.weekly-header .panel .item-title{color:#e1e1e1!important}.weekly-header .panel .select-item:not(.item-active):hover{background:rgba(0,0,0,.83)!important}.rank-list .rank-item:hover{box-shadow:0 2px 8px 1px rgb(0 0 0/40%)}.back-top-btn{border:1px solid #3b3b3b!important;border-radius:5px!important;background:#3b3b3b!important}.rank-container .rank-tips .icon-tip{color:#e1e1e1!important;fill:#e1e1e1!important}.video-card__info:hover .video-name{color:#00a1d6!important}.nav-tabs,.rank-list .rank-item{border-bottom:1px solid hsla(0,0%,73.7%,.5)}.video-card__content .cover-picture__image[data-v-a182333c]{background:#222}`;
            style_8 = mainNav + channelNav + footer + `.international-header a{color:#e7e7e7}.page-tab .con li{border:0}.page-tab .con li .bilifont{color:#3e3e3e}a{color:#e1e1e1}.storey-title .no-link{color:#e7e7e7}.van-popper[x-placement^=top] .popper__arrow:after{bottom:0;border-top-color:#222}.van-popper-channel{border:0;box-shadow:0 2px 12px 0 rgb(0 0 0/50%)}.van-popper[x-placement^=bottom] .popper__arrow,.van-popper[x-placement^=bottom] .popper__arrow:after{border-bottom-color:#222!important}.van-popover{border-radius:15px!important;background:#222!important}.international-header a,.van-popover,.van-popover a{color:#e1e1e1!important}.international-header a:hover,.van-popover a:hover{color:#00a1d6!important}`;
            style_9 = `.link-navbar{background-color:rgba(84,87,88,.68)!important}.area-list-panel .list-item,.link-navbar .main-ctnr .nav-logo,.link-navbar .nav-item{color:#bcbcbc!important}.area-list-panel,.link-navbar .main-ctnr .nav-items-ctnr.over-width{background-color:#222!important}.area-list-panel .list-item:hover{background-color:#505050!important}.activity-item-ctnr .info-ctnr .first-line .username[data-v-04a0c570],.darkgray,.user-item .username{color:#bcbcbc!important}.lightgray,.user-level-detail .detail-link{color:#8e8e8e!important}.user-level-detail .detail-link{border-radius:30px!important;background:#3b3b3b!important}.user-level-detail .detail-link:hover{background-color:#505050!important;color:#23ade5!important}.info-item-ctnr:hover{color:#23ade5!important}.calendar-checkin,.download-panel-ctnr,.hab-ctnr,.link-panel-ctnr,.user-level-detail,.user-panel-ctnr .user-panel{border-radius:10px!important;background-color:#222!important;box-shadow:0 2px 10px rgb(0 0 0/30%)!important}.user-level-detail{border:1px solid #222!important}.link-panel-ctnr .load-more .load-more-btn,.user-panel-ctnr .user-panel .content-ctnr .logout-btn{background-color:#3b3b3b!important;color:#bcbcbc!important}.attention-live .switch-btn:active,.attention-live .switch-btn:hover{background-color:#3b3e40!important}.calendar-checkin .calendar-wrapper,.calendar-checkin .title{background-color:#222!important}.calendar-checkin .calendar-wrapper .calendar .date-ctnr .day-item{background:#222!important;color:#bcbcbc;font-size:15px}.calendar-checkin .calendar-wrapper .calendar .date-ctnr .day-item.checked{border-radius:20px;background:rgba(36,148,191,.74)!important;font-size:10px}.calendar-checkin .calendar-wrapper{color:#8e8e8e!important}.download-panel-ctnr .download-item:hover{color:#3b3b3b!important}.user-panel-ctnr .user-panel .content-ctnr .logout-btn:hover{color:#23ade5!important}.search-bar-ctnr .search-bar{border:1px solid rgba(80,80,80,.81)!important;background-color:rgba(80,80,80,.81)!important}.search-bar-ctnr .search-bar input{color:#bcbcbc!important}.area-title,.banner-title,.item-title,.room-anchor,.room-title,.section-title,.title-text,.yzly-title{color:#e1e1e1!important}.item-title,.v-middle{color:#bcbcbc!important}.hab-ctnr,.highlight-area-item,.news-ctnr,.rank-ctnr,.rec-area-item{border-radius:10px!important;background-color:#222!important;box-shadow:0 2px 10px rgb(0 0 0/20%)!important}.text-info-ctnr.body-bg{background-color:` + mainBg + `!important}.hover-panel-wrapper{border:0!important;border-radius:15px!important}.card-info-ctnr,.hover-panel-wrap,.hover-panel-wrapper,.text-info-ctnr{background-color:#2b2b2b!important}.hover-panel-wrap{border:1px solid #2b2b2b!important}.live-sidebar-ctnr{background-color:#222!important}.btn{background:#3b3b3b!important}.btn:hover{background:#505050!important}.rec-area-item{border:0!important}.link-footer{background-color:#131516!important}.link-footer .footer-img-linker .footer-qrcode.qr-weibo,.link-footer .footer-img-linker .footer-qrcode.qr-weixin,.link-footer .footer-img-linker .footer-qrcode.qr-zbj{opacity:.8!important}.text-info-ctnr{background-color:transparent!important}.banner-item-ctnr:hover .banner-title,.more-ctnr:hover,.tab-item:hover,span.v-middle:hover{color:#23ade5!important}.hover-panel-wrap{border:0 solid #e9eaec!important;background:#222!important;box-shadow:0 13px 20px 0 rgb(18 20 23)!important}`
            style_10 = mainNav + `.categories-bar .tag-item,.nav-tab-bar .tab-item span,.page-content .left-side .article-list .article-list-holder .article-item .item-holder .article-title-holder,.page-content .left-side .partitio-name,.page-content .right-side .more .help .title,.page-content .right-side .more .link .title,.page-content .right-side .more .top-bar,.page-content .right-side .rank-module .rank-list .item a,.page-content .right-side .rank-module .rank-tabs-bar label,.page-content .right-side .search-module .search-block .search-word-panel .history-item,.page-content .right-side .search-module .search-block .search-word-panel .suggest-item,.page-content .right-side .up-list .title,.page-content .right-side .up-list .up-item .info-holder .head .nick-name{color:#e1e1e1}.page-content .left-side .article-list .article-list-holder .article-item .item-holder .article-desc,.page-content .right-side .more .help .info,.page-content .right-side .more .link .info,.page-content .right-side .rank-module .rank-tabs-bar .rank-tabs-list li,.page-content .right-side .up-list .up-item .info-holder .dynamic,.page-content .right-side .up-list .up-item .info-holder .dynamic .arc-title{color:#bcbcbc}.page-content .left-side .article-list .article-list-holder .article-item,.page-content .left-side .article-list .article-list-holder .article-item .item-holder .article-title-holder,.page-content .right-side .rank-module .rank-list .item,.page-content .right-side .search-module .search-block input,.page-content .right-side .up-list{background:` + mainBg + `;background-color:` + mainBg + `}.page-content .right-side .search-module .search-block input{color:#e1e1e1}.page-content .right-side .search-module .search-block .search-word-panel,.page-content .right-side .search-module .search-block .search-word-panel .panel-title p span{background:#222}.page-content .right-side .search-module .search-block .search-word-panel .history-item:hover,.page-content .right-side .search-module .search-block .search-word-panel .suggest-item:hover{background-color:#3b3b3b}.page-content .right-side .rank-module .rank-list .item .rank-index{border-radius:10px;background:#999;color:#fff}.to-top{border:0;background:rgba(80,80,80,.37)}.page-content .right-side .rank-module .complete-rank,.page-content .right-side .up-list .fresh-btn{border-radius:10px;background:#3b3b3b;color:#ccc}.page-content .right-side .up-list .fresh-btn{border:1px solid #3b3b3b}.page-content .left-side .article-list .article-list-holder .article-item .item-holder .article-title-holder .list-mark,.page-content .right-side .search-module .search-block,.page-content .right-side .search-module .search-block .search-word-panel{border:1px solid hsla(0,0%,73.7%,.5)}.categories-bar,.page-content .left-side .article-list .article-list-holder .article-item,.page-content .right-side .more .top-bar,.page-content .right-side .rank-module .rank-tabs-bar,.page-content .right-side .up-list .title{border-bottom:1px solid hsla(0,0%,73.7%,.5)}.page-content .right-side .search-module .search-block .search-word-panel .panel-title .split-line{border-top:1px solid hsla(0,0%,73.7%,.5)}`
            style_11 = commentBg("#222") + comment + mainNav + `.article-container,.article-up-info,.comment-wrapper .comment-m,.list-container .article-list-block,.list-container .list-info-block,.recommend-list,.right-side-bar .catalog,.right-side-bar .catalog-panel,.right-side-bar .side-toolbar,.right-side-bar.on .to-top{border-radius:15px!important;background-color:#222!important;box-shadow:1px 3px 10px rgb(0 0 0/40%)!important}.article-container .title-container .title,.comment-wrapper .comment-m .b-head,.list-container .list-info-block .right-side .title,.normal-article-holder,.recommend-list .recommend-article-list .left-panel .article-desc,.recommend-list .recommend-article-list .left-panel .article-title,.recommend-list .recommend-header .title{color:#e1e1e1}.article-up-info .up-name,.right-side-bar .catalog-panel__title{color:#e1e1e1!important}.article-tags .tag-item,.interaction-info .hover-item,.interaction-info .toolbar .share-box,.normal-article-holder figcaption,.recommend-list .recommend-header .more,.recommend-list .recommend-header .more .iconfont{color:#bcbcbc}.right-side-bar .catalog-panel__info,.right-side-bar .side-toolbar .toolbar-item{color:#bcbcbc!important}.article-breadcrumb .breadcrumb-name,.article-breadcrumb .slash,.right-side-bar .catalog,.right-side-bar .side-toolbar .toolbar-item .iconfont,.right-side-bar .side-toolbar .toolbar-on,.right-side-bar .side-toolbar .toolbar-on>.iconfont,.right-side-bar .to-top .iconfont{color:#8e8e8e!important}.fixed-top-header{background:#141414}.fixed-top-header .inner .inner-title,.fixed-top-header .inner .up-info__name{color:#bcbcbc}#app{background:` + mainBg + `}.article-container__content,.recommend-list .recommend-article-list .article-item,.recommend-list .recommend-header{border-bottom:1px solid hsla(0,0%,73.7%,.5)}.normal-article-holder .img-box:before{border:1px solid hsla(0,0%,73.7%,.5)}.card-image__image,img{opacity:.8!important}.card-image,.read-article-holder .default-cover{background:#1b1b1b!important}.normal-article-holder .color-default,.normal-article-holder .color-gray-03{color:#dcdcdc}.right-side-bar .catalog-panel .catalog-item--on,.right-side-bar .catalog-panel__info:hover,.right-side-bar .catalog:hover .catalog-text,.right-side-bar .catalog:hover .icon-catalog,.right-side-bar .side-toolbar .toolbar-item:hover .iconfont,.right-side-bar .side-toolbar .toolbar-item:hover>.toolbar-item__num,.right-side-bar .side-toolbar .toolbar-on,.right-side-bar .side-toolbar .toolbar-on>.iconfont,.right-side-bar .to-top:hover .iconfont,.van-popover.van-followed .follow_dropdown li:hover{color:#00a1d6!important}.right-side-bar .catalog:after,.right-side-bar .to-top{background:#222!important}.list-container .list-info-block .right-side .up-info-block .follow-btn,.unfollow{opacity:.9!important}.followed,.list-container .list-info-block .right-side .up-info-block .follow-btn.on{border:1px solid #3b3b3b!important;background:#3b3b3b!important;color:#bcbcbc!important}.van-popover.van-followed{border:1px solid #171717!important;border-radius:8px!important;background-color:#171717!important}.van-popover.van-followed .follow_dropdown li:hover{background-color:#111213!important}.van-popover.van-followed .follow_dropdown li{color:#bcbcbc!important}.recommend-list .recommend-article-list .left-panel .article-info,.recommend-list .recommend-article-list .left-panel .article-info .article-info--stats .stats-categroy,.recommend-list .recommend-article-list .left-panel .article-info .article-info--up{color:#bcbcbc}.right-side-bar .catalog-panel .catalog-item{color:hsla(0,0%,88.2%,.88)!important}.list-container .list-info-block .right-side .up-info-block .up-name{color:hsla(0,0%,88.2%,.88)}.right-side-bar .catalog-panel .catalog-item:hover{background:#2f3031!important}.right-side-bar .catalog[data-v-3ee147b6]:after{width:45px!important}.list-container .article-list-block .article-item{background:0 0}.list-container .list-info-block .right-side .col .split-line{background-color:hsla(0,0%,73.7%,.5)}.list-container .article-list-block .article-item .item-holder .article-content .article-title{color:hsla(0,0%,88.2%,.88)}.list-container .article-list-block .article-item .item-holder .article-content .article-left-block{border-bottom:1px solid hsla(0,0%,73.7%,.5)}.list-container .article-list-block .article-item .item-holder .article-content .article-desc{color:hsla(0,0%,88.2%,.88)}`
            style_12 = mainNav + comment + commentBg("#222") + `body{background:` + mainBg + `}.n .n-inner{background:#222;box-shadow:0 0 0 1px #222}.g-search input,.n .n-data .n-data-v{color:hsla(0,0%,90.6%,.91)}.g-search input{border:1px solid #222;background:#505050}#page-index .col-2 .section{border:1px solid #222;border-radius:10px;background:#222}.user .info .meta .row:first-child,section-title{color:hsla(0,0%,90.6%,.91)}#page-index .col-1{background:#222}.n .n-btn.active{color:#00a1d6!important}#page-index .col-2 .section .user-auth.no-auth .no-auth-title .goto-auth,#page-index .fav-item .name,.section-title,.section-title .t,.small-item .title,a{color:#e1e1e1}#page-index .bangumi .content .title{color:hsla(0,0%,90.6%,.88)}#page-index .channel .empty-state p,#page-index .fav-item .state,.i-m-text,.i-m-u-icon,.large-item .desc,.list-create .text,.n .n-data .n-data-k,.n .n-num,.n .n-text,.private-hint,.sec-empty-hint,.section .more{color:#bcbcbc}textarea::placeholder{color:hsla(0,0%,73.7%,.79)}#page-index #i-ann-content textarea{border:1px solid #424242;background:#222;color:hsla(0,0%,90.6%,.88)}.list-create{background:#222}.section .count{border:0 solid #ddd;border-radius:3px;background:#777;color:#f6fafb}.section .count:before{width:0;height:0}.large-item .cover img,.mini-item .cover img{box-shadow:0 0 0 0 #e5e9ef}#page-index .col-1,#page-index .fav-covers,.i-m-r2{border:0}.i-m-r2{border-radius:15px;background:#2b2b2b}.i-m-upload{border-right:1px solid #bcbcbc}#page-index .col-2 .section-title,#page-index .col-2 .section:last-child{border-bottom:0}.section .count:before,.section .more{background:#222}.section .more{padding:0 10px}.i-m-u-icon,.i-m-v-icon{width:0;height:0}.col-full{border-radius:15px;background:#222;box-shadow:0 0 0 #000}.pgc-space-follow-item .pgc-item-info .pgc-item-title,.sub-tabs span{color:#e1e1e1!important}.pgc-space-follow-item .pgc-item-info .pgc-item-desc{color:#bcbcbc!important}.bangumi-pagelistbox .p,.be-pager-item,.be-pager-next,.be-pager-prev{margin-right:8px!important;border:0!important;background-color:#2b2b2b!important;color:#bcbcbc!important}.bangumi-pagelistbox .p.active,.bangumi-pagelistbox .p:hover,.be-pager-item-active{border-color:rgba(0,161,214,.78)!important;background-color:rgba(0,161,214,.78)!important;color:hsla(0,0%,90.6%,.88)!important}.bangumi-pagelistbox .custom-right .custom-right-inner.custompage,.be-pager-options-elevator input{border:0!important;border-radius:10px!important;background-color:#3b3b3b!important;color:#e1e1e1!important}.be-pager-item a,.be-pager-next a,.be-pager-prev a,.pgc-space-follow-item .pgc-item-info .pgc-item-desc{color:hsla(0,0%,90.6%,.88)}.be-dropdown-menu,.pgc-space-follow-item .bangumi-options .opt-list{border:0!important;background-color:#2b2b2b!important;box-shadow:0 2px 4px rgb(0 0 0/30%)!important}.be-dropdown-item,.pgc-space-follow-item .bangumi-options .opt-list li{color:#bcbcbc!important}.pgc-space-follow-item .bangumi-options .opt-list li.disabled{color:#8e8e8e!important}.be-dropdown-item:hover,.pgc-space-follow-item .bangumi-options .opt-list li:hover{background-color:#3b3b3b!important;color:#00a1d6}#page-fav .fav-sidenav .fav-item:hover{background-color:#3b3b3b!important}#page-fav .fav-sidenav .nav-title .text,.favInfo-box .favInfo-details .fav-name,.small-item.disabled .title{color:#e1e1e1}#page-fav .fav-main .filter-item,#page-fav .fav-main .search-types,#page-fav .fav-sidenav .favlist-title,#page-fav .fav-sidenav .watch-later,input::placeholder{color:#bcbcbc}#page-fav .fav-main .small-item{border:0}#page-fav .fav-main .favList-info,#page-fav .fav-sidenav .nav-container,#page-fav .fav-sidenav .watch-later,.be-dropdown-item.be-dropdown-item-delimiter{border-bottom:1px solid hsla(0,0%,73.7%,.5)}#page-fav .fav-sidenav{border-right:1px solid hsla(0,0%,73.7%,.5)}#page-fav .fav-sidenav .watch-later{border-top:1px solid hsla(0,0%,73.7%,.5)}#page-fav .fav-main .search-input input{background:#222;color:#bcbcbc}.small-item .cover{background:#272727}#page-fav .fav-sidenav .icon-cursor{background-color:#2b2b2b}#page-fav .fav-main .filter-item .filter-type .be-dropdown-item span{color:hsla(0,0%,90.6%,.88)}#page-setting .setting-index-module,#page-setting .setting-privacy-item .setting-privacy-name{color:#e1e1e1}#page-setting #setting-new-tag{border:1px solid #3b3b3b;color:#bcbcbc}#page-setting #setting-new-tag-btn{border:1px solid #3b3b3b;border-radius:10px 0 0 10px;background:#3b3b3b}#page-setting .setting-tag-list a{border:1px solid #3b3b3b;border-radius:10px;background:#222}#page-setting .setting-index-module{border-bottom:1px solid #bcbcbc}.be-tab-item{color:#bcbcbc}#page-dynamic .col-2 .section{border:0;border-radius:10px;background-color:#222;box-shadow:0 2px 8px rgb(0 0 0/30%)}#page-video .page-head__left .video-title{color:#e1e1e1}#page-video #submit-video-type-filter{border-radius:15px;background-color:#2b2b2b}#page-video #submit-video-type-filter a,#page-video .page-head__left .be-tab-item{color:#bcbcbc}.contribution-sidenav .contribution-item:hover{background-color:#3b3b3b}.contribution-sidenav~.main-content{border-left:1px solid hsla(0,0%,73.7%,.5)}.contribution-sidenav{border-right:1px solid hsla(0,0%,73.7%,.5)}#page-index .channel .section-right-options .play-all-channel,#page-video .play-all-btn{border:1px solid #bcbcbc;border-radius:10px;color:#bcbcbc}#page-index .channel .section-right-options .play-all-channel .video-commonplayer_play,#page-index .channel .section-right-options .play-all-channel>span,#page-video .play-all-btn .video-commonplayer_play,.be-tab-input{color:#bcbcbc}#page-index .col-2 .section-title,.i-m-r2,.section,.section .more{border-bottom:1px solid #bcbcbc}.be-tab-item.is-active{color:#00a1d6!important}#page-index .col-1 .section .more{border-radius:10px}#page-index .channel.guest .channel-item .channel-title .channel-name{color:#e1e1e1}.i-pin-desc,.small-item .meta{color:#bcbcbc}#page-index .channel .channel-item,#page-index .col-2 .section-title,.article-content,.i-m-r2,.s-content,.section,.section .more{border-bottom:1px solid hsla(0,0%,73.7%,.5)}.i-pin-meta,.meta-col{color:#bcbcbc}#page-index .col-2 .section .user-auth .auth-description{color:hsla(0,0%,90.6%,.88)}.elec .elec-monthly-count,.i-live .i-live-fo-count,.i-live .i-live-off-guest p,.i-live .i-live-unfo-btn{color:#bcbcbc}#page-channel-index .channel-item .channel-name{color:#e1e1e1}.i-pin-v .be-tab{border-bottom:1px solid hsla(0,0%,73.7%,.5)}#app{background:` + mainBg + `}.col-1,.section.game,.section.i-ann,.section.i-m,.section.user{box-shadow:0 4px 7px 0 #101010}div#i-ann-display{color:hsla(0,0%,88.2%,.88)}#page-fav .fav-main .filter-item.search,#page-setting .setting-index-container,.i-live .i-live-fo-btn,.i-live .i-live-fo-count,.i-live .i-live-unfo-btn,.list-item{border:1px solid hsla(0,0%,73.7%,.5)}.breadcrumb .item.cur,p.item{color:hsla(0,0%,88.2%,.88)}#page-fav .fav-main .search-types,#page-fav .fav-sidenav{border-right:1px solid hsla(0,0%,73.7%,.5)}.small-item.disabled .disabled-cover{background:#2b2b2b}#page-fav .fav-main{border-left:1px solid hsla(0,0%,73.7%,.5)}html{background:0 0!important}#page-fav .fav-main .fav-action-top .back-to-info{color:hsla(0,0%,88.2%,.88)}#page-setting #setting-new-tag{border:1px solid #2b2b2b;background:#2b2b2b;color:hsla(0,0%,88.2%,.88)}#page-setting #setting-new-tag-btn{border-radius:0}.be-switch{opacity:.8}#page-setting .setting-index-module{border-bottom:1px solid hsla(0,0%,73.7%,.5)}.user-info .user-info-title .info-title{color:hsla(0,0%,88.2%,.88)!important}.user-info .user-info-title .change-info-btn{border:.5px solid hsla(0,0%,73.7%,.5)!important;color:#bcbcbc!important}.user-info .user-info-title{border-bottom:1px solid hsla(0,0%,73.7%,.5)!important}.user-info .info-content .info-command,.user-info .info-content .info-value{color:#bcbcbc!important}.section .more{border:1px solid hsla(0,0%,73.7%,.5)!important}.card{border:0!important}.card,.home-page .home-container .home-content .center-panel .section-block,.live-panel,.most-viewed-panel,.new-topic-panel,.notice-panel,.tab-bar,.user-panel{border-radius:10px!important;background:#222!important;box-shadow:0 4px 6px 0 rgb(0 0 0/50%)!important}.bili-at-popup,.create-vote,.hash-popup,.static-popup{border:0!important;border-radius:10px!important;background-color:#2b2b2b!important;-webkit-box-shadow:0 3px 5px 0 rgb(0 0 0/30%)!important;box-shadow:0 3px 5px 0 rgb(0 0 0/30%)!important}.tc-slate{color:#e1e1e1}.new-notice-bar{border-radius:10px!important;opacity:.75!important}.card .main-content .user-name a,.content-full{color:#e1e1e1!important}.article-container,.bangumi-container,.card-content .deleted,.card-content .not-support,.card-content .repost,.live-container,.music-container,.video-container{border:0!important;border-radius:10px!important;background:#2b2b2b!important;box-shadow:0 2px 8px rgba(0,0,0,.19)!important}.card-content .deleted,.card-content .not-support,.card-content .repost{background-color:rgba(6,6,6,.19)!important}.content-ellipsis{background-color:transparent;color:#e1e1e1!important}.like-users-panel,.users-box .like-users-list,.users-box .like-users-list:active,.users-box .like-users-list:link,.users-box .like-users-list:visited{color:#babec0!important}.shop-panel .shop-list{width:100%!important;border-radius:10px!important;background-color:#2b2b2b!important}.shop-panel .panel-desc{color:#bcbcbc!important}.shop-desc .desc-box .title{color:#e1e1e1!important}.shop-desc .btn-box .jump-btn{opacity:.9!important}.shop-panel .shop-list.is-repost{background-color:#2b2b2b!important}.imagesbox .boost-control{background:#2b2b2b!important}.imagesbox .boost-control li{color:#8e8e8e!important}.article-container .text-area .title{color:#e1e1e1!important}.article-container .text-area .content{color:#bcbcbc!important}.article-container .images-area img:first-child{opacity:.9!important}.article-container:hover .text-area{-webkit-box-shadow:0 3px 10px 0 rgb(0 0 0/50%)!important;box-shadow:0 3px 10px 0 rgb(0 0 0/50%)!important}.bangumi-container .text-area .title{color:#e1e1e1!important;margin-top:9px!important}.video-container .text-area .title{color:#e1e1e1!important}.card .main-content .time .detail-link,.video-container .text-area .content{color:#8e8e8e!important}.card .more-panel{border:0!important;border-radius:10px!important;background:#2b2b2b!important;-webkit-box-shadow:0 11px 12px 0 rgb(0 0 0/20%)!important;box-shadow:0 11px 12px 0 rgb(0 0 0/20%)!important;color:#e1e1e1!important}.card .more-panel:after{border-top:1px solid #2b2b2b!important;border-left:1px solid #2b2b2b!important;background:#2b2b2b!important}.new-topic-panel .tag-item .content{color:#e1e1e1!important}.new-topic-panel .tag-item .label{background:#3b3b3b!important;color:#ccc!important}.loading-img{display:none}.dynamic-link-hover-bg:hover{background-color:#3b3e40}.userinfo-content{border-radius:10px!important;background:#222!important;color:#6d757a!important}.userinfo-wrapper{border:0!important;border-radius:10px!important;-webkit-box-shadow:0 2px 4px rgb(0 0 0/50%)!important;box-shadow:0 2px 4px rgb(0 0 0/50%)!important}.userinfo-content .info p{color:#8e8e8e!important}.userinfo-content .bg{border-top-right-radius:10px!important;border-top-left-radius:10px!important}.user-card .btn-box .like{border-radius:15px;background-color:#00a1d6;color:#fff}.user-card .btn-box .message,.userinfo-content .btn-box>a{border-radius:15px!important;background-color:#505050!important}.user-card .btn-box a,.userinfo-content .btn-box>a{border:0!important;background-color:#676767!important;color:hsla(0,0%,100%,.7)!important}.userinfo-content .btn-box>a:hover{color:hsla(0,0%,100%,.7)!important}.user-card .btn-box a:hover,.userinfo-content .btn-box>a.liked:hover{background-color:#676767!important;color:hsla(0,0%,100%,.7)!important}.user-card .btn-box a,.userinfo-content .btn-box>a,.userinfo-content .btn-box>a.liked{background-color:#3b3b3b!important;color:hsla(0,0%,100%,.7)!important}.userinfo-content .btn-box>a.liked:hover,.userinfo-content .btn-box>a:hover{background-color:#505050!important;color:hsla(0,0%,100%,.7)!important}.userinfo-content .info .user .name{color:#e1e1e1!important}.userinfo-content .info .sign{color:#bcbcbc!important}`;
            style_13 = mainNav + footer + `.top-header{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAABWCAYAAADlqUfFAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK6wAACusBgosNWgAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAAbSURBVCiRY2RYcOM/AwMDAxMDFIwyRhkjjQEAc4gDI5wD87YAAAAASUVORK5CYII=) repeat!important;opacity:.6!important}.security_content{border:0!important;border-radius:15px!important;background:#222!important;box-shadow:0 2px 4px rgb(0 0 0/51%)!important}.big-game-gift-warp,.big-name-warp,.big-pendant-warp,.big-privilege-warp,.big-watch-wrapper,.security-list-jump,.security-right-title,.security-title,.security-ul,.tabs-nav{border-bottom:1px solid hsla(0,0%,73.7%,.5)!important}.security-right{border-left:1px solid hsla(0,0%,73.7%,.5)!important;background:#141415!important}.big-gift-btn-home{border:1px solid #3b3b3b!important;background:#3b3b3b!important;color:hsla(0,0%,90.6%,.88)!important}.big-gift-btn-home:hover{border-color:#00b5e5!important;background:#00b5e5!important;color:#fff!important;opacity:.9!important}.big-more-tool-btn{border:0!important}.big-member-btn{opacity:.9!important}.big-game-gift-text,.big-pendant-test,.big-privilege-title,.big-watch-title,.member-list-item-text,.privilege-text,.right-more-btn,.security-list-link-jump{color:#e1e1e1!important}.right-more-btn{opacity:.8!important}.security-nav-name{color:#e1e1e1!important}.f-list-hover:hover,.security-list .child-list li a:hover,.security-list-jump:hover,.security-list:hover{background:#181819!important}.face-g-list .face-g-block .face-g-block-title,.h-reward-info,.h-safe-title,.home-dialy-task-title,.main-content-title span.t,.points-exchange-title,.points-how-title,.points-info p,.points-pendant-title p,.re-exp-info,.safe-tips p{color:#e1e1e1!important}.be-row label,.curren-b-num,.el-form-item__label,.face-g-list .mp-block .left .mp-info .mp-descr,.face-g-list .mp-block .left .mp-info .mp-title,.face-g-list .mp-block .right ul li p.title,.face-nav>div a,.go-secuirty,.h-none-msg,.h-safe-desc,.hold-list-width div,.home-to-space,.home-to-update,.identify-component .identify-content .identify-container .identify-form p,.identify-tips .content .tips-box,.inv-record-title,.invitation-info-title,.main-content-title span.i,.medal-message,.module-title *,.nav-list li .list-title .list-title-text p,.now-num,.pendant-mail-margin h3,.pendant-name,.pendant-nav li div,.points-faq-info-list,.receive-list-width div,.record-group,.record-login-descript,.record-nav-item,.security-list .child-list li a,.security-list .first-level,.tab-btn-link,.tab-mk2,.table-normal tbody tr,.tabs-nav-item,.upload-content .upload-text label,.userinfo-username{color:hsla(0,0%,88.2%,.88)!important}div{color:#bcbcbc}.h-none-btn,.h-reward-icon,.h-safe-btn,.h-safe-icon,.h-safe-nobtn,.home-dialy-exp-icon,.home-head img,.home-mp-icon,.home-right,.re-exp-getexp{opacity:.85!important}.hold-list,.home-to-space,.home-to-update,.indentify-page,.pendant-list li,.points-box,.points-pendant-item,.table-wrapper,.tool-container,.wear-list li{border:1px solid hsla(0,0%,73.7%,.75)!important}.identify-component .identify-footer,.nav-list li{border-top:1px solid hsla(0,0%,73.7%,.5)!important}.face-g-list .face-g-block,.face-nav,.hold-list-width.details-list-t,.home-daily-task-warp,.home-mp,.identify-component .identify-head,.index-info,.invitation-top-warp,.main-content-title,.points-pendant-warp,.record-nav,.security-list .child-list,.security-list .first-level,.sr-t,.tabs-mk2,.user-setting-warp .padding-dom{border-bottom:1px solid hsla(0,0%,73.7%,.5)!important}#mp-mine-header,#mp-mine-header.active,.points-header-warp{opacity:.6}.points-btn,.points-faq-line{opacity:.9}.btn-small .btn-dufault{opacity:.8}.go-movie{background-color:transparent!important}.go-movie:hover{background-color:#00a1d6!important;color:#fff!important;opacity:.9}.user-my-date .el-input__inner{border:1px solid #3b3b3b;border-radius:10px;background:#3b3b3b;color:#e1e1e1}.be-row select,.el-input,.user-my-sex .el-radio-button__inner,input,textarea.el-textarea__inner{border:1px solid #3b3b3b!important;border-radius:10px!important;background:#3b3b3b!important;color:#e1e1e1!important}.tool-uninstall-pendant{background:#2b2b2b!important}.pendant-list li:hover{border:1px solid #00a1d6!important}.invtable tr th,.table-normal tbody tr:nth-child(odd),.table-styleW thead tr td,table.invtable td{border:1px solid hsla(0,0%,73.7%,.5)!important;background-color:#2b2b2b!important;color:hsla(0,0%,88.2%,.88)!important}.identify-component .identify-head,.identify-content,.identify-tips,.indentify-page{background:#222!important}.identify-component .identify-content .identify-container .identify-form p{margin-top:0!important}.big-more-item-item,.big-more-item-list{border:1px solid #222;border-radius:8px;background-color:#222;color:hsla(0,0%,88.2%,.88)}.big-more-item-item:hover .big-more-item-txt{background:#3b3e40}.coin-inner{background-color:transparent!important}.coin-index-right-title,.nav-list li .list-description p .coin-rest-info{color:#bcbcbc!important}.coin-rest-p{color:hsla(0,0%,88.2%,.88)!important}.coin-text-p{color:hsla(0,0%,73.7%,.74)!important}.coin-nav,.table-normal thead tr td{border-bottom:1px solid hsla(0,0%,73.7%,.5)!important;border-left:1px solid hsla(0,0%,73.7%,.5)!important}.table-normal thead tr td{background:#222!important}.coin-nav-item{color:hsla(0,0%,88.2%,.88)!important}.coin-record .coin-title,.coin-rest-info{color:#bcbcbc!important}.table-normal tbody tr td{border-left:1px solid hsla(0,0%,73.7%,.5)!important}.get-coin-more{border:1px solid #2e2e2e!important;border-radius:8px;background:#2e2e2e!important;color:#bcbcbc!important}.get-coin-more:hover{border-color:#28292a!important;background-color:#28292a!important}.my-moral{color:hsla(0,0%,88.2%,.88)}`;
            style_14 = style_3 + `.feed-topic .publis,.feed-topic .publish-panel-container,.feed-topic .separater-line{border-radius:10px!important;background:#222!important;box-shadow:0 4px 6px 0 rgb(0 0 0/30%)!important}.card .focus-btn .focus{border:1px solid #ccd0d7!important;border-radius:20px!important;background-color:#222!important}.card .focus-btn .unfocus{border:1px solid #00a1d6!important;border-radius:20px!important;background-color:#222!important}.card .more-panel{border:0!important;border-radius:10px!important;background:#2b2b2b!important;-webkit-box-shadow:0 11px 12px 0 rgb(0 0 0/20%)!important;box-shadow:0 11px 12px 0 rgb(0 0 0/20%)!important;color:#e1e1e1!important}.card .more-panel:after{border-top:1px solid #2b2b2b!important;border-left:1px solid #2b2b2b!important;background:#2b2b2b!important}.card{border:0!important;border-radius:15px!important}.tc-dark-slate{color:#e1e1e1}.active-panel .show-more-button{border-radius:10px!important;background-color:#3b3b3b!important}.tab-nav .tab .tab-text{color:#bcbcbc!important}.video-topic .video-list{border-radius:15px!important;background-color:#222!important}.video-topic .video-list .video-title{color:#e7e7e7!important}.v .t{color:#e1e1e1!important}.page-list-box .page-item a{color:#bcbcbc!important}.page-list-box .page-item{border:0!important;background-color:#2b2b2b!important;color:#bcbcbc!important}.page-list-box .active a{color:#e1e1e1!important}.page-list-box .active{background:#00a1d6!important}.page-list-box .page-input{border:0!important;border-radius:10px!important;background-color:#3b3b3b!important;color:#e1e1e1!important}.bp-popup-panel{background-color:#222!important}.selector-box{color:#e1e1e1!important}.content-text{color:#bcbcbc!important}bl-button--primary:disabled{background-color:#6f6f6f!important;color:#a2a2a2!important}.bp-popup-ctnr .popup-content-ctnr{color:#e1e1e1!important}.tab-wrap .tab-item{color:#bcbcbc!important}.feed-topic .separater-line{border-bottom:1px solid hsla(0,0%,73.7%,.5)!important}#app{background:` + mainBg + `!important}.card .focus-btn .focus:hover{border-color:#00a1d6!important}.unfocus.t-center.w-100.h-100:hover{background:#00a1d6!important}.textarea[data-v-126b8d34]{background:0 0!important;color:hsla(0,0%,88.2%,.88)!important}.bl-button--primary:disabled{background-color:#3b3b3b!important;color:#b4b4b4!important;opacity:.8!important}.bl-button--ghost:hover,.bl-button--primary{opacity:.9!important}.tab-nav .tab .tab-text.selected[data-v-21a80c3a],.tab-nav .tab .tab-text:hover,.tab-wrap .tab-item.active[data-v-479d07d0],.v:hover .t{color:#00a1d6!important}`;
            style_15 = mainNav + footer + `.block-list-item-title,.block-page-progress,.block-title,.block-title .main,.block-title .sub-title,.myClassroom,.rank-title,.title,.title_txt{color:#e1e1e1!important}.block-list-item-desc,.item,.time-line-wrapper .time{color:#bcbcbc!important}.tags{background-color:` + mainBg + `!important}.backTop-item.bor,.backTop-item:nth-child(n+2){background:#3b3b3b!important}.backTop-item{border-bottom:1px solid hsla(0,0%,100%,.12)!important}.backTop-item:last-child{border:0!important}.block-list .slider-contro .slider-next{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAbUExURUxpcenp6efn5+fn5+fn5+fn5+fn5+fn5+fn5xbfqDMAAAAIdFJOUwAMIcPhqpvRy08zNQAAAC9JREFUKM9jYKApEE1A5TNaFKAKCLcooClworsCVjQFmAIYWjAMpaeSAgKBTE0AAPJKDR/znmWLAAAAAElFTkSuQmCC);-webkit-transform:rotate(180deg);transform:rotate(180deg);-ms-transform:rotate(180deg)}.block-list .slider-contro .slider-next:hover{background-color:#3b3b3b;-webkit-transform:rotate(0);transform:rotate(0);-ms-transform:rotate(0)}.block-list .slider-contro .slider-next.disabled{right:0;left:auto;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAbUExURUxpcSoqKiYmJiIiIiIiIiEhISIiIiIiIiEhIR/wiRkAAAAIdFJOUwAMIcPhqpvRy08zNQAAAC5JREFUKM9jYKAZYAtEE2BvFkAVYPIwRFOiMoBKAggIoGvBMJQOCjCCECOQqQwAa+IMp83lbxQAAAAASUVORK5CYII=);pointer-events:none}.block-list .slider-contro .slider-prev{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAbUExURUxpcenp6efn5+fn5+fn5+fn5+fn5+fn5+fn5xbfqDMAAAAIdFJOUwAMIcPhqpvRy08zNQAAAC9JREFUKM9jYKApEE1A5TNaFKAKCLcooClworsCVjQFmAIYWjAMpaeSAgKBTE0AAPJKDR/znmWLAAAAAElFTkSuQmCC);-webkit-transform:rotate(0);transform:rotate(0);-ms-transform:rotate(0)}.block-list .slider-contro .slider-prev:hover{background-color:#3b3b3b;-webkit-transform:rotate(180deg);transform:rotate(180deg);-ms-transform:rotate(180deg)}.block-list .slider-contro .slid er-prev.disabled{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAbUExURUxpcSoqKiYmJiIiIiIiIiEhISIiIiIiIiEhIR/wiRkAAAAIdFJOUwAMIcPhqpvRy08zNQAAAC5JREFUKM9jYKAZYAtEE2BvFkAVYPIwRFOiMoBKAggIoGvBMJQOCjCCECOQqQwAa+IMp83lbxQAAAAASUVORK5CYII=);-webkit-transform:rotate(180deg);transform:rotate(180deg);pointer-events:none;-ms-transform:rotate(180deg)}.rank-index{border-radius:10px!important;background:#999!important;color:#fff!important}.backTop-item{border:1px solid hsla(0,0%,100%,.12)!important}.classroom-wrapper .common-lazy-img{background-color:#2b2b2b}.rec-title{color:hsla(0,0%,88.2%,.88)!important}.block-list-item-title:hover,.block-title .sub-title:hover,.item:hover,.list:hover .rank-title,.myClassroom:hover{color:#0ba395!important}`;
            style_16 = ``;
            style_17 = mainNav + footer + channelNav + `.exchange-btn .btn,.rank-header .more,.rcmd-box-wrap .change-btn{color:#ccc}.exchange-btn .btn:hover,.rank-header .more:hover,.rcmd-box-wrap .change-btn:hover{background-color:#282b2d!important}.bili-dropdown,.block-area .follow-wrapper .follow-head .follow-more,.new-stat-module .zone-title .headline .new-stat-more,.pgc-rank-dropdown,.pgc-rank-dropdown .dropdown-list,.random-change,.sec-rank .more-link,.video-floor-m .zone-title .headline .link-more{border:1px solid #3b3b3b;border-radius:15px;background-color:#3b3b3b;color:hsla(0,0%,100%,.68);font-size:13px}.bili-dropdown .dropdown-list .dropdown-item,.bili-dropdown .dropdown-list .dropdown-item:hover,.bili-dropdown:hover,.block-area .follow-wrapper .follow-head .follow-more:hover,.new-stat-module .zone-title .headline .new-stat-more:hover,.pgc-rank-dropdown .dropdown-list .dropdown-item:hover,.random-change:hover,.sec-rank .more-link:hover,.video-floor-m .zone-title .headline .link-more:hover{border-color:#505050;background-color:#505050}.bili-dropdown .dropdown-list{border:1px solid #505050!important}.dropdown-list{border-radius:0!important}.pgc-rank-list .rank-item .ri-num,.rank-list .rank-item .ri-num{border-radius:10px;background:#999;color:#fff}.bili-tab .bili-tab-item{color:#bcbcbc}.block-area .timeline-toggle-block .timeline-toggle-btn,.tag-more .b-toggle-btn{border-radius:0 0 15px 15px;background:` + mainBg + `!important;background-color:` + mainBg + `;box-shadow:0 3px 9px #131313;color:#ccc}.crumb ul .crumb-item a[data-v-71236f48],.index-entry-wrapper .filter-list .filter-item{color:#c3c3c3}bangumi-home-crumb .fcname ul.n_num li a{height:27px;color:hsla(0,0%,88.6%,.94);font-size:14px}.block-area .timeline-title .headline .name{float:left;color:hsla(0,0%,90.6%,.91);font-weight:400;font-size:24px;line-height:24px}.timeline-box .timeline-item .item-right a{display:block;height:100%;color:inherit;color:hsla(0,0%,90.6%,.91);text-align:left}.block-area .follow-wrapper .follow-head,.follow-item .details .season-title,.index-entry-wrapper .filter-block-title a,.index-entry-wrapper .filter-block-title span{color:hsla(0,0%,90.6%,.91)}.spread-module .num{background-color:#171819}.spread-module .t{color:hsla(0,0%,90.6%,.91)}.new-stat-module .zone-title .headline .name,.pgc-rank-list .rank-item .ri-detail .ri-title{color:#e7e7e8}.block-area .block-left .block-header .block-title,.handpick-right-module .block-header .block-title,.recom-right-head h3,.sec-rank .rank-head h3,.video-item-biref .biref-info .biref-title{color:hsla(0,0%,90.6%,.91)}.pgc-common-tab .bili-tab-item{color:hsla(0,0%,88.6%,.94)}.bangumi-home-crumb .fcname ul.n_num li,.bangumi-home-crumb .fcname ul.n_num li a,.sub-nav-m ul li a{color:hsla(0,0%,90.6%,.91)}.bili-tab .bili-tab-item,.energy-m .headline,.energy-m .hot-box li .txt,.energy-m .hot-box li:first-child .txt,.rank-list .rank-item .ri-detail .ri-title,.video-floor-m .zone-title .headline .name{color:#e2e2e2}.n .n-inner{background:#222;box-shadow:0 0 0 1px #222}.g-search input,.n .n-data .n-data-v{color:hsla(0,0%,90.6%,.91)}.g-search input{border:1px solid #222;background:#505050}#page-index .col-2 .section{border:1px solid #222;border-radius:10px;background:#222}.user .info .meta .row:first-child,section-title{color:hsla(0,0%,90.6%,.91)}#page-index .col-1{background:#222}.video-info-module{border:0;border-radius:10px;background-color:#222;-webkit-box-shadow:rgb(0 0 0/50%) 0 2px 4px;box-shadow:0 2px 4px rgb(0 0 0/50%)}.video-info-module .v-title{color:#e7e7e7}.mod-2 li .r .title,.tag-list-wrp .title .name,.video-floor-m .dynamic-title .title .name{color:#e1e1e1}.mod-2 li .r .up-info .v-author,.mod-2 li .r .v-desc,.mod-2 li .r .v-info .v-info-i,.tag-list li.tag-item .tag-a,.tag-list-wrp .title .small,.video-list .vl-hd .tab-list li{color:#bcbcbc}.tag-list li.tag-item{border:0;background-color:#3b3b3b}.mod-2 li,.video-list .vl-hd{border-bottom:1px solid hsla(0,0%,73.7%,.5)}.mod-2 li .l-item{border-right:1px solid hsla(0,0%,73.7%,.5)}.video-floor-m .dynamic-title .read-push{border:1px solid #3b3b3b;border-radius:15px;background-color:#3b3b3b}.video-floor-m .dynamic-title .read-push .info{color:#bcbcbc}.video-floor-m .dynamic-title .read-push:hover{border:1px solid #505050;background-color:#505050}.video-list .vl-hd .vl-hd-sub .selector-block .date-select{border-radius:15px;background:#3b3b3b;color:#bcbcbc}.mobile-link-l{opacity:.6}.pager .pages .page-item button:hover,.pager .pages .page-item.active button{border:1px solid rgba(0,161,214,.78);background:rgba(0,161,214,.78);color:hsla(0,0%,90.6%,.88)}.pager .pages .page-item button{margin-right:8px;border:1px solid #2b2b2b;background:#2b2b2b;color:#bcbcbc}.pager .jump-pager input[type=text]{border:0;border-radius:10px;background-color:#3b3b3b;color:#e1e1e1}.video-floor-m .zone-title .headline .tags li a{color:hsla(0,0%,88.2%,.88)}.go-top-m .go-top{border:1px solid #333;border-radius:10px;background-color:#333;background-position:-714px -72px;opacity:.7}.sub-nav-m .tips{border:1px solid #2b2b2b;background-color:#2b2b2b;color:hsla(0,0%,88.2%,.88)}.sub-nav-m .tips .t-arrow{background:0 0}.timeline-box .timeline-item .item-right p.num a,.timeline-box .timeline-item .item-right p.num span{background:#828993}.back-top-tools .tool-item{border:1px solid #282828;border-radius:8px;background:#282828}.back-top-tools .tool-item:hover{border-color:#036f93;background-color:#036f93}.game-groom-m{border:1px solid #222;border-radius:10px}.game-groom-m,.game-groom-m .title{background:#222}.game-groom-m a .title{color:NaNe1e1}.game-groom-m .num{background-color:#222}`;
            style_18 = mainNav + footer + `.active-main .act-list ul li h2 a,.active-main .active-title .b-active-t,.art_list li h2 a,.b-head .b-head-t,.topic-main .act-list ul li h2 a,.topic-main .topic-title .b-topic-t{color:#e1e1e1}.active-main .act-list ul li .event_status,.art_list li .info,.topic-main .act-list ul li .act-info,.topic-main .nav-tab li{color:#8e8e8e}.active-main .act-list ul li,.art_list li,.topic-main .act-list ul li{background:#222;margin:20px 0 0;padding:0 0 20px;border-bottom:1px solid #e5e9ef;border-radius:10px}.art_list li img,.topic-main .act-list ul li img{padding:10px 0 0 10px}.art_list li h2,.topic-main .act-list ul li h2{margin:25px 0 20px}.art_list li .info,.topic-main .act-list ul li .act-info,.topic-main .act-list ul li h2{padding:0 0 0 20px}.art_list li .artInfo,.topic-main .act-list ul li .found-time{padding:0 0 0 165px}.active-main .active-title,.b-head.topic,.topic-main .nav-tab{border-bottom:1px solid hsla(0,0%,73.7%,.5)}.active-main .act-list ul li,.art_list li,.topic-main .act-list ul li{border:0}.active-main .back-top,.topic-main .back-top{border:1px solid #333;border-radius:10px;background-color:#333;background-position:-714px -72px;opacity:.7}.pagelist .flip-left span,.pagelistbox .p{margin-right:6px;border:0;border-radius:6px;background-color:#2b2b2b;color:#bcbcbc}.pagelist .flip-right input,.pagelistbox .custom-right .custom-right-inner.custompage{border:0;border-radius:8px;background-color:#3b3b3b;color:#e1e1e1}.pagelist .flip-left .active,.pagelist .flip-left span:hover,.pagelistbox .p.active,.pagelistbox .p:hover{border:0;background:rgba(0,161,214,.78);color:hsla(0,0%,90.6%,.88)}.pagelist .flip-left strong,.pagelistbox strong{background-color:transparent;color:hsla(0,0%,88.2%,.88)}`;
            style_19 = mainNav + `body{background:` + mainBg + `!important}.card[data-v-fb77dc7a],.config[data-v-467e3e3e],.space-left[data-v-1c9150a9],.space-right .space-right-top .title[data-v-1c9150a9]{border-radius:5px;background-color:#222;-webkit-box-shadow:0 2px 4px 0 rgb(0 0 0/50%);box-shadow:0 2px 4px 0 rgb(0 0 0/50%)}.space-right[data-v-1c9150a9]{background-color:#2b2b2b}.link-progress-tv[data-v-42e02e95]{background-color:#222!important}.item a[data-v-7d37e619],.line-1 .name-field[data-v-657577a0],.title[data-v-7d37e619]{color:#bcbcbc}.line-1[data-v-657577a0]{color:#8e8e8e}.orginal-reply[data-v-8142435e],.text-box[data-v-8142435e],.text[data-v-e5050176]{color:#bcbcbc}.divider[data-v-1df9d092]{border-bottom:1px solid hsla(0,0%,73.7%,.5)}.side-bar .icon[data-v-7d37e619]{background:hsla(0,0%,90.6%,.88);-webkit-mask:url(//s2.hdslb.com/bfs/static/blive/blfe-message-web/static/img/plane.c9984cf0.svg) no-repeat;mask:url(//s2.hdslb.com/bfs/static/blive/blfe-message-web/static/img/plane.c9984cf0.svg) no-repeat;mask-size:100% 100%;-webkit-mask-size:100% 100%}.item[data-v-7d37e619]:before{color:hsla(0,0%,90.6%,.88)}.space-right .space-right-top .title[data-v-1c9150a9]{box-shadow:0 2px 4px 2px rgb(0 0 0/50%)}.card[data-v-fb77dc7a]{border-radius:15px}.bili-im,.bili-im .left .title[data-v-12ea5675],.bili-im .right[data-v-12ea5675],.bili-im[data-v-12ea5675],.list-item[data-v-1f03ec9a]{background:#222}.message-list[data-v-e8aa6bb6],.send-box[data-v-7762b962]{background-color:#141415}.bili-im .left .title[data-v-12ea5675],.love-item[data-v-bdf166be]:not(:last-child):after,.title[data-v-79389194]{border-bottom:1px solid hsla(0,0%,73.7%,.5)}.bili-im .left[data-v-12ea5675]{border-right:1px solid hsla(0,0%,73.7%,.5)}.divided-line[data-v-7d37e619],.send-box[data-v-7762b962]{border-top:1px solid hsla(0,0%,73.7%,.5)}.config .config-item[data-v-467e3e3e]:not(:first-child):before{background:hsla(0,0%,73.7%,.5)}.action-menu .menu-list a[data-v-d43989d2],.ar-recommend-item__info--title,.auto-reply-push__desc,.bili-im .left .title[data-v-12ea5675],.config .radio-selector[data-v-467e3e3e],.core-style[data-v-b2e4822a],.list-item .name[data-v-1f03ec9a],.name,.title span[data-v-79389194],.title[data-v-196262e8],a.router-link-active,span{color:#e1e1e1}.notify-wrapper .notify-text[data-v-e8aa6bb6]{color:#3b3b3b}.message .message-content.not-img[data-v-50547f2d]{background:#313131;color:#e1e1e1}.list-item[data-v-1f03ec9a]:hover{background-color:#181917}.auto-reply-push,.msg-push-new{background:#222}.send-btn[data-v-7762b962]{border-radius:10px;background-color:#505050}.btn-box[data-v-6cbfef24]{border:1px solid #505050;color:#e1e1e1}.action-menu .menu-list[data-v-d43989d2]{border:1px solid #222;border-radius:8px;background-color:#222;-webkit-box-shadow:0 6px 12px 0 rgb(31 34 39/12%);box-shadow:0 6px 12px 0 rgb(31 34 39/22%)}.action-menu .menu-list a[data-v-d43989d2]:hover{background-color:#3b3e40}.action-menu .menu-list[data-v-d43989d2]:before{border:0;background-color:#222}.reply-textarea[data-v-abfa145e]{overflow:auto;border:1px solid hsla(0,0%,73.7%,.5);border-radius:10px;background-color:#222;color:#555}.reply-textarea[data-v-abfa145e]:focus{background:#1f1e1e}.send-btn.active[data-v-7762b962]:hover,.send-button[data-v-abfa145e]{opacity:.9}.notify-wrapper .notify-text[data-v-e8aa6bb6]{color:#ddd;background-color:#2f2f2f}.msg-notify{background:#222!important}.msg-notify .title{color:hsla(0,0%,88.2%,.88)!important}.msg-notify .content{color:#bcbcbc!important}.msg-notify hr{background:hsla(0,0%,73.7%,.5)!important}`;
            style_20 = mainNav + channelNav + footer + `.bangumi-item .pub-info,.filter-block .filter-item-wrapper .filter-item,.sort-item{color:#bcbcbc}.bangumi-item .bangumi-title,.filter-block .filter-name,.filter-wrapper .filter-title{color:#e1e1e1}.pagelistbox .p{margin-right:6px;border:0;border-radius:6px;background-color:#2b2b2b;color:#bcbcbc}.pagelistbox .custom-right .custom-right-inner.custompage{border:0;border-radius:8px;background-color:#3b3b3b;color:#e1e1e1}.pagelistbox .p.active,.pagelistbox .p:hover{background-color:rgba(0,161,214,.78);color:hsla(0,0%,90.6%,.88)}.pagelistbox strong{color:#aeaeae}`;
            style_21 = mainNav + footer + `#pgc-navigate-wrap .ep-box .ep-sub .ep-item{border:1px solid hsla(0,0%,73.7%,.5);border-radius:15px;color:#bcbcbc}#pgc-navigate-wrap .ep-box .ep-sub .ep-item .name{color:hsla(0,0%,90.6%,.88)}#pgc-navigate-wrap .ep-box .ep-sub .ep-item:hover,#pgc-navigate-wrap .play-btn:hover{background-color:rgba(0,161,214,.78)}#pgc-navigate-wrap .play-btn:hover{border:1px solid rgba(0,161,214,.78);color:#e7e7e0}#pgc-navigate-wrap .ep-box.horizontal .ep-sub .ep-item,#pgc-navigate-wrap .play-btn:hover .play-btn-svg{color:hsla(0,0%,90.6%,.88)}.pgc-item .right-info .headline .pgc-label{color:#bcbcbc}.bangumi-item .right-info .intros .value,.pgc-item .right-info .intros .value{color:rgba(232,232,220,.88)}.bangumi-item .right-info .intros .label,.pgc-item .right-info .intros .label{color:rgba(221,231,234,.88)}.bangumi-item .right-info .intros .desc,.pgc-item .right-info .intros .desc{color:rgba(224,217,224,.88)}#all-list .card-more{color:hsla(0,0%,90.6%,.88)}#all-list .mixin-list ul:not(:last-child){border-bottom:1px solid hsla(0,0%,73.7%,.5)}.bangumi-item .right-info .headline .bangumi-label,.bangumi-item .right-info .score .user-count,.pgc-item .right-info .score .user-count{color:#bcbcbc}.keyword{opacity:.95}.video-item.list{border-bottom:1px solid hsla(0,0%,73.7%,.5)}.video-item.list .type{border:1px solid rgba(229,233,239,.72);color:#ced4d2}.video-item.list .des{color:#cec7cd}.video-item .so-icon .up-name,.video-item.list .so-icon,.video-item.matrix .info .so-icon.watch-num,.video-item.matrix .info .time{color:#cdceca}.error-wrap .text{background:` + mainBg + `}.error-wrap{border:1px solid hsla(0,0%,73.7%,.5);color:hsla(0,0%,90.6%,.88)}.logo-input.clearfix{width:max-content}.search-wrap .search-logo{float:left;margin-top:0;width:151px;height:43px;background-position:-261px 0}.search-wrap{width:625px}.load-state .loading:before{background:` + mainBg + `}.load-state .loading{margin-right:0;color:hsla(0,0%,90.6%,.88);font-size:17px}.search-wrap .fixed-top{background:hsl(197deg 10% 18%/90%)}.search-wrap .search-block .input-wrap input{width:296px;height:18px;outline:0;border:1px solid #ccd0d7;border-radius:20px;background:#505050;color:hsla(0,0%,100%,.8)}.search-wrap .search-block .input-wrap{background:` + mainBg + `}.search-wrap .search-block .search-button{border-radius:22px;opacity:.95}.search-wrap .fixed-top .search-block .input-wrap input{border:1px solid hsla(0,0%,73.7%,.5);border-radius:15px}.search-wrap .fixed-top .search-block .input-wrap{background:0 0}.search-wrap .fixed-top .search-block .search-loupe .icon-loupe{background-position:-141px -320px;opacity:.9}.suggest-wrap{border:0;border-radius:15px;background:#222}.suggest-wrap .keyword-wrap .keyword{color:hsla(0,0%,90.6%,.88)}.suggest-wrap .vt-text:hover{background-color:rgba(112,114,125,.13)}.suggest-wrap .horizontal .hz-text{border:1px solid hsla(0,0%,73.7%,.5);border-radius:10px;color:rgba(225,231,232,.88)}.suggest-wrap .vt-text{color:rgba(228,222,227,.88)}.suggest-wrap .title span{background:#222;color:#bdb4b4}.suggest-wrap .title{border-top:1px solid #bcbcbc}.filter-wrap .sub-filter{border:1px solid hsla(0,0%,73.7%,.5);border-radius:10px;background-color:#222}.filter-wrap .icon-tid1-arr,.filter-wrap .icon-tid2-arr{position:inherit}.filter-wrap .fold:hover{background-color:` + mainBg + `}.filter-wrap .fold{color:#bcbcbc}.arrow-down,.arrow-up{filter:drop-shadow(0 0 #fff)}.pager .pages .page-item button{margin-right:6px;border:0;border-radius:6px;background-color:#2b2b2b;color:#bcbcbc}.pager .pages .page-item button:hover,.pager .pages .page-item.active button{border:0;background-color:rgba(0,161,214,.78);color:hsla(0,0%,90.6%,.88)}.pager .pages strong{color:#aeaeae}.home-wrap .home-input .content{outline:0;border:1px solid #505050;background:#505050;color:#e1e1e1}.home-wrap .home-input .type{border:1px solid #505050;border-right-color:hsla(0,0%,73.7%,.5);border-radius:15px 0 0 15px;background:#505050;color:#e7e7e7}.home-wrap .home-input .searchBtn{border-radius:0 15px 15px 0}.home-wrap .home-input{width:635px}.home-wrap .home-suggest .title{color:#e1e1e1}.home-wrap .home-suggest .history,.home-wrap .home-suggest .hot-search{border:1px solid hsla(0,0%,73.7%,.5);border-radius:15px}.home-wrap .home-suggest .history .list .item a,.word,a{color:#e1e1e1}.home-wrap .home-suggest .hotlist .item{border-bottom:1px dotted hsla(0,0%,93.3%,.68)}.home-wrap .home-suggest .history .list .item,.home-wrap .home-suggest .hot-search .item .num.special,.home-wrap .home-suggest .hotlist .num{border-radius:5px}.home-wrap .home-input .type.selected,.home-wrap .home-input .type:hover{border:1px solid hsla(0,0%,73.7%,.5);background-image:linear-gradient(0deg,#505050,#505050)}.home-wrap .home-input .list{border:1px solid #222;border-radius:8px;background-color:#222;color:hsla(0,0%,90.6%,.88)}.home-wrap .home-input .list li:hover{background-color:#3b3e40}.video-item.matrix .title{color:#ddd}.video-item.matrix{border:0 solid #e5e9ef;border-radius:8px;background:#222}#navigator .v-switcher-header-item a,.filter-wrap .filter-item a{color:#ddd}#navigator .v-switcher-header-item a span{color:#9fa9af}.page-wrap .pager{background:` + mainBg + `}.pgc-item .right-info .headline .title,.user-item .title,.user-item .up-videos .video-item .video-desc,.video-item.list .title{color:hsla(0,0%,88.2%,.88)}#navigator .v-switcher-header-item,.user-item{border-bottom:1px solid hsla(0,0%,73.7%,.5)}#user-list .dropdown-wrap .select-wrap{border-left:1px solid hsla(0,0%,73.7%,.5)}.user-item .desc,.user-item .up-info>span{color:#bcbcbc}.up-feedback .up-fb-btn:hover{background-color:rgba(0,161,214,.15)!important}.up-feedback .icon-beta{opacity:.5!important}.user-item .attention-btn.followed,.user-item .attention-btn.followed:hover{background:#3b3b3b;color:#bcbcbc}.filter-wrap .filter-item.active,.user-item .attention-btn{opacity:.8}#user-list .dropdown-wrap .select-wrap .bili-dropdown .dropdown-list{border:1px solid #222;border-radius:8px;background-color:#222;color:hsla(0,0%,88.2%,.88)}#user-list .dropdown-wrap .select-wrap .bili-dropdown .dropdown-list .dropdown-item{background-color:#171819}#live-list .live-tabs a,#user-list .dropdown-wrap .select-wrap .bili-dropdown .selected,.total-wrap .total-text,a.video-more{color:#bcbcbc}#live-list .headline-live h3{color:hsla(0,0%,88.2%,.88)}.filter-wrap .filter-item a{color:#bcbcbc}`;
            style_22 = mainNav + footer + `.b-head-search .b-head-search_input[_v-0a0880cb]{background:` + mainBg + `;color:#bcbcbc}.history-wrap .history-btn .btn:hover{background-color:#0189ad;color:#e0dfdf}.history-wrap .b-head .b-head-t{color:#e1e1e1}.history-list .l-info .lastplay-time .lastplay-t{color:#bcbcbc}.history-list .l-info{border-right:1.5px solid #a2a1a1}.history-list .l-info .lastplay-time .history-red-round{border-color:transparent #a2a1a1;border-style:dashed dashed dashed solid;border-width:5px 0 5px 5px}.history-list .r-info{background:` + mainBg + `}.history-list .r-info .r-txt a{color:#e1e1e1}.history-list .r-info .history-delete,.history-list .r-info .history-mark,.history-list .r-info .w-info .device,.history-list .r-info .w-info .name,.history-list .r-info .w-info .pro-txt,.history-list .r-info .w-info .username{color:#bcbcbc}.go-top-m .go-top[_v-7ed6730a]{border:0;border-radius:8px;background-color:#3b3b3b;background-position:-714px -72px}.history-list .r-info .subtitle{color:hsla(0,0%,90.6%,.88)}.history-list .r-info .r-txt{border-bottom:1px solid #a2a1a1}.history-wrap .load-contain .loadtv{background:` + mainBg + `}.b-head-search{border:1px solid hsla(0,0%,73.7%,.5)!important}`;
            style_23 = commentBg(mainBg) + comment + mainNav + `.ban-modal,.ban-modal-h5{background:#222}.ban-modal{border-radius:10px}.pub-list .info .name[data-v-46dd4b8a]{color:hsla(0,0%,90.6%,.88)}.pub-list .info .type .bk-title[data-v-46dd4b8a],.pub-list .info dl dt[data-v-46dd4b8a]{color:#bcbcbc}.pub-list .info dl[data-v-46dd4b8a]{border-left:3px solid hsla(0,0%,73.7%,.5)}.publicity .header[data-v-381593fc]{color:#e1e1e1}.select-wrap .select-txt[data-v-78203d85]{background:` + mainBg + `}.select-wrap .select-option[data-v-78203d85]{border:1px solid #222;border-radius:8px;background-color:#222}.select-wrap .select-option p[data-v-78203d85]:hover{background-color:#3b3e40}.ban-detail .content-box .info-wrap[data-v-2812059c]{border-radius:15px;background:#222;box-shadow:3px 4px 6px rgba(0,0,0,.34)}.comment-wrap[data-v-b2676c04]{background:` + mainBg + `}.ban-detail .content-box .bk-user-info .name[data-v-2812059c]{color:hsla(0,0%,90.6%,.88)}.ban-detail .content-box .punish-title[data-v-2812059c]{color:#bcbcbc}.ban-detail .content-box .bk-text-con[data-v-2812059c]{border-left:4px solid hsla(0,0%,73.7%,.5);color:hsla(0,0%,90.6%,.88)}.what-ban .text-con[data-v-d8d6c3a6]{background:#222}.what-ban .text-con .title[data-v-d8d6c3a6]{color:hsla(0,0%,90.6%,.88)}.what-ban .text-con .txt[data-v-d8d6c3a6]{color:#bcbcbc}.ban-detail .content-box .link-box[data-v-2812059c]{border:1px solid hsla(0,0%,73.7%,.5);color:hsla(0,0%,90.6%,.88)}.ban-detail .content-box .link-box .box-right .origin-text[data-v-2812059c],.ban-detail .content-box .link-box .box-rule .origin-text[data-v-2812059c]{color:hsla(0,0%,90.6%,.88)}.comment-wrap .header .title-h2[data-v-b2676c04]{color:#e1e1e1}.comment-wrap[data-v-b2676c04]{border-radius:15px;box-shadow:2px 4px 15px 0 rgba(0,0,0,.32)}.crumbs a{color:#aeaeae}.crumbs{color:hsla(0,0%,88.2%,.88)}.ban-detail .content-box[data-v-c428d402]{border-radius:15px;background:#222}.block-wrap article .list-item p[data-v-08d650dd]{color:hsla(0,0%,90.6%,.88)}.notice-wrap .news-box[data-v-859f8efc]{background:#222}.notice-wrap .news-box .news-title[data-v-859f8efc]{color:#e1e1e1}.notice-wrap .news-box .item .title strong[data-v-859f8efc]{color:hsla(0,0%,90.6%,.88)}.paginator .paging-box-big .current[data-v-99397e02],.paginator .paging-box-big .dian[data-v-99397e02],.paginator .paging-box-big .next[data-v-99397e02],.paginator .paging-box-big .prev[data-v-99397e02],.paginator .paging-box-big .tcd-number[data-v-99397e02]{margin-right:6px;border:0;border-radius:6px;background-color:#2b2b2b;color:#bcbcbc}.paginator .paging-box-big .page-jump input[data-v-99397e02]{border:0;border-radius:8px;background-color:#3b3b3b;color:#e1e1e1}.paginator .paging-box-big .current[data-v-99397e02],.paginator .paging-box-big .current[data-v-99397e02]:hover,.paginator .paging-box-big .dian[data-v-99397e02]:hover,.paginator .paging-box-big .next[data-v-99397e02]:hover,.paginator .paging-box-big .prev[data-v-99397e02]:hover,.paginator .paging-box-big .tcd-number[data-v-99397e02]:hover{border:0;background-color:rgba(0,161,214,.78);color:hsla(0,0%,90.6%,.88)}.act-rich-style-init2 .act-rich-render-content,.act-rich-style-init2 .public-DraftEditor-content{color:NaNe7e7e0}.timeline-header{-webkit-box-shadow:0 10px 10px rgba(14,14,14,.8);box-shadow:0 10px 10px rgba(14,14,14,.8)}.timeline-header,.tl-head,.tl-head .tl-day{background:` + mainBg + `}.bread-crumb ul li a,.tl-head .tl-day.today span.t-date,.tl-head .tl-day.today span.t-week{color:hsla(0,0%,90.6%,.88)}.season-timeline{background:` + mainBg + `}li.season-item .season-body .season-title span.follow{border-radius:7px}li.season-item .season-body .season-title{color:hsla(0,0%,90.6%,.88)}.season-timeline .season-group .group-time:before{background:` + mainBg + `}.season-timeline .season-group .group-time{color:hsla(0,0%,90.6%,.88)}.season-timer .current-timer:before{opacity:.9}.timeline-wrapper .tl-body-list{background:` + mainBg + `}.season-empty .season-bg.ball-2{opacity:.8}.season-timeline .season-group{border-left:1px dashed hsla(0,0%,73.7%,.5)}.tl-head .tl-day span{color:#adadad}.tl-head .tl-day .indicator,.tl-head .week-1,.tl-head .week-2,.tl-head .week-3,.tl-head .week-4,.tl-head .week-5,.tl-head .week-6,.tl-head .week-7{opacity:.8}`;
            style_24 = commentBg("#222") + comment + `.dp-i-block,.header-info .manga-info .manga-title,.manga-card-vertical .text-info-section .manga-title,.manga-detail .section .right-side .recommendation .header-content .title,.manga-detail .section .section-list .section-title,.manga-title,.nav-list .nav-item,.purchased-comic-item .list-content .manga-title,.rank-list-component .section-title,.season-comment .section-title,.section-navigator .section-item,.text,.title,.title .text,.user-info-component .coin-info .coin-remain-count{color:#e1e1e1!important}.user-info-component .unuseable[data-v-3fee07fa]{color:#fff}.auto-purchase .page-sub-title,.comic-info-panel .comic-detail .t-over-hidden-line,.coupon-label .container-left .coupon-reason,.download-app,.header-info .manga-info .season-introduction,.header-info .manga-info .supporting-text,.manga-card-vertical .text-info-section .supporting-text,.manga-checkbox .label-text,.manga-detail .section .right-side .recommendation .header-content .more,.manga-navbar-favourite-manga .action-button,.manga-navbar-history-list .action-button,.my-coupon .subtitle,.nav-list .nav-item,.page-content .extral-info,.page-content .input-label,.purchased-comic-item .list-content .comic-content .bought-ep-count,.purchased-comic-item .list-content .comic-content .last-update-eq,.ranking-jump,.tab{color:hsla(0,0%,88.2%,.88)!important}.comic-info-panel .comic-detail .comic-title[data-v-7245bbb6],.header-info .manga-info .author-name[data-v-2a1c4edc],.list-item[data-v-1153cf6e],.rank-list-item .expand-mode .text-section .item-title[data-v-0a5a9178],.rank-list-item .preview-mode[data-v-0a5a9178],.schedule-item .text-section .title-text[data-v-683c59ab],.search-bar .search-bar-bg .search-suggestion .suggestion-item[data-v-3c58a041],.user-info-component .coin-info .b-coin[data-v-3fee07fa],h1.page-title{color:hsla(0,0%,90.6%,.88)}.rank-list-item .expand-mode .text-section .footer-text[data-v-0a5a9178],.rank-list-item .preview-mode .supporting-text[data-v-0a5a9178],.recharge-history .list-item .text-info .recharge-date,.tags[data-v-455ef465]{color:#bcbcbc}.container .back-to-content[data-v-1d7037ba],.manga-navbar[data-v-0b65b86e],.section-navigator[data-v-31dfb8ea]{background:#222}.list-item.is-read[data-v-1153cf6e],.list-item[data-v-1153cf6e],.section-navigator[data-v-31dfb8ea]{border:1px solid hsla(0,0%,73.7%,.5)}.pivot-component .pivot-headers[data-v-4824e072],.purchase-history .list-item,.recharge-history .list-item{border-bottom:1px solid hsla(0,0%,73.7%,.5)}.search-bar .search-bar-bg[data-v-3c58a041]{background-color:#505050}.search-bar .search-input[data-v-3c58a041]{color:#e1e1e1}.search-bar .confirm-btn .search-icon[data-v-3c58a041]{background-color:#fff;-webkit-mask:url(data:image/svg+xml;base64,PHN2ZyBkYXRhLW5hbWU9IuWbvuWxgiAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTE3Ljg5IDE2LjQ4bDMuMzIgMy4zMWExIDEgMCAwMS0xLjQyIDEuNDJsLTMuMzEtMy4zMmE4Ljc5IDguNzkgMCAxMTEuNDEtMS40MXpNMTEgMTguMkE3LjIgNy4yIDAgMTAzLjggMTFhNy4yIDcuMiAwIDAwNy4yIDcuMnoiIGZpbGwtb3BhY2l0eT0iLjM0Ii8+PC9zdmc+);-webkit-mask-size:100% 100%;mask:url(data:image/svg+xml;base64,PHN2ZyBkYXRhLW5hbWU9IuWbvuWxgiAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTE3Ljg5IDE2LjQ4bDMuMzIgMy4zMWExIDEgMCAwMS0xLjQyIDEuNDJsLTMuMzEtMy4zMmE4Ljc5IDguNzkgMCAxMTEuNDEtMS40MXpNMTEgMTguMkE3LjIgNy4yIDAgMTAzLjggMTFhNy4yIDcuMiAwIDAwNy4yIDcuMnoiIGZpbGwtb3BhY2l0eT0iLjM0Ii8+PC9zdmc+);mask-size:100% 100%}.manga-navbar[data-v-0b65b86e]{box-shadow:0 0 5px 1px rgb(13 15 16)}.user-info-panel[data-v-39c37407]{background:#191919;color:#e1e1e1}.user-info-panel .info-item .item-num[data-v-39c37407],.user-info-panel .info-item .item-text[data-v-39c37407]{color:hsla(0,0%,90.6%,.88)}.user-panel .drop-list .logout-btn-container .logout-button[data-v-31ce2e23]{background:#222;color:hsla(0,0%,90.6%,.88)}.user-panel .drop-list[data-v-31ce2e23]{background:#222}.section-navigator .section-item.current[data-v-31dfb8ea]{background-color:rgba(111,195,255,.88)}.manga-detail .layout[data-v-1addff6a]{border-radius:15px;background:#222!important;box-shadow:0 1px 8px 0 rgb(19 20 23)}.manga-button.primary[data-v-b8e7c12a]{opacity:.85}.manga-button.ghost[data-v-b8e7c12a]{border:1px solid #505050;background-color:#505050;color:#e1e1e1}.header-info .manga-info .action-buttons .do-favourite[data-v-2a1c4edc]:hover{background-color:#424242}.episode-list-component .episode-list .list-header .header-item[data-v-1a9c4470]{background:rgba(80,80,80,.83);color:hsla(0,0%,88.2%,.88)}.list-item[data-v-1153cf6e]:hover{background-color:#505050;color:hsla(0,0%,90.6%,.88)}.title-tooltip[data-v-1153cf6e]{background-color:#505050;color:#e1e1e1}.title-tooltip[data-v-1153cf6e]:before{background-color:#505050}.container .back-to-content .line[data-v-1d7037ba]{color:hsla(0,0%,73.7%,.5)}.coupon-label .container-left .coupon-expire-time,.coupon-label .container-left .limits-title,.manga-info-ctnr,.purchase-history .list-item .text-info .recharge-date,.schedule-item .text-section .status-text,.schedule-list .list-header .date-selector .date-item,.show-status-text,.user-info-component .user-info .uid{color:#bcbcbc!important}.rank-item-wrapper[data-v-1b06be34],.rank-item-wrapper[data-v-7260e4ec]{background-image:none}.schedule-list .list-header .date-selector .date-item[data-v-0eaaed9b]:hover{color:hsla(0,0%,90.6%,.55)}.data-list,.user-info-panel{background:#191919;color:#e1e1e1}.search-bar .search-bar-bg .search-suggestion .suggestion-item,.user-info-panel .info-item .item-num,.user-info-panel .info-item .item-text{color:hsla(0,0%,90.6%,.88)}.manga-navbar-favourite-manga .drop-list .more-btn-container .more-button,.manga-navbar-history-list .drop-list .more-btn-container .more-button,.user-panel .drop-list .logout-btn-container .logout-button{background:#222;color:hsla(0,0%,90.6%,.88)}.data-list,.manga-navbar-favourite-manga .drop-list,.manga-navbar-history-list .drop-list,.user-panel .drop-list{background:#222}.data-list .list-container .data-item .text-section .footer-text .text{color:hsla(0,0%,88.2%,.88)!important}.data-list .list-container .data-item .text-section .manga-title[data-v-2b2fc7ed],.data-list .list-container .data-item .text-section .manga-title[data-v-9293f53e]{color:#e1e1e1}.multi-line-text:after,.multi-line-text[data-v-12e8c17c]:after{background:0 0}.data-list,.manga-navbar-favourite-manga .drop-list,.manga-navbar-history-list .drop-list,.user-panel .drop-list{background:#191919}.app-layout .page-content .router-view[data-v-14804250]{border-radius:0 10px 10px 0;background:#191919}.app-layout .page-content .app-sidebar[data-v-14804250]{border-radius:10px 0 0 10px;background:#222}.app-layout .page-content[data-v-14804250]{border-radius:10px;background-color:#222}.coupon-label .container-left[data-v-3bf259b7]{background:#272727}.coupon-label.whole-coupon[data-v-3bf259b7]{opacity:.85}.sidebar .nav-item-indicator[data-v-79ce36a4],.sidebar .nav-item.router-link-active[data-v-79ce36a4]{background:#191919}.dropbox-component[data-v-27293bb3],.manga-textbox[data-v-7789b467],.page-content .feedback-content-input .feedback-input[data-v-92cc41a4]{border:1px solid #3b3b3b;border-radius:10px;background:#3b3b3b;color:#e1e1e1}.auto-purchase-types .selected-type .selected-title[data-v-3c550b4d]{background:rgba(25,25,25,.87)}.auto-purchase-types .selected-type .selection-list[data-v-3c550b4d],.dropbox-component .data-list[data-v-27293bb3],.dropbox-component.is-open[data-v-27293bb3]{border:1px solid #222;border-radius:8px;background-color:#222}.dropbox-component .data-list[data-v-27293bb3]{border-radius:0}.auto-purchase-types .selected-type .selection-list .selections-item:hover,.dropbox-component .data-list>li:hover{background:#3b3e40!important}.auto-purchase-types .selected-type .selection-list .selections-item[data-v-3c550b4d],.purchase-history .list-item .text-info .display-text,.rank-list-item .preview-mode .index-indicator[data-v-0a5a9178],.recharge-history .list-item .text-info .display-text{color:hsla(0,0%,88.2%,.88)}.section-navigator .divider{border:1px solid hsla(0,0%,73.7%,.5)!important}`;
            style_25 = mainNav + channelNav + footer + `.timeline-header{-webkit-box-shadow:0 10px 10px rgba(14,14,14,.8);box-shadow:0 10px 10px rgba(14,14,14,.8)}.timeline-header,.tl-head,.tl-head .tl-day{background:` + mainBg + `}.bread-crumb ul li a,.tl-head .tl-day.today span.t-date,.tl-head .tl-day.today span.t-week{color:hsla(0,0%,90.6%,.88)}.season-timeline{background:` + mainBg + `}li.season-item .season-body .season-title span.follow{border-radius:7px}li.season-item .season-body .season-title{color:hsla(0,0%,90.6%,.88)}.season-timeline .season-group .group-time:before{background:` + mainBg + `}.season-timeline .season-group .group-time{color:hsla(0,0%,90.6%,.88)}.season-timer .current-timer:before{opacity:.9}.timeline-wrapper .tl-body-list{background:` + mainBg + `}.season-empty .season-bg.ball-2{opacity:.8}.season-timeline .season-group{border-left:1px dashed hsla(0,0%,73.7%,.5)}.tl-head .tl-day span{color:#adadad}.tl-head .tl-day .indicator,.tl-head .week-1,.tl-head .week-2,.tl-head .week-3,.tl-head .week-4,.tl-head .week-5,.tl-head .week-6,.tl-head .week-7{opacity:.8}#app{background:` + mainBg + `!important}`;
            style_26 = mainNav + channelNav + footer + `.b-head.online .b-head-t,.online-list .ebox .etitle{color:#e1e1e1}.b-head.online .b-head-desc,.online-list .ebox .dlo .author,.online-list .ebox .dlo span,.online-list .ebox .ol{color:hsla(0,0%,88.2%,.88)}.online-list .ebox{background:#191919}.online-list .ebox .ol{background:#222}.b-head.online{border-bottom:1px solid hsla(0,0%,73.7%,.5)}.online-list .ebox{border:1px solid hsla(0,0%,73.7%,.5)}`;

            sty = new Array(style_0, style_1, style_2, style_3, style_4, style_5, style_6, style_7, style_8, style_9, style_10, style_11, style_12, style_13, style_14, style_15, style_16, style_17, style_18, style_19, style_20, style_21, style_22, style_23, style_24, style_25, style_26);
        }

        //set style fix

        function jsFix_25() {
            //25新番时间表
            var a = document.getElementsByClassName("today")[0].childNodes[2].classList[1]
            var b = document.getElementsByClassName(a)[0]
            var c = "transform: scale(1.15);";
            if (a == "week-1") {
                b.style = c + "background: url(//s1.hdslb.com/bfs/static/bangumi-timeline/asserts/icons.png) -140px -30px;" + "background-size: 247px 663px;"
            } else if (a == "week-2") {
                b.style = c + "background:url(//s1.hdslb.com/bfs/static/bangumi-timeline/asserts/icons.png) -140px -102px;" + "background-size: 247px 663px;"
            } else if (a == "week-3") {
                b.style = c + "background: url(//s1.hdslb.com/bfs/static/bangumi-timeline/asserts/icons.png) -140px -174px;" + "background-size: 247px 663px;"
            } else if (a == "week-4") {
                b.style = c + "background: url(//s1.hdslb.com/bfs/static/bangumi-timeline/asserts/icons.png) -140px -246px;" + "background-size: 247px 663px;"
            } else if (a == "week-5") {
                b.style = c + "background: url(//s1.hdslb.com/bfs/static/bangumi-timeline/asserts/icons.png) -140px -318px;" + "background-size: 247px 663px;"
            } else if (a == "week-6") {
                b.style = c + "background: url(//s1.hdslb.com/bfs/static/bangumi-timeline/asserts/icons.png) -140px -390px;" + "background-size: 247px 663px;"
            } else if (a == "week-7") {
                b.style = c + "background: url(//s1.hdslb.com/bfs/static/bangumi-timeline/asserts/icons.png) -140px -462px;" + "background-size: 247px 663px;"
            }
        }

        //cache the kit
        sessionStorage.setItem("kitDarkStyle", `.kitOuter[data-position*=center]{-webkit-transform:translateY(-50%);-moz-transform:translateY(-50%);-o-transform:translateY(-50%);transform:translateY(-50%);-ms-transform:translateY(-50%)}.kitOuter{position:fixed;z-index:2333}.set_Pfix{top:96.5%;left:3%;width:0}.card_Pfix{top:75%;left:3%}.kitOuterDark,.kit_dark{display:flex;flex-direction:column}.kitOuterDark{display:none;width:315px;height:450px;border-radius:15px;background-color:#222;box-shadow:0 2px 4px #222}.boxOuterDark,.center{display:flex}.center{justify-content:center}.boxSideLight{background-color:rgb(86 86 86)}.titleDark{padding:10px;color:#e1e1e1;font-size:13px}.auto_fix{position:absolute}.kit_getPic{margin:0 4px}.subFix{padding:10px 0 5px!important}.widthBox{display:flex;margin:8px 0 0;width:145px;height:47px;border:1px solid #2b2b2b;border-radius:15px;background-color:#2b2b2b;box-shadow:0 2px 8px #1d1d1d}.verticalBox{display:flex;justify-content:center}.queClear:hover,.widthBox:hover{border:1px solid hsla(0,0%,73.7%,.5)}.settingDark,.settingNormal{display:flex;margin:10px 10px 10px -20px;border-radius:10px}.settingDark{background-color:#222;box-shadow:0 2px 4px #222}.boxSideDark{display:flex;width:150px;height:45px;border:1px solid #2b2b2b;border-radius:15px;background-color:#2b2b2b;box-shadow:0 2px 8px #1d1d1d}.boxMainDark:hover,.boxSideDark:hover{border:1px solid hsla(0,0%,73.7%,.5)}.boxMainDark{display:flex;margin:0 8px 8px;width:160px;height:100px;border:1px solid #2b2b2b;border-radius:15px;background-color:#2b2b2b;box-shadow:0 2px 8px #1d1d1d}.icon_fix{display:flex;width:inherit;height:inherit;color:#e1e1e1;font-size:40px!important;justify-content:center!important;align-items:center!important}.sideMargin{margin-right:8px;margin-bottom:8px}.smallsize{margin-left:10px;font-size:8px}.subtitleDark{color:#bcbcbc}.icon_fix_dark_theme{display:flex!important;margin-left:1px;width:135px;height:100px;color:#e1e1e1;font-size:50px!important;justify-content:center!important;align-items:center!important}.iconDark{width:43px;height:43px;color:#e1e1e1;font-size:23px!important;justify-content:center;align-items:center}@font-face{font-family:iconfont;src:url(//at.alicdn.com/t/font_2625254_gt3kmsgdenl.woff2?t=1627703471867) format("woff2"),url(//at.alicdn.com/t/font_2625254_gt3kmsgdenl.woff?t=1627703471867) format("woff"),url(//at.alicdn.com/t/font_2625254_gt3kmsgdenl.ttf?t=1627703471867) format("truetype")}.iconfont{font-style:normal;font-size:16px;font-family:iconfont!important;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.boxMainDark,.boxSideDark,.queClear,.widthBox{transition:border .3s}.brightOuter{display:flex;width:inherit;height:inherit;flex-direction:row;justify-content:space-around}.brightSet,.brightSetOuter{display:flex;align-items:center}.brightSet{width:40px;height:40px;border-radius:10px;background:#333;color:hsla(0,0%,88.2%,.88);font-size:23px;justify-content:center}.brightTitle{display:flex;color:#e1e1e1;font-size:20px;align-items:center}.cAdOuter{width:inherit;height:inherit;flex-direction:row}.cAd,.cAdOuter{display:flex;justify-content:center;align-items:center}.cAd{width:120px;height:40px;border-radius:15px;background:#333;color:#e1e1e1;font-size:small}.queSolveOuter{display:flex;padding:20px 0;justify-content:center}.queClear,.queT{display:flex;color:#e1e1e1;align-items:center}.queClear{width:100px;height:30px;border-radius:15px;background:#333;font-size:small;justify-content:center}`);
        sessionStorage.setItem("kitDarkHtml", `<div class="kitOuter card_Pfix" data-position="left-center"><div class="kitOuterDark" id="kitCard"><div class="titleDark center">设置</div><div class="kit_dark"><div class="titleDark">深色模式</div><div class="boxOuterDark"><div class="boxMainDark" id="0_tabs"><div class="titleDark auto_fix" id="title_auto">Auto</div><div class="iconfont icon_fix_dark_theme">&#xe65a;</div></div><div class="sideOuter"><div class="boxSideDark boxSideLight sideMargin" id="1_tabs"><div class="titleDark">浅色</div></div><div class="boxSideDark" id="2_tabs"><div class="titleDark">深色</div></div></div></div><div class="subtitleDark smallsize">*Auto:根据日升日落自动切换</div></div><div class="verticalBox"><div class="kit_getPic"><div class="titleDark subFix">提取视频封面</div><div class="widthBox" id="3_tabs"><div class="iconfont icon_fix">&#xe64f;</div></div></div><div class="kit_getPic"><div class="titleDark subFix">av/bv号获取</div><div class="widthBox" id="4_tabs"><div class="iconfont icon_fix">&#xe603;</div></div></div></div><div class="verticalBox"><div class="kit_getPic"><div class="titleDark subFix">亮度调节</div><div class="widthBox" id="5_tabs"><div class="iconfont icon_fix">&#xee17;</div></div></div><div class="kit_getPic"><div class="titleDark subFix">关闭广告</div><div class="widthBox" id="6_tabs"><div class="iconfont icon_fix">&#xe6a7;</div></div></div></div><div class="queSolveOuter"><div class="queT">遇到问题？</div><div class="queClearBox"><div class="queClear" id="queClear">清除缓存</div></div></div></div></div><div class="kitOuter set_Pfix" data-position="left-center"><div class="settingDark iconfont iconDark" id="setting">&#xe6ed;</div></div>`);
        sessionStorage.setItem("kitLightStyle", `.kitOuter[data-position*=center]{top:95%;left:3%;-webkit-transform:translateY(-50%);-moz-transform:translateY(-50%);-o-transform:translateY(-50%);transform:translateY(-50%);-ms-transform:translateY(-50%)}.kitOuter{position:fixed;top:95%;left:3%;z-index:2333}.kitOuterDark,.kit_dark{display:flex;flex-direction:column}.kitOuterDark{display:none;width:315px;height:450px;border-radius:15px;background-color:#222;box-shadow:0 2px 4px #222}.titleLight{padding:8px;color:#222}.titleDark{padding:10px;color:#e1e1e1;font-size:13px}.center{justify-content:center}.boxOuterDark,.center{display:flex}.boxMainLight{margin:0 8px 8px;border:1px solid #a7a7a7;background-color:#a7a7a7!important;box-shadow:0 2px 4px #757575!important}.boxMainDark{display:flex;margin:0 0 8px 8px!important;margin-top:0;width:140px;height:100px;border-radius:15px;background-color:#2b2b2b;box-shadow:0 2px 8px #1d1d1d}.icon_fix_dark_theme{display:flex;margin-left:-3px;color:#e1e1e1;font-size:50px!important;justify-content:center!important;align-items:center!important}.sideOuter{display:flex;flex-direction:column}.boxSideLight{margin-left:8px!important;border:1px solid #a7a7a7;background-color:rgb(86 86 86)}.boxSideDark{display:flex;width:150px;height:45px;border-radius:15px;box-shadow:0 2px 8px #1d1d1d}.sideMargin{margin-right:8px;margin-bottom:8px}.subtitleDark{color:#bcbcbc}.smallsize{margin-left:10px;font-size:8px}.kit_getPic{margin-top:10px}.widthBox{display:flex;margin:8px 8px 0;width:298px;height:50px;border:1px solid #2b2b2b;border-radius:15px;background-color:#2b2b2b;box-shadow:0 2px 8px #1d1d1d}.boxMainDark:hover,.boxSideDark:hover,.widthBox:hover{border:1px solid #d4d1d1}.icon_fix{display:flex;margin-left:128px;color:#e1e1e1;font-size:40px!important;justify-content:center!important;align-items:center!important}.settingDark,.settingNormal{display:flex;margin:10px 10px 10px -20px;width:40px;height:40px;border-radius:10px}.settingDark{background-color:#222;box-shadow:0 2px 4px #222}.settingNormal{background-color:#c4c4c4;box-shadow:0 2px 4px #969696}.iconNormal{display:flex;padding-left:8px;width:30px;color:#202020;font-size:21px!important;align-items:center}@font-face{font-family:iconfont;src:url(//at.alicdn.com/t/font_2625254_puryec1ehl.woff2?t=1624332498326) format("woff2"),url(//at.alicdn.com/t/font_2625254_puryec1ehl.woff?t=1624332498326) format("woff"),url(//at.alicdn.com/t/font_2625254_puryec1ehl.ttf?t=1624332498326) format("truetype")}.iconfont{font-style:normal;font-size:16px;font-family:iconfont!important;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.icon-shezhi:before{content:"\e6ed"}.icon-zhaopian:before{content:"\e64f"}.icon-zizhong:before{content:"\e603"}.icon-DarkTheme:before{content:"\e65a"}.kitOuterLight{background-color:#c4c4c4;box-shadow:0 2px 4px #a8a7a7}.subtitleLight{color:#3a3a3a!important}.iconLight{color:#2b2b2b}`);
        sessionStorage.setItem("kitLightHtml", `<div class="kitOuter" data-position="left-center"><div class="kitOuterLight kitOuterDark" id="kitCard"><div class="titleLight titleDark center">设置</div><div class="kit_dark"><div class="titleLight titleDark">深色模式</div><div class="boxOuterDark"><div class="boxMainLight boxMainDark" id="0_tabs"><div class="titleLight titleDark">Auto</div><div class="iconfont icon_fix_dark_theme iconLight">&#xe65a;</div></div><div class="sideOuter"><div class="boxMainLight boxSideDark boxSideLight sideMargin" id="1_tabs"><div class="titleLight titleDark">浅色</div></div><div class="boxSideLight boxSideDark" id="2_tabs"><div class="titleDark">深色</div></div></div></div><div class="subtitleLight subtitleDark smallsize">*Auto:根据日升日落自动切换</div></div><div class="kit_getPic"><div class="titleLight titleDark">提取视频封面</div><div class="boxMainLight widthBox" id="3_tabs"><div class="iconfont icon_fix iconLight">&#xe64f;</div></div></div><div class="kit_getPic"><div class="titleLight titleDark">av/bv号获取</div><div class="boxMainLight widthBox" id="4_tabs"><div class="iconfont icon_fix iconLight">&#xe603;</div></div></div></div><div class="settingNormal iconfont iconNormal" id="setting">&#xe6ed;</div></div>`);

        //index: find page and apply the style
        var value, mode_ls, mode_do, mode_do_noKit, i;
        index();
        function index(isChangeKit) {

            value = localStorage.getItem("mode");
            mode_ls = new Array("auto", "light", "dark", null);
            mode_do = new Array("auto(true);", "sty_on(0)", "sty_on(1)", "localStorage.setItem('mode', 'dark'); sty_on(1);");
            mode_do_noKit = new Array("auto(false,false,true);", "sty_on(0,false)", "sty_on(1,false)");

            for (i = 0; i < loc.length; i++) {
                if (eval(loc[i]) == true) {
                    prt("[BiliDarkMode]当前页面:", locExp[i], i);
                    for (var m_i = 0; m_i < mode_ls.length; m_i++) {
                        if (value == mode_ls[m_i]) {
                            if (isChangeKit == false) {
                                eval(mode_do_noKit[m_i]);
                            } else {
                                eval(mode_do[m_i]);
                                adMdBd(m_i);
                                break;
                            }
                        }
                    }
                    break;
                }
            }
        }

        //add mode border
        function adMdBd(m_i) {
            var timer = setInterval(() => {
                if (document.getElementById(m_i + "_tabs") != null && i != 0) {
                    document.getElementById(m_i + "_tabs").style = "border: 1px solid #bcbcbc80;";
                    clearInterval(timer);
                } else if (document.getElementById(m_i + "_tabs") == null && i == 0) {
                    clearInterval(timer);
                }
            }, 100);
        }

        //apply style 
        function sty_on(value, isChangeKit) {
            if (value == 0) {
                sessionStorage.setItem("kitBrightnessCheckDark", "false")

                document.getElementById("modeStyle").innerHTML = "";
                if (i == 0) document.body.style.backgroundColorBg = null;
                else document.body.style.backgroundColor = null;

                if (i != 0) {
                    if (isChangeKit != false) {
                        document.getElementById("kitStyle").innerHTML = sessionStorage.getItem("kitDarkStyle");
                        document.getElementById("kitHtml").innerHTML = sessionStorage.getItem("kitDarkHtml");
                    }
                }
            } else if (value == 1) {
                sessionStorage.setItem("kitBrightnessCheckDark", "true")

                document.getElementById("modeStyle").innerHTML = sty[i];
                if (i == 0) document.body.style.backgroundColor = "transparent";
                else document.body.style.backgroundColor = mainBg;

                if (i != 0) {
                    if (isChangeKit != false) {
                        document.getElementById("kitStyle").innerHTML = sessionStorage.getItem("kitDarkStyle");
                        document.getElementById("kitHtml").innerHTML = sessionStorage.getItem("kitDarkHtml");
                    }
                }
            }
        }

        function auto(isOn, mos_E, kit_brightnessOn) {
            /*————————————————————————————————————————————————————————————————————
             SunRiseFallTime
             version: 0.4
             Author:ChenZihan
             License:GPL-3.0
             Github:https://github.com/ChenZihan-sudo/SunRiseFallTime
            ————————————————————————————————————————————————————————————————————*/
            //quick switch mode, get the last time mode
            var auto_mode = sessionStorage.getItem("auto_mode");
            if (isOn == true && auto_mode == "light") {
                sty_on(0);
            } else if (isOn == true && auto_mode == "dark") {
                sty_on(1);
            }

            var request = new XMLHttpRequest();
            request.open('GET', 'https://ip.seeip.org/geoip');
            request.send();
            request.onreadystatechange = function () {
                var json = request.responseText;
                var obj = eval('(' + json + ')');
                var longitude = obj.longitude;
                var latitude = obj.latitude;
                var ip = obj.ip;
                getZoneCode = longitude / 15;
                var zoneCodeB = -12.5;
                var zoneCodeE = -11.5;
                for (var i = 0; i < 40; i++) {
                    zoneCodeB++;
                    zoneCodeE++;
                    if (getZoneCode < zoneCodeB && getZoneCode < zoneCodeE) {
                        zoneCodeB--;
                        zoneCodeE--;
                        break;
                    }
                }
                zoneCode = zoneCodeB + 0.5;
                zonelongitude = zoneCode * 15;
                offsetLongitude = zonelongitude - longitude;
                offsetTime = offsetLongitude / 15;
                TimeOfNoonHour = 12 + offsetTime;
                var _date = new Date().getDate();
                var _month = new Date().getMonth() + 1;

                function getMonthDay() {
                    var date = new Date();
                    date.setMonth(date.getMonth() + 1);
                    date.setDate(0);
                    var days = date.getDate();
                    return days;
                }

                timeCode = _month + (_date / getMonthDay())
                var springC = 20.646;
                var summerC = 21.37;
                var autumnC = 23.042;
                var winterC = 21.94;
                var sY = new Date().getYear() - 100;
                var sD = 0.2422;
                var sL = sY / 4;

                function getSeasonalDay(C) {
                    day = (sY * sD + C) - sL;
                    return day;
                }
                var sprDay = getSeasonalDay(springC);
                var sumDay = getSeasonalDay(summerC);
                var autDay = getSeasonalDay(autumnC);
                var winDay = getSeasonalDay(winterC);

                function getSeasonalCode(month, day) {
                    return month + (day / getMonthDay());
                }
                springCode = getSeasonalCode(3, sprDay);
                summerCode = getSeasonalCode(6, sumDay);
                autumnCode = getSeasonalCode(9, autDay);
                winterCode = getSeasonalCode(12, winDay);

                function radian(deg) {
                    var radian = deg * (Math.PI / 180);
                    return radian;
                }

                function deg(radian) {
                    var deg = radian * (180 / Math.PI);
                    return deg;
                }
                var α = null;
                var sunMaxDeg = 23.4333333;
                if (springCode < timeCode && timeCode < summerCode) {
                    ratio = (timeCode - springCode) / (summerCode - springCode);
                    α = ratio * sunMaxDeg;
                } else if (summerCode < timeCode && timeCode < autumnCode) {
                    ratio = (timeCode - summerCode) / (autumnCode - summerCode);
                    α = sunMaxDeg - (ratio * sunMaxDeg);
                } else if (autumnCode < timeCode && timeCode < winterCode) {
                    ratio = (timeCode - autumnCode) / (winterCode - autumnCode);
                    α = -(ratio * sunMaxDeg);
                } else if (timeCode < springCode || timeCode > winterCode) {
                    if (timeCode > winterCode) {
                        ratio = (timeCode - winterCode) / ((13 - winterCode) + (springCode - 1));
                    } else if (timeCode < springCode) {
                        ratio = ((timeCode - 1) + (13 - winterCode)) / ((13 - winterCode) + (springCode - 1));
                    }
                    α = -(sunMaxDeg - (ratio * sunMaxDeg));
                } else if (timeCode == springCode) {
                    α = 0;
                } else if (timeCode == summerCode) {
                    α = sunMaxDeg;
                } else if (timeCode == autumnCode) {
                    α = 0;
                } else if (timeCode == winterCode) {
                    α = sunMaxDeg;
                }
                var tanθ = Math.tan(radian(latitude));
                var tanα = Math.tan(radian(α));
                var cosβ = tanθ * tanα;
                if (cosβ > 1) {
                    if (latitude > 0) { } else { }
                } else {
                    var doubleβ = 2 * deg(Math.acos(cosβ));
                    var lightDeg = 360 - doubleβ;
                    var lightTime = (lightDeg / 360) * 24;

                    sunRiseTime = TimeOfNoonHour - (lightTime / 2);
                    sunFallTime = TimeOfNoonHour + (lightTime / 2);

                    var sunRiseTimeMinute = (sunRiseTime.toString().replace(/\d+\.(\d*)/, "$1") * 60).toString().substring(0, 4);
                    var sunFallTimeMinute = (sunFallTime.toString().replace(/\d+\.(\d*)/, "$1") * 60).toString().substring(0, 4);
                    var sunRiseTimeHour = parseInt(sunRiseTime);
                    var sunFallTimeHour = parseInt(sunFallTime);

                    function handle(TimeMinute, TimeHour, code) {
                        if (TimeMinute > 6000) {
                            TimeMinute = "0" + (TimeMinute - 6000).toString();
                            TimeHour++;
                        }
                        var rounded = TimeMinute.substring(2, 4)
                        if (rounded > 44) { TimeMinute = TimeMinute.substring(0, 2) + 1 } else { TimeMinute = TimeMinute.substring(0, 2) }
                        if (code == 0) {
                            sunRiseTimeMinute = TimeMinute;
                            sunRiseTimeHour = TimeHour;
                        } else {
                            sunFallTimeMinute = TimeMinute;
                            sunFallTimeHour = TimeHour;
                        }
                    }
                    handle(sunRiseTimeMinute, sunRiseTimeHour, 0)
                    handle(sunFallTimeMinute, sunFallTimeHour, 1)
                    sunRiseDpy = sunRiseTimeHour + ":" + sunRiseTimeMinute
                    sunFallDpy = sunFallTimeHour + ":" + sunFallTimeMinute

                    var nowHour = new Date().getHours()
                    var nowMinute = new Date().getMinutes()

                    function getTimeCode(hour, minute) {
                        return hour + (minute / 60);
                    }

                    var nowTimeCode = getTimeCode(nowHour, nowMinute);
                    var sunRiseTimeCode = getTimeCode(sunRiseTimeHour, sunRiseTimeMinute / 10);
                    var sunFallTimeCode = getTimeCode(sunFallTimeHour, sunFallTimeMinute / 10);

                    if (nowTimeCode > sunRiseTimeCode && nowTimeCode < sunFallTimeCode) {
                        if (isOn == true && auto_mode == null) { sty_on(0); }
                        sessionStorage.setItem("auto_mode", "light");
                        addT_auto(0);//add information of auto mode -> now light
                        if (kit_brightnessOn == true) { sty_on(0, false); }//when change brightness, stop change kit event when apply style ->false 
                    } else {
                        if (isOn == true && auto_mode == null) { sty_on(1); }
                        sessionStorage.setItem("auto_mode", "dark");
                        addT_auto(1);
                        if (kit_brightnessOn == true) { sty_on(1, false); }
                    }
                    if (mos_E == true) {
                        kit_mouseEvent();
                        kit_addE();
                        adMdBd(0);
                    }

                }
            }
            //————————————————————————————————————————————————————————————————————           
        }

        //add information of auto mode
        function addT_auto(mode) {
            if (mode == 0) {
                if (document.getElementById("title_auto").innerHTML != null)
                    document.getElementById("title_auto").innerHTML = "Auto（当前:浅色）";

            } else if (mode == 1)
                if (document.getElementById("title_auto").innerHTML != null)
                    document.getElementById("title_auto").innerHTML = "Auto（当前:深色）";
        }

        //removeAd
        removeAd();
        function removeAd() {
            var remAd = localStorage.getItem("remAd");
            var rem_stor_ls = new Array("true", "false", null)
            var rem_stor_do = new Array(
                "removeAdLs(1)",
                "",
                "localStorage.setItem('remAd','true');removeAdLs(1);"
            )
            for (var r_i = 0; r_i < rem_stor_ls.length; r_i++) {
                if (remAd == rem_stor_ls[r_i]) {
                    eval(rem_stor_do[r_i]);
                    break;
                }
            }
        }

        function removeAdLs(isRem) {
            if (isRem == 1) {
                //tactics

                //exclude the influence of iframe
                if (i == 6) {
                    var times = 0;
                    var timer = setInterval(() => {
                        times++;
                        if (document.querySelector("#v_upinfo > div.u-face > a > div > img") != null && document.querySelector("#v_upinfo > div.u-face > a > div > img").complete == true) {
                            adDo();
                            clearInterval(timer);
                        }
                    }, 1000);
                } else if (i != 0) {
                    var times = 0;
                    var timer = setInterval(() => {
                        times++;
                        if (isOnLoad == true) {
                            adDo();
                        }
                        //remove five times 
                        if (times == 5) { clearInterval(timer) }
                    }, 1000);
                }
            }
        }

        //to remove ad
        function adDo() {
            //index
            remTactic1("gg-icon", 4, "video-card-common");
            remTactic1("gg-icon", 1, "banner-card");

            //videoPage_slideAd
            remTactic1("mark", 4, "ad-report");
            //remTactic2("slide_ad");
            remTactic1("gg-pic", 4, "slide-ad");

            //channel ad bar
            remTactic1("gg-pic", 3, "gg-floor-module");

            remTactic1("gg-icon", 1, "banner-card");
        }


        //find higher level element and remove it
        function remTactic1(className, parentNum, expParentClassName) {

            var sl_length = document.getElementsByClassName(className).length
            if (sl_length != 0) {
                for (var s_i = 0; s_i < sl_length; s_i++) {
                    var parent = ".parentElement";
                    var finalParent = "";
                    for (var p_i = 0; p_i < parentNum; p_i++) {
                        finalParent = finalParent + parent;
                    }
                    var ParentClassName = eval("document.getElementsByClassName('" + className + "')[" + s_i + "]" + finalParent + ".classList[0]");
                    if (expParentClassName == (ParentClassName || false)) {
                        eval("document.getElementsByClassName('" + className + "')[" + s_i + "]" + finalParent + ".remove();");
                        remTactic1(className, parentNum, expParentClassName);
                        break;
                    }
                }
            }
        }

        //find element by id and remove it
        function remTactic2(Id) {
            if (document.getElementById(Id) != (null || undefined)) {
                document.getElementById(Id).remove();
            }
        }

        //clearCache

        function clearCache() {
            localStorage.removeItem("dark");
            localStorage.removeItem("remAd");
            document.getElementsByClassName("queT")[0].innerHTML = "已清除 ";
            document.getElementById("queClear").innerHTML = "点击刷新";
            document.getElementById("queClear").removeEventListener("click", clearCache);
            document.getElementById("queClear").addEventListener("click", function () { location.reload(); });
        }
    }

    //down the pic: ?download=true&aid=****&bvid=BV***
    function down() {
        //parse the search
        function parseS(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r !== null) return unescape(r[2]);
            return null;
        }
        if (parseS("download") == "true") {
            let link = document.createElement('a');
            link.download = parseS("bvid") + "_cover.jpg";
            getUrlBase64(location.href, 'jpg', function (base64Url) {
                link.href = base64Url;
                link.click();
            });

            function getUrlBase64(url, ext, callback) {
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                var img = new Image;
                img.crossOrigin = 'Anonymous';
                img.src = url;
                img.onload = function () {
                    canvas.height = img.height;
                    canvas.width = img.width;
                    ctx.drawImage(img, 0, 0, img.width, img.height);
                    var dataURL = canvas.toDataURL("image/" + ext);
                    callback.call(this, dataURL);
                    canvas = null;
                };
            }

        }
    }
})();