import { useState } from "react";
import hide from "../icons/eye-password-hide.svg";
import show from "../icons/eye-password-show.svg";

export const PasswordInput = ({ name, placeholder, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="input-container">
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <button
        className="image-btn"
        onClick={(e) => {
          e.preventDefault();
          setShowPassword(!showPassword);
        }}
      >
        <img
          src={showPassword ? show : hide}
          alt={showPassword ? "hide" : "show"}
        />
      </button>
    </div>
  );
};
