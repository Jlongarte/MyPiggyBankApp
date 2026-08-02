interface Props {
  progress: number;
}

const GridText: React.FC<Props> = ({ progress }) => {
  return (
    <div 
      className="grid-text-layer"
      style={{
        opacity: progress * 2,
        transition: "opacity 0.2s ease-out"
      }}
    >
      {/* Contenido secundario */}
    </div>
  );
};

export default GridText;