// Cardápio — preços conforme o cardápio impresso.
// Para adicionar um item, copie um objeto e ajuste os campos.
// "imagem" é relativa à pasta assets/img/lanches/.

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
      { id: "especial-da-casa", nome: "Especial da Casa", preco: 23.0, descricao: "2 hambúrgueres, frango desfiado, 2 ovos, bacon, calabresa, salsicha, queijo, presunto e salada", imagem: "especial-da-casa.jpg" },
      { id: "barao", nome: "Barão", preco: 18.0, descricao: "Hambúrguer, frango desfiado, ovo, bacon, salsicha, queijo, presunto e salada", imagem: "barao.jpg" },
      { id: "t-burguer", nome: "T-Burguer", preco: 16.0, descricao: "3 hambúrgueres, ovo, salsicha, queijo, presunto e salada", imagem: "t-burguer.jpg" },
      { id: "calafrango", nome: "Calafrango", preco: 15.0, descricao: "Hambúrguer, frango desfiado, calabresa, ovo, queijo, presunto e salada", imagem: "calafrango.jpg" },
      { id: "francatupiry", nome: "Francatupiry", preco: 14.0, descricao: "Hambúrguer, frango desfiado, catupiry, queijo, presunto e salada", imagem: "francatupiry.jpg" },
      { id: "tita-lanches", nome: "Tita Lanches", preco: 13.0, descricao: "Hambúrguer, frango desfiado, ovo, queijo, presunto e salada", imagem: "tita-lanches.jpg" },
      { id: "duplo", nome: "Duplo", preco: 13.0, descricao: "2 hambúrgueres, salsicha, queijo, presunto e salada", imagem: "duplo.jpg" },
      { id: "bacon", nome: "Bacon", preco: 12.0, descricao: "Hambúrguer, bacon, queijo, presunto e salada", imagem: "bacon.jpg" },
      { id: "calabresa", nome: "Calabresa", preco: 12.0, descricao: "Hambúrguer, calabresa, queijo, presunto e salada", imagem: "calabresa.jpg" },
    ],
  },
  // TODO: preencher quando o cardápio dessas categorias chegar.
  { id: "tapiocas", nome: "Tapiocas", aceitaAdicionais: false, itens: [] },
  { id: "cuscuzes", nome: "Cuscuzes", aceitaAdicionais: false, itens: [] },
  { id: "sucos", nome: "Sucos", aceitaAdicionais: false, itens: [] },
];
