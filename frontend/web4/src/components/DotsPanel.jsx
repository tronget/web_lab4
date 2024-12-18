import axios from "axios";
import { useAtomValue } from "jotai";
import { jwtTokenAtom } from "../util/store";
import DataTable from "./DataTable";
import { useEffect } from "react";

function DotsPanel({dots, setDots}) {
	const jwtToken = useAtomValue(jwtTokenAtom);

    useEffect(() => {
        async function loadDots() {
            try {
                const response = await axios.get('http://localhost:8080/api/dot', {
                    headers: {
                        Authorization: "Bearer " + jwtToken
                    }
                });
                console.log("Retrieved dots: ", response.data);
                setDots(response.data);
            } catch (error) {
                console.error("Sending failed: ", error.response ? error.response.data : error.message);
            }
        }
        loadDots();
    }, [jwtToken, setDots]);


    return (
        <>
            <DataTable dots={dots}/>
        </>
    )
}

export default DotsPanel;