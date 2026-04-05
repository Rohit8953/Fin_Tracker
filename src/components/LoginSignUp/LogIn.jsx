import {
  Box, Button, Container, FormControl, Grid, Link,
  TextField, Typography, InputAdornment, IconButton, Alert
} from '@mui/material';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../Firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SetisLogin, Settoken } from '../../store/userSlice';
import loginpage from '../../assets/loginpage.jpg';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined';

const auth = getAuth(app);

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [formdata, setFormdata] = useState({ email: '', password: '' });

  const validationSchema = Yup.object({
    email: Yup.string()
      .required('Email is Required')
      .matches(/[@]/, 'Email must be example@gmail.com'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one symbol')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter'),
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const Validations = async () => {
    try {
      await validationSchema.validate(formdata, { abortEarly: false });
    } catch (error) {
      const newErrors = {};
      error.inner.forEach((err) => { newErrors[err.path] = err.message; });
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = Validations();
    if (Object.keys(isValid).length > 0) return;

    try {
      const { email, password } = formdata;
      const response = await signInWithEmailAndPassword(auth, email, password);
      alert('Login Successful');
      if (response) {
        navigate('/');
        dispatch(SetisLogin());
        dispatch(Settoken(response.user.accessToken));
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      setErrors({ firebase: error.message });
    }
  };

  return (
    <Grid
      container
      sx={{
        minHeight: '100vh',
        background: '#0A0F1E',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* ── Left: Image Panel ── */}
      <Grid
        item
        xs={false}
        md={6}
        sx={{
          display: { xs: 'none', md: 'block' },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${loginpage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.45)',
          }}
        />
        {/* Overlay gradient */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(135deg, rgba(10,15,30,0.6) 0%, rgba(245,158,11,0.08) 100%)',
          }}
        />
        {/* Branding on image */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            p: 5,
          }}
        >
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '11px',
                background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 20,
                color: '#0F172A',
                boxShadow: '0 4px 14px rgba(245,158,11,0.45)',
              }}
            >
              ₹
            </Box>
            <Typography
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: '1.4rem',
                color: '#F8FAFC',
              }}
            >
              FinTrack
            </Typography>
          </Box>


        </Box>
      </Grid>

      {/* ── Right: Form Panel ── */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 2, sm: 4 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background orb */}
        <Box
          sx={{
            position: 'absolute',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)',
            top: -80,
            right: -80,
            pointerEvents: 'none',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)',
            bottom: 40,
            left: -60,
            pointerEvents: 'none',
          }}
        />

        <Container maxWidth="xs" sx={{ position: 'relative', zIndex: 1 }}>
          {/* Mobile logo */}
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              alignItems: 'center',
              gap: 1.2,
              justifyContent: 'center',
              mb: 4,
            }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 17,
                color: '#0F172A',
              }}
            >
              ₹
            </Box>
            <Typography
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: '1.3rem',
                color: '#F8FAFC',
              }}
            >
              FinTrack
            </Typography>
          </Box>

          {/* Card */}
          <Box
            sx={{
              background: '#111827',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '20px',
              p: { xs: 3, sm: 4 },
              boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
            }}
          >
            {/* Header */}
            <Box sx={{ mb: 3.5 }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.8,
                  px: 1.5,
                  py: 0.5,
                  borderRadius: '50px',
                  background: 'rgba(245,158,11,0.1)',
                  border: '1px solid rgba(245,158,11,0.22)',
                  mb: 1.5,
                }}
              >
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#F59E0B',
                    boxShadow: '0 0 8px rgba(245,158,11,0.8)',
                  }}
                />
                <Typography
                  sx={{ color: '#F59E0B', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.5px' }}
                >
                  Welcome back
                </Typography>
              </Box>

              <Typography
                component="h1"
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: '1.9rem',
                  color: '#F8FAFC',
                  lineHeight: 1.2,
                }}
              >
                Sign in to FinTrack
              </Typography>
              <Typography sx={{ color: '#64748B', fontSize: '0.88rem', mt: 0.8 }}>
                Enter your credentials to access your dashboard
              </Typography>
            </Box>

            {/* Firebase error */}
            {errors.firebase && (
              <Alert
                severity="error"
                sx={{
                  mb: 2.5,
                  background: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.2)',
                  color: '#FCA5A5',
                  borderRadius: '10px',
                  '& .MuiAlert-icon': { color: '#EF4444' },
                }}
              >
                {errors.firebase}
              </Alert>
            )}

            {/* Form */}
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2.2 }}
            >
              <FormControl>
                <Typography
                  sx={{ color: '#94A3B8', fontSize: '0.8rem', fontWeight: 600, mb: 0.8 }}
                >
                  Email Address
                </Typography>
                <TextField
                  required
                  fullWidth
                  id="email"
                  placeholder="your@email.com"
                  name="email"
                  onChange={changeHandler}
                  error={!!errors.email}
                  helperText={errors.email}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon sx={{ color: '#64748B', fontSize: 18 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                      background: '#1E293B',
                      color: '#F1F5F9',
                      fontSize: '0.9rem',
                      '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                      '&:hover fieldset': { borderColor: 'rgba(245,158,11,0.35)' },
                      '&.Mui-focused fieldset': {
                        borderColor: '#F59E0B',
                        boxShadow: '0 0 0 3px rgba(245,158,11,0.12)',
                      },
                      '&.Mui-error fieldset': { borderColor: '#EF4444' },
                    },
                    '& input::placeholder': { color: '#475569' },
                    '& .MuiFormHelperText-root': { color: '#F87171', fontSize: '0.75rem' },
                  }}
                />
              </FormControl>

              <FormControl>
                <Typography
                  sx={{ color: '#94A3B8', fontSize: '0.8rem', fontWeight: 600, mb: 0.8 }}
                >
                  Password
                </Typography>
                <TextField
                  required
                  fullWidth
                  name="password"
                  placeholder="••••••••"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  onChange={changeHandler}
                  error={!!errors.password}
                  helperText={errors.password}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon sx={{ color: '#64748B', fontSize: 18 }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: '#64748B', '&:hover': { color: '#F59E0B' } }}
                        >
                          {showPassword
                            ? <VisibilityOffOutlined sx={{ fontSize: 18 }} />
                            : <VisibilityOutlined sx={{ fontSize: 18 }} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                      background: '#1E293B',
                      color: '#F1F5F9',
                      fontSize: '0.9rem',
                      '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                      '&:hover fieldset': { borderColor: 'rgba(245,158,11,0.35)' },
                      '&.Mui-focused fieldset': {
                        borderColor: '#F59E0B',
                        boxShadow: '0 0 0 3px rgba(245,158,11,0.12)',
                      },
                      '&.Mui-error fieldset': { borderColor: '#EF4444' },
                    },
                    '& input::placeholder': { color: '#475569' },
                    '& .MuiFormHelperText-root': { color: '#F87171', fontSize: '0.75rem' },
                  }}
                />
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 0.5,
                  py: 1.4,
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                  color: '#0F172A',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  fontFamily: "'DM Sans', sans-serif",
                  textTransform: 'none',
                  boxShadow: '0 6px 20px rgba(245,158,11,0.35)',
                  border: 'none',
                  transition: 'all 0.2s',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #FCD34D, #F59E0B)',
                    boxShadow: '0 8px 28px rgba(245,158,11,0.5)',
                    transform: 'translateY(-1px)',
                  },
                  '&:active': { transform: 'translateY(0)' },
                }}
              >
                Sign In →
              </Button>

              {/* Divider */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, my: 0.5 }}>
                <Box sx={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
                <Typography sx={{ color: '#475569', fontSize: '0.75rem' }}>or</Typography>
                <Box sx={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
              </Box>

              <Typography sx={{ textAlign: 'center', color: '#64748B', fontSize: '0.88rem' }}>
                Don&apos;t have an account?{' '}
                <Link
                  href="/signup"
                  sx={{
                    color: '#F59E0B',
                    fontWeight: 600,
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline', color: '#FCD34D' },
                  }}
                >
                  Sign up
                </Link>
              </Typography>
            </Box>
          </Box>

          {/* Footer note */}
          <Typography
            sx={{ textAlign: 'center', color: '#334155', fontSize: '0.75rem', mt: 3 }}
          >
            © 2025 FinTrack · Your data stays on your device
          </Typography>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Login;