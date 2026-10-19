// Cardápio — preços conforme o cardápio impresso.
// Para adicionar um item, copie um objeto e ajuste os campos.
// Foto: coloque o arquivo em assets/img/lanches/ e adicione ao item, ex.: imagem: "barao.jpg".
// Sem foto, o item usa a imagem padrão.

const ADICIONAIS = [
  { id: "hamburguer", nome: "Hambúrguer", preco: 3.0 },
  { id: "salsicha", nome: "Salsicha", preco: 2.0 },
  { id: "ovo", nome: "Ovo", preco: 2.0 },
  { id: "calabresa", nome: "Calabresa", preco: 3.0 },
  { id: "frango", nome: "Frango", preco: 3.0 },
  { id: "bacon", nome: "Bacon", preco: 3.0 },
];

// Todos os lanches já incluem catupiry ou cheddar (cliente escolhe).
const OPCOES_INCLUSAS = ["Catupiry", "Cheddar"];

const CARDAPIO = [
  {
    id: "lanches",
    nome: "Lanches",
    aceitaAdicionais: true,
    itens: [
      { id: "especial-da-casa", nome: "Especial da Casa", preco: 23.0, descricao: "2 hambúrgueres, frango desfiado, 2 ovos, bacon, calabresa, salsicha, queijo, presunto e salada" },
      { id: "barao", nome: "Barão", preco: 18.0, descricao: "Hambúrguer, frango desfiado, ovo, bacon, salsicha, queijo, presunto e salada" },
      { id: "t-burguer", nome: "T-Burguer", preco: 16.0, descricao: "3 hambúrgueres, ovo, salsicha, queijo, presunto e salada" },
      { id: "calafrango", nome: "Calafrango", preco: 15.0, descricao: "Hambúrguer, frango desfiado, calabresa, ovo, queijo, presunto e salada" },
      { id: "francatupiry", nome: "Francatupiry", preco: 14.0, descricao: "Hambúrguer, frango desfiado, catupiry, queijo, presunto e salada" },
      { id: "tita-lanches", nome: "Tita Lanches", preco: 13.0, descricao: "Hambúrguer, frango desfiado, ovo, queijo, presunto e salada" },
      { id: "duplo", nome: "Duplo", preco: 13.0, descricao: "2 hambúrgueres, salsicha, queijo, presunto e salada" },
      { id: "bacon", nome: "Bacon", preco: 12.0, descricao: "Hambúrguer, bacon, queijo, presunto e salada" },
      { id: "calabresa", nome: "Calabresa", preco: 12.0, descricao: "Hambúrguer, calabresa, queijo, presunto e salada" },
    ],
  },
  // TODO: preencher quando o cardápio chegar. Categorias sem itens não aparecem no site.
  { id: "cuscuzes", nome: "Cuscuzes", aceitaAdicionais: false, itens: [] },
];

// Imagem usada quando a foto do lanche ainda não existe.
const IMAGEM_PADRAO = "assets/img/lanches/padrao.svg";
