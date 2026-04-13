# 🐾 Projeto Pet - Fila de Atendimento
Uma aplicação simples para gerenciar uma fila de atendimentos em um Petshop, utilizando dados dinâmicos de uma API e armazenamento local com `localStorage`.

É preciso preencher o nome do dono/tudor do animal e o telefone, caso não seja preenchido aparecerá um aviso.

Ao clicar em adicionar cliente, Um animal aleatório é buscado na API e adicionado na tabela de atendimento com uma imagem, raça,temperamento, idade, um medicamento aleatório cadastrado na const medicamentos e as informações cadastradas nos campos anteriores do tutor (nome e telefone). Além de adicionar esses dados para a variavel atendimentos em localStorage, mas com a adição de um ultimo atributo "atendimentoFinalizado" como false, indicando que o atendimento ainda não foi finalizado.

A ultima coluna da tabela vi mostrar o botão "Finalizar", que ao ser clicado remove a linha deste cadastro da tabela de atendimentos e atribui atendimentoFinalizado como true em atendimentos.atendimentoFinalizado.

Ao clicar do botão "Atualizar atendimentos concluídos", a tabela de atendimentos concluidos será atualizada com todos os elementos da variavel AtendimentoFinalizado que está em local Storage atribuidos como true.


---

## 🚀 Funcionalidades

### 📋 Cadastro de Atendimento

- É necessário preencher:
  - Nome do tutor/dono
  - Telefone

- Caso algum campo não seja preenchido:
  - Um alerta é exibido informando a obrigatoriedade

---

### ➕ Adicionar Cliente

Ao clicar no botão **"Adicionar cliente"**:

- Um animal aleatório é buscado na API **The Dog API**
- Os seguintes dados são adicionados na tabela:
  - Foto do animal
  - Raça
  - Temperamento
  - Idade
  - Medicamento (sorteado aleatoriamente)
  - Nome do tutor
  - Telefone

----

### 💊 Medicamentos

Os medicamentos são definidos previamente em uma constante:

```javascript
const medicamentos = [
  { nome: "Aplonal 20mg" },
  { nome: "Basken Suspensão 20ml" },
  ...
];