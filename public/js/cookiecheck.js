"use strict";

let cookies = document.cookie.split("; ");
let aceptare;

for (let i = 0; i < cookies.length; i++) {
    let parte = cookies[i].split("=");
    if (parte[0] === "cookieAccepted") {
        aceptare = "yes";
    }
}

if (aceptare !== "yes") {
    let banner = document.createElement("div");
    banner.id = "cookie-banner";

    banner.style.position = "fixed";
    banner.style.bottom = "0";
    banner.style.left = "0";
    banner.style.width = "100%";
    banner.style.backgroundColor = "#efb9ff";
    banner.style.borderTop = "1px solid #999999";
    banner.style.padding = "15px";
    banner.style.boxSizing = "border-box";

    let text = document.createElement("p");
    text.innerText = "Diese Webseite verwendet Cookies. Mit der Nutzung stimmen Sie der Verwendung von Cookies zu.";

    let button = document.createElement("button");
    button.innerText = "Einverstanden";

    button.addEventListener("click", function () {
        let data = new Date();
        data.setTime(data.getTime() + 30 * 24 * 60 * 60 * 1000);
        let expires = "expires=" + data.toUTCString();
        document.cookie = "cookieAccepted; " + expires + "; path=/";
        banner.remove();
    });

    banner.appendChild(text);
    banner.appendChild(button);
    document.body.appendChild(banner);
}
