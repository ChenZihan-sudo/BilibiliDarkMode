if (i == 6) {
    var userPic = document.querySelector("#v_upinfo > div.u-face > a > div > img");
    var checkTimes = 0;
    var PicLoadtimer = setInterval(() => {
        checkTimes++;
        console.log(PicLoadtimer, i)
        if (userPic.complete) {
            clearInterval(PicLoadtimer);
            adDo();
        }
        if (checkTimes == 10) {//avoid cycle too many times
            clearInterval(PicLoadtimer);
        }
    }, 1000);
} else {
    adDo();
}


// 

//when mouse is on btn
$(document).ready(function () {
    $("#setting").mouseenter(function () {
        //show card
        document.getElementById("kitCard").style = "display:flex;"
    });
});
//when mouse out btn
$(document).ready(function () {
    $("#setting").mouseleave(function () {
        //wait to check whether the mouse is in card or not 
        setTimeout(() => {
            if (isOpen == true) {
                //set null
                isOpen = null;
                document.getElementById("kitCard").style = "display:flex;"
            } else {
                document.getElementById("kitCard").style = "display:none;"
                isOpen = null;
            }
        }, 100);
    });
});
//when mouse into card
$(document).ready(function () {
    $("#kitCard").mouseenter(function () {
        isOpen = true;
    });
});
//when mouse out card
$(document).ready(function () {
    $("#kitCard").mouseleave(function () {
        //hide card
        document.getElementById("kitCard").style = "display:none;"
    });
});
