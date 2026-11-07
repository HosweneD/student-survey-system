import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Button, RadioGroup, FormControlLabel, Radio, Checkbox, FormGroup, FormControl, FormLabel, Stack, Alert, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { mockSurveys } from '../services/mockData';

const SurveyPage = () => {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);
  const navigate = useNavigate();
  const survey = mockSurveys.find((s) => s.id === numericId);

  const [answers, setAnswers] = useState<Record<number, number[]>>({});
  const [openConfirm, setOpenConfirm] = useState(false);

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

  const handleSingleChange = (questionId: number, optionId: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: [optionId] }));
  };

  const handleMultipleChange = (questionId: number, optionId: number) => {
    setAnswers((prev) => {
      const current = prev[questionId] || [];
      const updated = current.includes(optionId)
        ? current.filter((o) => o !== optionId)
        : [...current, optionId];
      return { ...prev, [questionId]: updated };
    });
  };

  const handleSubmit = () => {
    setOpenConfirm(false);
    navigate('/success');
  };

  const allAnswered = survey.questions.every(
    (q) => (answers[q.id] || []).length > 0
  );

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {survey.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {survey.description}
      </Typography>

      <Stack spacing={2}>
        {survey.questions.map((q, index) => (
          <Card key={q.id}>
            <CardContent>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, color: 'text.primary' }}
                  >
                    {index + 1}. {q.text}
                  </Typography>
                </FormLabel>

                {q.allowMultiple ? (
                  <FormGroup sx={{ mt: 1 }}>
                    {q.options.map((opt) => (
                      <FormControlLabel
                        key={opt.id}
                        control={
                          <Checkbox
                            checked={(answers[q.id] || []).includes(opt.id)}
                            onChange={() => handleMultipleChange(q.id, opt.id)}
                          />
                        }
                        label={opt.text}
                      />
                    ))}
                  </FormGroup>
                ) : (
                  <RadioGroup
                    sx={{ mt: 1 }}
                    value={answers[q.id]?.[0] ?? ''}
                    onChange={(e) =>
                      handleSingleChange(q.id, Number(e.target.value))
                    }
                  >
                    {q.options.map((opt) => (
                      <FormControlLabel
                        key={opt.id}
                        value={opt.id}
                        control={<Radio />}
                        label={opt.text}
                      />
                    ))}
                  </RadioGroup>
                )}
              </FormControl>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button variant="outlined" onClick={() => navigate('/')}>
          Назад
        </Button>
        <Button
          variant="contained"
          disabled={!allAnswered}
          onClick={() => setOpenConfirm(true)}
        >
          Отправить ответы
        </Button>
      </Box>

      {!allAnswered && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: 'block', mt: 1 }}
        >
          Ответьте на все вопросы, чтобы отправить форму.
        </Typography>
      )}

      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Подтверждение</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ваши ответы будут отправлены анонимно. Отменить это действие нельзя. Продолжить?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Отмена</Button>
          <Button onClick={handleSubmit} variant="contained">
            Отправить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SurveyPage;