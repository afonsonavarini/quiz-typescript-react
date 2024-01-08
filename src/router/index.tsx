import { createBrowserRouter } from "react-router-dom";
import Home from "../ui/screens/home-screen/Home";
import Details from "../ui/screens/details-screen/Details";
import QuizPage from "../ui/screens/quizpage-screen/QuizPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/details',
        element: <Details/>
    },
    {
        path: '/quiz',
        element: <QuizPage/>
    },
])