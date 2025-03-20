import { PasswordInput } from "./password-input";
import { useState } from "react";

export const CreatePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div>
      <h1>Create a password</h1>
      <div>
        Password must meet the following requirements:
        <ul>
          <li>Minimum length of 6 characters</li>
          <li>At least 1 uppercase character</li>
          <li>At least 1 lowercase character</li>
          <li>At least 1 number</li>
          <li>{`At least 1 special character (!@#$%^&*()_-+={[}]|:;"'<,>.)`}</li>
        </ul>
      </div>
      <form>
        <PasswordInput
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <PasswordInput
          name="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </form>
      <button>Submit</button>
    </div>
  );
};
