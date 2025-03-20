export const PasswordInput = ({ name, placeholder, value, onChange }) => {
  return (
    <div>
      <input
        type="password"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
