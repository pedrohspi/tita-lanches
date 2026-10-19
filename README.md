# Tita Lanches

Cardápio digital com pedido pelo WhatsApp. Site estático (HTML, CSS e JavaScript puro), sem backend e sem custo de servidor.

## Como funciona

1. O cliente monta o pedido no site (lanches, adicionais, observação).
2. Preenche endereço, dados e forma de pagamento.
3. Ao finalizar, o WhatsApp abre com a mensagem do pedido pronta para enviar à loja.

## Estrutura

```
tita-lanches/
├── index.html            # página única do app
├── css/
│   └── style.css         # estilos
├── js/
│   ├── config.js         # número do WhatsApp, frete, Pix, formas de pagamento
│   ├── cardapio.js       # categorias, lanches, preços e adicionais
│   ├── whatsapp.js       # monta a mensagem e abre o WhatsApp
│   └── app.js            # telas, carrinho e checkout
└── assets/
    └── img/
        ├── logo.png
        └── lanches/      # fotos dos lanches (nome = id do item .jpg)
```

## Editando

- **Preços e itens:** `js/cardapio.js`
- **Número do WhatsApp, frete e Pix:** `js/config.js`

## Rodando localmente

Basta abrir o `index.html` no navegador, ou:

```bash
npx serve .
```

## Publicação

GitHub Pages: Settings → Pages → Deploy from branch → `main` / root.
