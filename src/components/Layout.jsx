import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import LimiteErro from "./LimiteErro";
import Navegacao from "./Navegacao";
import Topo from "./Topo";
import styles from "./Layout.module.css";

// Telas com logo grande no celular
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
        {/* key limpa o erro ao trocar de tela */}
        <LimiteErro key={pathname}>
          <Outlet />
        </LimiteErro>
      </main>
      <Navegacao posicao="inferior" />
    </>
  );
}
