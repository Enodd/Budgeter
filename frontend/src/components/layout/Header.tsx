import { useTranslation } from "react-i18next";
import { useAuth } from "../../stores/authStore.tsx";
import { Link } from "react-router-dom";

export default function Header() {
  const { isAuthenticated } = useAuth();
  const { t, i18n: { changeLanguage, language } } = useTranslation();

  function handleLanguageToggle() {
    changeLanguage(language === 'pl' ? 'en' : 'pl');
  }

  return (
    <header className="flex justify-between items-center p-4 fixed top-0 w-screen">
      <Link to='/'>
        <h1 className="text-2xl font-bold">Budgeter</h1>
      </Link>
      <nav className="relative">
        <ul className="flex items-center gap-2 list-none">
          {isAuthenticated ? (
            <li>
              <a href="/logout">
                {t('nav.logout')}
              </a>
            </li>
          ) : (
            <>
            <li>
              <a href="/auth/login">
                {t('nav.login')}
              </a>
            </li>
            <li>
              <Link to="/register">
                {t('nav.register')}
              </Link>
            </li>
            </>
          )}
          <li>
            <button
              className="bg-primary-main p-2 rounded-sm"
              onClick={handleLanguageToggle}
            >
              {t('nav.changeLanguage')}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
