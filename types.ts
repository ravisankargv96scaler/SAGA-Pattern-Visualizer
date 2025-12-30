export enum TabId {
  PROBLEM = 'problem',
  CONCEPT = 'concept',
  CHOREOGRAPHY = 'choreography',
  ORCHESTRATION = 'orchestration',
  SIMULATION = 'simulation',
  QUIZ = 'quiz',
}

export type StepStatus = 'idle' | 'pending' | 'success' | 'error' | 'compensated';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}