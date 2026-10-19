import { srcImagem } from "../utils/pedido";
import styles from "./ImagemLanche.module.css";

const PADRAO = `${import.meta.env.BASE_URL}img/lanches/padrao.svg`;

export default function ImagemLanche({ item, className = "" }) {
  return (
    <img
      className={`${styles.foto} ${className}`}
      src={srcImagem(item)}
      alt=""
      loading="lazy"
      onError={(e) => {
        if (!e.currentTarget.src.endsWith("padrao.svg")) e.currentTarget.src = PADRAO;
      }}
    />
  );
}
