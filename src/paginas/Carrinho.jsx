import { useNavigate } from "react-router-dom";
import Botao from "../components/Botao";
import Cabecalho from "../components/Cabecalho";
import CardProduto, { DetalhesItem } from "../components/CardProduto";
import RodapeTotal from "../components/RodapeTotal";
import { usePedido } from "../contexto/PedidoContext";
import { totalDoItem } from "../utils/pedido";
import comum from "./Paginas.module.css";

export default function Carrinho() {
  const { carrinho, remover } = usePedido();
  const navegar = useNavigate();

  if (carrinho.length === 0) {
    return (
      <>
        <Cabecalho titulo="Carrinho" voltarPara="/cardapio" />
        <section className={comum.vazio}>
          <p>Seu carrinho está vazio.</p>
          <Botao para="/cardapio">Ver cardápio</Botao>
        </section>
      </>
    );
  }

  return (
    <>
      <Cabecalho titulo="Carrinho" voltarPara="/cardapio" />
      <section className={`${comum.lista} ${comum.comRodape}`}>
        {carrinho.map((item) => (
          <CardProduto
            key={item.uid}
            item={item}
            preco={totalDoItem(item)}
            acao={<Botao variante="remover" onClick={() => remover(item.uid)}>Remover</Botao>}
          >
            <DetalhesItem item={item} />
          </CardProduto>
        ))}
      </section>
      <RodapeTotal textoBotao="Avançar" onAvancar={() => navegar("/endereco")} />
    </>
  );
}
