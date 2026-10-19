// Telas, carrinho e checkout.
// Fluxo: Início → Cardápio → (modal de adicionais) → Carrinho → Endereço → Dados → Resumo → WhatsApp → Obrigado
// Cada tela tem um endereço (#cardapio, #carrinho...), então o botão "voltar" do celular funciona.

const CHAVE_STORAGE = "tita-lanches:pedido";
const TELAS_CHECKOUT = ["endereco", "dados", "resumo"];

const estado = {
  categoria: null,
  carrinho: [],
  cliente: {
    rua: "", bairro: "", numero: "", referencia: "", complemento: "",
    nome: "", telefone: "", pagamento: "", troco: "",
  },
};

// ---------- utilidades ----------

const $app = document.getElementById("app");
const $modal = document.getElementById("modal");
const $aviso = document.getElementById("aviso");
const $badge = document.getElementById("badge");

function esc(texto) {
  return String(texto ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function categoriasVisiveis() {
  return CARDAPIO.filter((c) => c.itens.length > 0);
}

function acharItem(id) {
  for (const cat of CARDAPIO) {
    const item = cat.itens.find((i) => i.id === id);
    if (item) return { item, categoria: cat };
  }
  return null;
}

function srcImagem(item) {
  return item.imagem ? `assets/img/lanches/${item.imagem}` : IMAGEM_PADRAO;
}

function imgTag(item, classe = "card-foto") {
  return `<img class="${classe}" src="${esc(srcImagem(item))}" alt="" loading="lazy" onerror="this.onerror=null;this.src='${IMAGEM_PADRAO}'">`;
}

function subtotalCarrinho() {
  return estado.carrinho.reduce((s, item) => s + totalDoItem(item), 0);
}

function salvar() {
  try {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify({ carrinho: estado.carrinho, cliente: estado.cliente }));
  } catch (e) { /* navegador sem storage: segue só na memória */ }
}

function carregar() {
  try {
    const dados = JSON.parse(localStorage.getItem(CHAVE_STORAGE) || "null");
    if (dados) {
      estado.carrinho = Array.isArray(dados.carrinho) ? dados.carrinho : [];
      Object.assign(estado.cliente, dados.cliente || {});
    }
  } catch (e) { /* ignora dados corrompidos */ }
}

function avisar(texto) {
  $aviso.textContent = texto;
  $aviso.classList.add("visivel");
  clearTimeout(avisar.timer);
  avisar.timer = setTimeout(() => $aviso.classList.remove("visivel"), 2200);
}

function atualizarBadge() {
  const qtd = estado.carrinho.length;
  $badge.hidden = qtd === 0;
  $badge.textContent = qtd;
}

function cabecalho(titulo, voltarPara) {
  return `
    <div class="cabecalho">
      <a href="#${voltarPara}" class="voltar" aria-label="Voltar">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12H5m6-7-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </a>
      <h1>${titulo}</h1>
    </div>`;
}

function rodapeTotal({ frete = false, botao, acao }) {
  const sub = subtotalCarrinho();
  const taxa = frete ? taxaEntrega(estado.cliente.bairro) : null;
  let linhaFrete = "";
  let total = formatarPreco(sub);
  if (frete) {
    linhaFrete = taxa === null
      ? `<span class="frete">Frete: a combinar</span>`
      : `<span class="frete">Frete: + ${formatarPreco(taxa)}</span>`;
    if (taxa !== null) total = formatarPreco(sub + taxa);
  }
  return `
    <div class="rodape-total">
      <div class="valores">
        ${linhaFrete}
        <strong>Total: ${total}</strong>
      </div>
      <button class="botao" data-acao="${acao}">${botao}</button>
    </div>`;
}

// ---------- telas ----------

function telaInicio() {
  return `
    <section class="inicio">
      <h1 class="chamada">O lanche perfeito,<br>feito para você!</h1>
      <img class="inicio-foto" src="${IMAGEM_PADRAO}" alt="">
      <a href="#cardapio" class="botao botao-grande">Saiba mais</a>
    </section>`;
}

function telaCardapio() {
  const cats = categoriasVisiveis();
  if (!cats.find((c) => c.id === estado.categoria)) estado.categoria = cats[0]?.id;
  const atual = cats.find((c) => c.id === estado.categoria);

  const abas = cats.map((c) => `
    <button class="aba ${c.id === estado.categoria ? "ativa" : ""}" data-acao="categoria" data-id="${c.id}">${esc(c.nome)}</button>
  `).join("");

  const cards = (atual?.itens || []).map((item) => `
    <article class="card">
      <div class="card-info">
        <h2>${esc(item.nome)}</h2>
        <p>${esc(item.descricao)}</p>
        <span class="preco">${formatarPreco(item.preco)}</span>
      </div>
      <div class="card-lado">
        ${imgTag(item)}
        <button class="botao" data-acao="abrir-item" data-id="${item.id}">Comprar</button>
      </div>
    </article>`).join("");

  return `
    <nav class="abas">${abas}</nav>
    <section class="lista">${cards || `<p class="vazio">Nenhum item nesta categoria.</p>`}</section>`;
}

function telaCarrinho() {
  if (estado.carrinho.length === 0) {
    return `
      ${cabecalho("Carrinho", "cardapio")}
      <section class="vazio-bloco">
        <p>Seu carrinho está vazio.</p>
        <a href="#cardapio" class="botao">Ver cardápio</a>
      </section>`;
  }

  const cards = estado.carrinho.map((item) => `
    <article class="card">
      <div class="card-info">
        <h2>${esc(item.nome)}</h2>
        <p>${esc(item.descricao)}</p>
        ${detalhesItem(item)}
        <span class="preco">${formatarPreco(totalDoItem(item))}</span>
      </div>
      <div class="card-lado">
        ${imgTag(item)}
        <button class="botao botao-remover" data-acao="remover" data-uid="${item.uid}">Remover</button>
      </div>
    </article>`).join("");

  return `
    ${cabecalho("Carrinho", "cardapio")}
    <section class="lista com-rodape">${cards}</section>
    ${rodapeTotal({ botao: "Avançar", acao: "ir-endereco" })}`;
}

function detalhesItem(item) {
  const partes = [];
  if (item.inclusa) partes.push(`Com ${esc(item.inclusa)}`);
  const extras = (item.adicionais || []).filter((a) => a.quantidade > 0);
  if (extras.length) partes.push(`Adicionais: ${extras.map((a) => `${a.quantidade} ${esc(a.nome)}`).join(", ")}`);
  if (item.observacao) partes.push(`Obs: ${esc(item.observacao)}`);
  return partes.map((p) => `<p class="detalhe">${p}</p>`).join("");
}

function campo(id, rotulo, exemplo, { tipo = "text", obrigatorio = true, extra = "" } = {}) {
  return `
    <label class="campo">
      <span>${rotulo}${obrigatorio ? "" : ' <em>(opcional)</em>'}</span>
      <input type="${tipo}" name="${id}" value="${esc(estado.cliente[id])}" placeholder="${esc(exemplo)}" ${obrigatorio ? "required" : ""} ${extra}>
    </label>`;
}

function telaEndereco() {
  return `
    ${cabecalho("Endereço", "carrinho")}
    <form class="formulario com-rodape" id="form-endereco" novalidate>
      ${campo("rua", "Rua", "ex: Rua José da Silva", { extra: 'autocomplete="address-line1"' })}
      ${campo("bairro", "Bairro", "ex: Bancários")}
      ${campo("numero", "Número", "ex: 101", { extra: 'inputmode="numeric"' })}
      ${campo("referencia", "Ponto de referência", "ex: ao lado da caixa d'água", { obrigatorio: false })}
      ${campo("complemento", "Complemento", "ex: ap 102", { obrigatorio: false })}
    </form>
    ${rodapeTotal({ botao: "Avançar", acao: "ir-dados" })}`;
}

function telaDados() {
  const pg = estado.cliente.pagamento;
  const opcoes = CONFIG.formasPagamento.map((f) => `<option ${f === pg ? "selected" : ""}>${esc(f)}</option>`).join("");

  let extraPagamento = "";
  if (pg === "Dinheiro") {
    extraPagamento = campo("troco", "Troco para", "R$ 50,00", { obrigatorio: false, tipo: "text", extra: 'inputmode="decimal"' });
  } else if (pg === "Pix") {
    extraPagamento = `
      <div class="campo">
        <span>Chave Pix:</span>
        <div class="pix">
          <div>
            <strong>${esc(CONFIG.pix.chave)}</strong>
            <small>${esc(CONFIG.pix.titular)}</small>
          </div>
          <button type="button" class="botao botao-copiar" data-acao="copiar-pix">Copiar</button>
        </div>
      </div>
      <div class="importante">
        <strong>Importante</strong>
        Enviar o comprovante no WhatsApp
      </div>`;
  }

  return `
    ${cabecalho("Dados", "endereco")}
    <form class="formulario com-rodape" id="form-dados" novalidate>
      ${campo("nome", "Nome", "ex: José da Silva", { extra: 'autocomplete="name"' })}
      ${campo("telefone", "Telefone", "ex: (84) 99834-9412", { tipo: "tel", extra: 'autocomplete="tel"' })}
      <label class="campo">
        <span>Forma de pagamento</span>
        <select name="pagamento" required>
          <option value="" ${pg ? "" : "selected"} disabled>Selecione</option>
          ${opcoes}
        </select>
      </label>
      ${extraPagamento}
    </form>
    ${rodapeTotal({ botao: "Avançar", acao: "ir-resumo" })}`;
}

function telaResumo() {
  const cards = estado.carrinho.map((item) => `
    <article class="card">
      <div class="card-info">
        <h2>${esc(item.nome)}</h2>
        <p>${esc(item.descricao)}</p>
        ${detalhesItem(item)}
        <span class="preco">${formatarPreco(totalDoItem(item))}</span>
      </div>
      <div class="card-lado">${imgTag(item)}</div>
    </article>`).join("");

  const c = estado.cliente;
  const entrega = `
    <article class="card card-entrega">
      <div class="card-info">
        <h2>Entrega</h2>
        <p>${esc(c.rua)}, ${esc(c.numero)} — ${esc(c.bairro)}</p>
        ${c.complemento ? `<p>${esc(c.complemento)}</p>` : ""}
        ${c.referencia ? `<p>Ref.: ${esc(c.referencia)}</p>` : ""}
        <p>${esc(c.nome)} · ${esc(c.telefone)}</p>
        <p>Pagamento: ${esc(c.pagamento)}${c.pagamento === "Dinheiro" && c.troco ? ` (troco para ${formatarPreco(lerValor(c.troco))})` : ""}</p>
        <a href="#endereco" class="link">Alterar</a>
      </div>
    </article>`;

  return `
    ${cabecalho("Resumo", "dados")}
    <section class="lista com-rodape">${cards}${entrega}</section>
    ${rodapeTotal({ frete: true, botao: "Finalizar", acao: "finalizar" })}`;
}

function telaObrigado() {
  return `
    <section class="obrigado">
      <h1>Obrigado pela preferência!</h1>
      <svg class="entregador" viewBox="0 0 220 180" aria-hidden="true">
        <!-- balão com lanche -->
        <circle cx="44" cy="34" r="24" fill="#000"/><path d="M36 54l-4 14 16-11z" fill="#000"/>
        <path d="M32 36a12 9 0 0 1 24 0z" fill="#fff"/><rect x="32" y="39" width="24" height="3" rx="1.5" fill="#fff"/><path d="M32 45h24v2a3 3 0 0 1-3 3H35a3 3 0 0 1-3-3z" fill="#fff"/>
        <!-- caixa de entrega -->
        <rect x="40" y="84" width="40" height="34" rx="4" fill="#000"/>
        <!-- piloto -->
        <circle cx="124" cy="44" r="16" fill="#000"/>
        <path d="M124 36h18v8h-18z" fill="#000"/>
        <path d="M118 60l-8 44" stroke="#000" stroke-width="20" stroke-linecap="round"/>
        <path d="M120 70l24 12 26-4" fill="none" stroke="#000" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M110 104h30l6 22" fill="none" stroke="#000" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
        <!-- scooter -->
        <path d="M36 150c0-18 12-30 34-30h44l10 18h34l14-50h10l14 62z" fill="#000"/>
        <rect x="84" y="112" width="40" height="10" rx="5" fill="#000"/>
        <rect x="166" y="72" width="22" height="8" rx="4" fill="#000"/>
        <circle cx="66" cy="156" r="18" fill="#000"/><circle cx="66" cy="156" r="7" fill="#fff"/>
        <circle cx="180" cy="156" r="18" fill="#000"/><circle cx="180" cy="156" r="7" fill="#fff"/>
        <!-- velocidade -->
        <path d="M6 112h22M12 126h16M6 140h22" stroke="#000" stroke-width="5" stroke-linecap="round"/>
      </svg>
      <h2>Em breve seu pedido estará na sua casa!</h2>
      <p>Se o WhatsApp não abriu, toque abaixo para enviar o pedido.</p>
      <button class="botao" data-acao="reenviar">Abrir WhatsApp</button>
      <a href="#cardapio" class="link">Fazer outro pedido</a>
    </section>`;
}

// ---------- modal de adicionais ----------

let rascunho = null;

function abrirItem(id) {
  const achado = acharItem(id);
  if (!achado) return;
  const { item, categoria } = achado;
  rascunho = {
    item,
    aceitaAdicionais: categoria.aceitaAdicionais,
    adicionais: categoria.aceitaAdicionais ? ADICIONAIS.map((a) => ({ ...a, quantidade: 0 })) : [],
    inclusa: categoria.aceitaAdicionais ? OPCOES_INCLUSAS[0] : "",
    observacao: "",
  };
  renderModal();
  $modal.hidden = false;
  document.body.classList.add("travado");
  $modal.querySelector(".modal-caixa").focus();
}

function fecharModal() {
  $modal.hidden = true;
  $modal.innerHTML = "";
  document.body.classList.remove("travado");
  rascunho = null;
}

function totalRascunho() {
  return totalDoItem({ preco: rascunho.item.preco, adicionais: rascunho.adicionais, quantidade: 1 });
}

function renderModal() {
  const { item } = rascunho;
  const linhas = rascunho.adicionais.map((a, i) => `
    <div class="adicional">
      <span class="nome">${esc(a.nome)}</span>
      <span class="preco">${formatarPreco(a.preco)}</span>
      <div class="contador">
        <button type="button" data-acao="menos" data-i="${i}" aria-label="Remover ${esc(a.nome)}" ${a.quantidade === 0 ? "disabled" : ""}>−</button>
        <b>${a.quantidade}</b>
        <button type="button" data-acao="mais" data-i="${i}" aria-label="Adicionar ${esc(a.nome)}">+</button>
      </div>
    </div>`).join("");

  const inclusas = rascunho.aceitaAdicionais ? `
    <h3>Incluso no lanche</h3>
    <div class="opcoes-inclusas">
      ${OPCOES_INCLUSAS.map((o) => `
        <label><input type="radio" name="inclusa" value="${esc(o)}" ${o === rascunho.inclusa ? "checked" : ""}> ${esc(o)}</label>
      `).join("")}
    </div>` : "";

  $modal.innerHTML = `
    <div class="modal-fundo" data-acao="fechar"></div>
    <div class="modal-caixa" role="dialog" aria-modal="true" aria-label="${esc(item.nome)}" tabindex="-1">
      <button class="fechar" data-acao="fechar" aria-label="Fechar">×</button>
      <div class="modal-topo">
        <div>
          <h2>${esc(item.nome)}</h2>
          <p>${esc(item.descricao)}</p>
        </div>
        ${imgTag(item)}
      </div>
      ${inclusas}
      ${linhas ? `<h3>Adicionais</h3><div class="adicionais">${linhas}</div>` : ""}
      <h3>Observação</h3>
      <textarea id="observacao" placeholder="ex: tirar cebola" maxlength="200">${esc(rascunho.observacao)}</textarea>
      <div class="modal-rodape">
        <div class="subtotal">Subtotal:<strong>${formatarPreco(totalRascunho())}</strong></div>
        <button class="botao" data-acao="adicionar">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 3h3l2.6 11.2a1 1 0 0 0 1 .8h9.7a1 1 0 0 0 1-.8L21 7H6.2" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9.5" cy="19.5" r="1.6" fill="currentColor"/><circle cx="17" cy="19.5" r="1.6" fill="currentColor"/></svg>
          Adicionar
        </button>
      </div>
    </div>`;
}

function atualizarModalParcial() {
  // Re-renderiza sem perder o texto digitado na observação.
  const obs = $modal.querySelector("#observacao");
  if (obs) rascunho.observacao = obs.value;
  const rolagem = $modal.querySelector(".modal-caixa")?.scrollTop || 0;
  renderModal();
  $modal.querySelector(".modal-caixa").scrollTop = rolagem;
}

function adicionarAoCarrinho() {
  const obs = $modal.querySelector("#observacao");
  if (obs) rascunho.observacao = obs.value.trim();
  const { item } = rascunho;
  estado.carrinho.push({
    uid: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    itemId: item.id,
    nome: item.nome,
    descricao: item.descricao,
    imagem: item.imagem || null,
    preco: item.preco,
    quantidade: 1,
    inclusa: rascunho.inclusa,
    adicionais: rascunho.adicionais.filter((a) => a.quantidade > 0),
    observacao: rascunho.observacao,
  });
  salvar();
  atualizarBadge();
  fecharModal();
  avisar(`${item.nome} adicionado ao carrinho`);
}

// ---------- formulários ----------

function guardarFormulario(id) {
  const form = document.getElementById(id);
  if (!form) return null;
  new FormData(form).forEach((valor, chave) => { estado.cliente[chave] = String(valor).trim(); });
  salvar();
  return form;
}

function lerFormulario(id) {
  const form = guardarFormulario(id);
  if (!form) return true;

  form.querySelectorAll(".erro").forEach((el) => el.classList.remove("erro"));
  const invalidos = [...form.querySelectorAll("[required]")].filter((el) => !el.value.trim());
  if (invalidos.length) {
    invalidos.forEach((el) => el.closest(".campo")?.classList.add("erro"));
    invalidos[0].focus();
    avisar("Preencha os campos destacados");
    return false;
  }
  return true;
}

function lerValor(texto) {
  const n = Number(String(texto).replace(/[^\d,.]/g, "").replace(/\.(?=\d{3}\b)/g, "").replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}

function validarTelefone() {
  const digitos = estado.cliente.telefone.replace(/\D/g, "");
  if (digitos.length < 10 || digitos.length > 11) {
    const el = document.querySelector('[name="telefone"]');
    el.closest(".campo").classList.add("erro");
    el.focus();
    avisar("Telefone inválido — use DDD + número");
    return false;
  }
  return true;
}

function validarTroco() {
  const c = estado.cliente;
  if (c.pagamento !== "Dinheiro" || !c.troco) return true;
  const total = subtotalCarrinho() + (taxaEntrega(c.bairro) || 0);
  if (lerValor(c.troco) < total) {
    const el = document.querySelector('[name="troco"]');
    el.closest(".campo").classList.add("erro");
    el.focus();
    avisar(`O troco precisa ser maior que ${formatarPreco(total)}`);
    return false;
  }
  return true;
}

function clienteParaMensagem() {
  const c = { ...estado.cliente };
  c.troco = c.pagamento === "Dinheiro" && c.troco ? lerValor(c.troco) : "";
  return c;
}

let ultimoPedido = null;

function finalizar() {
  ultimoPedido = { carrinho: estado.carrinho, cliente: clienteParaMensagem() };
  enviarPedido(ultimoPedido.carrinho, ultimoPedido.cliente);
  estado.carrinho = [];
  salvar();
  atualizarBadge();
  location.hash = "obrigado";
}

// ---------- eventos ----------

document.addEventListener("click", (e) => {
  const alvo = e.target.closest("[data-acao]");
  if (!alvo) return;
  const acao = alvo.dataset.acao;

  switch (acao) {
    case "categoria":
      estado.categoria = alvo.dataset.id;
      render();
      break;
    case "abrir-item":
      abrirItem(alvo.dataset.id);
      break;
    case "fechar":
      fecharModal();
      break;
    case "mais":
    case "menos": {
      const a = rascunho.adicionais[Number(alvo.dataset.i)];
      a.quantidade = Math.max(0, Math.min(9, a.quantidade + (acao === "mais" ? 1 : -1)));
      atualizarModalParcial();
      break;
    }
    case "adicionar":
      adicionarAoCarrinho();
      break;
    case "remover":
      estado.carrinho = estado.carrinho.filter((i) => i.uid !== alvo.dataset.uid);
      salvar();
      atualizarBadge();
      render();
      break;
    case "ir-endereco":
      location.hash = "endereco";
      break;
    case "ir-dados":
      if (lerFormulario("form-endereco")) location.hash = "dados";
      break;
    case "ir-resumo":
      if (lerFormulario("form-dados") && validarTelefone() && validarTroco()) location.hash = "resumo";
      break;
    case "copiar-pix":
      copiar(CONFIG.pix.chave.replace(/\D/g, "") || CONFIG.pix.chave);
      break;
    case "finalizar":
      finalizar();
      break;
    case "reenviar":
      if (ultimoPedido) enviarPedido(ultimoPedido.carrinho, ultimoPedido.cliente);
      break;
  }
});

document.addEventListener("change", (e) => {
  if (e.target.name === "inclusa" && rascunho) {
    rascunho.inclusa = e.target.value;
  }
  if (e.target.name === "pagamento") {
    guardarFormulario("form-dados");
    render();
  }
});

document.addEventListener("input", (e) => {
  if (e.target.name === "telefone") e.target.value = mascaraTelefone(e.target.value);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !$modal.hidden) fecharModal();
});

function mascaraTelefone(valor) {
  const d = valor.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

async function copiar(texto) {
  try {
    await navigator.clipboard.writeText(texto);
  } catch (e) {
    const t = document.createElement("textarea");
    t.value = texto;
    document.body.appendChild(t);
    t.select();
    document.execCommand("copy");
    t.remove();
  }
  avisar("Chave Pix copiada");
}

// ---------- roteamento ----------

const TELAS = {
  inicio: telaInicio,
  cardapio: telaCardapio,
  carrinho: telaCarrinho,
  endereco: telaEndereco,
  dados: telaDados,
  resumo: telaResumo,
  obrigado: telaObrigado,
};

function telaAtual() {
  const nome = location.hash.slice(1);
  return TELAS[nome] ? nome : "inicio";
}

function render() {
  let tela = telaAtual();

  // Não deixa entrar no checkout com carrinho vazio.
  if (TELAS_CHECKOUT.includes(tela) && estado.carrinho.length === 0) {
    location.replace("#carrinho");
    return;
  }
  if (tela === "obrigado" && !ultimoPedido) {
    location.replace("#cardapio");
    return;
  }

  $app.innerHTML = TELAS[tela]();
  document.body.dataset.tela = tela;

  const aba = TELAS_CHECKOUT.includes(tela) || tela === "obrigado" ? "carrinho" : tela;
  document.querySelectorAll(".menu-inferior a").forEach((a) => {
    a.classList.toggle("ativa", a.dataset.aba === aba);
  });
}

window.addEventListener("hashchange", () => {
  if (!$modal.hidden) fecharModal();
  $aviso.classList.remove("visivel");
  render();
  window.scrollTo(0, 0);
});

carregar();
atualizarBadge();
render();
