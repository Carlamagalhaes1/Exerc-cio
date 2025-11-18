const addItemBtn = document.getElementById("addItemBtn");
const itemsContainer = document.getElementById("itemsContainer");
const generateBtn = document.getElementById("generateBtn");
const printBtn = document.getElementById("printBtn");
const clearBtn = document.getElementById("clearBtn");

const invoiceContainer = document.getElementById("invoice");


// Adicionar itens
addItemBtn.addEventListener("click", () => {
    const row = document.createElement("div");
    row.classList.add("item-row");

    row.innerHTML = `
        <input type="text" class="item-name" placeholder="Descrição do item">
        <input type="number" class="item-value" placeholder="Valor" step="0.01" min="0">
        <button class="item-delete">X</button>
    `;

    row.querySelector(".item-delete").addEventListener("click", () => {
        row.remove();
    });

    itemsContainer.appendChild(row);
});


generateBtn.addEventListener("click", generateInvoice);


// Função principal
function generateInvoice() {

    // PEGAR DADOS
    const providerName = document.getElementById("providerName").value.trim();
    const providerId = document.getElementById("providerId").value.trim();
    const clientName = document.getElementById("clientName").value.trim();
    const issueDate = document.getElementById("issueDate").value;

    // Verificação dos campos principais
    if (!providerName || !providerId || !clientName || !issueDate) {
        alert("Por favor, preencha todos os dados do prestador, cliente e data.");
        return;
    }

    // IMPOSTOS
    const irpf = checkNumber(document.getElementById("irpf").value, "IRPF");
    const pis = checkNumber(document.getElementById("pis").value, "PIS");
    const cofins = checkNumber(document.getElementById("cofins").value, "COFINS");
    const inss = checkNumber(document.getElementById("inss").value, "INSS");
    const iss = checkNumber(document.getElementById("iss").value, "ISSQN");

    // Se alguma verificação falhou, parar
    if (irpf === false || pis === false || cofins === false || inss === false || iss === false) {
        return;
    }

    // ITENS
    const itemNames = [...document.querySelectorAll(".item-name")];
    const itemValues = [...document.querySelectorAll(".item-value")];

    if (itemNames.length === 0) {
        alert("Adicione pelo menos 1 item na Nota Fiscal.");
        return;
    }

    let totalServicos = 0;
    let listaItensHTML = "";
    let validItems = true;

    itemValues.forEach((val, i) => {
        const nome = itemNames[i].value.trim();
        const valor = parseFloat(val.value);

        if (!nome || isNaN(valor) || valor <= 0) {
            validItems = false;
        } else {
            listaItensHTML += `<li>${nome} — R$ ${valor.toFixed(2)}</li>`;
            totalServicos += valor;
        }
    });

    if (!validItems) {
        alert("Todos os itens devem ter nome e valor numérico maior que zero.");
        return;
    }

    // CALCULOS
    const calcIRPF = (totalServicos * irpf) / 100;
    const calcPIS = (totalServicos * pis) / 100;
    const calcCOFINS = (totalServicos * cofins) / 100;
    const calcINSS = (totalServicos * inss) / 100;
    const calcISS = (totalServicos * iss) / 100;

    const totalImpostos = calcIRPF + calcPIS + calcCOFINS + calcINSS + calcISS;
    const totalLiquido = totalServicos - totalImpostos;


    // EXIBIR NOTA
    invoiceContainer.innerHTML = `
        <div class="invoice">
            <h2>Nota Fiscal de Serviço (NFS-e)</h2>

            <p><strong>Prestador:</strong> ${providerName}</p>
            <p><strong>CNPJ/CPF:</strong> ${providerId}</p>
            <p><strong>Cliente:</strong> ${clientName}</p>
            <p><strong>Data:</strong> ${issueDate}</p>

            <h3>Itens</h3>
            <ul>${listaItensHTML}</ul>

            <h3>Totais</h3>
            <p><strong>Total dos Serviços:</strong> R$ ${totalServicos.toFixed(2)}</p>
            <p><strong>IRPF:</strong> R$ ${calcIRPF.toFixed(2)}</p>
            <p><strong>PIS:</strong> R$ ${calcPIS.toFixed(2)}</p>
            <p><strong>COFINS:</strong> R$ ${calcCOFINS.toFixed(2)}</p>
            <p><strong>INSS:</strong> R$ ${calcINSS.toFixed(2)}</p>
            <p><strong>ISSQN:</strong> R$ ${calcISS.toFixed(2)}</p>

            <p><strong>Total de Impostos:</strong> R$ ${totalImpostos.toFixed(2)}</p>
            <p><strong>Total Líquido:</strong> R$ ${totalLiquido.toFixed(2)}</p>
        </div>
    `;
}



// Função para validar números
function checkNumber(value, fieldName) {
    if (value.trim() === "") {
        alert(`O campo ${fieldName} não pode ficar vazio.`);
        return false;
    }

    const num = parseFloat(value);

    if (isNaN(num) || num < 0) {
        alert(`O campo ${fieldName} deve ser um número válido.`);
        return false;
    }

    return num;
}



// BOTOES
printBtn.addEventListener("click", () => {
    window.print();
});

clearBtn.addEventListener("click", () => {
    invoiceContainer.innerHTML = "";
    itemsContainer.innerHTML = "";
});
