import { useNavigate } from "react-router-dom";
import Cabecalho from "../components/Cabecalho";
import Campo from "../components/Campo";
import RodapeTotal from "../components/RodapeTotal";
import { useFormularioCliente } from "../hooks/useFormularioCliente";
import comum from "./Paginas.module.css";

export default function Endereco() {
  const navegar = useNavigate();
  const { props, validar } = useFormularioCliente(["rua", "bairro", "numero"]);

  const avancar = () => validar() && navegar("/dados");

  return (
    <>
      <Cabecalho titulo="Endereço" voltarPara="/carrinho" />
      <form className={`${comum.formulario} ${comum.comRodape}`} noValidate onSubmit={(e) => { e.preventDefault(); avancar(); }}>
        <Campo rotulo="Rua" placeholder="ex: Rua José da Silva" autoComplete="address-line1" {...props("rua")} />
        <Campo rotulo="Bairro" placeholder="ex: Bancários" {...props("bairro")} />
        <Campo rotulo="Número" placeholder="ex: 101" inputMode="numeric" {...props("numero")} />
        <Campo rotulo="Ponto de referência" opcional placeholder="ex: ao lado da caixa d'água" {...props("referencia")} />
        <Campo rotulo="Complemento" opcional placeholder="ex: ap 102" {...props("complemento")} />
      </form>
      <RodapeTotal textoBotao="Avançar" onAvancar={avancar} />
    </>
  );
}
