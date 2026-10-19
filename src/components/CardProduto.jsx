import ImagemLanche from "./ImagemLanche";
import { formatarPreco } from "../utils/pedido";
import styles from "./CardProduto.module.css";

// "preco" substitui o do item; "acao" fica sob a foto
export default function CardProduto({ item, preco = item.preco, acao, children }) {
  return (
    <article className={styles.card}>
      <div className={styles.info}>
        <h2>{item.nome}</h2>
        <p>{item.descricao}</p>
        {children}
        <span className={styles.preco}>{formatarPreco(preco)}</span>
      </div>
      <div className={styles.lado}>
        <ImagemLanche item={item} />
        {acao}
      </div>
    </article>
  );
}

// Detalhes do item no carrinho
export function DetalhesItem({ item }) {
  const extras = (item.adicionais || []).filter((a) => a.quantidade > 0);
  return (
    <>
      {item.inclusa && <p className={styles.detalhe}>Com {item.inclusa}</p>}
      {extras.length > 0 && (
        <p className={styles.detalhe}>
          Adicionais: {extras.map((a) => `${a.quantidade} ${a.nome}`).join(", ")}
        </p>
      )}
      {item.observacao && <p className={styles.detalhe}>Obs: {item.observacao}</p>}
    </>
  );
}
