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

// seletor para encontrar rendimento do veículo (MARCA e MODELO)

var marcasSelect = document.getElementById("marca");
var modelosSelect = document.getElementById("modelo");

// Mapeie as marcas para os modelos correspondentes
var modelosPorMarca = {
    "JEEP": [
        "COMMANDER", "Compass", "Renegade", "Renegade (2017)"
],
    "HYUNDAI": [ "CRETA", "ELANTRA", "HB20", "HB20S", "HB20X", "HB20X (2016)", "i30", "iX 35", "iX 35 FF BR",
    "iX35", "TUCSON"
],
    "KIA": ["CERATO", "NEW SOUL", "PICANTO", "RIO", "SPORTAGE", "Soul"],
    "LAND ROVER": ["DISC SPT", "Discovery Sport", "DISCOVERY SPORT", "EVOQUE"],
    "FORD": [
        "EcoSport", "EcoSport (2019)", "Fiesta Hatch", "Fiesta Sedan", "Focus Fastback",
        "Focus Hatch", "Focus Sedan", "FUSION", "KA", "KA (2017)", "KA (5 Portas)", "KA hatch (2019)",
        "KA+", "KA+ (2017)", "KA+ (4 Portas)", "KA sedan (2019)", "KA Hatch", "KA Sedan",
        "New Fiesta Hatch", "New Fiesta Hatch (2017)", "New Fiesta Sedan", "New Fiesta Sedan (2017)",
        "New Focus Hatch", "New Focus Sedan", "Ranger 4x2 C. Dupla", "Ranger 4x2 C. Simples"
    ],
    "CHEVROLET": [
        "Classic", "COBALT (MY 17)", "COBALT (MY18)", "COBALT (MY19)", "Cobalt", "Cruze",
        "Cruze Sedan", "Cruze Sport 6", "Cruze Sport6", "MONTANA (MY17)", "MONTANA (MY18)",
        "MONTANA (MY19)", "Novo Cruze (modelo 2017)", "Novo Cruze Hatch (modelo 2017)",
        "Nova Tracker (modelo 2017)", "Nova Tracker (2017)", "Onix", "Onix Joy", "Onix Joy (2017)",
        "Onix Plus", "Onix Plus Joy", "PRISMA (MY 17)", "PRISMA (MY18)", "PRISMA (MY19)", "Prisma",
        "Prisma Joy (2017)", "Prisma Joy (MY18)", "Prisma Joy (MY19)", "Spin", "Spin (MY18)",
        "Spin (MY19)", "TRACKER", "TRACKER (MY19)", "S10", "S10 (2017)", "S10 (modelo 2017)",
        "Novo ONIX (MY17)", "Novo PRISMA (MY17)", "Novo Cruze Hatch Turbo", "Novo Cruze Turbo",
        "Novo Cruze (MY18)", "Novo Cruze (MY19)", "Novo Cruze Sport6 (MY18)", "Novo Cruze Sport6 (MY19)",
        "Cruze (MY19)", "Cruze Sport6", "Classic", "Montana", "Onix", "Onix Joy", "Onix Joy (2017)",
        "Onix Plus", "Onix Plus Joy", "Spin", "Prisma", "Prisma Joy (2017)", "Prisma Joy (MY18)",
        "Prisma Joy (MY19)", "S10", "S10 (2017)", "S10 (modelo 2017)", "TRACKER", "TRACKER (MY19)"
    ],
    "Mercedes-Benz": [
        "A200 FF", "B200 FF", "C180 FF", "CLA200 FF", "C180 FF BR", "EQC400 4M", "GLA200 FF", "GLA200 FF BR", "VITO TOURER 119"
       ],    

    "FIAT": [
        "500", "ARGO", "ARGO (2019)", "Bravo", "Cronos", "Dobló", "Dobló (2017)", "DOBLO", "Fiorino",
        "Fiorino (2017)", "Grand Siena", "Idea", "Linea", "Mobi", "Mobi (2017)", "Novo Fiorino",
        "Novo Idea", "Novo Palio", "Novo Uno", "Novo Uno (2017)", "Palio", "Palio Weekend", "Pulse",
        "Punto", "SIENA", "Strada", "TORO", "TORO (2019)", "UNO", "Weekend", "Weekend (2017)"
    ],    
    "Renault": [
        "Captur", "Clio", "Duster", "Duster Oroch", "Fluence", "Kangoo", "Logan", "Novo Duster", "Novo Logan", "Novo Sandero", "Oroch", "Sandero", "Sandero RS", "Stepway", "Stepway", "KWID"
    ],
    "TOYOTA":[
            "COROLLA", "COROLLA CROSS", "ETIOS HATCHBACK", "ETIOS HATCHBACK", "ETIOS SEDÃ", "Etios Sedan",
            "HILUX FLEX 4X2", "HILUX FLEX 4X4", "Hilux Flex 4X2", "Hilux Flex 4X4", "Hilux 4X2", "Hilux 4X4",
            "SW4", "SW4", "SW4 FLEX 4X2", "YARIS", "YARIS HATCHBACK", "YARIS HATCHBACK", "YARIS SEDÃ",
            "YARIS SEDÃ", "Yaris Hatchback"
    ],
           
    "Mitsubishi": [
        "ASX", "L200 Triton", "L200 Triton", "Outlander Sport", "Pajero TR4"
    ],
    "CHERY": [
        "CELER", "Celer HB", "Celer SD", "Face", "NEW QQ", "Novo Celer", "TIGGO 2"    ],
    "CAOA CHERY": [
        "ARRIZO 5", "New QQ", "TIGGO 2", "TIGGO 3X", "TIGGO 5X", "TIGGO 7"],
    "NISSAN": [
        "KICKS", "KICKS MY22", "Livina", "March", "NEW MARCH", "NEW VERSA", "Novo Sentra (2017)",
        "NOVO SENTRA", "Sentra", "V-DRIVE", "VERSA", "VERSA"
      ],
      "HONDA": [
        "City", "City (2022)", "City (novo)", "Civic", "Civic (2015)", "CR-V", "Fit", "Fit (novo)", "HR-V", "WR-V"
      ],
      "Peugeot": [
        "2008", "207 HB", "207 Passion", "208", "208", "308", "308", "408", "408", "Novo 208", "2008 (2017)", "Partner"      
      ],
      "Citroën": [
        "C3", "C4 Lounge", "Aircross", "C4 Cactus", "Berlingo"
      ],
      "BMW": [
        "120i", "125I", "220i", "225i", "320i", "328i", "X1", "X2"      
      ],
      "VOLKSWAGEN": [
        "CrossFox", "CrossFox (Pneus On Road)", "Fox", "Fox (2017)", "GOLF", "GOLF VARIANT", "Gol",
        "Gol (2019)", "Gol Ecomotion", "Gol G4", "Jetta", "Kombi", "NIVUS", "Nova Saveiro CD", "Nova Saveiro CE",
        "Nova Saveiro CS", "Novo CrossFox", "Novo Fox", "Novo Golf", "Novo Golf TSI", "Novo Gol",
        "Novo Space Cross", "Novo SpaceFox", "Novo SpaceCross", "Polo", "Polo Sedan", "Saveiro", "Saveiro CD",
        "Saveiro CD (Pneus On Road)", "Saveiro CE", "Saveiro CE (Pneus On Road)", "Saveiro CS", "SpaceCross",
        "Spacefox", "Spacefox (2017)", "Spacefox (2017)(Exceto rodas aro 16\")", "T-Cross", "Tiguan", "up!",
        "up! TSI", "Virtus", "Voyage", "Voyage (2019)"
       ],
      "AUDI": [
        "A3", "A3 Sedan", "Q3"
      ],                             
      "JAC": [
        "J2", "J3", "J6", "T40", "T40 1.5 JETFLEX", "T5", "T6"
      ],
      "JAGUAR": [
        "EPACE",
        "E-PACE"
      ],
      "CITROEN": [
        "Aircross", "Aircross (2017)", "Berlingo", "C3", "C4 Cactus", "C4 Lounge"
      ]      
            
}     

function atualizarModelos() {
  var marcaSelecionada = marcasSelect.value;
  modelosSelect.innerHTML = ""; 
  
  modelosPorMarca[marcaSelecionada].forEach(function(modelo) {
    var option = document.createElement("option");
    option.value = modelo;
    option.textContent = modelo;
    modelosSelect.appendChild(option);
  });
}

marcasSelect.addEventListener("change", atualizarModelos);

atualizarModelos();


document.addEventListener("DOMContentLoaded", function() {
  var marcasSelect = document.getElementById("marca");
  var modelosSelect = document.getElementById("modelo");
  var versoesSelect = document.getElementById("versao");
  
  // Mapeie as marcas para os modelos correspondentes
  var modelosPorMarca = {
        "AUDI":{
                  "A3": [
                    "Attraction 1.4-16V",
                    "Ambiente 1.4-16V",
                    "Sedan Attraction 1.4-16V",
                    "Sedan Ambiente 1.4-16V",
                    "Attraction (150cv) 1.4-16V",
                    "Ambiente (150cv) 1.4-16V"
                  ],
                  "A3 Sedan": [
                    "Attraction/Ambiente 1.4-16V",
                    "Prestige 1.4-16V",
                    "Prestige Plus 1.4-16V",
                    "Attraction (150cv) 1.4-16V",
                    "Ambiente (150cv) 1.4-16V",
                    "1.4-16V Attraction/Ambiente"
                  ],
                  "Q3": [
                    "Attraction / Ambiente / Ambition 1.4-16V",
                    "Prestige 1.4-16V",
                    "Prestige Plus 1.4-16V",
                    "Black 1.4-16V"
                  ]
                },
                "BMW": {
                    "220i": [
                      "CAT ActiveFlex 2.0 - 16v",
                      "2.0 - 16v CAT ActiveFlex"
                    ],
                    "320i": [
                      "ActiveFlex 2.0 - 16v",
                      "2.0 - 16v ActiveFlex"
                    ],
                    "328i": [
                      "ActiveFlex 2.0 - 16v",
                      "2.0 - 16v ActiveFlex"
                    ],
                    "X1": [
                      "sDrive20i ActiveFlex 2.0 - 16v",
                      "xDrive25i ActiveFlex 2.0 - 16v",
                      "sDrive 20i Active Flex 2.0-16V",
                      "sDrive 20i X- Line Active Flex 2.0-16v",
                      "sDrive 20i GP Active Flex 2.0-16v",
                      "2.0 - 16V sDrive 20i ActiveFlex",
                      "2.0 - 16V xDrive 25i ActiveFlex"
                    ],
                    "X2": [
                      "sDrive 18i Active Flex 1.5 - 12v",
                      "sDrive 20i Active Flex 2.0 - 16v",
                      "sDrive 18i 1.5-16V",
                      "sDrive 20i 2.0-16V",
                      "1.5 - 12V sDrive 18i Active Flex",
                      "2.0 - 16V sDrive 20i ActiveFlex"
                    ]
                },
                "CAOA CHERY": {
                    "NEW QQ": [
                      "1.0 LOOK",
                      "1.0 LOOK PLUS",
                      "1.0 SMILE",
                      "1.0 SMILE PLUS",
                      "1.0 ACT",
                      "1.0 ACT PLUS",
                      "Look 1.0-12V",
                      "Look Plus 1.0-12V",
                      "Smile 1.0-12V",
                      "Smile Plus 1.0-12V",
                      "Act 1.0-12V",
                      "ACT Plus 1.0-12V"
                    ],
                    "ARRIZO 5": [
                      "RX 1.5T -16V",
                      "RXT 1.5T -16V",
                      "RT 1.5T -16V",
                      "RXS 1.5T -16V",
                      "RTS 1.5T -16V",
                      "1.5-16V Turbo RX",
                      "1.5-16V Turbo RXT",
                      "1.5-16V Turbo RT"
                    ],
                    "TIGGO 2": [
                      "DESERT 1.5-16V",
                      "EXCLUSIVE 1.5-16V",
                      "SPORT 1.5-16V",
                      "ACT 1.5-16V",
                      "Look 1.5-16V",
                      "Lux 1.5-16V",
                      "Smile 1.5-16V",
                      "ACT 1.5-16V",
                      "Exclusive 1.5-16V",
                      "Look 1.5-16V",
                      "1.5 - 16V DESERT",
                      "1.5 - 16V EXCLUSIVE",
                      "1.5 - 16V SPORT",
                      "1.5 ACT",
                      "1.5 LOOK",
                      "1.5 LUX",
                      "1.5 SMILE",
                      "1.5 AT ACT",
                      "1.5 AT EX",
                      "1.5 AT LOOK"
                    ],
                    "TIGGO 5X": [
                      "T 1.5-16V Turbo",
                      "TXS 1.5-16V Turbo",
                      "1.5T -16V T",
                      "1.5T -16V TXS"
                    ],
                    "TIGGO 7": [
                      "T 1.5-16V Turbo",
                      "TXS 1.5-16V Turbo",
                      "1.5T -16V T",
                      "1.5T -16V TXS"
                    ],
                    "ARRIZO 6": [
                      "1.5T -16V GSX",
                      "1.5T -16V PRO"
                    ],
                    "TIGGO 3X": [
                      "1.0T T TA",
                      "1.0T TX TA",
                      "1.0T TXS TA",
                      "1.0T S TA",
                      "1.0T ST TA",
                      "1.0T STX TA",
                      "1.0T PLUS TA",
                      "1.0T PRO TA"
                    ]
                  },
                  "CHEVROLET": {
                    "SPIN (MY17)": [
                      "1.8L MT LTZ (7L) 1.8L-8V",
                      "1.8L AT LTZ (7L) 1.8L-8V"
                    ],
                    "S10 (modelo 2017)": [
                      "LS / LT / LTZ Flex Cabine Dupla 4x2 2.5 - 16V",
                      "LT/ LTZ Flex Cabine Dupla 4x4 2.5 - 16V",
                      "LS Flex Cabine Simples 4x2 2.5 - 16V",
                      "High Country Flex Cabine Dupla 4x2 2.5 - 16V",
                      "High Country Flex Cabine Dupla 4x4 2.5 - 16V"
                    ],
                    "MONTANA (MY17)": [
                      "LS1 1.4L-8V",
                      "SPORT / LS2 1.4L-8V"
                    ],
                    "ONIX (MY18)": [
                      "1.0MT LS / 1.0MT LT 1.0L - 8V",
                      "10MT JOYE 1.0L - 8V",
                      "1.4MT LT / 1.4MT LTZ / 1.4MT EFF 1.4L - 8V",
                      "1.4AT LT / 1.4AT LTZ 1.4L - 8V",
                      "1.4MT ACT 1.4L - 8V",
                      "1.4AT ACT 1.4L - 8V"
                    ],
                    "ONIX (MY19)": [
                      "1.4AT ACT 1.4L - 8V",
                      "1.4AT LTZ 1.4L - 8V",
                      "1.4MT ACT 1.4L - 8V",
                      "1.4MT EFF 1.4L - 8V",
                      "1.0MT LS 1.0L - 8V",
                      "1.0MT LT 1.0L - 8V",
                      "1.4AT ADV 1.4L - 8V",
                      "1.4AT LT 1.4L - 8V",
                      "1.4MT LT 1.4L - 8V",
                      "1.4MT LTZ 1.4L - 8V"
                    ],
                    "ONIX JOY (MY19)": [
                      "10MT JOYE 1.0L - 8V"
                    ],
                    "COBALT (MY18)": [
                      "1.4 LT/LTZ 1.4L-8V",
                      "1.8M LTZ / 1.8M LT 1.8L-8V",
                      "18A LTZ/18 A ELI / 1.8 A LT 1.8L-8V"
                    ],
                    "SPIN (MY18)": [
                      "1.8L MT LT (5L) 1.8L-8V",
                      "1.8L MT LS E (5L) 1.8L-8V",
                      "1.8L AT LT ADV (5L) 1.8L-8V",
                      "1.8L AT ACT (5L) 1.8L-8V"
                    ],
                    "PRISMA (MY18)": [
                      "1.0MT LT 1.0L - 8V",
                      "1.4MT LT / 1.4MT LTZ 1.4L - 8V",
                      "1.4AT LT / 1.4AT LTZ 1.4L - 8V"
                    ],
                    "PRISMA JOY (MY18)": [
                      "10MT JOYE 1.0L - 8V"
                    ],
                    "SPIN (MY17)": [
                        "1.8L-8V 1.8L MT (5L)",
                        "1.8L-8V 1.8L MT LT (5L)",
                        "1.8L-8V 1.8L MT LS E (5L)",
                        "1.8L-8V 1.8L AT LT ADV (5L)",
                        "1.8L-8V 1.8L AT ACT (5L)"
                      ],
                      "Novo Cruze (modelo 2017)": [
                        "1.4T-16V LT NB AT",
                        "LTZ NB AT"
                      ],
                      "Novo Cruze Hatch (modelo 2017)": [
                        "1.4T-16V LT HB AT",
                        "LTZ HB AT",
                        "1.4T-16V LT HB MT"
                      ],
                      "Nova Tracker (modelo 2017)": [
                        "1.4T-16V LT",
                        "LTZ"
                      ]
                  },
                  "CHERY":{
                    "NEW QQ": [
                      "1.0 LOOK",
                      "1.0 LOOK PLUS",
                      "1.0 SMILE",
                      "1.0 SMILE PLUS",
                      "1.0 ACT",
                      "1.0 ACT PLUS 1.0 - 12V"
                    ],
                    "CELER": [
                      "1.5FFHB FL",
                      "1.5FLEX FL",
                      "1.5 HB FL",
                      "1.5 HB ACT",
                      "1.5 SD ACT",
                      "1.5 SD FL",
                      "1.5 Flex 1.5-16V"
                    ],
                    "TIGGO 2": [
                      "DESERT",
                      "EXCLUSIVE",
                      "SPORT",
                      "1.5 ACT",
                      "1.5 LOOK",
                      "1.5 LUX",
                      "1.5 SMILE 1.5 - 16V",
                      "1.5 AT ACT",
                      "1.5 AT EX",
                      "1.5 AT LOOK 1.5-16V"
                    ],
                    "Face": [
                      "1.3 Flex 1.3-16V"
                    ],
                    "Celer HB": [
                      "1.5Flex HB 1.5-16V"
                    ],
                    "Celer SD": [
                      "1.5 Flex 1.5-16V"
                    ],
                    "Novo Celer": [
                      "FFHB FL 1.5-16V",
                      "Flex FL 1.5-16V",
                      "HB FL 1.5-16V",
                      "HB ACT 1.5-16V",
                      "SD ACT 1.5-16V",
                      "SD FL 1.5-16V"
                    ]
                  },
                  
                    "CITROEN": {
                      "C3": [
                        "ATTRACTION A",
                        "EXCLUSIVE A",
                        "TENDANCE A",
                        "Urban Tech 1.6 16v",
                        "Origine",
                        "Attraction",
                        "Tendance",
                        "M Style",
                        "Urban Tech 1.2",
                        "Origine 1.2 12v",
                        "ATTRACTION A 1.6 16v",
                        "Origine 1.5-8V",
                        "Tendance 1.5-8V",
                        "Exclusive 1.6-16V",
                        "Origine 1.5-8V",
                        "Attraction 1.5-8V",
                        "Tendance 1.5-8V",
                        "Exclusive 1.5-8V",
                        "Exclusive 1.6-16V",
                        "Tendance 1.6-16V",
                        "Exclusive 1.6-16V"
                      ],
                      "C4 Lounge": [
                        "THP LIVE",
                        "THP FEEL",
                        "THP SHINE 1.6 THP 16v Flex",
                        "THP LIVE 1.6 THP 16v Flex",
                        "Origine 2.0-16V",
                        "Tendance 2.0-16V",
                        "Exclusive 2.0-16V",
                        "Origine THP 1.6-16V",
                        "THP A Origine 1.6-16V",
                        "THP A Tendance 1.6-16V",
                        "THP A Exclusive 1.6-16V",
                        "1.6 THP 16v Flex THP A Origine",
                        "1.6 THP 16v Flex THP A Tendance",
                        "1.6 THP 16v Flex THP A Exclusive",
                        "1.6 THP 16v Flex THP M Origine"
                      ],
                      "Aircross": [
                        "M Feel",
                        "START MT",
                        "M BUSIN",
                        "LIVE MT 1.6 16v",
                        "SHINE AT",
                        "FEEL AT",
                        "LIVE AT 1.6 16v",
                        "SHINE AT",
                        "LIVE MT 1.6 16v",
                        "SHINE AT",
                        "LIVE AT 1.6 16v",
                        "Feel 1.6 16V",
                        "Shine A",
                        "Feel A 1.6 16V",
                        "Shine T 1.6 THP 16v",
                        "GLX 1.6-16V",
                        "Exclusive 1.6-16V",
                        "GLX BVA 1.6-16V",
                        "Exclusive BVA 1.6-16V",
                        "Tendance 1.6-16V",
                        "Exclusive 1.6-16V",
                        "Tendance 1.6-16V",
                        "Exclusive 1.6-16V",
                        "A Shine 1.6-16V",
                        "A Feel 1.6-16V",
                        "A Live 1.6-16V",
                        "Feel 1.6-16V",
                        "Feel 1.6-16V",
                        "Start 1.5-8V",
                        "Live 1.5-8V",
                        "Start 1.5-8V",
                        "Live 1.5-8V",
                        "1.6 16v A Exclusive",
                        "1.6 16v A Tendance",
                        "1.6 16v A Style",
                        "1.6 16v A Exclusive",
                        "1.6 16v A Tendance",
                        "1.6 16v A Style",
                        "1.6 THP 16v Flex THP A Origine",
                        "1.6 THP 16v Flex THP A Tendance",
                        "1.6 THP 16v Flex THP A Exclusive",
                        "1.6 THP 16v Flex THP M Origine",
                        "1.5 M Start",
                        "1.5 M Live",
                        "Feel 1.6-16V",
                        "Start 1.5-8V",
                        "Live 1.5-8V"
                      ],
                      "C4 Cactus": [
                        "Live",
                        "Feel 1.6 16V",
                        "Shine A",
                        "Feel A 1.6 16V",
                        "Shine T 1.6 THP 16V",
                        "1.6-16V",
                        "1.6-16V",
                        "1.6-16V",
                        "1.6-16V",
                        "1.6-16V",
                        "1.6 THP 16V",
                        "1.6 THP 16V",
                        "1.6 THP 16V",
                        "1.6 16v LIVE",
                        "1.6 16v FEEL",
                        "1.6 16v FEEL BUSINESS",
                        "1.6 16v FEEL",
                        "1.6 16v SHINE",
                        "1.6 THP 16V SHINE THP",
                        "1.6 THP 16V SHINE PACK THP",
                        "1.6 16v FEEL AT",
                        "1.6 16v FEEL P",
                        "1.6 16v LIVE A",
                        "1.5-8V",
                        "1.5-8V",
                        "1.6-16V",
                        "1.6 16v LIVE",
                        "1.6 16v FEEL",
                        "1.6 16v FEEL BUSINESS",
                        "1.6 16v FEEL",
                        "1.6 16v SHINE",
                        "1.6 THP 16V SHINE THP",
                        "1.6 THP 16V SHINE PACK THP",
                        "1.6 16v FEEL AT",
                        "1.6 16v FEEL P",
                        "1.6 16v LIVE A"
                      ],
                      "Berlingo": [
                        "Furgão",
                        "Furgão PL 1.6 16v",
                        "Furgão 1.6 16v",
                        "1.6-16V"
                      ],
                      "Aircross (2017)": [
                        "Feel 1.6-16V",
                        "Start 1.5-8V",
                        "Live 1.5-8V"
                      ]
                    },
                    
                    "FORD": {
                            "EcoSport": [
                                "FREESTYLE 4WD 2.0-16V",
                                "SE / FREESTYLE 1.5-12V",
                                "TITANIUM 2.0-16V",
                                "Storm 4WD 2.0-16V",
                                "SE / FreeStyle / 100 Anos 1.5-12V",
                                "SE / FREESTYLE 1.5-12V",
                                "SE / FREESTYLE / 100 Anos 1.5-12V",
                                "SE / FreeStyle / 100 Anos 1.5-12V"
                            ],
                            "Ranger 4x2 C. Dupla": [
                                "XLS / XLT 2.5-16V",
                                "Limited 2.5-16V",
                                "XLS / XLT 2.5-16V",
                                "Limited 2.5-16V",
                                "XLS 2.5-16V",
                                "XLS 2.5-16V",
                                "XLS / XLT 2.5-16V",
                                "Limited 2.5-16V"
                            ],
                            "KA (5 Portas)": [
                                "S / SE 1.0-12V",
                                "SE Plus / SEL / Tecno 1.0-12V",
                                "SE / SE Plus / SEL 1.5-16V",
                                "FREESTYLE 1.5-12V",
                                "S / SE 1.0-12V",
                                "SE Plus / SEL / Tecno 1.0-12V",
                                "SE / SE Plus / SEL 1.5-16V",
                                "FREESTYLE 1.5-12V"
                            ],
                            "New Fiesta Hatch": [
                                "SE / SEL 1.6-16V",
                                "SE / SEL / Titanium 1.6-16V",
                                "SE / SEL 1.6-16V",
                                "SE / SEL / Titanium 1.6-16V",
                                "SE / SEL 1.6-16V",
                                "SE / SEL / Titanium 1.6-16V",
                                "SE / SEL 1.6-16V",
                                "SE / SEL / Titanium 1.6-16V"
                            ],
                            "KA hatch (2019)": [
                                "S / SE / SE Plus 1.0-12V",
                                "SE / SE Plus 1.5-12V",
                                "Titanium 1.5-12V",
                                "S / SE / SE Plus 1.0-12V",
                                "SE / SE Plus 1.5-12V",
                                "Titanium 1.5-12V",
                                "S / SE / SE Plus 1.0-12V",
                                "SE / SE Plus 1.5-12V"
                            ],
                            "KA+ (4 Portas)": [
                                "SE / SEL 1.0-12V",
                                "SE / SEL / Advance 1.5-16V",
                                "SE / SEL 1.0-12V",
                                "SE / SEL / Advance 1.5-16V",
                                "SE / SEL 1.0-12V",
                                "SE / SEL / Advance 1.5-16V",
                                "SE / SEL 1.0-12V",
                                "SE / SEL / Advance 1.5-16V"
                            ],
                            "New Fiesta Sedan": [
                                "SEL / Titanium 1.6-16V",
                                "SEL / Titanium 1.6-16V",
                                "SE / SE Plus 1.0-12V",
                                "SE / SE Plus / SEL 1.5-12V",
                                "SEL / Titanium 1.6-16V",
                                "SEL / Titanium 1.6-16V",
                                "SE / SE Plus 1.0-12V",
                                "SE / SE Plus / SEL 1.5-12V"
                            ],
                            "Focus Hatch": [
                                "SE 1.6-16V",
                                "SE / Titanium 2.0-16V",
                                "SE 1.6-16V",
                                "SE / Titanium 2.0-16V",
                                "SE 1.6-16V",
                                "SE / Titanium 2.0-16V",
                                "SE 1.6-16V",
                                "SE / Titanium 2.0-16V"
                            ],
                            "FUSION": [
                                "Flex SE 2.5-16V",
                                "Flex SE 2.5-16V",
                                "Flex SE 2.5-16V",
                                "Flex SE 2.5-16V",
                                "Flex SE 2.5-16V",
                                "Flex SE 2.5-16V",
                                "Flex SE 2.5-16V",
                                "Flex SE 2.5-16V"
                            ],
                            "KA Trail (5 Portas)": [
                                "Trail 1.0-12V",
                                "Trail 1.5-16V",
                                "Trail 1.0-12V",
                                "Trail 1.5-16V",
                                "Trail 1.0-12V",
                                "Trail 1.5-16V",
                                "Trail 1.0-12V",
                                "Trail 1.5-16V"
                            ],
                            "KA Hatch": [
                                "SE 1.5-12V",
                                "SE 1.5-12V",
                                "SE 1.5-12V",
                                "SE 1.5-12V",
                                "SE 1.5-12V",
                                "SE 1.5-12V",
                                "SE 1.5-12V",
                                "SE 1.5-12V"
                            ],
                            "KA Sedan": [
                                "SE 1.0-12V",
                                "SE / SEL 1.5-12V",
                                "SE 1.0-12V",
                                "SE / SEL 1.5-12V",
                                "SE 1.0-12V",
                                "SE / SEL 1.5-12V",
                                "SE 1.0-12V",
                                "SE / SEL 1.5-12V"
                            ],
                            "EcoSport SE Direct": [
                                "SE Direct 1.5-12V",
                                "SE Direct 1.5-12V",
                                "SE Direct 1.5-12V",
                                "SE Direct 1.5-12V",
                                "SE Direct 1.5-12V",
                                "SE Direct 1.5-12V",
                                "SE Direct 1.5-12V",
                                "SE Direct 1.5-12V"
                            ],
                            "EcoSport Titanium Plus": [
                                "Titanium Plus 1.5-12V",
                                "Titanium Plus 1.5-12V",
                                "Titanium Plus 1.5-12V",
                                "Titanium Plus 1.5-12V",
                                "Titanium Plus 1.5-12V",
                                "Titanium Plus 1.5-12V",
                                "Titanium Plus 1.5-12V",
                                "Titanium Plus 1.5-12V"
                            ],
                            "EcoSport Storm 4WD": [
                                "Storm 4WD 2.0-16V",
                                "Storm 4WD 2.0-16V",
                                "Storm 4WD 2.0-16V",
                                "Storm 4WD 2.0-16V",
                                "Storm 4WD 2.0-16V",
                                "Storm 4WD 2.0-16V",
                                "Storm 4WD 2.0-16V",
                                "Storm 4WD 2.0-16V"
                            ],
                            "Fiesta Hatch": [
                                "SE 1.6-16V",
                                "Titanium 1.6-16V",
                                "S 1.5-16V",
                                "SE 1.5-16V",
                                "SE 1.6-16V",
                                "Titanium 1.6-16V",
                                "S 1.5-16V",
                                "SE 1.5-16V"
                            ],
                            "Focus Hatch": [
                                "GL 1.6-16V",
                                "GLX 1.6-16V",
                                "GLX 2.0-16V",
                                "Titanium 2.0-16V",
                                "GL 1.6-16V",
                                "GLX 1.6-16V",
                                "GLX 2.0-16V",
                                "Titanium 2.0-16V"
                            ],
                            "New Focus Hatch": [
                                "S 1.6-16V",
                                "S 2.0-16V",
                                "SE 2.0-16V",
                                "S 1.6-16V",
                                "S 2.0-16V",
                                "SE 2.0-16V",
                                "S 1.6-16V",
                                "S 2.0-16V"
                            ],
                            "EcoSport Freestyle": [
                                "1.6-16V",
                                "2.0-16V",
                                "4WD 2.0-16V",
                                "1.6-16V",
                                "2.0-16V",
                                "4WD 2.0-16V",
                                "1.6-16V",
                                "2.0-16V"
                            ],
                            "KA (5 Portas) SEL": [
                                "1.0-12V",
                                "1.5-16V",
                                "1.0-12V",
                                "1.5-16V",
                                "1.0-12V",
                                "1.5-16V",
                                "1.0-12V",
                                "1.5-16V"
                            ],
                            "New Fiesta Hatch (2015)": [
                                "S (2015) 1.5-16V",
                                "SE (2015) 1.5-16V",
                                "SE (2015) 1.6-16V",
                                "Titanium (2015) 1.6-16V",
                                "Titanium (2015) 1.6-16V",
                                "Titanium (2015) 1.6-16V",
                                "Titanium (2015) 1.6-16V",
                                "Titanium (2015) 1.6-16V"
                            ],
                            "Focus Hatch (2015)": [
                                "S (2015) 1.6-16V",
                                "SE (2015) 2.0-16V",
                                "Titanium (2015) 2.0-16V",
                                "S (2015) 1.6-16V",
                                "SE (2015) 2.0-16V",
                                "Titanium (2015) 2.0-16V",
                                "S (2015) 1.6-16V",
                                "SE (2015) 2.0-16V"
                            ],
                            "Fusion": [
                                "SEL 2.5-16V",
                                "SEL 2.5-16V",
                                "SEL 2.5-16V",
                                "SEL 2.5-16V",
                                "SEL 2.5-16V",
                                "SEL 2.5-16V",
                                "SEL 2.5-16V",
                                "SEL 2.5-16V"
                            ],
                            "EcoSport Freestyle (2015)": [
                                "1.6-16V",
                                "1.6-16V",
                                "2.0-16V",
                                "2.0-16V",
                                "1.6-16V",
                                "1.6-16V",
                                "2.0-16V",
                                "2.0-16V"
                            ],
                            "EcoSport Freestyle 4WD (2015)": [
                                "4WD 2.0-16V",
                                "4WD 2.0-16V",
                                "4WD 2.0-16V",
                                "4WD 2.0-16V",
                                "4WD 2.0-16V",
                                "4WD 2.0-16V",
                                "4WD 2.0-16V",
                                "4WD 2.0-16V"
                            ],
                            "Focus Hatch (2016)": [
                                "S (2016) 1.6-16V",
                                "SE (2016) 1.6-16V",
                                "SE (2016) 2.0-16V",
                                "Titanium (2016) 2.0-16V",
                                "S (2016) 1.6-16V",
                                "SE (2016) 1.6-16V",
                                "SE (2016) 2.0-16V",
                                "Titanium (2016) 2.0-16V"
                            ],
                            "Fusion (2017)": [
                                "Flex SE 2.5-16V",
                                "Flex SE 2.5-16V",
                                "Flex SE 2.5-16V",
                                "Flex SE 2.5-16V",
                                "Flex SE 2.5-16V",
                                "Flex SE 2.5-16V",
                                "Flex SE 2.5-16V",
                                "Flex SE 2.5-16V"
                            ],
                            "New Fiesta Hatch (2017)": [
                                "SEL 1.6-16V",
                                "SEL 1.6-16V",
                                "SEL 1.6-16V",
                                "SEL 1.6-16V",
                                "SEL 1.6-16V",
                                "SEL 1.6-16V",
                                "SEL 1.6-16V",
                                "SEL 1.6-16V"
                            ],
                            "KA Trail Hatch (2019)": [
                                "S / SE / SE Plus 1.0-12V",
                                "SE / SE Plus 1.5-12V",
                                "Titanium 1.5-12V",
                                "S / SE / SE Plus 1.0-12V",
                                "SE / SE Plus 1.5-12V",
                                "Titanium 1.5-12V",
                                "S / SE / SE Plus 1.0-12V",
                                "SE / SE Plus 1.5-12V"
                            ],
                            "New Fiesta Sedan (2017)": [
                                "SEL / Titanium 1.6-16V",
                                "SEL / Titanium 1.6-16V",
                                "SE / SE Plus 1.0-12V",
                                "SE / SE Plus / SEL 1.5-12V",
                                "SEL / Titanium 1.6-16V",
                                "SEL / Titanium 1.6-16V",
                                "SE / SE Plus 1.0-12V",
                                "SE / SE Plus / SEL 1.5-12V"
                            ],
                            "KA+ (4 Portas)": [
                                "SE / SEL 1.0-12V",
                                "SE / SEL / Advance 1.5-16V",
                                "SE / SEL 1.0-12V",
                                "SE / SEL / Advance 1.5-16V",
                                "SE / SEL 1.0-12V",
                                "SE / SEL / Advance 1.5-16V",
                                "SE / SEL 1.0-12V",
                                "SE / SEL / Advance 1.5-16V"
                            ],
                            "New Fiesta Sedan (2019)": [
                                "SE / SE Plus 1.0-12V",
                                "SE / SE Plus / SEL 1.5-12V",
                                "SE / SE Plus 1.0-12V",
                                "SE / SE Plus / SEL 1.5-12V",
                                "SE / SE Plus 1.0-12V",
                                "SE / SE Plus / SEL 1.5-12V",
                                "SE / SE Plus 1.0-12V",
                                "SE / SE Plus / SEL 1.5-12V"
                            ],
                            "Focus Hatch": [
                                "SE 1.6-16V",
                                "SE / Titanium 2.0-16V",
                                "SE 1.6-16V",
                                "SE / Titanium 2.0-16V",
                                "SE 1.6-16V",
                                "SE / Titanium 2.0-16V",
                                "SE 1.6-16V",
                                "SE / Titanium 2.0-16V"
                            ],
                            "FUSION": [
                                "2.5-16V Flex SE",
                                "2.5-16V Flex SE",
                                "2.5-16V Flex SE",
                                "2.5-16V Flex SE",
                                "2.5-16V Flex SE",
                                "2.5-16V Flex SE",
                                "2.5-16V Flex SE",
                                "2.5-16V Flex SE"
                            ],
                            "EcoSport": [
                                "SE / FREESTYLE 1.5-12V",
                                "TITANIUM 2.0-16V",
                                "Storm 4WD 2.0-16V",
                                "SE / FreeStyle / 100 Anos 1.5-12V",
                                "SE / FREESTYLE 1.5-12V",
                                "SE / FREESTYLE / 100 Anos 1.5-12V",
                                "SE / FreeStyle / 100 Anos 1.5-12V",
                                "SE / FreeStyle / 100 Anos 1.5-12V"
                            ]
                        },                    

                            "FIAT": {
                                "Dobló": [
                                    "Essence 7L 1.8-16V",
                                    "Essence 1.8-16V"
                                ],
                                "TORO": [
                                    "FREEDOM / OPEN EDTION 1.8-16V",
                                    "FREEDOM 2.4 -16V",
                                    "FREEDOM / OPEN EDTION 1.8-16V"
                                ],
                                "Strada": [
                                    "Working 1.4-8V",
                                    "Working Plus 1.4-8V",
                                    "Hard Working 1.4-8V",
                                    "Adventure 1.8-16V",
                                    "Adventure Dualogic 1.8-16V"
                                ],
                                "Fiorino": [
                                    "1,4 1.4-8V",
                                    "Hard Working 1.4-8V"
                                ],
                                "500": [
                                    "Cult 1.4-8V"
                                ],
                                "Mobi": [
                                    "DRIVE 1.0-6V",
                                    "DRIVE GSR 1.0-6V",
                                    "EASY 1.0-8V",
                                    "LIKE 1.0-8V",
                                    "WAY 1.0-8V"
                                ],
                                "Novo Uno": [
                                    "Drive 1.0-6V",
                                    "Sporting 1.3-8V",
                                    "Sporting GSR 1.3-8V",
                                    "WAY 1.0-6V",
                                    "ATTRACTIVE 1.0-8V"
                                ],
                                "ARGO": [
                                    "Drive 1.0-6V",
                                    "Drive 1.3-8V",
                                    "Drive GSR 1.3-8V",
                                    "HGT 1.8-16V",
                                    "HGT 1.8-16V",
                                    "Precision 1.8-16V",
                                    "Precision 1.8-16V",
                                    "1.0 1.0-6V",
                                    "Drive 1.0-6V",
                                    "Drive 1.3-8V"
                                ],
                                "Novo Palio": [
                                    "Attractive 1.0-8V"
                                ],
                                "ARGO (2019)": [
                                    "1.0 1.0-6V",
                                    "Drive 1.0-6V",
                                    "Drive 1.3-8V"
                                ],
                                "Cronos": [
                                    "DRIVE 1.3 – 8V",
                                    "DRIVE GSR 1.3 – 8V",
                                    "Precision 1.8 - 16V",
                                    "Precision 1.8 - 16V"
                                ],
                                "Grand Siena": [
                                    "1.6 / Essence Dualogic 1.6-16V",
                                    "Attractive 1.0-8V",
                                    "Attractive 1.4-8V",
                                    "1.6 / Essence 1.6-16V"
                                ],
                                "Weekend": [
                                    "Attractive 1.4-8V",
                                    "Adventure 1.8-16V",
                                    "Adventure Dualogic 1.8-16V"
                                ],
                                "CRONOS": [
                                    "DRIVE 1.8 - 16V",
                                    "DRIVE 1.3 – 8V",
                                    "DRIVE GSR 1.3 – 8V"
                                ],
                                "Dobló": [
                                    "Adventure 1.8-16V",
                                    "Essence 7L 1.8-16V"
                                ],
                                "Novo Uno": [
                                    "WAY 1.3-8V",
                                    "WAY GSR 1.3-8V",
                                    "DRIVE 1.0-6V",
                                    "ATTRACTIVE 1.0-8V"
                                ],
                                "Fiorino": [
                                    "1,4 1.4-8V",
                                    "Hard Working 1.4-8V"
                                ],
                                "Strada": [
                                    "Adventure CE / Adventure CD 1.8-16V",
                                    "Hard Working CS / Hard Working CE / Hard Working CD 1.4-8V",
                                    "Working CS 1.4-8V",
                                    "Working Plus CS 1.4-8V",
                                    "FREEDOM 1.4-8V"
                                ],
                                "TORO": [
                                    "BLACKJACK 2.4 -16V",
                                    "FREEDOM 1.8-16V",
                                    "FREEDOM 2.4 -16V",
                                    "ENDURANCE 1.8-16V",
                                    "VOLCANO / BLACKJACK 2.4-16V"
                                ],
                                "500": [
                                    "CULT 1.4-8V"
                                ],
                                "MOBI": [
                                    "DRIVE 1.0-6V",
                                    "DRIVE GSR 1.0-6V",
                                    "EASY 1.0-8V",
                                    "LIKE 1.0-8V",
                                    "WAY 1.0-8V",
                                    "EASY 1.0-8V"
                                ],
                                "NOVO UNO": [
                                    "DRIVE 1.0-6V",
                                    "ATTRACTIVE 1.0-8V"
                                ],
                                "ARGO": [
                                    "DRIVE ( com Stop & Start) 1.0-6V",
                                    "DRIVE ( com Stop & Start) 1.3-8V",
                                    "DRIVE GSR 1.3-8V",
                                    "HGT 1.8-16V",
                                    "PRECISION 1.8-16V",
                                    "1.0 1.0-6V",
                                    "DRIVE 1.0-6V",
                                    "DRIVE 1.3-8V"
                                ],
                                "CRONOS": [
                                    "PRECISION 1.8 - 16V",
                                    "DRIVE 1.8 - 16V",
                                    "ESSENCE 1.8-16V",
                                    "1.3-8V",
                                    "Drive 1.3-8V",
                                    "Drive (Stop & Start) 1.3-8V",
                                    "Drive 1.8-16V",
                                    "Drive (Stop & Start) 1.8-16V",
                                    "Precision 1.8-16V",
                                    "HGT 1.8-16V",
                                    "HGT (Stop & Start) 1.8-16V"
                                ],
                                "DOBLÓ": [
                                    "ESSENCE 1.8-16V",
                                    "ADVENTURE 1.8-16V",
                                    "ESSENCE 7L 1.8-16V"
                                ],
                                "Dobló (2017)": [
                                    "Essence 7L 1.8-16V" ,
                                ],
                                "GRAND SIENA": [
                                    "ATTRACTIVE 1.0-8V",
                                    "ATTRACTIVE 1.4-8V"
                                ],
                                "WEEKEND": [
                                    "ADVENTURE 1.4-8V",
                                    "Attractive 1.4-8V",
                                    "Adventure 1.8-16V"
                                ],
                                
                                "FIORINO": [
                                    "1.4-8V",
                                    "Hard Working 1.4-8V"
                                ],
                                "Fiorino (2017)":[
                                    "1.4-8V",
                                    "Hard Working 1.4-8V"
                                ],	

                                "STRADA": [
                                    "Working CC 1.4-8V",
                                    "Freedom CC 1.4-8V",
                                    "Freedom CD 1.4-8V",
                                    "Hard Working CE 1.4-8V",
                                    "Hard Working CC 1.4-8V",
                                    "Hard Working CD 1.4-8V",
                                    "Adventure 1.8-16V"
                                ],
                                "TORO": [
                                    "ENDURANCE / FREEDOM 1.8-16V",
                                    "Volcano 2.4-16V"
                                ],
                                "Mobi": [
                                    "Drive 1.0-6V",
                                    "Drive GSR 1.0-8V",
                                    "Easy 1.0-8V",
                                    "Like 1.0-8V",
                                    "Way 1.0-8V",
                                    "Easy 1.0-8V"
                                ],
                                "Mobi (2017)": [
                                    "Easy 1.0-8V",
                                    "Easy On 1.0-8V",
                                    "Like 1.0-8V",
                                    "Like On 1.0-8V",
                                    "Way 1.0-8V",
                                    "Way On 1.0-8V"
                                  ],
                                "NOVO UNO": [
                                    "Drive 1.0-6V",
                                    "Attractive 1.0-8V",
                                    "Way 1.0-6V"
                                ],
                                "Novo Uno (2017)": [
                                    "Attractive 1.0-6V",
                                    "Sporting Dualogic 1.3-8V",
                                    "Sporting 1.3-8V",
                                    "Way 1.0-6V"
                                ],
                                "Novo Fiorino":[
                                    "Fire Evo 1.4-8V",
                                ],
                                "ARGO": [
                                    "Trekking 1.3-8V",
                                    "Trekking 1.8-16V",
                                    "Drive 1.0-6V",
                                    "Drive 1.3-8V"
                                ],
                                "CRONOS": [
                                    "1.3-8V 1.3",
                                    "1.3-8V DRIVE",
                                    "1.8-16V 1.8",
                                    "1.8-16V DRIVE",
                                    "1.8-16V HGT",
                                    "1.8-16V PRECISION"
                                ],
                                "DOBLO": [
                                    "1.8-16V ESSENCE 5L E",
                                    "1.8-16V ESSENCE 7L E",
                                    "1.8-16V CARGO"
                                ],
                                "SIENA": [
                                    "1.0-8V 1.0",
                                    "1.4-8V 1.4"
                                ],
                                "ARGO": [
                                    "1.3-8V TREKKING",
                                    "1.8-16V TREKKING",
                                    "1.8-16V TREKKING AUTOMÁTICO"
                                ],
                                "UNO": [
                                    "1.3-8V WAY E"
                                ],
                                "PULSE": [
                                    "1.3-8V MT",
                                    "1.3-8V DRIVE AT",
                                    "1.0 12V TURBO DRIVE TF200",
                                    "1.0 12V TURBO AUDACE TF200",
                                    "1.0 12V TURBO IMPETUS TF200"
                                ],
                                "FIORINO": [
                                    "1.4-8V ENDURANCE",
                                    "1.4-8V WORKING",
                                    "1.4 - 8V ENDURANCE MY22",
                                    "1.4 - 8V WORKING MY22"
                                ],
                                "STRADA": [
                                    "1.3-8V FREEDOM CD (MY 21)",
                                    "1.3-8V FREEDOM CD (MY 22)",
                                    "1.3-8V FREEDOM CS",
                                    "1.3-8V VOLCANO CD",
                                    "1.4-8V ENDURANCE CD",
                                    "1.4-8V ENDURANCE CS (MY 22)",
                                    "1.4-8V ENDURANCE CS (MY 21)",
                                    "1.4-8V WORKING CS",
                                    "1.4 - 8V RANCH AT",
                                    "1.4 - 8V VOLCANO AT"
                                ],
                                "TORO": [
                                    "1.3 16V T ENDURANCE TURBO",
                                    "1.3 16V T FREEDOM TURBO"
                                ],
                                "TORO": [
                                    "1.3 16V T FREEDOM TURBO",
                                    "1.3 16V T VOLCANO TURBO",
                                    "1.3 16V T VOLCANO TURBO",
                                    "1.8-16V ENDURANCE",
                                    "1.8-16V ENDURANCE AT6",
                                    "1.8-16V FREEDOM",
                                    "2.4-16V VOLCANO"
                                ],
                                "Uno": [
                                    "Mille Fire Economy 2 Portas 1.0-8V",
                                    "Mille Fire Economy 4 Portas 1.0-8V",
                                    "Mille Way Economy 2 Portas 1.0-8V",
                                    "Mille Way Economy 4 Portas 1.0-8V",
                                    "Vivace (2015) 2 Portas 1.0-8V",
                                    "Vivace (2015) 4 Portas 1.0-8V"
                                ],
                                "Siena": [
                                    "EL 1.0-8V",
                                    "EL 1.4-8V"
                                ],
                                "Novo Palio": [
                                    "Attractive 1.0-8V",
                                    "Attractive 1.4-8V"
                                ],
                                "Punto": [
                                    "Attractive Evo 1.4-8V",
                                    "Essence 1.6-16V",
                                    "Essence Dualogic 1.6-16V"
                                ],
                                "Novo Idea": [
                                    "Adventure 1.8-16V",
                                    "Adventure Dualogic 1.8-16V"
                                ],
                                "Palio": [
                                    "Adventure 1.8-16V",
                                    "Adventure Dualogic 1.8-16V"
                                ],
                                "Palio Weekend": [
                                    "Attractive 1.4-8V",
                                    "Trekking 1.6-8V",
                                    "Adventure 1.8-16V",
                                    "Adventure Dualogic 1.8-16V"
                                  ],
                                  "Pulse": [
                                    "1.3-8V MT",
                                    "1.3-8V DRIVE AT",
                                    "1.0 12V TURBO DRIVE TF200",
                                    "1.0 12V TURBO AUDACE TF200",
                                    "1.0 12V TURBO IMPETUS TF200"
                                  ],
                                "Strada": [
                                    "Adventure 1.8-16V",
                                    "Adventure Cabine Dupla 1.8-16V",
                                    "Adventure Cabine Estendida 1.8-16V",
                                    "Adventure Cabine Dupla Dualogic 1.8-16V",
                                    "Working Cabine Curta 1.4-8V",
                                    "Working Cabine Estendida 1.4-8V",
                                    "Working Cabine Dupla 1.4-8V",
                                    "Trekking Cabine Curta 1.6-16V",
                                    "Trekking Cabine Estendida 1.6-16V",
                                    "Trekking Cabine Dupla 1.6-16V",
                                    "Working Cabine Dupla 3 Portas 1.4-8V",
                                    "Trekking Cabine Dupla 3 Portas 1.6-16V"
                                ],
                                "Doblo": [
                                    "Adventure 1.8-16V",
                                    "Essence 1.8-16V",
                                    "Cargo 1.4-8V",
                                    "Cargo 1.8-16V"
                                ],
                                "Fiorino": [
                                    "Furgão 1.3-8V"
                                ],
                                "500": [
                                    "Cult 1.4-8V",
                                    "Cult Dualogic 1.4-8V",
                                    "Sport Air 1.4-16V",
                                    "Cult Cabrio 1.4-8V",
                                    "Cult Cabrio Dualogic 1.4-8V",
                                    "Cabrio Automático 1.4-16V"
                                ],
                                "Idea": [
                                    "Essence 1.6-16V",
                                    "Essence 1.6-16V"
                                ],
                                "Novo Palio": [
                                    "Attractive 1.4-8V",
                                    "Attractive 1.0-8V",
                                    "Essence 1.6-16V"
                                ],
                                "Punto": [
                                    "Attractive Evo 1.4-8V",
                                    "Essence 1.6-16V",
                                    "Essence Dualogic 1.6-16V",
                                    "Sporting 1.8-16V",
                                    "Blackmotion 1.8-16V",
                                    "Blackmotion Dualogic 1.8-16V",
                                    "1.4-8V Attractive"
                                ],
                                "Siena": [
                                    "EL 1.0-8V",
                                    "EL 1.4-8V"
                                ],
                                "Bravo": [
                                    "Essence 1.8-16V",
                                    "Absolute 1.8-16V",
                                    "Sporting 1.8-16V",
                                    "Sporting Dualogic 1.8-16V",
                                    "1.8-16V Essence",
                                    "1.8-16V Absolute",
                                    "1.8-16V Sporting"
                                ],
                                "Grand Siena": [
                                    "Attractive 1.4-8V",
                                    "Essence Dualogic 1.6-16V",
                                    "Tetra Fuel 1.4-8V",
                                    "Essence 1.6-16V",
                                    "1.4-8V Attractive",
                                    "1.0-8V Attractive"
                                ],
                                "Weekend": [
                                    "Attractive 1.4-8V",
                                    "Adventure 1.8-16V",
                                    "Adventure Dualogic 1.8-16V",
                                    "Trekking 1.6-16V",
                                    "1.8-16V Adventure",
                                    "1.8-16V Adventure Dualogic",
                                    "1.8-16V Adventure",
                                    "1.8-16V Adventure Dualogic"
                                ],
                                "Linea": [
                                    "Essence 1.8-16V",
                                    "Absolute Dualogic 1.8-16V",
                                    "1.8-16V Essence",
                                    "1.8-16V Absolute"
                                ],
                                "Dobló": [
                                    "Adventure 1.8-16V",
                                    "Attractive 1.4-8V",
                                    "Essence 1.8-16V",
                                    "Cargo 1.8-16V",
                                    "Cargo 1.4-8V",
                                    "1.8-16V Adventure"
                                ],
                                "500": [
                                    "Cult 1.4-8V",
                                    "Cult Cabrio 1.4-8V",
                                    "Cult Cabrio Dualogic 1.4-8V",
                                    "Cult Dualogic 1.4-8V",
                                    "1.4-8V Cult",
                                    "1.4-8V Cult Cabrio",
                                    "1.4-8V Cult Cabrio Dualogic",
                                    "1.4-8V Cult Dualogic"
                                ],
                                "Mobi": [
                                    "Way 1.0-8V",
                                    "Way On 1.0-8V",
                                    "Easy 1.0-8V",
                                    "Easy On 1.0-8V",
                                    "Like 1.0-8V",
                                    "Like On 1.0-8V",
                                    "Mobi 1.0 8V"
                                ],
                                "Uno": [
                                    "Attractive (2015) 1.0-8V",
                                    "Evolution S&S (2015) 1.4-8V",
                                    "Vivace 2 Portas 1.0-8V",
                                    "Vivace 4 Portas 1.0-8V",
                                    "Way (2015) 1.0-8V",
                                    "1.0-6V Attractive",
                                    "Sporting Dualogic 1.3-8V",
                                    "Sporting 1.3-8V",
                                    "Way 1.0-6V"
                                ],
                                "Palio": [
                                    "Fire Evo 1.0-8V",
                                    "Fire Way 1.0-8V",
                                    "1.0-8V Fire Evo",
                                    "1.0-8V Fire Way"
                                ],
                                "TORO (2019)":[
                                    "VOLCANO / BLACKJACK 2.4-16V",
                                ]	,
                                "Weekend (2017)":[
                                    "Adventure 1.8-16V", 
                                    "Adventure Dualogic 1.8-16V" ],
                                },
                                
                            "HONDA": {
                                "Fit": [
                                "DX / LX 1.5-16V",
                                "DX / LX / EX / EXL / PERSONAL 1.5-16V"
                                ],
                                "City": [
                                "DX 1.5-16V",
                                "DX / LX / EX / EXL / PERSONAL 1.5-16V",
                                "DX 1.5-16V",
                                "DX 1.5-16V",
                                "LX 1.5-16V",
                                "EX 1.5-16V",
                                "EXL 1.5-16V",
                                "Personal 1.5-16V",
                                "1.5-16V DX",
                                "1.5-16V LX",
                                "1.5-16V EX",
                                "1.5-16V EXL",
                                "1.5-16V PERSONAL",
                                "1.5-16V EX",
                                "1.5-16V EXL",
                                "1.5-16V TOURING",
                                "DX 1.5-16V",
                                "Sport 1.5-16V",
                                "LX 1.5-16V",
                                "EX 1.5-16V",
                                "DX 1.5-16V",
                                "LX 1.5-16V",
                                "EX 1.5-16V",
                                "EXL 1.5-16V",
                                "LXS 1.8-16V",
                                "LXS 1.8-16V",
                                "LXR 2.0-16V",
                                "EXR 2.0-16V",
                                "DX 1.5-16V",
                                "LX 1.5-16V",
                                "DX 1.5-16V",
                                "LX 1.5-16V",
                                "EX 1.5-16V",
                                "EXL 1.5-16V",
                                "DX 1.5-16V",
                                "LX 1.5-16V",
                                "EX 1.5-16V",
                                "EXL 1.5-16V",
                                "LXS 1.8-16V",
                                "LXS 1.8-16V",
                                "LXR 2.0-16V",
                                "EXR 2.0-16V",
                                "LXS 1.8-16V",
                                "LXS 1.8-16V",
                                "LXR 2.0-16V",
                                "EXR 2.0-16V",
                                "DX 1.5-16V",
                                "LX 1.5-16V",
                                "DX 1.5-16V",
                                "LX 1.5-16V",
                                "EX 1.5-16V",
                                "EXL 1.5-16V",
                                "DX 1.5-16V",
                                "LX 1.5-16V",
                                "DX 1.5-16V",
                                "LX 1.5-16V",
                                "EX 1.5-16V",
                                "EXL 1.5-16V",
                                "DX 1.5-16V",
                                "LX 1.5-16V",
                                "EX 1.5-16V",
                                "EXL 1.5-16V",
                                "LXR 2.0-16V",
                                "EXR 2.0-16V",
                                "LXS 1.8-16V",
                                "LXS 1.8-16V",
                                "EX 2.0-16V",
                                "EX-L 2.0-16V",
                                "Sport 2.0-16V",
                                "Sport 2.0-16V",
                                "EXL Flex 4WD 2.0-16V",
                                "EX 1.8-16V",
                                "LX 1.8-16V",
                                "LX 1.8-16V",
                                "EX 1.8-16V",
                                "EXL 1.8-16V",
                                "1.5-16V DX",
                                "1.5-16V LX / EX / EXL",
                                "2.0-16V EX / EX-L / SPORT",
                                "2.0-16V EXL FLEX4WD",
                                "1.8-16V LX",
                                "1.8-16V LX / EX / EXL",
                                "1.8-16V EX"
                                ]
                            },
                            "HONDA": {
                                "Fit": [
                                  "DX / LX 1.5-16V",
                                  "DX / LX / EX / EXL / PERSONAL 1.5-16V",
                                  "DX 1.5-16V",
                                  "DX / LX / EX / EXL / PERSONAL 1.5-16V",
                                  "DX / LX 1.5-16V",
                                  "DX / LX / EX / EXL / PERSONAL 1.5-16V",
                                  "DX 1.5-16V",
                                  "DX / LX / EX / EXL / PERSONAL 1.5-16V",
                                  "Sport 1.5-16V",
                                  "EX / EX-L / SPORT 2.0-16V",
                                  "LX 1.8-16V",
                                  "LX / EX / EXL/TOURING 1.8-16V",
                                  "EX 1.8-16V",
                                  "EX / EXL 1.5-16V"
                                ],
                                "City": [
                                  "DX 1.5-16V",
                                  "DX / LX / EX / EXL / PERSONAL 1.5-16V",
                                  "DX 1.5-16V",
                                  "DX / LX / EX / EXL / PERSONAL 1.5-16V",
                                  "DX 1.5-16V",
                                  "DX / LX / EX / EXL / PERSONAL 1.5-16V",
                                  "DX 1.5-16V",
                                  "DX / LX / EX / EXL / PERSONAL 1.5-16V",
                                  "Sport 1.5-16V",
                                  "EX / EX-L / SPORT 2.0-16V",
                                  "LX 1.8-16V",
                                  "LX / EX / EXL/TOURING 1.8-16V",
                                  "EX 1.8-16V",
                                  "EX / EXL 1.5-16V"
                                ],
                                
                            },
                                
                          
            "JEEP": {
            "Compass": [
                "Sport 2.0-16V",
                "Longitude 2.0-16V",
                "Limited 2.0-16V",
                "1.3 16V T LIMITED T4",
                "1.3 16V T SERIE S T4",
                "1.3 16V T SPORT TF",
                "2.0-16V LIMITED",
                "2.0-16V LIMITED S",
                "2.0-16V LONGITUDE",
                "2.0-16V NIGHT EAGLE",
                "2.0-16V SPORT"
            ],
            "Renegade": [
                "Custom 1.8-16V",
                "Sport 1.8-16V",
                "Longitude 1.8-16V",
                "Limited 1.8-16V",
                "Night Eagle 1.8-16V",
                "1.8 1.8-16V",
                "1.8-16V 1.8 AUTOMÁTICO",
                "1.8-16V LIMITED",
                "1.8-16V LONGITUDE",
                "1.8-16V SPORT",
                "1.3 16V T LIMITED TF",
                "1.3 16V T LONGITUDE TF",
                "1.3 16V T SPORT TF",
                "1.3 16V T TRAILHAWK TF",
                "1.8-16V 1.8 / Sport",
                "1.8-16V Sport / Longitude / Limited",
                "Sport 1.8-16V",
                "Longitude 1.8-16V",
                "Limited 1.8-16V",
                "1.8 1.8-16V",
                "Sport 1.8-16V"
            ],
            "COMMANDER": [
                "1.3 16V T OVERLAND T270",
                "1.3 16V T LIMITED T270"
            ],
            "Renegade (2017)": [
                "Sport 1.8-16V",
                "Longitude 1.8-16V",
                "Limited 1.8-16V",
                "1,8 1.8-16V",
                "Sport 1.8-16V"
            ]
            },
        
  };
  
  function atualizarModelos() {
    var marcaSelecionada = marcasSelect.value;
    var modeloSelecionado = modelosSelect.value;
    versoesSelect.innerHTML = "";
    
    if (modelosPorMarca[marcaSelecionada] && modelosPorMarca[marcaSelecionada][modeloSelecionado]) {
      modelosPorMarca[marcaSelecionada][modeloSelecionado].forEach(function(versao) {
        var option = document.createElement("option");
        option.value = versao;
        option.textContent = versao;
        versoesSelect.appendChild(option);
      });
    }
  }
  
  marcasSelect.addEventListener("change", atualizarModelos);
  modelosSelect.addEventListener("change", atualizarModelos);
  
  atualizarModelos();
});

// Limpar o localStorage
//localStorage.clear();
