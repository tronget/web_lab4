import { useAtomValue } from "jotai";
import { jwtTokenAtom } from "./store";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ProtectedRoute({ element }) {
    const jwtToken = useAtomValue(jwtTokenAtom);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, [])

    if (isLoading) {
        return <> Loading... </>
    }

    return jwtToken ? element : <Navigate to="/" replace />;
}

export default ProtectedRoute;