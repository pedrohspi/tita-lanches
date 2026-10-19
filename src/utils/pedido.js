import { CONFIG } from "../dados/config";

export function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Converte "50", "50,00" ou "R$ 1.050,00" em número.
export function lerValor(texto) {
  const limpo = String(texto ?? "")
    .replace(/[^\d,.]/g, "")
    .replace(/\.(?=\d{3}\b)/g, "")
    .replace(",", ".");
  const n = Number(limpo);
  return Number.isFinite(n) ? n : 0;
}

export function mascaraTelefone(valor) {
  const d = valor.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

// Item do carrinho: { nome, preco, quantidade, adicionais: [{ nome, preco, quantidade }], inclusa, observacao }
export function totalDoItem(item) {
  const extras = (item.adicionais || []).reduce((s, a) => s + a.preco * a.quantidade, 0);
  return (item.preco + extras) * (item.quantidade || 1);
}

export function subtotal(carrinho) {
  return carrinho.reduce((s, item) => s + totalDoItem(item), 0);
}

function normalizar(texto) {
  return String(texto || "").normalize("NFD").replace(/[̀-ͯ]/g, "").trim().toLowerCase();
}

// Taxa do bairro, ou null quando o bairro não está na tabela (frete a combinar).
export function taxaEntrega(bairro) {
  const alvo = normalizar(bairro);
  if (!alvo) return null;
  for (const [nome, valor] of Object.entries(CONFIG.taxasEntrega || {})) {
    if (normalizar(nome) === alvo) return valor;
  }
  return null;
}

export function srcImagem(item) {
  const base = import.meta.env.BASE_URL;
  return item.imagem ? `${base}img/lanches/${item.imagem}` : `${base}img/lanches/padrao.svg`;
}

export function montarMensagem(carrinho, cliente) {
  const linhas = [`*Novo pedido — ${CONFIG.nomeLoja}*`, ""];

  carrinho.forEach((item, i) => {
    const qtd = item.quantidade || 1;
    linhas.push(`*${i + 1}. ${qtd}x ${item.nome}* — ${formatarPreco(totalDoItem(item))}`);
    if (item.inclusa) linhas.push(`   Com: ${item.inclusa}`);
    const extras = (item.adicionais || []).filter((a) => a.quantidade > 0);
    if (extras.length) {
      linhas.push(`   Adicionais: ${extras.map((a) => `${a.quantidade}x ${a.nome}`).join(", ")}`);
    }
    if (item.observacao) linhas.push(`   Obs: ${item.observacao}`);
  });

  const sub = subtotal(carrinho);
  const frete = taxaEntrega(cliente.bairro);

  linhas.push("", `Subtotal: ${formatarPreco(sub)}`);
  if (frete === null) {
    linhas.push("Entrega: a combinar", `*Total: ${formatarPreco(sub)} + entrega*`, "");
  } else {
    linhas.push(`Entrega: ${formatarPreco(frete)}`, `*Total: ${formatarPreco(sub + frete)}*`, "");
  }

  linhas.push("*Cliente*", `Nome: ${cliente.nome}`, `Telefone: ${cliente.telefone}`, "");

  linhas.push("*Endereço*", `${cliente.rua}, ${cliente.numero} — ${cliente.bairro}`);
  if (cliente.complemento) linhas.push(`Complemento: ${cliente.complemento}`);
  if (cliente.referencia) linhas.push(`Referência: ${cliente.referencia}`);
  linhas.push("");

  linhas.push(`*Pagamento:* ${cliente.pagamento}`);
  if (cliente.pagamento === "Dinheiro" && cliente.troco) {
    linhas.push(`Troco para: ${formatarPreco(lerValor(cliente.troco))}`);
  }
  if (cliente.pagamento === "Pix") linhas.push("Vou enviar o comprovante aqui.");

  return linhas.join("\n");
}

export function enviarPedido(carrinho, cliente) {
  const texto = encodeURIComponent(montarMensagem(carrinho, cliente));
  const url = `https://wa.me/${CONFIG.whatsapp}?text=${texto}`;
  // Alguns navegadores bloqueiam nova aba; nesse caso abre na mesma.
  const aba = window.open(url, "_blank");
  if (!aba) window.location.href = url;
}
