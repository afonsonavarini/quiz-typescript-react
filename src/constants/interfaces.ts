export interface Quiz {
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
  }