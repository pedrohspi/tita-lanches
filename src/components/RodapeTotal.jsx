import Botao from "./Botao";
import { usePedido } from "../contexto/PedidoContext";
import { formatarPreco, subtotal, taxaEntrega } from "../utils/pedido";
import styles from "./RodapeTotal.module.css";

// Barra fixa com o total do pedido e o botão de avançar.
// Com "comFrete", mostra a taxa do bairro (ou "a combinar").
export default function RodapeTotal({ comFrete = false, textoBotao, onAvancar }) {
  const { carrinho, cliente } = usePedido();
  const sub = subtotal(carrinho);
  const taxa = comFrete ? taxaEntrega(cliente.bairro) : null;
  const total = taxa === null ? sub : sub + taxa;

  return (
    <div className={`largura-app ${styles.rodape}`}>
      <div className={styles.valores}>
        {comFrete && (
          <span className={styles.frete}>
            Frete: {taxa === null ? "a combinar" : `+ ${formatarPreco(taxa)}`}
          </span>
        )}
        <strong>Total: {formatarPreco(total)}</strong>
      </div>
      <Botao className={styles.botao} onClick={onAvancar}>{textoBotao}</Botao>
    </div>
  );
}
