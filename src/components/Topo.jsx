import { Link } from "react-router-dom";
import Navegacao from "./Navegacao";
import logo from "../assets/logo.png";
import styles from "./Topo.module.css";

export default function Topo({ compacto = false }) {
  return (
    <header className={`${styles.topo} ${compacto ? styles.compacto : ""}`}>
      <div className={`conteiner ${styles.interno}`}>
        <Link to="/" className={styles.marca} aria-label="Início">
          <img src={logo} alt="Tita Lanches" className={styles.logo} />
          <span className={styles.nome}>Tita Lanches</span>
        </Link>
        <Navegacao posicao="topo" />
      </div>
    </header>
  );
}
