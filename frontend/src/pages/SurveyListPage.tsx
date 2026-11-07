import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Chip, Button, CardActions, Stack, Alert } from '@mui/material';
import { mockSurveys } from '../services/mockData';

const SurveyListPage = () => {
  const navigate = useNavigate();

  const activeSurveys = mockSurveys.filter((s) => s.status === 'active');
  const completedSurveys = mockSurveys.filter((s) => s.status === 'completed');

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Доступные опросы
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Выберите опрос, чтобы принять участие. Все ответы анонимны.
      </Typography>

      {activeSurveys.length === 0 && (
        <Alert severity="info">Нет активных опросов</Alert>
      )}

      <Stack spacing={2}>
        {activeSurveys.map((survey) => (
          <Card key={survey.id}>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  gap: 1,
                  mb: 1,
                }}
              >
                <Typography variant="h6">{survey.title}</Typography>
                <Chip label="Активен" color="success" size="small" />
              </Box>
              <Typography variant="body2" color="text.secondary">
                {survey.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                variant="contained"
                onClick={() => navigate(`/survey/${survey.id}`)}
              >
                Пройти
              </Button>
            </CardActions>
          </Card>
        ))}
      </Stack>

      {completedSurveys.length > 0 && (
        <>
          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
            Завершённые опросы
          </Typography>
          <Stack spacing={2}>
            {completedSurveys.map((survey) => (
              <Card key={survey.id}>
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'start',
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Typography variant="h6">{survey.title}</Typography>
                    <Chip label="Завершён" size="small" />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {survey.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => navigate(`/results/${survey.id}`)}
                  >
                    Результаты
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Stack>
        </>
      )}
    </Box>
  );
};

export default SurveyListPage;