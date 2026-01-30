import { useState } from 'react';
import { useAuthentication } from '../hooks/useAuthentication';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Grid, Input, InputLabel, Typography, useTheme } from '@mui/material';

export default function RegisterForm() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>();
  const { register } = useAuthentication();
  const { t } = useTranslation();
  const theme = useTheme();

  const handleSubmit = async (data: FormData) => {
    const userLogin = data.get('login')?.toString();
    const password = data.get('password')?.toString();
    const email = data.get('email')?.toString();
    const dateOfBirth = data.get('dateOfBirth')?.toString();

    if (!userLogin || !password || !email || !dateOfBirth) {
      setError('An error occured while trying to log in');
      return;
    }

    try {
      const isSuccess = await register(userLogin, password, email, dateOfBirth);
      if (isSuccess) {
        navigate('/', { replace: true });
      }
    } catch (exception) {
      console.error(exception);
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
          {t('auth.register.title')}
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
          <InputLabel htmlFor='login' sx={{width: '100%'}}>
            <Typography color="#fff">{t('auth.register.login')}</Typography>
            <Input
              fullWidth
              required
              type='text'
              name='login'
              className='border-white border-2 w-full p-2 rounded-md'
            />
          </InputLabel>
          <InputLabel htmlFor='password' sx={{width: '100%'}}>
            <Typography color="#fff">{t('auth.password')}</Typography>
            <Input
              fullWidth
              required
              type='text'
              name='password'
              className='border-white border-2 w-full p-2 rounded-md'
            />
          </InputLabel>
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
          <InputLabel htmlFor='dateOfBirth' sx={{width: '100%'}}>
            <Typography color="#fff">{t('auth.dateOfBirth')}</Typography>
            <Input
              fullWidth
              required
              type='date'
              name='dateOfBirth'
              className='border-white border-2 w-full p-2 rounded-md'
              sx={{ color: '#fff', svg: { fill: '#fff' }}}
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
              {t('auth.register.submit')}
            </Typography>
          </Button>
        </Grid>
      </Grid>
      {error && <p className='text-red-500 font-bold'>{error}</p>}
    </Grid>
  );
}

