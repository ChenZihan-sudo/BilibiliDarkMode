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
    }
}

//————————————————————————————————————————————————————————————————————