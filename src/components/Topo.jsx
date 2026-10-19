import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import styles from "./Topo.module.css";

export default function Topo({ compacto = false }) {
  return (
    <header className={`largura-app ${styles.topo} ${compacto ? styles.compacto : ""}`}>
      <Link to="/" aria-label="Início">
        <img src={logo} alt="Tita Lanches" className={styles.logo} />
      </Link>
    </header>
  );
}
