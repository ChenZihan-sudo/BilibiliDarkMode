// 个人空间辅助
//前端
function spa_get() {
    let value = localStorage.getItem("mode");
    if (value == "auto") {
        click(0)
    } else if (value == "light") {
        click(1)
    } else if (value == "dark") {
        click(2)
    }
}
//后端
document.getElementsByClassName("n-tab-links")[0].addEventListener("click", spa_get())