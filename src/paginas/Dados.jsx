import { useNavigate } from "react-router-dom";
import Botao from "../components/Botao";
import Cabecalho from "../components/Cabecalho";
import Campo, { Grupo } from "../components/Campo";
import RodapeTotal from "../components/RodapeTotal";
import { useAviso } from "../contexto/AvisoContext";
import { usePedido } from "../contexto/PedidoContext";
import { CONFIG } from "../dados/config";
import { useFormularioCliente } from "../hooks/useFormularioCliente";
import { formatarPreco, lerValor, mascaraTelefone, subtotal, taxaEntrega } from "../utils/pedido";
import comum from "./Paginas.module.css";
import styles from "./Dados.module.css";

async function copiarTexto(texto) {
  try {
    await navigator.clipboard.writeText(texto);
  } catch {
    const t = document.createElement("textarea");
    t.value = texto;
    document.body.appendChild(t);
    t.select();
    document.execCommand("copy");
    t.remove();
  }
}

export default function Dados() {
  const navegar = useNavigate();
  const avisar = useAviso();
  const { carrinho } = usePedido();
  const { cliente, props, validar, marcarErro } = useFormularioCliente(["nome", "telefone", "pagamento"]);

  const avancar = () => {
    if (!validar()) return;

    const digitos = cliente.telefone.replace(/\D/g, "");
    if (digitos.length < 10 || digitos.length > 11) {
      return marcarErro("telefone", "Telefone inválido — use DDD + número");
    }

    if (cliente.pagamento === "Dinheiro" && cliente.troco) {
      const total = subtotal(carrinho) + (taxaEntrega(cliente.bairro) || 0);
      if (lerValor(cliente.troco) < total) {
        return marcarErro("troco", `O troco precisa ser maior que ${formatarPreco(total)}`);
      }
    }

    navegar("/resumo");
  };

  const copiarPix = async () => {
    await copiarTexto(CONFIG.pix.chave.replace(/\D/g, "") || CONFIG.pix.chave);
    avisar("Chave Pix copiada");
  };

  return (
    <>
      <Cabecalho titulo="Dados" voltarPara="/endereco" />
      <form className={`${comum.formulario} ${comum.comRodape}`} noValidate onSubmit={(e) => { e.preventDefault(); avancar(); }}>
        <Campo rotulo="Nome" placeholder="ex: José da Silva" autoComplete="name" {...props("nome")} />
        <Campo
          rotulo="Telefone"
          type="tel"
          placeholder="ex: (84) 99834-9412"
          autoComplete="tel"
          {...props("telefone", { transformar: mascaraTelefone })}
        />
        <Campo rotulo="Forma de pagamento" opcoes={CONFIG.formasPagamento} {...props("pagamento")} />

        {cliente.pagamento === "Dinheiro" && (
          <Campo rotulo="Troco para" opcional placeholder="R$ 50,00" inputMode="decimal" {...props("troco")} />
        )}

        {cliente.pagamento === "Pix" && (
          <>
            <Grupo rotulo="Chave Pix:">
              <div className={styles.pix}>
                <div>
                  <strong>{CONFIG.pix.chave}</strong>
                  <small>{CONFIG.pix.titular}</small>
                </div>
                <Botao variante="copiar" onClick={copiarPix}>Copiar</Botao>
              </div>
            </Grupo>
            <div className={styles.importante}>
              <strong>Importante</strong>
              Enviar o comprovante no WhatsApp
            </div>
          </>
        )}
      </form>
      <RodapeTotal textoBotao="Avançar" onAvancar={avancar} />
    </>
  );
}
