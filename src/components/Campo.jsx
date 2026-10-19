import styles from "./Campo.module.css";

// Campo de formulário com rótulo. Use "opcoes" para virar um select.
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

// Bloco de rótulo sem input, para conteúdos customizados (ex.: chave Pix).
export function Grupo({ rotulo, children }) {
  return (
    <div className={styles.campo}>
      <span>{rotulo}</span>
      {children}
    </div>
  );
}
