import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignUpPage";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import ProtectedRoute from "./util/ProtectedRoute";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <LoginPage />,
        },
        {
            path: "/signup",
            element: <SignupPage />,
        },
        {
            path: "/dashboard",
            element: <ProtectedRoute element={<Dashboard />}/>,
        },
    ]);


    return (
        <>
            <div className="App">
                <Header info={"Лашкул Андрей Владимирович P3210 5558882"} />
                <RouterProvider router={router} />
            </div>
        </>
    );
}

export default App;
