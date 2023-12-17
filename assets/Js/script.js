
document.getElementById('fileInput').addEventListener('change', function (event) {
  var fileInput = event.target;
  var file = fileInput.files[0];

  if (file) {
    var pdfViewer = document.getElementById('pdfViewer');
    var fileURL = URL.createObjectURL(file);
    pdfViewer.src = fileURL;
  }
});
function previewPDF() {
  var input = document.getElementById("pdfInput");
  var previewContainer = document.getElementById("pdfPreview");

  if (input.files.length > 0) {
    var file = input.files[0];

    // Use pdf.js para renderizar o PDF
    var fileReader = new FileReader();
    fileReader.onload = function () {
      var typedarray = new Uint8Array(this.result);
      previewPDFContent(typedarray);
    };
    fileReader.readAsArrayBuffer(file);
  } else {
    previewContainer.innerHTML = "Nenhum arquivo PDF selecionado.";
  }
}
function addCadastro() {
  // Obter valores do formulário
  var numeroMatricula = document.getElementById('numero_matricula').value.toUpperCase();
  var descricaoImovel = document.getElementById('descricao_imovel').value.toUpperCase();
  var numeroTerreno = document.getElementById('numero_terreno').value.toUpperCase();
  var loteamento = document.getElementById('loteamento').value.toUpperCase();
  var bairro = document.getElementById('bairro').value.toUpperCase();
  var cidade = document.getElementById('cidade').value.toUpperCase();
  var tipoLogradouro = document.getElementById('tipo_logradouro').value.toUpperCase();
  var logradouro = document.getElementById('logradouro').value.toUpperCase();
  var inscricaoMunicipal = document.getElementById('inscricao_municipal').value.toUpperCase();
  var nomeProprietario = document.getElementById('nome_proprietario').value.toUpperCase();
  var nacionalidade = document.getElementById('nacionalidade').value.toUpperCase();
  var estadoCivil = document.getElementById('estado_civil').value.toUpperCase();
  var nomePai = document.getElementById('nome_pai').value.toUpperCase();
  var nomeMae = document.getElementById('nome_mae').value.toUpperCase();
  var rg = document.getElementById('rg').value.toUpperCase();
  var orgao = document.getElementById('orgao').value.toUpperCase();
  var cpf = document.getElementById('cpf').value.toUpperCase();

  // Verificar se todos os campos estão preenchidos
  if (todosCamposPreenchidos(numeroMatricula, descricaoImovel, numeroTerreno, loteamento, bairro, cidade,
    tipoLogradouro, logradouro, inscricaoMunicipal, nomeProprietario, nacionalidade, estadoCivil,
    nomePai, nomeMae, rg, orgao, cpf)) {

    // Adicionar uma nova linha à tabela com os valores do formulário
    var table = document.getElementById('cadastrosTable').getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.rows.length);

    // Preencher a nova linha com os valores do formulário
    newRow.insertCell().innerHTML = numeroMatricula;
    newRow.insertCell().innerHTML = descricaoImovel;
    newRow.insertCell().innerHTML = numeroTerreno;
    newRow.insertCell().innerHTML = loteamento;
    newRow.insertCell().innerHTML = bairro;
    newRow.insertCell().innerHTML = cidade;
    newRow.insertCell().innerHTML = tipoLogradouro;
    newRow.insertCell().innerHTML = logradouro;
    newRow.insertCell().innerHTML = inscricaoMunicipal;
    newRow.insertCell().innerHTML = nomeProprietario;
    newRow.insertCell().innerHTML = nacionalidade;
    newRow.insertCell().innerHTML = estadoCivil;
    newRow.insertCell().innerHTML = nomePai;
    newRow.insertCell().innerHTML = nomeMae;
    newRow.insertCell().innerHTML = rg;
    newRow.insertCell().innerHTML = orgao;
    newRow.insertCell().innerHTML = cpf;
    // ... (adicionar outras células com os valores dos outros campos)
  } else {
    // Se algum campo não estiver preenchido, exiba uma mensagem de erro ou tome a ação adequada
    alert('Por favor, preencha todos os campos do formulário.');
  }
}

// Função para verificar se todos os campos estão preenchidos
function todosCamposPreenchidos() {
  for (var i = 0; i < arguments.length; i++) {
    if (arguments[i].trim() === '') {
      return false;
    }
  }
  return true;
}

function saveToExcel() {
  // Criar uma matriz com os dados da tabela
  var data = [
    [
      "N° MATRICULA",
      "CPF",
      "IDENTIDADE",
      "ÓRGÃO EM",
      "CNPJ",
      "NOME",
      "NACIONALIDADE",
      "ESTADO CÍVIL",
      "REGIME DE BENS",
      "PROFISSÃO",
      "QUALIFICAÇÃO",
      "UF",
      "CEP",
      "TIPO DE LOGRADOURO",
      "LOGRADOURO",
      "NÚMERO",
      "UNIDADE",
      "CIDADE",
      "BAIRRO",
      "COMPLEMENTO",
      "NOME DE PAI",
      "NOME DA MÃE",
    ],
  ]; // Cabeçalho

  var table = document
    .getElementById("cadastrosTable")
    .getElementsByTagName("tbody")[0];
  var rows = table.getElementsByTagName("tr");
  for (var i = 0; i < rows.length; i++) {
    var cells = rows[i].getElementsByTagName("td");
    var rowData = [];
    for (var j = 0; j < cells.length; j++) {
      rowData.push(cells[j].innerText);
    }
    data.push(rowData);
  }

  // Criar um objeto de workbook
  var wb = XLSX.utils.book_new();

  // Adicionar uma planilha ao workbook
  var ws = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, "Cadastros");

  // Salvar o arquivo Excel
  XLSX.writeFile(wb, "numero_da_matricula.xlsx");
}


function limparCampos() {
  // Adicione aqui a lógica para limpar todos os campos do formulário
  var form = document.getElementById("myForm");
  var inputs = form.getElementsByTagName("input");
  var selects = form.getElementsByTagName("select");

  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].type !== "button") {
      inputs[i].value = "";
    }
  }

  for (var j = 0; j < selects.length; j++) {
    selects[j].selectedIndex = 0;
  }
}
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('limparBtn').addEventListener('click', limparFormulario);
});

function limparFormulario() {
  var form = document.getElementById("cadastroForm");
  form.reset();
}


// Função para excluir a tabela
function excluirTabela() {
  var table = document.getElementById("cadastrosTable").getElementsByTagName("tbody")[0];
  table.innerHTML = ""; // Limpa o conteúdo da tabela
}