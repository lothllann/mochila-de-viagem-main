const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach((e) => {
    criaElemento(e)
});


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = e.target.elements['nome'];
    const quantidade = e.target.elements['quantidade'];

    const existe = itens.find(e => e.nome === nome.value);


    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    };

    if (existe) {
        itemAtual.id = existe.id;

        atualizaElemento(itemAtual);
        itens[itens.findIndex(e => e.id === existe.id)] = itemAtual;

    } else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0

        criaElemento(itemAtual);

        itens.push(itemAtual);
    }



    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = "";
    quantidade.value = "";

})


function criaElemento(item) {

    const novoItem = document.createElement('li');
    novoItem.classList.add("item");

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;

    numeroItem.dataset.id = item.id;

    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;
    novoItem.appendChild(botaoDeleta(item.id));

    lista.appendChild(novoItem);
}

function atualizaElemento(item) {

    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade;
}


function botaoDeleta(id) {
    const elementoBotao = document.createElement("button");
    elementoBotao.innerHTML = "X";

    elementoBotao.addEventListener("click", function () {
        deletaElemento(this.parentNode, id);
    });

    return elementoBotao;
}

function deletaElemento(tag, id) {
    tag.remove();

    itens.splice(itens.findIndex(e => e.id === id), 1);

    localStorage.setItem("itens", JSON.stringify(itens));

}