const addItemBtn = document.getElementById("addItemBtn");
const itemsContainer = document.getElementById("itemsContainer");
const generateBtn = document.getElementById("generateBtn");
const printBtn = document.getElementById("printBtn");
const clearBtn = document.getElementById("clearBtn");
const invoiceBox = document.getElementById("invoice");

function addItem() {
  const row = document.createElement("div");
  row.className = "item-row";

  row.innerHTML = `
    <input type="text" placeholder="Descrição">
    <input type="number" placeholder="Valor" step="0.01">
    <button class="item-delete">X</button>
  `;

  row.querySelector(".item-delete").onclick = () => row.remove();

  itemsContainer.appendChild(row);
}

addItemBtn.onclick = addItem;

function generateInvoice() {
  const provider = document.getElementById("providerName").value;
  const providerId = document.getElementById("providerId").value;
  const client = document.getElementById("clientName").value;
  const date = document.getElementById("issueDate").value;

  const irpf = parseFloat(irpf.value) || 0;
  const pisV = parseFloat(pis.value) || 0;
  const cofinsV = parseFloat(cofins.value) || 0;
  const inssV = parseFloat(inss.value) || 0;
  const issV = parseFloat(iss.value) || 0;

  let itens = [];
  let total = 0;

  [...itemsContainer.children].forEach(row => {
    const desc = row.children[0].value;
    const val = parseFloat(row.children[1].value);

    if (desc && val > 0) {
      itens.push({ desc, val });
      total += val;
    }
  });

  const irpfVal = total * (irpf / 100);
  const pisVal = total * (pisV / 100);
  const cofinsVal = total * (cofinsV / 100);
  const inssVal = total * (inssV / 100);
  const issVal = total * (issV / 100);

  invoiceBox.innerHTML = `
    <h2>Nota Fiscal de Serviço</h2>

    <p><strong>Prestador:</strong> ${provider}</p>
    <p><strong>CNPJ/CPF:</strong> ${providerId}</p>
    <p><strong>Cliente:</strong> ${client}</p>
    <p><strong>Data:</strong> ${date}</p>

    <h3>Itens</h3>
    <ul>
      ${itens.map(i => `<li>${i.desc} — R$ ${i.val.toFixed(2)}</li>`).join("")}
    </ul>

    <h3>Resumo</h3>
    <p><strong>Total:</strong> R$ ${total.toFixed(2)}</p>
    <p>IRPF: R$ ${irpfVal.toFixed(2)}</p>
    <p>PIS: R$ ${pisVal.toFixed(2)}</p>
    <p>COFINS: R$ ${cofinsVal.toFixed(2)}</p>
    <p>INSS: R$ ${inssVal.toFixed(2)}</p>
    <p>ISSQN: R$ ${issVal.toFixed(2)}</p>
  `;
}

generateBtn.onclick = generateInvoice;
printBtn.onclick = () => window.print();
clearBtn.onclick = () => location.reload();
