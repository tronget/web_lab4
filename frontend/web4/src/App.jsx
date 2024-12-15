import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignUpPage";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import { globalUsername } from "./store";
import { useAtomValue } from "jotai";

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
            element: <Dashboard username={useAtomValue(globalUsername)} />,
        },
    ]);

	// useEffect(() => {
	// 	fetchPoints();
	// }, []);

    // const fetchPoints = async () => {
    //     try {
    //         const response = await fetch("http://localhost:8080/api/dot", {
    //             method: "GET", // HTTP метод
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: "Bearer " + "asdasdasd", // Если нужен токен
    //             },
    //         });

    //         if (!response.ok) {
    //             throw new Error(
    //                 "Ошибка при получении данных: " + response.statusText
    //             );
    //         }

    //         const data = await response.json();
    //         console.log(data); // Полученные точки
    //     } catch (error) {
    //         console.error("Ошибка:", error);
    //     }
    // };

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
