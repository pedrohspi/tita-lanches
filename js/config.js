// Configurações da loja — edite aqui sem mexer no resto do código.
const CONFIG = {
  nomeLoja: "Tita Lanches",

  // Número que recebe os pedidos: 55 + DDD + número, só dígitos.
  // TODO: trocar pelo número real.
  whatsapp: "5583900000000",

  // Taxa de entrega fixa (R$).
  frete: 2.0,

  // Dados do Pix exibidos no checkout.
  // TODO: confirmar chave e titular.
  pix: {
    chave: "121.202.112-00",
    titular: "Vicente Neto da Silva",
  },

  formasPagamento: ["Dinheiro", "Pix", "Cartão (na entrega)"],
};
