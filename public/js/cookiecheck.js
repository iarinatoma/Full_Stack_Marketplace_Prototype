"use strict";

function getCookie(nume) {
    let cookies = document.cookie.split("; ");

    for (let i = 0; i < cookies.length; i++) {
        let parts = cookies[i].split("=");

        if (parts[0] === nume) {
            return parts[1];
        }
    }

    return null;
}

function setCookie(name, val, zile) {
    let data = new Date();

    //calculeaza cand va expira, transformand in milisecunde
    data.setTime(data.getTime() + zile * 24 * 60 * 60 * 1000);

    let expires = "expires=" + data.toUTCString();

    //creaza cookie ul
    document.cookie = name + "=" + val + "; " + expires + "; path=/";
}

function createCookieBanner() {
    let banner = document.createElement("div");
    banner.id = "cookie-banner";

    banner.style.position = "fixed";
    banner.style.bottom = "0";
    banner.style.left = "0";
    banner.style.width = "100%";
    banner.style.backgroundColor = "#eeeeee";
    banner.style.borderTop = "1px solid #999999";
    banner.style.padding = "15px";
    banner.style.boxSizing = "border-box";

    let text = document.createElement("p");
    text.innerText = "Diese Webseite verwendet Cookies. Mit der Nutzung stimmen Sie der Verwendung von Cookies zu.";

    let button = document.createElement("button");
    button.innerText = "Einverstanden";

    button.addEventListener("click", function () {
        setCookie("cookieAccepted", "yes", 30);
        banner.remove();
    });

    banner.appendChild(text);
    banner.appendChild(button);

    document.body.appendChild(banner);
}

let aceptare = getCookie("cookieAccepted");

if (aceptare !== "yes") {
    createCookieBanner();
}
