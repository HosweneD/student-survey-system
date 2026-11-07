import type { Survey, SurveyResults } from '../types';

export const mockSurveys: Survey[] = [
  {
    id: 1,
    title: 'Оценка курса "Веб-разработка"',
    description: 'Помогите нам улучшить курс, ответив на несколько вопросов.',
    status: 'active',
    questions: [
      {
        id: 1,
        text: 'Как вы оцениваете содержание курса?',
        allowMultiple: false,
        options: [
          { id: 1, text: 'Отлично' },
          { id: 2, text: 'Хорошо' },
          { id: 3, text: 'Удовлетворительно' },
          { id: 4, text: 'Плохо' },
        ],
      },
      {
        id: 2,
        text: 'Какие темы были наиболее полезными?',
        allowMultiple: true,
        options: [
          { id: 1, text: 'React' },
          { id: 2, text: 'TypeScript' },
          { id: 3, text: 'Node.js' },
          { id: 4, text: 'Базы данных' },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Выбор мероприятия на семестр',
    description: 'Какое мероприятие вы хотели бы посетить?',
    status: 'active',
    questions: [
      {
        id: 1,
        text: 'Выберите мероприятие:',
        allowMultiple: false,
        options: [
          { id: 1, text: 'Хакатон' },
          { id: 2, text: 'Конференция' },
          { id: 3, text: 'Мастер-класс' },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Опрос о качестве питания в столовой',
    description: 'Оцените качество еды.',
    status: 'completed',
    questions: [
      {
        id: 1,
        text: 'Довольны ли вы качеством еды?',
        allowMultiple: false,
        options: [
          { id: 1, text: 'Да' },
          { id: 2, text: 'Нет' },
        ],
      },
    ],
  },
];

export const mockResults: Record<number, SurveyResults> = {
  3: {
    1: { 1: 42, 2: 18 },
  },
};