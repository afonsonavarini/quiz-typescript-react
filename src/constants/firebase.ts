import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, update, set } from "firebase/database";

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

async function readData(databasePath: string): Promise<any> {
  const reference = ref(database, databasePath);

  try {
    const snapshot = await get(reference);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.error("No data was found in:", databasePath);
      return null;
    }
  } catch (error) {
    console.error("Error retrieving data:", error);
    throw error;
  }
}

async function loadDatabaseFile(databasePath: string) {
  try {
    const dados = await readData(databasePath);
    return dados
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}

async function updateQuizTimestamp(quiz: any, databasePath: string): Promise<void> {
  const reference = ref(database, databasePath);

  try {
    const currentArray = await get(reference);

    const newArray = currentArray.exists() ? currentArray.val() : [];

    const quizIndex = newArray.findIndex((item: any) => item.id === quiz.id);

    const newDate = Date.now();

    if (quizIndex !== -1) {
      newArray[quizIndex].timestamp = newDate;

      await update(reference, { [quizIndex + '/timestamp']: newDate });
    } else {
      console.log("Quiz not found. No changes were made.");
    }
  } catch (error) {
    console.error("Error updating quiz's timestamp:", error);
    throw error;
  }
}


async function updateAnswersQuiz(quiz: any, numeroAcertos: number, databasePath: string): Promise<void> {
  const reference = ref(database, databasePath);

  try {
    const currentArray = await get(reference);

    const newArray = currentArray.exists() ? currentArray.val() : [];

    const quizIndex = newArray.findIndex((item: any) => item.id === quiz.id);

    if (quizIndex !== -1) {
      newArray[quizIndex].answered = numeroAcertos;

      await set(reference, newArray);
    } else {
      console.log("Quiz not found. No changes were made.");
    }
  } catch (error) {
    console.error("Error updating answer count:", error);
    throw error;
  }

}

export { database, readData, loadDatabaseFile, updateAnswersQuiz, updateQuizTimestamp};