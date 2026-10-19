import styles from "./Contador.module.css";

export default function Contador({ valor, onMudar, min = 0, max = 9, rotulo = "" }) {
  return (
    <div className={styles.contador}>
      <button type="button" onClick={() => onMudar(valor - 1)} disabled={valor <= min} aria-label={`Remover ${rotulo}`}>
        −
      </button>
      <b aria-live="polite">{valor}</b>
      <button type="button" onClick={() => onMudar(valor + 1)} disabled={valor >= max} aria-label={`Adicionar ${rotulo}`}>
        +
      </button>
    </div>
  );
}
