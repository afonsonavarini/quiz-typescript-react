import { createBrowserRouter } from "react-router-dom";
import Home from "../ui/screens/Home";
import Details from "../ui/screens/Details";
import QuizPage from "../ui/screens/QuizPage";

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