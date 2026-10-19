import styles from "./Campo.module.css";

// Com "opcoes", vira select
export default function Campo({ rotulo, opcional = false, erro = false, opcoes, placeholderSelect = "Selecione", ...props }) {
  return (
    <label className={`${styles.campo} ${erro ? styles.erro : ""}`}>
      <span>
        {rotulo}
        {opcional && <em> (opcional)</em>}
      </span>
      {opcoes ? (
        <select {...props}>
          <option value="" disabled>{placeholderSelect}</option>
          {opcoes.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input {...props} />
      )}
    </label>
  );
}

// Rótulo com conteúdo livre
export function Grupo({ rotulo, children }) {
  return (
    <div className={styles.campo}>
      <span>{rotulo}</span>
      {children}
    </div>
  );
}
