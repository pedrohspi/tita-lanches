import { HashRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { AvisoProvider } from "./contexto/AvisoContext";
import { PedidoProvider, usePedido } from "./contexto/PedidoContext";
import Carrinho from "./paginas/Carrinho";
import Cardapio from "./paginas/Cardapio";
import Dados from "./paginas/Dados";
import Endereco from "./paginas/Endereco";
import Inicio from "./paginas/Inicio";
import Obrigado from "./paginas/Obrigado";
import Resumo from "./paginas/Resumo";

// Checkout exige carrinho com itens
function RequerCarrinho() {
  const { carrinho } = usePedido();
  return carrinho.length > 0 ? <Outlet /> : <Navigate to="/carrinho" replace />;
}

// HashRouter funciona no GitHub Pages sem configurar servidor
export default function App() {
  return (
    <HashRouter>
      <PedidoProvider>
        <AvisoProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Inicio />} />
              <Route path="cardapio" element={<Cardapio />} />
              <Route path="carrinho" element={<Carrinho />} />
              <Route element={<RequerCarrinho />}>
                <Route path="endereco" element={<Endereco />} />
                <Route path="dados" element={<Dados />} />
                <Route path="resumo" element={<Resumo />} />
              </Route>
              <Route path="obrigado" element={<Obrigado />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </AvisoProvider>
      </PedidoProvider>
    </HashRouter>
  );
}
