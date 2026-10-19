import { Link } from "react-router-dom";
import styles from "./Botao.module.css";

// variante: "padrao" | "remover" | "copiar"   tamanho: "normal" | "grande"
// Com "para", vira um link de navegação com aparência de botão.
export default function Botao({ para, variante = "padrao", tamanho = "normal", className = "", children, ...props }) {
  const classes = [styles.botao, styles[variante], styles[tamanho], className].filter(Boolean).join(" ");

  if (para) {
    return <Link to={para} className={classes} {...props}>{children}</Link>;
  }
  return <button type="button" className={classes} {...props}>{children}</button>;
}
