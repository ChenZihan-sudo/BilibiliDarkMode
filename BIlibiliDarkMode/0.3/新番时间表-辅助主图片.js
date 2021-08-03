//新番时间表-辅助js
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