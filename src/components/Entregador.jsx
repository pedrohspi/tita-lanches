// Ilustração do entregador na tela de agradecimento.
export default function Entregador({ className }) {
  return (
    <svg className={className} viewBox="0 0 220 180" aria-hidden="true">
      {/* balão com lanche */}
      <circle cx="44" cy="34" r="24" fill="#000" />
      <path d="M36 54l-4 14 16-11z" fill="#000" />
      <path d="M32 36a12 9 0 0 1 24 0z" fill="#fff" />
      <rect x="32" y="39" width="24" height="3" rx="1.5" fill="#fff" />
      <path d="M32 45h24v2a3 3 0 0 1-3 3H35a3 3 0 0 1-3-3z" fill="#fff" />
      {/* caixa de entrega */}
      <rect x="40" y="84" width="40" height="34" rx="4" fill="#000" />
      {/* piloto */}
      <circle cx="124" cy="44" r="16" fill="#000" />
      <path d="M124 36h18v8h-18z" fill="#000" />
      <path d="M118 60l-8 44" stroke="#000" strokeWidth="20" strokeLinecap="round" />
      <path d="M120 70l24 12 26-4" fill="none" stroke="#000" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M110 104h30l6 22" fill="none" stroke="#000" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
      {/* scooter */}
      <path d="M36 150c0-18 12-30 34-30h44l10 18h34l14-50h10l14 62z" fill="#000" />
      <rect x="84" y="112" width="40" height="10" rx="5" fill="#000" />
      <rect x="166" y="72" width="22" height="8" rx="4" fill="#000" />
      <circle cx="66" cy="156" r="18" fill="#000" />
      <circle cx="66" cy="156" r="7" fill="#fff" />
      <circle cx="180" cy="156" r="18" fill="#000" />
      <circle cx="180" cy="156" r="7" fill="#fff" />
      {/* velocidade */}
      <path d="M6 112h22M12 126h16M6 140h22" stroke="#000" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}
