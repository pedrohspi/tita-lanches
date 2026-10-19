import { useCallback, useState } from "react";
import Botao from "../components/Botao";
import CardProduto from "../components/CardProduto";
import ModalAdicionais from "../components/ModalAdicionais";
import { useAviso } from "../contexto/AvisoContext";
import { usePedido } from "../contexto/PedidoContext";
import { categoriasVisiveis } from "../dados/cardapio";
import comum from "./Paginas.module.css";
import styles from "./Cardapio.module.css";

export default function Cardapio() {
  const categorias = categoriasVisiveis();
  const [categoriaId, setCategoriaId] = useState(categorias[0]?.id);
  const [selecionado, setSelecionado] = useState(null);
  const { adicionar } = usePedido();
  const avisar = useAviso();

  const atual = categorias.find((c) => c.id === categoriaId) ?? categorias[0];
  const fechar = useCallback(() => setSelecionado(null), []);

  const confirmar = (itemDoCarrinho) => {
    adicionar(itemDoCarrinho);
    setSelecionado(null);
    avisar(`${itemDoCarrinho.nome} adicionado ao carrinho`);
  };

  return (
    <>
      <nav className={styles.abas}>
        <div className={`conteiner ${styles.abasInterno}`}>
          {categorias.map((c) => (
            <button
              key={c.id}
              className={`${styles.aba} ${c.id === atual?.id ? styles.ativa : ""}`}
              onClick={() => setCategoriaId(c.id)}
            >
              {c.nome}
            </button>
          ))}
        </div>
      </nav>

      <div className="conteiner">
        <section className={`${comum.lista} ${comum.grade}`}>
          {atual?.itens.map((item) => (
            <CardProduto
              key={item.id}
              item={item}
              acao={<Botao onClick={() => setSelecionado(item)}>Comprar</Botao>}
            />
          ))}
          {!atual && <p className={comum.vazio}>Cardápio indisponível no momento.</p>}
        </section>
      </div>

      {selecionado && (
        <ModalAdicionais
          item={selecionado}
          aceitaAdicionais={atual.aceitaAdicionais}
          onAdicionar={confirmar}
          onFechar={fechar}
        />
      )}
    </>
  );
}
