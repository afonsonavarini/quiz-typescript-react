import { useNavigate } from "react-router-dom";

export function formatDuration(duration: number): string {
    const hours: number = Math.floor(duration / 60);
    const remainingMinutes: number = duration % 60;
    const formattedDuration: string = `${hours} hour ${remainingMinutes} min`;
  
    return formattedDuration;
  }


export const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

export const percentageCalculation = (percentageOf: number, totalNumber: number): number => {
   const result = percentageOf ? ((percentageOf / totalNumber) * 100) : 0;
   return result
}


export function orderQuizzesByTimestamp(data: {
  id: number;
  title: string;
  quiz_rating: string;
  quiz_icon: string;
  main_bg_color: string;
  main_color: string;
  answered: number;
  duration: number;
  timestamp: number;
  questions: {
    question: string;
    options: string[];
    question_img: string;
    correct_answer: string;
  }[];
}[]): {
  id: number;
  title: string;
  quiz_rating: string;
  quiz_icon: string;
  main_bg_color: string;
  main_color: string;
  answered: number;
  duration: number;
  timestamp: number;
  questions: {
    question: string;
    options: string[];
    question_img: string;
    correct_answer: string;
  }[];
}[] {
  return data
    .filter(item => typeof item.timestamp === 'number')
    .sort((a, b) => a.timestamp - b.timestamp)
    .reverse();
}