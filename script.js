const API_KEY = "live_2hJEgIG1pcyAfPL8GopDiM7OulmyvrdEPmOpcSwXi086zjE0TYuD6wEc04Go5CYU";

const tabela = document.getElementById("tabelaBody");
const tabelaConcluidos = document.getElementById("tabelaConcluidos");

const form = document.getElementById("formAtendimento");
const btn = document.getElementById("btnAdicionar");

const inputNome = document.getElementById("nomeTutor");
const inputTelefone = document.getElementById("telefoneTutor");

const medicamentos = [
  { nome: "Aplonal 20mg" },
  { nome: "Basken Suspensão 20ml" },
  { nome: "Calmisyn 660mg" },
  { nome: "Defensyn 60g" },
  { nome: "Ectosyn 200ml" },
  { nome: "Hep Vita 2000mg" },
  { nome: "Hipoalersyn 200ml" },
  { nome: "Kuraderm 250ml" },
  { nome: "Peroxsyn 200ml" },
  { nome: "Serenex Difusor Canino" }
];

inputTelefone.addEventListener("input", () => {
  let v = inputTelefone.value.replace(/\D/g, "");

  if (v.length > 11) v = v.slice(0, 11);

  if (v.length > 10) {
    v = v.replace(/^(\d{2})(\d{5})(\d+)/, "($1) $2-$3");
  } else if (v.length > 6) {
    v = v.replace(/^(\d{2})(\d{4})(\d+)/, "($1) $2-$3");
  } else if (v.length > 2) {
    v = v.replace(/^(\d{2})(\d+)/, "($1) $2");
  } else {
    v = v.replace(/^(\d*)/, "($1");
  }

  inputTelefone.value = v;
});

function sortearMedicamento() {
  return medicamentos[Math.floor(Math.random() * medicamentos.length)].nome;
}

function salvarAtendimento(atendimento) {
  const lista = JSON.parse(localStorage.getItem("atendimentos")) || [];
  lista.push(atendimento);
  localStorage.setItem("atendimentos", JSON.stringify(lista));
}

function atualizarConcluidos() {
  tabelaConcluidos.innerHTML = "";
  const lista = JSON.parse(localStorage.getItem("atendimentos")) || [];

  lista
    .filter(a => a.atendimentoFinalizado)
    .forEach(a => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><img src="${a.imagem}"></td>
        <td>${a.nome}</td>
        <td>${a.temperamento}</td>
        <td>${a.vida}</td>
        <td>${a.medicamento}</td>
        <td>${a.tutor}</td>
        <td>${a.telefone}</td>
      `;
      tabelaConcluidos.appendChild(tr);
    });
}

// API
async function buscarCachorro() {
  const response = await fetch("https://api.thedogapi.com/v1/images/search?has_breeds=true", {
    headers: { "x-api-key": API_KEY }
  });

  const data = await response.json();
  const dog = data[0];
  const breed = dog.breeds[0] || {};

  return {
    imagem: dog.url,
    nome: breed.name || "Desconhecido",
    temperamento: breed.temperament || "N/A",
    vida: breed.life_span || "N/A"
  };
}

function adicionarLinha(dog, tutor, telefone) {
  const tr = document.createElement("tr");
  const medicamento = sortearMedicamento();

  const atendimento = {
    imagem: dog.imagem,
    nome: dog.nome,
    temperamento: dog.temperamento,
    vida: dog.vida,
    medicamento,
    tutor,
    telefone,
    atendimentoFinalizado: false
  };

  tr.innerHTML = `
    <td><img src="${dog.imagem}"></td>
    <td>${dog.nome}</td>
    <td>${dog.temperamento}</td>
    <td>${dog.vida}</td>
    <td>${medicamento}</td>
    <td>${tutor}</td>
    <td>${telefone}</td>
    <td><button class="btnRemover">Finalizar</button></td>
  `;

  tr.querySelector(".btnRemover").addEventListener("click", () => {
    tr.remove();
    atendimento.atendimentoFinalizado = true;
    salvarAtendimento(atendimento);
  });

  tabela.appendChild(tr);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = inputNome.value.trim();
  const telefone = inputTelefone.value.trim();

  if (!nome || !telefone) {
    alert("Preencha o nome e contato do Dono/Tutor!");
    return;
  }

  btn.disabled = true;
  btn.textContent = "Carregando...";

  const dog = await buscarCachorro();
  if (dog) adicionarLinha(dog, nome, telefone);

  inputNome.value = "";
  inputTelefone.value = "";

  btn.disabled = false;
  btn.textContent = "Adicionar cliente";
});

// CONCLUÍDOS
document.getElementById("btnConcluidos")
  .addEventListener("click", atualizarConcluidos);