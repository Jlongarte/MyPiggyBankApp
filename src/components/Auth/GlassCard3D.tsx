import { useState, useRef, ReactNode } from "react";

interface GlassCard3DProps {
  children: ReactNode;
  className?: string;
}

export const GlassCard3D = ({ children, className = "" }: GlassCard3DProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isFocused) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = -(y / rect.height) * 14;
    const rotateY = (x / rect.width) * 14;

    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || isFocused) return;
    cardRef.current.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
  };

  return (
    <div className="auth-page-wrapper" onMouseMove={handleMouseMove}>
      <div className="auth-ambient-light light-orb-primary" />
      <div className="auth-ambient-light light-orb-secondary" />

      <header className="auth-top-header">
        <div className="auth-brand-logo">The Piggy Bank</div>
      </header>

      <div
        ref={cardRef}
        onMouseLeave={handleMouseLeave}
        className={`auth-card-glass rect-wide-layout login-compact-layout ${className} ${
          isFocused ? "card-frozen" : ""
        }`}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsFocused(false);
          }
        }}
      >
        {children}
      </div>
    </div>
  );
};