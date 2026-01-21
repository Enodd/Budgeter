import { useState } from "react";
import { useAuthentication } from "../hooks/useAuthentication";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>();
  const { register } = useAuthentication();
  const { t } = useTranslation();

  const handleSubmit = async (data: FormData) => {
    const userLogin = data.get("login")?.toString();
    const password = data.get("password")?.toString();
    const email = data.get("email")?.toString();
    const dateOfBirth = data.get("dateOfBirth")?.toString();

    if (!userLogin || !password || !email || !dateOfBirth) {
      setError("An error occured while trying to log in");
      return;
    }

    try {
      const isSuccess = await register(userLogin, password, email, dateOfBirth);
      if (isSuccess) {
        navigate("/", { replace: true });
      }
    } catch (exception) {
      console.error(exception);
      // TODO: add error handling
    }
  };
  return (
    <div className="bg-primary-main/50 flex flex-col items-center">
      <h2>Login</h2>
      <form action={handleSubmit} className="flex flex-col">
        <label htmlFor="login">{t('auth.login')}</label>
        <input
          required
          type="text"
          name="login"
          className="border-white border-2"
        />
        <label htmlFor="password">{t('auth.password')}</label>
        <input
          required
          type="text"
          name="password"
          className="border-white border-2"
        />
        <label htmlFor="email">{t('auth.email')}</label>
        <input
          required
          type="text"
          name="email"
          className="border-white border-2"
        />
        <label htmlFor="dateOfBirth">{t('auth.dateOfBirth')}</label>
        <input
          required
          type="text"
          name="dateOfBirth"
          className="border-white border-2"
        />
        <input type="submit" value="Submit" />
      </form>
      {error && <p className="text-red-500 font-bold">{error}</p>}
    </div>
  );
}
