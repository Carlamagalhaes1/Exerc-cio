
const addItemBtn = document.getElementById("addItemBtn");
const itemsContainer = document.getElementById("itemsContainer");
const generateBtn = document.getElementById("generateBtn");
const printBtn = document.getElementById("printBtn");
const clearBtn = document.getElementById("clearBtn");

const invoiceContainer = document.getElementById("invoice");



addItemBtn.addEventListener("click", () => {
    const row = document.createElement("div");
    row.classList.add("item-row");

    row.innerHTML = `
        <input type="text" class="item-name" placeholder="Descrição do item">
        <input type="number" class="item-value" placeholder="Valor" step="0.01">
        <button class="item-delete">X</button>
    `;

    row.querySelector(".item-delete").addEventListener("click", () => {
        row.remove();
    });

    itemsContainer.appendChild(row);
});




generateBtn.addEventListener("click", generateInvoice);

function generateInvoice() {



    const providerName = document.getElementById("providerName").value;
    const providerId = document.getElementById("providerId").value;
    const clientName = document.getElementById("clientName").value;
    const issueDate = document.getElementById("issueDate").value;

    

    const irpf = parseFloat(document.getElementById("irpf").value) || 0;
    const pis = parseFloat(document.getElementById("pis").value) || 0;
    const cofins = parseFloat(document.getElementById("cofins").value) || 0;
    const inss = parseFloat(document.getElementById("inss").value) || 0;
    const iss = parseFloat(document.getElementById("iss").value) || 0;

    const itemNames = [...document.querySelectorAll(".item-name")];
    const itemValues = [...document.querySelectorAll(".item-value")];

    let totalServicos = 0;
    let listaItensHTML = "";

    itemValues.forEach((val, i) => {
        const nome = itemNames[i].value;
        const valor = parseFloat(val.value) || 0;

        if (nome.trim() !== "" && valor > 0) {
            listaItensHTML += `<li>${nome} — R$ ${valor.toFixed(2)}</li>`;
            totalServicos += valor;
        }
    });


    const calcIRPF = (totalServicos * irpf) / 100;
    const calcPIS = (totalServicos * pis) / 100;
    const calcCOFINS = (totalServicos * cofins) / 100;
    const calcINSS = (totalServicos * inss) / 100;
    const calcISS = (totalServicos * iss) / 100;

    const totalImpostos = calcIRPF + calcPIS + calcCOFINS + calcINSS + calcISS;
    const totalLiquido = totalServicos - totalImpostos;


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


printBtn.addEventListener("click", () => {
    window.print();
});


clearBtn.addEventListener("click", () => {
    invoiceContainer.innerHTML = "";
    itemsContainer.innerHTML = "";
});
