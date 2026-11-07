import { useState, type SubmitEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {Box, Card, CardContent, TextField, Button, Typography, Alert, Container} from '@mui/material';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!studentId.trim() || !password.trim()) {
      setError('Заполните все поля');
      return;
    }
    const success = login(studentId, password);
    if (success) {
      navigate('/');
    } else {
      setError('Неверные учётные данные');
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ display: 'flex', alignItems: 'center', minHeight: '100vh' }}
    >
      <Card sx={{ width: '100%', p: 2 }}>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <HowToVoteIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
            <Typography variant="h5">Система опросов</Typography>
            <Typography variant="body2" color="text.secondary">
              Вход для студентов
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
              label="Номер студенческого билета"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Пароль"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
            />
            <Button type="submit" variant="contained" size="large" fullWidth>
              Войти
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default LoginPage;