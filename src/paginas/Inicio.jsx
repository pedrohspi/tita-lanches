import Botao from "../components/Botao";
import styles from "./Inicio.module.css";

const BASE = import.meta.env.BASE_URL;
const FUNDO = `${BASE}img/inicio.jpg`;
const DESTAQUE = `${BASE}img/lanches/especial-da-casa.jpg`;

export default function Inicio() {
  return (
    <section className={styles.inicio} style={{ "--fundo": `url(${FUNDO})` }}>
      <div className={`conteiner ${styles.interno}`}>
        <h1 className={styles.chamada}>
          O lanche perfeito,
          <br />
          feito para você!
        </h1>
        <p className={styles.sub}>
          Monte seu pedido, escolha os adicionais e receba em casa. O pedido vai direto para o nosso WhatsApp.
        </p>
        <img className={styles.foto} src={DESTAQUE} alt="Lanche da Tita Lanches" fetchPriority="high" />
        <div className={styles.acao}>
          <Botao para="/cardapio" tamanho="grande">Saiba mais</Botao>
        </div>
      </div>
    </section>
  );
}
