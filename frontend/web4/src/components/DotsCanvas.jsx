import {forwardRef, useEffect, useRef} from "react";
import {drawDot, validateValues} from "../util/script";
import axios from "axios";
import { useAtomValue } from "jotai";
import { jwtTokenAtom } from "../util/store";

export const DotsCanvas = forwardRef(({ rValue, dots, newDot, addDot}) => {
    const dotsCanvasRef = useRef(null);
    const jwtToken = useAtomValue(jwtTokenAtom);

    async function handleDotsDrawing(event) {
        console.log(dots);
        const canvas = dotsCanvasRef.current;

        const rect = canvas.getBoundingClientRect();
        const xClick = event.clientX - rect.left;
        const yClick = event.clientY - rect.top;

        const canvasCenterX = canvas.width / 2;
        const canvasCenterY = canvas.height / 2;

        const scale = canvasCenterX / 5;

        const xValue = (xClick - canvasCenterX) / scale;
        const yValue = -(yClick - canvasCenterY) / scale;
        const requestData = {
            x: parseFloat((xValue).toFixed(2)),
            y: parseFloat((yValue).toFixed(2)),
            r: parseInt(rValue)
        }

        if (!validateValues(xValue, yValue, rValue)) {
            return;
        }
        
        try {
            const response = await axios.post("http://localhost:8080/api/dot",
                requestData, {
                headers: {
                    Authorization: "Bearer " + jwtToken,
                }
            });

            const responseData = response.data;
            addDot(responseData);
            drawDot(dotsCanvasRef.current, responseData.x, responseData.y, responseData.isHit ? 'green' : 'red');

        } catch (error) {
            console.error("Invalid dot! " + error.response ? error.response.data : error.message)
        }
    }

    useEffect(() => {
        if (dots && dots.length) {
            dots.forEach(dot => {
                drawDot(dotsCanvasRef.current, dot.x, dot.y, dot.isHit ? 'green' : 'red');
            });
        }
    }, [dots]);

    useEffect(() => {
        drawDot(dotsCanvasRef.current, newDot.x * newDot.r, newDot.y * newDot.r, newDot.isHit ? 'green' : 'red');
    }, [newDot])



    return (

        <canvas id="dotsCanvas" ref={dotsCanvasRef} width={500} height={500} onClick={handleDotsDrawing}/>

    )


});

DotsCanvas.displayName = "DotsCanvas";