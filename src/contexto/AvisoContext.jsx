import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Aviso.module.css";

const AvisoContext = createContext(() => {});

export function AvisoProvider({ children }) {
  const [texto, setTexto] = useState("");
  const [visivel, setVisivel] = useState(false);
  const timer = useRef();
  const { pathname } = useLocation();

  const avisar = useCallback((msg) => {
    setTexto(msg);
    setVisivel(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setVisivel(false), 2200);
  }, []);

  // Esconde ao trocar de tela
  useEffect(() => setVisivel(false), [pathname]);

  return (
    <AvisoContext.Provider value={avisar}>
      {children}
      <div className={`${styles.aviso} ${visivel ? styles.visivel : ""}`} role="status" aria-live="polite">
        {texto}
      </div>
    </AvisoContext.Provider>
  );
}

export const useAviso = () => useContext(AvisoContext);
