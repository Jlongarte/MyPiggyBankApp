import { motion } from "framer-motion";

interface Props {
  progress: number;
}

const HeroText: React.FC<Props> = ({ progress }) => {
  return (
    <div className="hero-content-flex">
      <div
        className="hero-text-layer"
        style={{
          opacity: 1 - progress * 2,
          transform: `translateY(-${progress * 80}px)`,
        }}
      >
        <h1 className="hero-title">Banking & much more</h1>
        <p className="hero-subtitle">
          Whether you're at home or traveling, let PiggyBank exceed your banking
          expectations. Sign up with just one tap.
        </p>
        <button className="btn-download">Download the app</button>
      </div>

      {/* Elemento visual que simula el marco del Hero del que saldrá la tarjeta */}
      <motion.div
        className="hero-frame-preview"
        style={{
          opacity: 1 - progress * 3,
          scale: 1 - progress * 0.2,
        }}
      ></motion.div>
    </div>
  );
};

export default HeroText;