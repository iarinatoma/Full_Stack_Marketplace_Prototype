"use strict";

let meniu = [
    "Home",
    "Kategorien",
    "Verkaufen",
    "Unternehmen"
];

let subMeniu = [
    "Philosophie",
    "Karriere"
];

let navigation = document.getElementById("navigation");

let ul = document.createElement("ul");

for (let i = 0; i < meniu.length; i++) {
    let li = document.createElement("li");

    // creem si link pentru ele ca sa duca undeva - nu doar text
    let link = document.createElement("a");
    link.innerText = meniu[i];

    // aici punem linkurile
    if (meniu[i] === "Home") {
        link.href = "/";
    } else if (meniu[i] === "Kategorien") {
        link.href = "/articles";
    } else if (meniu[i] === "Verkaufen") {
        link.href = "/newarticle";
    } else {
        link.href = "#";
    }


    li.appendChild(link);

    // submeniu
    if (meniu[i] === "Unternehmen") {
        let subUl = document.createElement("ul");

        for (let j = 0; j < subMeniu.length; j++) {
            let subLi = document.createElement("li");

            let subLink = document.createElement("a");
            subLink.innerText = subMeniu[j];
            subLink.href = "#";

            subLi.appendChild(subLink);
            subUl.appendChild(subLi);
        }

        li.appendChild(subUl);
    }

    ul.appendChild(li);
}

navigation.appendChild(ul);
