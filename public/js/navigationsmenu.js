"use strict";

let navigationsMeniu = {

    //facute si astea ca obiecte sa fie mai usor la links
    meniu: [
        { text: "Home",        href: "/" },
        { text: "Kategorien",  href: "/articles" },
        { text: "Verkaufen",   href: "/newarticle" },
        { text: "Unternehmen", href: "#" }
    ],
    subMeniu: [
        { text: "Philosophie", href: "#" },
        { text: "Karriere",    href: "#" }
    ],

    // functia care creaza efectiv meniul
    init: function() {
        this.container = document.getElementById("navigation");
        this.createMenu();
    },

    createLink: function(text, href) {
        let link = document.createElement("a");
        link.innerText = text;
        link.href = href;
        return link;
    },

    createMenu: function() {
        let ul = document.createElement("ul");

        for (let i = 0; i < this.meniu.length; i++) {
            let li = document.createElement("li");
            let link = this.createLink(this.meniu[i].text, this.meniu[i].href);
            li.appendChild(link);

            if (this.meniu[i].text === "Unternehmen") {
                let subUl = document.createElement("ul");

                for (let j = 0; j < this.subMeniu.length; j++) {
                    let subLi = document.createElement("li");
                    let subLink = this.createLink(this.subMeniu[j].text, this.subMeniu[j].href);
                    subLi.appendChild(subLink);
                    subUl.appendChild(subLi);
                }

                li.appendChild(subUl);
            }

            ul.appendChild(li);
        }

        this.container.appendChild(ul);
    }
};

navigationsMeniu.init();
