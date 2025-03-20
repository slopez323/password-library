import { PasswordInput } from "./password-input";
import { useState, useEffect } from "react";

export const CreatePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMatching, setIsMatching] = useState(true);
  const [isLengthValid, setIsLengthValid] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecial, setHasSpecial] = useState(false);
  const isValid =
    isLengthValid && hasUppercase && hasLowercase && hasNumber && hasSpecial;

  const validatePassword = () => {
    /* checking that inputs match is already handled by disabling submit button */
    setIsLengthValid(password.length >= 6);
    setHasUppercase(/[A-Z]/.test(password));
    setHasLowercase(/[a-z]/.test(password));
    setHasNumber(/[0-9]/.test(password));
    setHasSpecial(/[!@#$%^&*()_+={[}\]|:;"'<,>.-]/.test(password));
  };

  useEffect(() => {
    if (confirmPassword) {
      if (password === confirmPassword) {
        setIsMatching(true);
      } else {
        setIsMatching(false);
      }
    } else {
      setIsMatching(true);
    }
  }, [password, confirmPassword]);

  return (
    <div>
      {isValid ? (
        <h1>Successfully created password!</h1>
      ) : (
        <>
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
          {!isMatching && <p>The passwords do not match.</p>}
          <button
            disabled={!isMatching || !confirmPassword}
            onClick={validatePassword}
          >
            Submit
          </button>
        </>
      )}
    </div>
  );
};
