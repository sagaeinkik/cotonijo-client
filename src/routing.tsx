import { createBrowserRouter } from "react-router-dom";
import Layout from "./assets/layouts/Layout"
import HomePage from "./assets/pages/HomePage";
import ReviewPage from "./assets/pages/ReviewPage"

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
            }
        ]
    },
])

export default router;