import { NavLink, useLocation } from "react-router-dom";
import { usePedido } from "../contexto/PedidoContext";
import { IconeCarrinho, IconeCasa, IconeMenu } from "./Icones";
import styles from "./MenuInferior.module.css";

// Telas do checkout destacam a aba "Carrinho".
const ROTAS_CARRINHO = ["/carrinho", "/endereco", "/dados", "/resumo", "/obrigado"];

export default function MenuInferior() {
  const { carrinho } = usePedido();
  const { pathname } = useLocation();
  const noCarrinho = ROTAS_CARRINHO.includes(pathname);

  const classe = ({ isActive }) => (isActive ? `${styles.item} ${styles.ativo}` : styles.item);

  return (
    <nav className={`largura-app ${styles.menu}`} aria-label="Navegação">
      <NavLink to="/cardapio" className={classe}>
        <IconeMenu />
        <span>Cardápio</span>
      </NavLink>
      <NavLink to="/" end className={classe}>
        <IconeCasa />
        <span>Início</span>
      </NavLink>
      <NavLink to="/carrinho" className={() => classe({ isActive: noCarrinho })}>
        <span className={styles.icone}>
          <IconeCarrinho />
          {carrinho.length > 0 && <b className={styles.badge}>{carrinho.length}</b>}
        </span>
        <span>Carrinho</span>
      </NavLink>
    </nav>
  );
}
