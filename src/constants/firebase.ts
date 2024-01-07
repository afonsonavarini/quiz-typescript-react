import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, get, update, set } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAo7WsUwEBInvYQIwxd1Mi8t00WCdxDMOY",
    authDomain: "quiz-typescript.firebaseapp.com",
    databaseURL: "https://quiz-typescript-default-rtdb.firebaseio.com",
    projectId: "quiz-typescript",
    storageBucket: "quiz-typescript.appspot.com",
    messagingSenderId: "908056159839",
    appId: "1:908056159839:web:56266f9694699b92691dea",
    measurementId: "G-R7MMC3JLSJ"
  };

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

async function lerDados(caminho: string): Promise<any> {
  const referencia = ref(database, caminho);

  try {
    const snapshot = await get(referencia);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.error("Nenhum dado encontrado no caminho:", caminho);
      return null;
    }
  } catch (erro) {
    console.error("Erro ao ler dados:", erro);
    throw erro;
  }
}

async function loadDatabaseFile(databasePath: string) {
  try {
    const dados = await lerDados(databasePath);
    return dados
  } catch (erro) {
    console.error("Erro ao ler dados:", erro);
  }
}

async function updateRecentQuizzes(quizNovo: any, caminhoNoBancoDeDados: string): Promise<void> {
  const referencia = ref(database, caminhoNoBancoDeDados);

  try {
    // Obter a lista atual
    const listaAtual = await get(referencia);

    const quizNovoUpdated = { id: quizNovo.id};

    // Verificar se a lista existe
    const novaLista = listaAtual.exists() ? listaAtual.val() : [];

    // Verificar se o item já existe na lista com base no ID
    const indexExistente = novaLista.findIndex((item: any) => item.id === quizNovo.id);

    if (indexExistente !== -1) {
      console.log('ja existe')
      return;
    }

    novaLista.unshift(quizNovoUpdated);

    // Remover o último item, se houver mais do que um item na lista
    if (novaLista.length > 1) {
      novaLista.pop();
    }

    // Atualizar a lista no banco de dados
    await set(referencia, novaLista);
  } catch (erro) {
    console.error("Erro ao adicionar novo quiz:", erro);
    throw erro;
  }
}

async function updateAnswersQuiz(quiz: any, numeroAcertos: number, caminhoNoBancoDeDados: string): Promise<void> {
  const referencia = ref(database, caminhoNoBancoDeDados);

  try {
    // Obter a lista atual
    const listaAtual = await get(referencia);

    // Verificar se a lista existe
    const novaLista = listaAtual.exists() ? listaAtual.val() : [];

    // Encontrar o índice do quiz na lista baseado no ID
    const indiceQuiz = novaLista.findIndex((item: any) => item.id === quiz.id);

    // Verificar se o quiz foi encontrado na lista
    if (indiceQuiz !== -1) {
      // Atualizar o campo "answered" do quiz com o número de acertos
      novaLista[indiceQuiz].answered = numeroAcertos;

      // Atualizar a lista no banco de dados
      await set(referencia, novaLista);
    } else {
      console.log("Quiz não encontrado na lista. Nenhuma alteração feita.");
    }
  } catch (erro) {
    console.error("Erro ao atualizar número de acertos:", erro);
    throw erro;
  }
}

export { database, lerDados, loadDatabaseFile, updateRecentQuizzes, updateAnswersQuiz};