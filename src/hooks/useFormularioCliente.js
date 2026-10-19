import { useState } from "react";
import { usePedido } from "../contexto/PedidoContext";
import { useAviso } from "../contexto/AvisoContext";

// Liga campos ao cliente e valida obrigatórios. Uso: <Campo {...props("rua")} />
export function useFormularioCliente(obrigatorios) {
  const { cliente, atualizarCliente } = usePedido();
  const avisar = useAviso();
  const [erros, setErros] = useState({});

  const props = (nome, { transformar } = {}) => ({
    name: nome,
    value: cliente[nome] ?? "",
    erro: Boolean(erros[nome]),
    onChange: (e) => {
      const valor = transformar ? transformar(e.target.value) : e.target.value;
      atualizarCliente({ [nome]: valor });
      if (erros[nome]) setErros((atual) => ({ ...atual, [nome]: false }));
    },
  });

  const marcarErro = (nome, mensagem) => {
    setErros((atual) => ({ ...atual, [nome]: true }));
    document.querySelector(`[name="${nome}"]`)?.focus();
    avisar(mensagem);
    return false;
  };

  const validar = () => {
    const faltando = obrigatorios.filter((nome) => !String(cliente[nome] ?? "").trim());
    if (faltando.length === 0) return true;
    setErros(Object.fromEntries(faltando.map((n) => [n, true])));
    document.querySelector(`[name="${faltando[0]}"]`)?.focus();
    avisar("Preencha os campos destacados");
    return false;
  };

  return { cliente, props, validar, marcarErro };
}
