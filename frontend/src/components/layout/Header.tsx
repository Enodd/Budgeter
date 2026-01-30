import {useTranslation} from "react-i18next";
import {useAuth} from "../../stores/authStore.tsx";
import {useNavigate} from "react-router-dom";
import {Button, Grid, Typography} from "@mui/material";

export default function Header() {
  const navigate = useNavigate();
  const {isAuthenticated, logout} = useAuth();
  const {t, i18n: {changeLanguage, language}} = useTranslation();
  
  async function handleLanguageToggle() {
    await changeLanguage(language === 'pl' ? 'en' : 'pl');
  }
  
  async function handleLogout() {
    logout('');
    navigate('/')
  }
  
  return (
    <Grid container
          p={2}
          justifyContent={'space-between'}
          sx={{minWidth: '100vw'}}>
      <Grid size={6}>
        <Typography variant={"h1"} fontSize={'x-large'}>
          Budgeter
        </Typography>
      </Grid>
      <Grid container size={6} gap={2} justifyContent={'flex-end'}>
        <Grid size={"auto"}>
          <Button
            variant={'outlined'}
            onClick={handleLanguageToggle}>
            {t('nav.changeLanguage')}
          </Button>
        </Grid>
        {!isAuthenticated
          ? <>
            <Grid size={'auto'}>
              <Button
                variant={'contained'}
                onClick={() => navigate('/auth/login')}>
                {t('nav.login')}
              </Button>
            </Grid>
            <Grid size={'auto'}>
              <Button
                variant={'contained'}
                onClick={() => navigate('/auth/register')}>
                {t('nav.register')}
              </Button>
            </Grid>
          </>
          : <Grid size={'auto'}>
            <Button variant={'contained'} color={'secondary'} onClick={handleLogout}>
              {t('nav.logout')}
            </Button>
          </Grid>
        }
      </Grid>
    </Grid>
  );
}
