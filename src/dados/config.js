// Configurações da loja — edite aqui sem mexer no resto do código.
export const CONFIG = {
  nomeLoja: "Tita Lanches",

  // Número que recebe os pedidos: 55 + DDD + número, só dígitos.
  whatsapp: "558499322459",

  // Taxa de entrega por bairro (R$). Bairro fora da lista fica "a combinar".
  // Exemplo: { "Centro": 2.0, "Bancários": 4.0 } — maiúsculas e acentos não importam.
  // TODO: preencher com os bairros atendidos.
  taxasEntrega: {},

  // Dados do Pix exibidos no checkout.
  // TODO: confirmar chave e titular.
  pix: {
    chave: "121.202.112-00",
    titular: "Vicente Neto da Silva",
  },

  formasPagamento: ["Dinheiro", "Pix", "Cartão (na entrega)"],
};
