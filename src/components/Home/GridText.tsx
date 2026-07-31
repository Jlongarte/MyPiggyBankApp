interface Props { progress: number; }

const GridText: React.FC<Props> = ({ progress }) => {
  return (
    <div className="grid-text-layer" style={{
      opacity: progress > 0.5 ? (progress - 0.5) * 2 : 0,
      transform: `translateY(${Math.max(0, 40 - (progress * 40))}px)`
    }}>
      <h2 className="grid-title">Un nuevo mundo de opciones para tu sueldo</h2>
      <p className="grid-subtitle">
        Paga de forma inteligente, envía dinero al instante, domicilia tu nómina y observa cómo crecen tus ahorros.
      </p>
      <button className="btn-action">Transferir nómina</button>
    </div>
  );
};

export default GridText;