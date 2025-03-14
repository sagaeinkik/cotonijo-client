import { createBrowserRouter } from "react-router-dom";
import Layout from "./assets/layouts/Layout"
import ProtectedRoute from "./assets/components/ProtectedRoute";


//Undersidor
import HomePage from "./assets/pages/HomePage";
import LoginPage from "./assets/pages/LoginPage";
import ProfilePage from "./assets/pages/ProfilePage";

//Reviews
import ReviewPage from "./assets/pages/ReviewPage";
import NewReviewPage from "./assets/pages/NewReviewPage";
import EditReviewPage from "./assets/pages/EditReviewPage";

//Länder
import CountriesPage from "./assets/pages/CountriesPage";
import CountryPage from "./assets/pages/CountryPage";
import RegisterPage from "./assets/pages/RegisterPage";

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
                path: "/login", 
                element: <LoginPage />
            },
            {
                path: "/register", 
                element: <RegisterPage />
            },
            {
                path: "/profile", 
                element: <ProtectedRoute><ProfilePage /></ProtectedRoute>
            },
            {
                path: "/reviews", 
                element: <ReviewPage />
            }, 
            {
                path: "/leave-review", 
                element: <ProtectedRoute><NewReviewPage /></ProtectedRoute>
            },
            {
                path: "/edit-review/:id",
                element: <ProtectedRoute><EditReviewPage /></ProtectedRoute>
            },
            {
                path: "/countries",
                element: <CountriesPage />
            }, 
            {
                path: "/countries/:ccn3", 
                element: <CountryPage />
            }
        ]
    },
])

export default router;