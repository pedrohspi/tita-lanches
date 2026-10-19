import { useEffect, useRef, useState } from "react";
import Botao from "./Botao";
import Contador from "./Contador";
import ImagemLanche from "./ImagemLanche";
import { IconeCarrinho } from "./Icones";
import { ADICIONAIS, OPCOES_INCLUSAS } from "../dados/cardapio";
import { formatarPreco, totalDoItem } from "../utils/pedido";
import styles from "./ModalAdicionais.module.css";

// Modal aberto ao tocar em "Comprar": escolha inclusa, adicionais e observação.
export default function ModalAdicionais({ item, aceitaAdicionais, onAdicionar, onFechar }) {
  const [adicionais, setAdicionais] = useState(() =>
    aceitaAdicionais ? ADICIONAIS.map((a) => ({ ...a, quantidade: 0 })) : [],
  );
  const [inclusa, setInclusa] = useState(aceitaAdicionais ? OPCOES_INCLUSAS[0] : "");
  const [observacao, setObservacao] = useState("");
  const caixa = useRef(null);

  // Trava a rolagem da página, foca o modal e fecha com Esc.
  useEffect(() => {
    document.body.classList.add("travado");
    caixa.current?.focus();
    const aoTeclar = (e) => e.key === "Escape" && onFechar();
    window.addEventListener("keydown", aoTeclar);
    return () => {
      document.body.classList.remove("travado");
      window.removeEventListener("keydown", aoTeclar);
    };
  }, [onFechar]);

  const mudarQuantidade = (id, quantidade) =>
    setAdicionais((lista) => lista.map((a) => (a.id === id ? { ...a, quantidade } : a)));

  const total = totalDoItem({ preco: item.preco, adicionais, quantidade: 1 });

  const adicionar = () =>
    onAdicionar({
      itemId: item.id,
      nome: item.nome,
      descricao: item.descricao,
      imagem: item.imagem || null,
      preco: item.preco,
      quantidade: 1,
      inclusa,
      adicionais: adicionais.filter((a) => a.quantidade > 0),
      observacao: observacao.trim(),
    });

  return (
    <div className={styles.modal}>
      <div className={styles.fundo} onClick={onFechar} />
      <div ref={caixa} className={styles.caixa} role="dialog" aria-modal="true" aria-label={item.nome} tabIndex={-1}>
        <button className={styles.fechar} onClick={onFechar} aria-label="Fechar">×</button>

        <div className={styles.topo}>
          <div>
            <h2>{item.nome}</h2>
            <p>{item.descricao}</p>
          </div>
          <ImagemLanche item={item} className={styles.foto} />
        </div>

        {aceitaAdicionais && (
          <>
            <h3>Incluso no lanche</h3>
            <div className={styles.inclusas}>
              {OPCOES_INCLUSAS.map((o) => (
                <label key={o}>
                  <input type="radio" name="inclusa" value={o} checked={inclusa === o} onChange={() => setInclusa(o)} />
                  {o}
                </label>
              ))}
            </div>
          </>
        )}

        {adicionais.length > 0 && (
          <>
            <h3>Adicionais</h3>
            <div className={styles.adicionais}>
              {adicionais.map((a) => (
                <div key={a.id} className={styles.adicional}>
                  <span className={styles.nome}>{a.nome}</span>
                  <span className={styles.preco}>{formatarPreco(a.preco)}</span>
                  <Contador valor={a.quantidade} rotulo={a.nome} onMudar={(q) => mudarQuantidade(a.id, q)} />
                </div>
              ))}
            </div>
          </>
        )}

        <h3>Observação</h3>
        <textarea
          className={styles.observacao}
          placeholder="ex: tirar cebola"
          maxLength={200}
          value={observacao}
          onChange={(e) => setObservacao(e.target.value)}
        />

        <div className={styles.rodape}>
          <div className={styles.subtotal}>
            Subtotal:<strong>{formatarPreco(total)}</strong>
          </div>
          <Botao onClick={adicionar} className={styles.botao}>
            <IconeCarrinho /> Adicionar
          </Botao>
        </div>
      </div>
    </div>
  );
}
