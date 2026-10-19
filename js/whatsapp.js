// Monta a mensagem do pedido e abre o WhatsApp — sem backend.

function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function normalizar(texto) {
  return String(texto || "").normalize("NFD").replace(/[̀-ͯ]/g, "").trim().toLowerCase();
}

// Taxa do bairro, ou null quando o bairro não está na tabela (frete a combinar).
function taxaEntrega(bairro) {
  const alvo = normalizar(bairro);
  if (!alvo) return null;
  for (const [nome, valor] of Object.entries(CONFIG.taxasEntrega || {})) {
    if (normalizar(nome) === alvo) return valor;
  }
  return null;
}

// item do carrinho: { nome, preco, quantidade, adicionais: [{ nome, preco, quantidade }], inclusa, observacao }
function totalDoItem(item) {
  const extras = (item.adicionais || []).reduce((s, a) => s + a.preco * a.quantidade, 0);
  return (item.preco + extras) * (item.quantidade || 1);
}

function montarMensagem(carrinho, cliente) {
  const linhas = [];
  linhas.push(`*Novo pedido — ${CONFIG.nomeLoja}*`, "");

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

  const subtotal = carrinho.reduce((s, item) => s + totalDoItem(item), 0);
  const frete = taxaEntrega(cliente.bairro);

  linhas.push("", `Subtotal: ${formatarPreco(subtotal)}`);
  if (frete === null) {
    linhas.push("Entrega: a combinar");
    linhas.push(`*Total: ${formatarPreco(subtotal)} + entrega*`, "");
  } else {
    linhas.push(`Entrega: ${formatarPreco(frete)}`);
    linhas.push(`*Total: ${formatarPreco(subtotal + frete)}*`, "");
  }

  linhas.push("*Cliente*");
  linhas.push(`Nome: ${cliente.nome}`);
  linhas.push(`Telefone: ${cliente.telefone}`, "");

  linhas.push("*Endereço*");
  linhas.push(`${cliente.rua}, ${cliente.numero} — ${cliente.bairro}`);
  if (cliente.complemento) linhas.push(`Complemento: ${cliente.complemento}`);
  if (cliente.referencia) linhas.push(`Referência: ${cliente.referencia}`);
  linhas.push("");

  linhas.push(`*Pagamento:* ${cliente.pagamento}`);
  if (cliente.pagamento === "Dinheiro" && cliente.troco) {
    linhas.push(`Troco para: ${formatarPreco(Number(cliente.troco))}`);
  }
  if (cliente.pagamento === "Pix") {
    linhas.push("Vou enviar o comprovante aqui.");
  }

  return linhas.join("\n");
}

function enviarPedido(carrinho, cliente) {
  const texto = encodeURIComponent(montarMensagem(carrinho, cliente));
  const url = `https://wa.me/${CONFIG.whatsapp}?text=${texto}`;
  // Alguns navegadores bloqueiam nova aba; nesse caso abre na mesma.
  const aba = window.open(url, "_blank");
  if (!aba) window.location.href = url;
}
