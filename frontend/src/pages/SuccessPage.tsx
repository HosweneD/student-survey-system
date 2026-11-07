import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Card sx={{ maxWidth: 480, width: '100%', textAlign: 'center' }}>
        <CardContent sx={{ p: 4 }}>
          <CheckBoxOutlinedIcon color="primary" sx={{ fontSize: 64, mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Спасибо за участие!
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Ваши ответы успешно отправлены. Они полностью анонимны и будут
            использованы только в агрегированном виде.
          </Typography>
          <Button variant="contained" onClick={() => navigate('/')}>
            К списку опросов
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SuccessPage;