import { PasswordInput } from "./password-input";
import { useState, useEffect, useRef } from "react";

export const CreatePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMatching, setIsMatching] = useState(true);
  const [isLengthValid, setIsLengthValid] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecial, setHasSpecial] = useState(false);
  const [submitClicks, setSubmitClicks] = useState(0);
  const isValid =
    isLengthValid && hasUppercase && hasLowercase && hasNumber && hasSpecial;
  const errorRef = useRef(null);

  const validatePassword = () => {
    /* checking that inputs match is already handled by disabling submit button */
    setIsLengthValid(password.length >= 6);
    setHasUppercase(/[A-Z]/.test(password));
    setHasLowercase(/[a-z]/.test(password));
    setHasNumber(/[0-9]/.test(password));
    setHasSpecial(/[!@#$%^&*()_+={[}\]|:;"'<,>.-]/.test(password));
    setSubmitClicks((prev) => prev + 1);
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

  useEffect(() => {
    if (errorRef?.current && !isValid) {
      errorRef.current.focus();
    }
  }, [isValid, errorRef, submitClicks]);

  return (
    <div className="container">
      {isValid ? (
        <h1>Successfully created password!</h1>
      ) : (
        <>
          <h1>Create a password</h1>
          {submitClicks > 0 && !isValid && (
            <p className="error" ref={errorRef} tabIndex={-1}>
              <b>Invalid password.</b>
            </p>
          )}
          <div>
            Password must meet the following requirements:
            <ul>
              <li
                className={submitClicks > 0 && !isLengthValid ? "error" : ""}
                aria-hidden={submitClicks > 0 && isLengthValid}
              >
                Minimum length of 6 characters
              </li>
              <li
                className={submitClicks > 0 && !hasUppercase ? "error" : ""}
                aria-hidden={submitClicks > 0 && hasUppercase}
              >
                At least 1 uppercase character
              </li>
              <li
                className={submitClicks > 0 && !hasLowercase ? "error" : ""}
                aria-hidden={submitClicks > 0 && hasLowercase}
              >
                At least 1 lowercase character
              </li>
              <li
                className={submitClicks > 0 && !hasNumber ? "error" : ""}
                aria-hidden={submitClicks > 0 && hasNumber}
              >
                At least 1 number
              </li>
              <li
                className={submitClicks > 0 && !hasSpecial ? "error" : ""}
                aria-hidden={submitClicks > 0 && hasSpecial}
              >{`At least 1 special character (!@#$%^&*()_-+={[}]|:;"'<,>.)`}</li>
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
          {!isMatching && (
            <p className="error line-error">The passwords do not match.</p>
          )}
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
