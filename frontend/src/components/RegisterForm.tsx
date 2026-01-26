import {useState} from "react";
import {useAuthentication} from "../hooks/useAuthentication";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>();
  const {register} = useAuthentication();
  const {t} = useTranslation();
  
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
        navigate("/", {replace: true});
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
        <div className={"pt-4 flex flex-col gap-5"}>
          <label htmlFor="login">
            <p className={"mb-1"}>
              {t('auth.login')}
            </p>
            <input
              required
              type="text"
              name="login"
              className="border-white border-2 w-full p-2 rounded-md"
            />
          </label>
          <label htmlFor="password">
            <p className={"mb-1"}>
              {t('auth.password')}
            </p>
            <input
              required
              type="text"
              name="password"
              className="border-white border-2 w-full p-2 rounded-md"
            />
          </label>
          <label htmlFor="email">
            <p className={"mb-1"}>
              {t('auth.email')}
            </p>
            <input
              required
              type="text"
              name="email"
              className="border-white border-2 w-full p-2 rounded-md"
            />
          </label>
          <label htmlFor="dateOfBirth">
            <p className={"mb-1"}>
              {t('auth.dateOfBirth')}
            </p>
            <input
              required
              type="date"
              name="dateOfBirth"
              className="border-white border-2 w-full p-2 rounded-md"
            />
          </label>
          <input type="submit" value="Submit" className={"button--secondary"}/>
        </div>
      </form>
      {error && <p className="text-red-500 font-bold">{error}</p>}
    </div>
  );
}
