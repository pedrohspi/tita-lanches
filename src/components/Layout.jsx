import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import LimiteErro from "./LimiteErro";
import Navegacao from "./Navegacao";
import Topo from "./Topo";
import styles from "./Layout.module.css";

// No celular, início e cardápio usam o logo grande; as demais telas, o compacto.
const TOPO_GRANDE = ["/", "/cardapio"];

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Topo compacto={!TOPO_GRANDE.includes(pathname)} />
      <main
        className={[
          styles.conteudo,
          TOPO_GRANDE.includes(pathname) && styles.topoGrande,
          pathname === "/" && styles.inicio,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {/* key: ao trocar de tela, um erro anterior é descartado */}
        <LimiteErro key={pathname}>
          <Outlet />
        </LimiteErro>
      </main>
      <Navegacao posicao="inferior" />
    </>
  );
}
