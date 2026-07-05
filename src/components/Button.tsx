
import "../styles/Button.css";

interface ButtonProps {
  text: string;
  variant: "white" | "black"; 
  className?: string;         
}

const ButtonRegister: React.FC<ButtonProps> = ({ text, variant, className = "" }) => {
  const handleRegisterRedirect = () => {
    
    window.location.href = "/register";
  };

  return (
    <button
      onClick={handleRegisterRedirect}
      className={`pb-btn-register btn-variant-${variant} ${className}`}
    >
      {text}
    </button>
  );
};

export default ButtonRegister;