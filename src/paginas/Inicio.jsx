import Botao from "../components/Botao";
import styles from "./Inicio.module.css";

const FOTO = `${import.meta.env.BASE_URL}img/lanches/padrao.svg`;

export default function Inicio() {
  return (
    <section className={styles.inicio}>
      <h1 className={styles.chamada}>
        O lanche perfeito,
        <br />
        feito para você!
      </h1>
      <img className={styles.foto} src={FOTO} alt="" />
      <Botao para="/cardapio" tamanho="grande">Saiba mais</Botao>
    </section>
  );
}
