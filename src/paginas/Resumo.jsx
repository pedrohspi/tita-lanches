import { Link, useNavigate } from "react-router-dom";
import Cabecalho from "../components/Cabecalho";
import CardProduto, { DetalhesItem } from "../components/CardProduto";
import RodapeTotal from "../components/RodapeTotal";
import { usePedido } from "../contexto/PedidoContext";
import { formatarPreco, lerValor, totalDoItem } from "../utils/pedido";
import comum from "./Paginas.module.css";
import styles from "./Resumo.module.css";

export default function Resumo() {
  const { carrinho, cliente: c, finalizar } = usePedido();
  const navegar = useNavigate();

  const concluir = () => {
    finalizar();
    navegar("/obrigado");
  };

  return (
    <div className="conteiner">
      <Cabecalho titulo="Resumo" voltarPara="/dados" />
      <div className={comum.colunas}>
        <section className={`${comum.lista} ${comum.comRodape}`}>
          {carrinho.map((item) => (
            <CardProduto key={item.uid} item={item} preco={totalDoItem(item)}>
              <DetalhesItem item={item} />
            </CardProduto>
          ))}

          <article className={styles.entrega}>
            <h2>Entrega</h2>
            <p>
              {c.rua}, {c.numero} — {c.bairro}
            </p>
            {c.complemento && <p>{c.complemento}</p>}
            {c.referencia && <p>Ref.: {c.referencia}</p>}
            <p>
              {c.nome} · {c.telefone}
            </p>
            <p>
              Pagamento: {c.pagamento}
              {c.pagamento === "Dinheiro" && c.troco && ` (troco para ${formatarPreco(lerValor(c.troco))})`}
            </p>
            <Link to="/endereco" className={comum.link}>
              Alterar
            </Link>
          </article>
        </section>
        <RodapeTotal comFrete textoBotao="Finalizar" onAvancar={concluir} />
      </div>
    </div>
  );
}
