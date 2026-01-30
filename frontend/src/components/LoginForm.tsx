import { useState } from "react";
import { useAuthentication } from "../hooks/useAuthentication";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Grid, Typography, InputLabel, Input, Button, useTheme } from "@mui/material";

export default function LoginForm() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>();
  const { login } = useAuthentication();
  const { t } = useTranslation();
  const theme = useTheme();

  const handleSubmit = async (data: FormData) => {
    const userLogin = data.get("email")?.toString();
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
    
    <Grid
      size={6}
      container
      bgcolor={theme.palette.primary.main}
      justifyContent={'center'}
      color={theme.palette.primary.contrastText}
      borderRadius={4}
      p={4}
      gap={4}
    >
      <Grid size={12}>
        <Typography
          variant='h3'
          textAlign={'center'}
        >
          {t('auth.login.title')}
        </Typography>
      </Grid>
      <Grid
        component={'form'}
        size={6}
        action={handleSubmit}
        container
        alignContent={'center'}
      >
        <Grid container size={12} gap={4}>
          <InputLabel htmlFor='email' sx={{width: '100%'}}>
            <Typography color="#fff">{t('auth.email')}</Typography>
            <Input
              fullWidth
              required
              type='text'
              name='email'
              className='border-white border-2 w-full p-2 rounded-md'
            />
          </InputLabel>
          <InputLabel htmlFor='password' sx={{width: '100%'}}>
            <Typography color="#fff">{t('auth.password')}</Typography>
            <Input
              fullWidth
              required
              type='password'
              name='password'
              className='border-white border-2 w-full p-2 rounded-md'
            />
          </InputLabel>
          <Button
            fullWidth
            sx={{
              color: theme.palette.getContrastText('#fff'),
              background: '#fff',
            }}
            variant='contained'
            type='submit'
          >
            <Typography>
              {t('auth.login.submit')}
            </Typography>
          </Button>
        </Grid>
      </Grid>
      {error && <p className='text-red-500 font-bold'>{error}</p>}
    </Grid>

  );
}
