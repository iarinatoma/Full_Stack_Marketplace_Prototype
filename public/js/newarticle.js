"use strict";

let container = document.getElementById("form-container");

let formular = document.createElement("form");
formular.id = "article-form";
formular.method = "POST";
formular.action = "/articles";

let token = document.querySelector('meta[name="csrf-token"]').content;

formular.innerHTML = `
    <input type="hidden" name="_token" value="${token}">

    <label>Name:</label><br>
    <input type="text" id="introdNume" name="name"><br>

    <label>Price:</label><br>
    <input type="number" id="introdPret" name="price" step="0.01"><br>

    <label>Description:</label><br>
    <textarea id="introdDescriere" name="description"></textarea><br>

    <div id="eroare"></div>
    <button type="button" id="buton">Speichern</button>
`;

container.appendChild(formular);

document.getElementById("buton").addEventListener("click", function () {
    let nume = document.getElementById("introdNume").value;
    let pret = Number(document.getElementById("introdPret").value);
    let eroare = document.getElementById("eroare");

    eroare.innerText = "";

    if (nume === "") {
        eroare.innerText = "Name darf nicht leer sein.";
        return;
    }

    if (pret <= 0) {
        eroare.innerText = "Price muss größer als 0 sein.";
        return;
    }

    // in loc de submit() - trimitem prin ajax
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/articles");

    var token = document.querySelector('meta[name="csrf-token"]').content;
    xhr.setRequestHeader("X-CSRF-TOKEN", token);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                document.getElementById("eroare").innerText = xhr.responseText;
            } else {
                document.getElementById("eroare").innerText = "Fehler: " + xhr.statusText;
            }
        }
    };

    var formData = new FormData();
    formData.append("name", nume);
    formData.append("price", pret);
    formData.append("description", document.getElementById("introdDescriere").value);

    xhr.send(formData);
});
