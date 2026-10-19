import { Link } from "react-router-dom";
import styles from "./Botao.module.css";

// variante: padrao | remover | copiar. Com "para", vira link.
export default function Botao({ para, variante = "padrao", tamanho = "normal", className = "", children, ...props }) {
  const classes = [styles.botao, styles[variante], styles[tamanho], className].filter(Boolean).join(" ");

  if (para) {
    return <Link to={para} className={classes} {...props}>{children}</Link>;
  }
  return <button type="button" className={classes} {...props}>{children}</button>;
}
