import { Link } from "react-router-dom";
import { IconeVoltar } from "./Icones";
import styles from "./Cabecalho.module.css";

export default function Cabecalho({ titulo, voltarPara }) {
  return (
    <div className={styles.cabecalho}>
      <Link to={voltarPara} className={styles.voltar} aria-label="Voltar">
        <IconeVoltar />
      </Link>
      <h1>{titulo}</h1>
    </div>
  );
}
