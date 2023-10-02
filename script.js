document.addEventListener("DOMContentLoaded", function() {
    //abrir menu suspenso
    var btn_menu = document.getElementById("btn-menu");

    btn_menu.addEventListener("click", function() {
        if (lista_suspensa.style.display !== "none") {
            lista_suspensa.style.display = "none";
        } else {
            lista_suspensa.style.display = "block";
        }
    });

    // abrir informações do menu suspenso "sobre o app"
    document.getElementById("link-sobre_app").addEventListener("click", function() {
        document.getElementById("sobre_app-modal").style.display = "block";
    });

    // fechar modais
    var close_modals = document.getElementsByClassName("close");
    var modals = document.getElementsByClassName("modal");

    for (let i = 0; i < close_modals.length; i++) {
        close_modals[i].addEventListener("click", function() {
            for (var j = 0; j < modals.length; j++) {
                modals[j].style.display = "none";
            }
        });
    }

    //ao clicar fora do modal, ele retorna à página inicial
    window.addEventListener("click", function(event) {
        if (event.target.classList.contains("modal") || event.target.classList.contains("modal-content")) {
            var modals = document.getElementsByClassName("modal");
            var modal_contents = document.getElementsByClassName("modal-content");

            for (var i = 0; i < modals.length; i++) {
                modals[i].style.display = "none";
            }

            CheckVazio();
        }
    });
    // adiconar função de abrir configuração carro ao clicar no ícone inicial
    document.getElementById("msg_inicial_icon").addEventListener("click",function(){
        event.stopPropagation();
        document.getElementById("rendimento_modelo").style.display = "block";
        document.getElementById("msg_inicial").style.display = "none";

    })

    //adicionar função abrir configuração carro ao clicar no add
    document.getElementById("add-button").addEventListener("click", function() {
            document.getElementById("rendimento_modelo").style.display = "block";
            document.getElementById("msg_inicial").style.display = "none";
        
    })

    //adicionar função abrir configuração carro ao clicar no editar_automovel
    document.getElementById("editar_automovel").addEventListener("click", function() {
        document.getElementById("rendimento_modelo").style.display = "block";
        document.getElementById("msg_inicial").style.display = "none";

    })

    // fechar configuração rendimento modelo
    document.getElementById("fechar-rendimento-modelo").addEventListener("click", function() {
        CheckVazio();    
    });

    //salvar cadastro de veículo
    document.getElementById("btn-nome").addEventListener("click", function() {
    var valorItem1 = document.getElementById("item_usuario1").value;
    var valorItem2 = document.getElementById("item_usuario2").value;
    
    var calculo_combustivel = document.getElementById("calculo_combustivel");
    
    if (valorItem1 === "" && valorItem2.trim() === "") {
        alert("Ops... você esqueceu de inserir os valores!");
    } else {
        // Verifica se os valores não são nulos ou vazios antes de preencher os elementos e salvar no localStorage
        if (valorItem1) {
            document.getElementById("item_usuario1").value = valorItem1;
        }
        if (valorItem2) {
            document.getElementById("item_usuario2").value = valorItem2;
        }

        // Define o texto dos elementos com base nos valores inseridos pelo usuário
        var itemUsuario3 = document.getElementById("item_usuario3");
        var itemUsuario4 = document.getElementById("item_usuario4");
        itemUsuario3.textContent = valorItem1;
        itemUsuario4.textContent = valorItem2;

        // Salva os valores no localStorage
        localStorage.setItem("valorItem1", valorItem1 || "");
        localStorage.setItem("valorItem2", valorItem2 || "");

        alert("Dados cadastrados com sucesso!");

        // Oculta a div rendimento_modelo e o botão add-button
        document.getElementById("rendimento_modelo").style.display = "none";
        document.getElementById("add-button").style.display = "none";
    }
    CheckVazio();
    calcularVantagem();
});

    function CheckVazio() {
        // verificar se há veículo já cadsatrado
        ApresentarCadastroSalvo()
        // Pega os valores dos spans
        var itemUsuario3 = document.getElementById("item_usuario3").textContent;
        var itemUsuario4 = document.getElementById("item_usuario4").textContent;
        // Verifica se ambos os valores estão vazios
        if (itemUsuario3.trim() === "" && itemUsuario4.trim() === "") {
            document.getElementById("msg_inicial").style.display = "block";
        } else {
            document.getElementById("calculo_combustivel").style.display = "block";
            document.getElementById("msg_inicial").style.display = "none";
            document.getElementById("add-button").style.display = "none";
        }
    }

// Sempre que alterar o valor do posto, atualizar resposta
function VerificarMelhorOpcao() {
    const precos = document.querySelectorAll(".precos");

    precos.forEach(function (input) {
        input.addEventListener("input", function () {
            // Substitua "," por "." no valor do campo
            this.value = this.value.replace(",", ".");
            calcularVantagem();
            calcularEconomia();
        });
    });
}

function calcularVantagem() {
    const precoAlcool = parseFloat(document.getElementById("item_usuario5").value.replace(",", "."));
    const precoGasolina = parseFloat(document.getElementById("item_usuario6").value.replace(",", "."));
    const rendimentoAlcool = parseFloat(document.getElementById("item_usuario3").textContent);
    const rendimentoGasolina = parseFloat(document.getElementById("item_usuario4").textContent);

    if (!isNaN(precoAlcool) && !isNaN(precoGasolina) && !isNaN(rendimentoAlcool) && !isNaN(rendimentoGasolina)) {
        const vantagemAlcool = precoAlcool / rendimentoAlcool;
        const vantagemGasolina = precoGasolina / rendimentoGasolina;

        if (vantagemAlcool < vantagemGasolina) {
            document.getElementById("resultado").style.display = "block";
            document.getElementById("melhor_opcao_alcool").style.display = "block";
            document.getElementById("melhor_opcao_gasolina").style.display = "none";
        } else {
            document.getElementById("resultado").style.display = "block";
            document.getElementById("melhor_opcao_gasolina").style.display = "block";
            document.getElementById("melhor_opcao_alcool").style.display = "none";
        }
        
const relacao_alcool_gasolina = (rendimentoAlcool / rendimentoGasolina)*100;
const relacao_precos_alcool_gasolina = (precoAlcool/precoGasolina)*100;

document.getElementById("relacao_rendimento").textContent = relacao_alcool_gasolina.toFixed(0); 
document.getElementById("relacao_precos_alcool_gasolina").textContent = relacao_precos_alcool_gasolina.toFixed(0);
document.getElementById("relacao_rendimento2").textContent = relacao_alcool_gasolina.toFixed(0); 
document.getElementById("relacao_precos_alcool_gasolina2").textContent = relacao_precos_alcool_gasolina.toFixed(0);

    } else {
        document.getElementById("resultado").style.display = "none";
    }
}

// Chame a função para configurar os ouvintes de eventos quando a página for carregada

window.addEventListener("load", CheckVazio);
window.addEventListener("load", VerificarMelhorOpcao);

// cálculo da economia
// Função para calcular a economia
function calcularEconomia() {
    const precoAlcool = parseFloat(document.getElementById("item_usuario5").value.replace(",", "."));
    const precoGasolina = parseFloat(document.getElementById("item_usuario6").value.replace(",", "."));
    const rendimentoAlcool = parseFloat(document.getElementById("item_usuario3").textContent);
    const rendimentoGasolina = parseFloat(document.getElementById("item_usuario4").textContent);

    if (precoAlcool > 0 && precoGasolina > 0 && rendimentoAlcool > 0 && rendimentoGasolina > 0) {
        const kmAlcool = (100 / precoAlcool) * rendimentoAlcool;
        const kmGasolina = (100 / precoGasolina) * rendimentoGasolina;

        if (kmAlcool > kmGasolina) {
            const economiaEmReais = ((kmAlcool - kmGasolina) / rendimentoGasolina) * precoGasolina;
            document.getElementById("melhor_opcao_alcool").style.display = "block";
            document.getElementById("melhor_opcao_gasolina").style.display = "none";
            document.getElementById("economia_total").textContent = economiaEmReais.toFixed(2);
        } else {
            const economiaEmReais = ((kmGasolina - kmAlcool) / rendimentoAlcool) * precoAlcool;
            document.getElementById("melhor_opcao_gasolina").style.display = "block";
            document.getElementById("melhor_opcao_alcool").style.display = "none";
            document.getElementById("economia_total2").textContent = economiaEmReais.toFixed(2);
        }

        // Calcula as relações
        const relacaoAlcoolGasolina = (rendimentoAlcool / rendimentoGasolina) * 100;
        const relacaoPrecosAlcoolGasolina = (precoAlcool / precoGasolina) * 100;
        document.getElementById("relacao_rendimento").textContent = relacaoAlcoolGasolina.toFixed(0);
        document.getElementById("relacao_precos_alcool_gasolina").textContent = relacaoPrecosAlcoolGasolina.toFixed(0);
    } else {
        // Valores inválidos, definir economia como 0.00 e ocultar seções
        document.getElementById("economia_total").textContent = "0.00";
        document.getElementById("economia_total2").textContent = "0.00";
        document.getElementById("melhor_opcao_alcool").style.display = "none";
        document.getElementById("melhor_opcao_gasolina").style.display = "none";
    }
}

function ApresentarCadastroSalvo() {
    // Verifica se há dados no localStorage
    var valorItem1 = localStorage.getItem("valorItem1");
    var valorItem2 = localStorage.getItem("valorItem2");

    // Verifica se os valores não são nulos ou vazios antes de preencher os elementos
    if (valorItem1 !== null && valorItem1 !== "") {
        document.getElementById("item_usuario1").value = valorItem1;
        document.getElementById("item_usuario3").textContent = valorItem1;
    }
    if (valorItem2 !== null && valorItem2 !== "") {
        document.getElementById("item_usuario2").value = valorItem2;
        document.getElementById("item_usuario4").textContent = valorItem2;
    }
}

})

// Limpar o localStorage
//localStorage.clear();
