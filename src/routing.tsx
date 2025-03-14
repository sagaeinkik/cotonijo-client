import { createBrowserRouter } from "react-router-dom";
import Layout from "./assets/layouts/Layout"
import HomePage from "./assets/pages/HomePage";
import ReviewPage from "./assets/pages/ReviewPage";
import NewReviewPage from "./assets/pages/NewReviewPage";
import CountriesPage from "./assets/pages/CountriesPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/reviews", 
                element: <ReviewPage />
            }, 
            {
                path: "/leave-review", 
                element: <NewReviewPage />
            },
            {
                path: "/countries",
                element: <CountriesPage />
            }
        ]
    },
])

export default router;