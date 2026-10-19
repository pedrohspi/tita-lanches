import { Component } from "react";
import styles from "./LimiteErro.module.css";

// Se algo quebrar ao desenhar uma tela, mostra uma mensagem em vez de tela preta.
export default class LimiteErro extends Component {
  state = { erro: null, componentes: "" };

  static getDerivedStateFromError(erro) {
    return { erro };
  }

  componentDidCatch(erro, info) {
    console.error("Erro na tela:", erro, info?.componentStack);
    // Primeiros componentes da pilha ajudam a achar onde quebrou.
    const componentes = (info?.componentStack || "")
      .split("\n")
      .map((l) => l.trim().replace(/^at\s+/, "").split(" ")[0])
      .filter(Boolean)
      .slice(0, 6)
      .join(" < ");
    this.setState({ componentes });
  }

  render() {
    const { erro, componentes } = this.state;
    if (!erro) return this.props.children;

    return (
      <section className={styles.erro}>
        <h1>Ops, algo deu errado.</h1>
        <p>Recarregue a página para continuar. Seu carrinho foi salvo.</p>
        <button className={styles.botao} onClick={() => window.location.reload()}>
          Recarregar
        </button>
        <details>
          <summary>Detalhes técnicos</summary>
          <pre>
            {String(erro?.message || erro)}
            {componentes && `\n\nEm: ${componentes}`}
            {erro?.stack && `\n\n${erro.stack.split("\n").slice(0, 4).join("\n")}`}
            {"\n\n"}
            {navigator.userAgent}
          </pre>
        </details>
      </section>
    );
  }
}
