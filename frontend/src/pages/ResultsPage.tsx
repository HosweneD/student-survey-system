import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent, LinearProgress, Stack, Button, Alert, Chip } from '@mui/material';
import { mockSurveys, mockResults } from '../services/mockData';

const ResultsPage = () => {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);
  const navigate = useNavigate();
  const survey = mockSurveys.find((s) => s.id === numericId);
  const results = numericId ? mockResults[numericId] : undefined;

  if (!survey) {
    return (
      <Box>
        <Alert severity="error">Опрос не найден</Alert>
        <Button sx={{ mt: 2 }} onClick={() => navigate('/')}>
          На главную
        </Button>
      </Box>
    );
  }

  if (survey.status !== 'completed' || !results) {
    return (
      <Box>
        <Alert severity="info">
          Результаты этого опроса будут доступны после его завершения.
        </Alert>
        <Button sx={{ mt: 2 }} onClick={() => navigate('/')}>
          На главную
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 1,
          mb: 1,
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="h5">{survey.title}</Typography>
        <Chip label="Завершен" size="small" />
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {survey.description}
      </Typography>

      <Stack spacing={2}>
        {survey.questions.map((q) => {
          const qResults = results[q.id] || {};
          const total = Object.values(qResults).reduce((sum, v) => sum + v, 0);
          return (
            <Card key={q.id}>
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                  {q.text}
                </Typography>
                <Stack spacing={2}>
                  {q.options.map((opt) => {
                    const count = qResults[opt.id] || 0;
                    const percent =
                      total > 0 ? Math.round((count / total) * 100) : 0;
                    return (
                      <Box key={opt.id}>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mb: 0.5,
                          }}
                        >
                          <Typography variant="body2">{opt.text}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {count} голосов ({percent}%)
                          </Typography>
                        </Box>
                        <LinearProgress variant="determinate" value={percent} />
                      </Box>
                    );
                  })}
                </Stack>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: 'block', mt: 2 }}
                >
                  Всего ответов: {total}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Stack>

      <Button sx={{ mt: 3 }} variant="outlined" onClick={() => navigate('/')}>
        Назад к списку
      </Button>
    </Box>
  );
};

export default ResultsPage;