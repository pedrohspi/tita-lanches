// Ícones em SVG usados no app. Herdam a cor do texto (currentColor).

export function IconeMenu(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconeCasa(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M12 3 2 12h3v8h5v-5h4v5h5v-8h3z" fill="currentColor" />
    </svg>
  );
}

export function IconeCarrinho(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M2 3h3l2.6 11.2a1 1 0 0 0 1 .8h9.7a1 1 0 0 0 1-.8L21 7H6.2"
        fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
      />
      <circle cx="9.5" cy="19.5" r="1.6" fill="currentColor" />
      <circle cx="17" cy="19.5" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function IconeVoltar(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M20 12H5m6-7-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
