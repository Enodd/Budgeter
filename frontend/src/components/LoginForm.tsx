import { useState } from "react";
import { useAuthentication } from "../hooks/useAuthentication";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function LoginForm() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>();
  const { login } = useAuthentication();
  const { t } = useTranslation();

  const handleSubmit = async (data: FormData) => {
    const userLogin = data.get("login")?.toString();
    const password = data.get("password")?.toString();

    if (!userLogin || !password) {
      setError(t('error.login'));
      return;
    }

    try {
      const isSuccess = await login(userLogin, password);
      if (isSuccess) {
        navigate("/", { replace: true });
      }
    } catch (exception) {
      console.error(exception);
      // TODO: add error handling
    }
  };
  return (
    <div className="bg-primary-main/50 p-4 rounded-lg flex flex-col items-center min-w-2xl">
      <h2>Login</h2>
      <form action={handleSubmit} className="flex flex-col gap-5 justify-between h-full w-2xs p-4">
        <div className="pt-4 flex flex-col gap-5">
        <label htmlFor="login">
          <p className="mb-1">
            Login
          </p>
        <input
          required
          type="text"
          name="login"
          className="border-white border-2 w-full p-2 rounded-md"
        />
          </label>
        <label htmlFor="password">
          <p className="mb-1">
            Password
          </p>
        <input
          required
          type="password"
          name="password"
          className="border-white border-2 w-full p-2 rounded-md"
        />
        </label>
        </div>
        <input type="submit" value="Submit" className="button--secondary" />
      </form>
      {error && <p className="text-red-500 font-bold">{error}</p>}
    </div>
  );
}
