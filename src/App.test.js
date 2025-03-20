import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("renders heading", () => {
  render(<App />);
  const heading = screen.getByText(/create a password/i);
  expect(heading).toBeInTheDocument();
});

test("renders both input fields", () => {
  render(<App />);
  const passwordInput = screen.getByPlaceholderText("Password");
  const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password");
  expect(passwordInput).toBeInTheDocument();
  expect(confirmPasswordInput).toBeInTheDocument();
});

test("can't be submitted if passwords don't match", () => {
  render(<App />);
  const passwordInput = screen.getByPlaceholderText("Password");
  const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password");
  userEvent.type(passwordInput, "test");
  userEvent.type(confirmPasswordInput, "test1");
  const errorMessage = screen.getByText(/passwords do not match/i);
  const submitBtn = screen.getByRole("button", { name: /submit/i });

  expect(errorMessage).toBeInTheDocument();
  expect(submitBtn).toBeDisabled();
});

test("checks validity of password on submit and shows error if invalid", async () => {
  render(<App />);
  const passwordInput = screen.getByPlaceholderText("Password");
  const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password");
  userEvent.type(passwordInput, "test");
  userEvent.type(confirmPasswordInput, "test");
  const submitBtn = screen.getByRole("button", { name: /submit/i });
  await act(async () => {
    fireEvent.click(submitBtn);
  });
  const errorMessage = screen.getByText(/invalid password/i);
  const invalidReq = screen.getByText(/minimum length/i);
  const validReq = screen.getByText(/lowercase/i);
  expect(errorMessage).toBeInTheDocument();
  expect(invalidReq).toHaveAttribute("aria-hidden", "false");
  expect(validReq).toHaveAttribute("aria-hidden", "true");
});

test("checks validity of password on submit and shows success message if valid", async () => {
  render(<App />);
  const passwordInput = screen.getByPlaceholderText("Password");
  const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password");
  userEvent.type(passwordInput, "Test123!");
  userEvent.type(confirmPasswordInput, "Test123!");
  const submitBtn = screen.getByRole("button", { name: /submit/i });
  await act(async () => {
    fireEvent.click(submitBtn);
  });
  const successMessage = screen.getByText(/successfully created password/i);
  expect(successMessage).toBeInTheDocument();
});
