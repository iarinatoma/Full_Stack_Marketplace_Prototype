"use strict";

let container = document.getElementById("form-container");

let formular = document.createElement("form");
formular.id = "article-form";
formular.method = "POST";
formular.action = "/articles";

let csrfInput = document.createElement("input");
csrfInput.type = "hidden";
csrfInput.name = "_token";
csrfInput.value = document.querySelector('meta[name="csrf-token"]')?.content || "";

let nume = document.createElement("label");
nume.innerText = "Name:";

let introdNume = document.createElement("input");
introdNume.type = "text";
introdNume.name = "name";
introdNume.id = "name";

let pret = document.createElement("label");
pret.innerText = "Price:";

let introdPret = document.createElement("input");
introdPret.type = "number";
introdPret.name = "price";
introdPret.id = "price";
introdPret.step = "0.01";

let descriere = document.createElement("label");
descriere.innerText = "Description:";

let introdDescriere = document.createElement("textarea");
introdDescriere.name = "description";
introdDescriere.id = "description";

let eroare = document.createElement("div");
eroare.id = "error-box";

let buton = document.createElement("button");
buton.type = "button";
buton.innerText = "Speichern";

buton.addEventListener("click", function () {
    eroare.innerText = "";

    let nume = introdNume.value;
    let pret = Number(introdPret.value);

    if (nume === "") {
        eroare.innerText = "Name darf nicht leer sein.";
        return;
    }

    if (pret <= 0) {
        eroare.innerText = "Price muss großer als 0 sein.";
        return;
    }

    document.getElementById("article-form").submit();
});

formular.appendChild(csrfInput);

formular.appendChild(nume);
formular.appendChild(document.createElement("br"));
formular.appendChild(introdNume);
formular.appendChild(document.createElement("br"));

formular.appendChild(pret);
formular.appendChild(document.createElement("br"));
formular.appendChild(introdPret);
formular.appendChild(document.createElement("br"));

formular.appendChild(descriere);
formular.appendChild(document.createElement("br"));
formular.appendChild(introdDescriere);
formular.appendChild(document.createElement("br"));

formular.appendChild(eroare);
formular.appendChild(buton);

container.appendChild(formular);
