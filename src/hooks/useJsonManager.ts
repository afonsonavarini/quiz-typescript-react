


export function useJsonManager() {

    async function loadJSONInfo(ApiURL: string) {
        try {
          const apiUrl = ApiURL; // Substitua pela sua URL real
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

      async function saveAnsweredQuestion(answers: number, quizId: number, apiUrl: string) {
        try {
          const jsonData = await loadJSONInfo(apiUrl);
    
      
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
      }

      async function saveRecentQuiz(newQuiz: any, apiUrl: string) {
        try {
          const jsonData = await loadJSONInfo(apiUrl);
      
          // Adiciona o novo quiz como o primeiro elemento do array
          const updatedQuizzes = [newQuiz, ...jsonData.recentQuizes.slice(0, 1)];
      
          const updatedData = { ...jsonData, recentQuizes: updatedQuizzes };
      
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
      }

      return {loadJSONInfo, saveAnsweredQuestion, saveRecentQuiz} 
      
}

