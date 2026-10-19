import Botao from "./Botao";
import { usePedido } from "../contexto/PedidoContext";
import { formatarPreco, subtotal, taxaEntrega } from "../utils/pedido";
import styles from "./RodapeTotal.module.css";

// Total do pedido com o botão de avançar.
// Celular: barra fixa no rodapé. Computador: painel lateral que acompanha a rolagem.
// Com "comFrete", mostra a taxa do bairro (ou "a combinar").
export default function RodapeTotal({ comFrete = false, textoBotao, onAvancar }) {
  const { carrinho, cliente } = usePedido();
  const sub = subtotal(carrinho);
  const taxa = comFrete ? taxaEntrega(cliente.bairro) : null;
  const total = taxa === null ? sub : sub + taxa;
  const qtd = carrinho.length;

  return (
    <aside className={styles.rodape}>
      <h2 className={styles.titulo}>Seu pedido</h2>
      <div className={styles.linhas}>
        <p>
          <span>{qtd} {qtd === 1 ? "item" : "itens"}</span>
          <span>{formatarPreco(sub)}</span>
        </p>
        {comFrete && (
          <p>
            <span>Entrega</span>
            <span>{taxa === null ? "a combinar" : formatarPreco(taxa)}</span>
          </p>
        )}
      </div>
      <div className={styles.valores}>
        {comFrete && (
          <span className={styles.frete}>
            Frete: {taxa === null ? "a combinar" : `+ ${formatarPreco(taxa)}`}
          </span>
        )}
        <strong>Total: {formatarPreco(total)}</strong>
      </div>
      <Botao className={styles.botao} onClick={onAvancar}>{textoBotao}</Botao>
    </aside>
  );
}
