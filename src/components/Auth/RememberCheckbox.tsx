interface RememberCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export const RememberCheckbox = ({
  checked,
  onChange,
  label = "Keep me logged in"
}: RememberCheckboxProps) => {
  return (
    <div className="auth-remember-group">
      <label className="auth-checkbox-label">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span>{label}</span>
      </label>
    </div>
  );
};