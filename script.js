function carregarRegistros() {
    const registros = JSON.parse(localStorage.getItem("registros")) || [];
    const listaRegistros = document.getElementById("listaRegistros");
    const tituloRegistros = document.getElementById("tituloRegistros");

    listaRegistros.innerHTML = "";

    if (registros.length > 0) {
        tituloRegistros.style.display = "block";
    } else {
        tituloRegistros.style.display = "none";
    }

    registros.forEach((registro, index) => {
        const item = document.createElement("li");
        item.classList.add("list-group-item");
        item.innerHTML = `${registro.nome} - ${registro.email}`;

        const btnExcluir = document.createElement("button");
        btnExcluir.classList.add("btn", "btn-danger", "btn-excluir");
        btnExcluir.textContent = "X";
        btnExcluir.onclick = function() {
            removerRegistro(index);
        };

        item.appendChild(btnExcluir);
        listaRegistros.appendChild(item);
    });
}

function adicionarRegistro(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    if (nome && email) {
        const novosRegistros = JSON.parse(localStorage.getItem("registros")) || [];
        novosRegistros.push({ nome, email });

        localStorage.setItem("registros", JSON.stringify(novosRegistros));

        document.getElementById("formCadastro").reset();

        carregarRegistros();
    }
}

function removerRegistro(index) {
    const registros = JSON.parse(localStorage.getItem("registros")) || [];
    registros.splice(index, 1);

    localStorage.setItem("registros", JSON.stringify(registros));

    carregarRegistros();
}

document.getElementById("formCadastro").addEventListener("submit", adicionarRegistro);

window.onload = carregarRegistros;