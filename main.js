(function () {
    "use strict";
    var animID, fullscreen, playBttn, scrollLimit, speed = 1;

    function stopScroll() {
        window.cancelAnimationFrame(animID);
        document.body.style.overflowY = "auto";
        playBttn.textContent = ">";
    }

    function scroll() {
        // Scroll Limit can't be calculated here it gives NaN.
        if (window.scrollY < scrollLimit) {
            window.scrollBy(0, speed);
            animID = window.requestAnimationFrame(scroll);
        } else {
            // Stop when reached end.
            stopScroll();
        }
    }

    function startAnim() {
        if (playBttn.textContent === ">") {
            document.body.style.overflowY = "hidden";
            playBttn.textContent = "||";
            scrollLimit = document.body.scrollHeight - window.innerHeight;
            // scrollLimit = window.scrollMaxY;
            if (window.scrollY === scrollLimit) {
                window.scrollTo(0, 0);
            }
            animID = window.requestAnimationFrame(scroll);
        } else {
            // Stop by user action.
            stopScroll();
        }
    }

    function makeFullscreen() {
        // Need to make an event to detect another way that fullscreen can change.
        if (fullscreen.checked) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }

    function init() {
        fullscreen = document.querySelector('#fullscreen');
        playBttn = document.querySelector('#anim');
        playBttn.addEventListener("click", startAnim);
        fullscreen.addEventListener("click", makeFullscreen);
    }

    window.addEventListener("load", init);
}());