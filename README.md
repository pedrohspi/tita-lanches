# Tita Lanches

Cardápio digital com pedido pelo WhatsApp. Feito em React + Vite, sem backend e sem custo de servidor.

## Como funciona

1. O cliente monta o pedido no site (lanches, adicionais, observação).
2. Preenche endereço, dados e forma de pagamento.
3. Ao finalizar, o WhatsApp abre com a mensagem do pedido pronta para enviar à loja.

## Rodando localmente

```bash
npm install
npm run dev
```

## Estrutura

```
src/
├── main.jsx                  # ponto de entrada
├── App.jsx                   # rotas
├── global.css                # cores, fontes e estilos base
├── dados/
│   ├── config.js             # WhatsApp, taxas de entrega por bairro, Pix, formas de pagamento
│   └── cardapio.js           # categorias, lanches, preços e adicionais
├── contexto/
│   ├── PedidoContext.jsx     # carrinho e dados do cliente (salvos no navegador)
│   └── AvisoContext.jsx      # mensagens rápidas na tela
├── hooks/
│   └── useFormularioCliente.js
├── utils/
│   └── pedido.js             # preços, frete e mensagem do WhatsApp
├── components/               # Botao, CardProduto, ModalAdicionais, Campo, RodapeTotal...
└── paginas/                  # Inicio, Cardapio, Carrinho, Endereco, Dados, Resumo, Obrigado
public/
└── img/lanches/              # fotos dos lanches (padrao.svg = imagem provisória)
```

## Editando

- **Preços e itens:** `src/dados/cardapio.js`. Categoria sem itens não aparece no site.
- **Fotos:** coloque o arquivo em `public/img/lanches/` e adicione `imagem: "barao.jpg"` ao item.
- **Número do WhatsApp e Pix:** `src/dados/config.js`
- **Frete:** preencha `taxasEntrega` em `src/dados/config.js` com o valor de cada bairro. Bairro fora da lista sai como "a combinar" na mensagem.

## Publicação

O site é publicado automaticamente no GitHub Pages a cada push na `main` (`.github/workflows/deploy.yml`).

Configuração única no GitHub: **Settings → Pages → Source: GitHub Actions**.

Endereço: https://pedrohspi.github.io/tita-lanches/
