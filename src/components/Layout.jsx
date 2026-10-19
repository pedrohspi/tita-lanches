import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import LimiteErro from "./LimiteErro";
import Topo from "./Topo";
import MenuInferior from "./MenuInferior";
import styles from "./Layout.module.css";

// Início e cardápio usam o logo grande; as demais telas, o compacto.
const TOPO_GRANDE = ["/", "/cardapio"];

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => window.scrollTo(0, 0), [pathname]);

  return (
    <>
      <Topo compacto={!TOPO_GRANDE.includes(pathname)} />
      <main className={`largura-app ${styles.conteudo}`}>
        {/* key: ao trocar de tela, um erro anterior é descartado */}
        <LimiteErro key={pathname}>
          <Outlet />
        </LimiteErro>
      </main>
      <MenuInferior />
    </>
  );
}
