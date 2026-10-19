import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { enviarPedido } from "../utils/pedido";

const CHAVE_STORAGE = "tita-lanches:pedido";

const CLIENTE_VAZIO = {
  rua: "", bairro: "", numero: "", referencia: "", complemento: "",
  nome: "", telefone: "", pagamento: "", troco: "",
};

function carregar() {
  try {
    const dados = JSON.parse(localStorage.getItem(CHAVE_STORAGE) || "null");
    return {
      carrinho: Array.isArray(dados?.carrinho) ? dados.carrinho : [],
      cliente: { ...CLIENTE_VAZIO, ...(dados?.cliente || {}) },
    };
  } catch {
    return { carrinho: [], cliente: CLIENTE_VAZIO };
  }
}

const PedidoContext = createContext(null);

export function PedidoProvider({ children }) {
  const [inicial] = useState(carregar);
  const [carrinho, setCarrinho] = useState(inicial.carrinho);
  const [cliente, setCliente] = useState(inicial.cliente);
  const [ultimoPedido, setUltimoPedido] = useState(null);

  // Salva no navegador
  useEffect(() => {
    try {
      localStorage.setItem(CHAVE_STORAGE, JSON.stringify({ carrinho, cliente }));
    } catch {
      /* sem storage: fica só na memória */
    }
  }, [carrinho, cliente]);

  const adicionar = useCallback((item) => {
    const uid = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    setCarrinho((atual) => [...atual, { ...item, uid }]);
  }, []);

  const remover = useCallback((uid) => {
    setCarrinho((atual) => atual.filter((i) => i.uid !== uid));
  }, []);

  const atualizarCliente = useCallback((campos) => {
    setCliente((atual) => ({ ...atual, ...campos }));
  }, []);

  // Carrinho é esvaziado na tela Obrigado; aqui o checkout redirecionaria antes
  const finalizar = useCallback(() => {
    const pedido = { carrinho, cliente };
    enviarPedido(pedido.carrinho, pedido.cliente);
    setUltimoPedido(pedido);
  }, [carrinho, cliente]);

  const esvaziar = useCallback(() => setCarrinho([]), []);

  const valor = useMemo(
    () => ({ carrinho, cliente, ultimoPedido, adicionar, remover, atualizarCliente, finalizar, esvaziar }),
    [carrinho, cliente, ultimoPedido, adicionar, remover, atualizarCliente, finalizar, esvaziar],
  );

  return <PedidoContext.Provider value={valor}>{children}</PedidoContext.Provider>;
}

export function usePedido() {
  const ctx = useContext(PedidoContext);
  if (!ctx) throw new Error("usePedido precisa estar dentro de <PedidoProvider>");
  return ctx;
}
