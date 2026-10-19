import { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Botao from "../components/Botao";
import Entregador from "../components/Entregador";
import { usePedido } from "../contexto/PedidoContext";
import { enviarPedido } from "../utils/pedido";
import comum from "./Paginas.module.css";
import styles from "./Obrigado.module.css";

export default function Obrigado() {
  const { ultimoPedido, esvaziar } = usePedido();

  useEffect(() => {
    if (ultimoPedido) esvaziar();
  }, [ultimoPedido, esvaziar]);

  if (!ultimoPedido) return <Navigate to="/cardapio" replace />;

  return (
    <section className={styles.obrigado}>
      <h1>Obrigado pela preferência!</h1>
      <Entregador className={styles.entregador} />
      <h2>Em breve seu pedido estará na sua casa!</h2>
      <p>Se o WhatsApp não abriu, toque abaixo para enviar o pedido.</p>
      <Botao onClick={() => enviarPedido(ultimoPedido.carrinho, ultimoPedido.cliente)}>Abrir WhatsApp</Botao>
      <Link to="/cardapio" className={comum.link}>Fazer outro pedido</Link>
    </section>
  );
}
