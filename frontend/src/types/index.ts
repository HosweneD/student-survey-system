export interface User {
  id: number;
  fullName: string;
  studentId: string;
}

export interface AnswerOption {
  id: number;
  text: string;
}

export interface Question {
  id: number;
  text: string;
  options: AnswerOption[];
  allowMultiple: boolean;
}

export interface Survey {
  id: number;
  title: string;
  description: string;
  status: 'active' | 'completed';
  questions: Question[];
}

export type SurveyResults = Record<number, Record<number, number>>;