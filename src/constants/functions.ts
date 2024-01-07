import * as fs from 'fs';


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

export const percentageCalculation = (answered: number, questions: number): number => {
   const result = answered ? ((answered / questions) * 100) : 0;
   return result
}

// export const saveAnsweredQuestionJSON = (answers: number, quiz_index: number): void => {
//   const data = fs.readFileSync('src/constants/quizes.json', 'utf8');

//   const jsonData = JSON.parse(data);

//   const quizChange = jsonData.quizes[quiz_index];

//   quizChange.answered = answers;

//   const quizesUpdated = JSON.stringify(jsonData, null, 2);

//   fs.writeFileSync('src/constants/quizes.json', quizesUpdated);

// }

export const loadJSON = async () => {
  try {
    const apiUrl = `https://json.extendsclass.com/bin/e48f43d26d12`; // Substitua pela sua URL real
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      console.error('Erro ao obter dados da API:', response.statusText);
      return;
    }

    const jsonData = await response.json();

    return jsonData;
  }

  catch (error) {
    console.log('Erro ao processar loading do JSON:', error)
  }
}

export const saveAnsweredQuestionJSON = async (answers: number, quizId: number) => {
  try {
    const jsonData = await loadJSON();

    const apiUrl = `https://json.extendsclass.com/bin/e48f43d26d12`;

    const updatedQuizzes = jsonData.quizzes.map((quiz: any) => {
      if (quiz.id === quizId) {
        quiz.answered = answers;
        console.log(quiz)
      }
      return quiz;
    });


    const updatedData = { ...jsonData, quizzes: updatedQuizzes };

    // Atualiza o estado localmente (opcional, dependendo de como você deseja lidar com isso)

    // Enviando alterações de volta para a API
    const saveResponse = await fetch(apiUrl, {
      method: 'PUT', // Use 'PUT' para atualizações, ajuste conforme necessário
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (!saveResponse.ok) {
      console.error('Erro ao salvar dados:', saveResponse.statusText);
    }
  } catch (error) {
    console.error('Erro ao processar alterações:', error);
  }
};