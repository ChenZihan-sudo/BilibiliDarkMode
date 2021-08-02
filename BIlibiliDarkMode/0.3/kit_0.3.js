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