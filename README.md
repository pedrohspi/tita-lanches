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
│   ├── config.js         # WhatsApp, taxas de entrega por bairro, Pix, formas de pagamento
│   ├── cardapio.js       # categorias, lanches, preços e adicionais
│   ├── whatsapp.js       # monta a mensagem e abre o WhatsApp
│   └── app.js            # telas, carrinho e checkout
└── assets/
    └── img/
        ├── logo.png
        ├── favicon.png
        └── lanches/      # fotos dos lanches (padrao.svg = imagem provisória)
```

## Editando

- **Preços e itens:** `js/cardapio.js`. Categoria sem itens não aparece no site.
- **Fotos:** coloque o arquivo em `assets/img/lanches/` e adicione `imagem: "barao.jpg"` ao item.
- **Número do WhatsApp e Pix:** `js/config.js`
- **Frete:** preencha `taxasEntrega` em `js/config.js` com o valor de cada bairro. Bairro fora da lista sai como "a combinar" na mensagem.

O carrinho fica salvo no navegador do cliente, então ele não perde o pedido se fechar a página.

## Rodando localmente

Basta abrir o `index.html` no navegador, ou:

```bash
npx serve .
```

## Publicação

GitHub Pages: Settings → Pages → Deploy from branch → `main` / root.
