interface Props { progress: number; }

const HeroText: React.FC<Props> = ({ progress }) => {
  return (
    <div className="hero-text-layer" style={{
      opacity: 1 - progress * 2,
      transform: `translateY(-${progress * 80}px)`
    }}>
      <h1 className="hero-title">Banca y mucho más</h1>
      <p className="hero-subtitle">
        Tanto si estás en casa como de viaje, deja que Revolut supere tus expectativas bancarias. Regístrate con un toque.
      </p>
      <button className="btn-download">Descarga la app</button>
    </div>
  );
};

export default HeroText;