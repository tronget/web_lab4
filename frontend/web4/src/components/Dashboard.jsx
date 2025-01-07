// WelcomeDashboard.js
import { useAtom } from 'jotai';
import { useNavigate} from 'react-router-dom'; // Import useHistory hook
import { jwtTokenAtom, globalUsernameAtom } from '../util/store';
import { Button, FormControlLabel, Radio, RadioGroup, Slider, Switch, TextField } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import DotsPanel from './DotsPanel';
import Notification from './Notification';
import { Canvas } from './Canvas';
import { DotsCanvas } from './DotsCanvas';
import { validateValues } from '../util/script';

function Dashboard() {
    const navigate = useNavigate();
	const [jwtToken, setJwtToken] = useAtom(jwtTokenAtom);
	const [globalUsername, setGlobalUsername] = useAtom(globalUsernameAtom);
    const [rValue, setRvalue] = useState(1);
    const [xValue, setXvalue] = useState(null);
    const [yValue, setYvalue] = useState(null);
    const [dots, setDots] = useState([]);
    const [openNotification, setOpenNotification] = useState(false);
    const [notificationInfo, setNotificationInfo] = useState("");
    const [notificationType, setNotificationType] = useState("");
    const [newDot, setNewDot] = useState({});

    function handleLogout() {
		setJwtToken(null);
		setGlobalUsername(null);
        navigate('/');
    };

    function addDot(dot) {
        setDots([...dots, {id: dot.id, x: dot.x, y: dot.y, r: dot.r, isHit: dot.isHit}])
    }

    async function sendDot() {
        if (!validateValues(xValue, yValue, rValue)) {
            setNotificationType("error");
            setNotificationInfo("Невалидные значения!");
            setOpenNotification(true);
            return;
        }

        try {
            // TODO: validate before sending
            const response = await axios.post('http://localhost:8080/api/dot',
            {
                "x": xValue,
                "y": yValue,
                "r": rValue
            },
            {
                headers: {
                    Authorization: "Bearer " + jwtToken
                },
            });
            const data = response.data;
            setNewDot(response.data);
            console.log("Sending sussessful! Retrieved data: ", data);
            addDot(data);
            // setDots([...dots, {id: data.id, x: data.x, y: data.y, r: data.r, isHit: data.isHit}]);
            setNotificationType("success");
            setNotificationInfo("Точка успешно добавлена!");
            setOpenNotification(true);
        } catch (error) {
            console.error("Sending failed: ", error.response ? error.response.data : error.message);
            setNotificationType("error");
            setNotificationInfo("Ошибка во время выполнения запроса!");
            setOpenNotification(true);
        }
    }

    function handleR(event, value) {
        setRvalue(value)
    }

    function handleX(event, value) {
        setXvalue(value);
    }
    
    function handleY(event) {
        setYvalue(event.target.value);
    }
    
    return (
        <>
            <div className="dashboard_input_container">
                <h2>Welcome to Dashboard</h2>
                <p>Hello, {globalUsername}! You are logged in successfully.</p>
                <Button
                    className="button"
                    sx={{
                        position: "absolute",
                        top: 20, right: 0
                    }}
                    variant="contained"
                    onClick={handleLogout}
                >
                    Logout
                </Button>

                <div>
                    <p>R value: {rValue}</p>
                    <Slider
                        sx={{
                            width: "60%",
                            maxWidth: 180
                        }}
                        aria-label="radius"
                        onChange={handleR}
                        defaultValue={1}
                        valueLabelDisplay="auto"
                        shiftStep={2}
                        step={1}
                        marks
                        min={1}
                        max={5}
                    />
                    <p>X value: {xValue}</p>
                    <RadioGroup
                        row
                        aria-labelledby="radio-buttons-for-x-value"
                        name="row-radio-buttons-group"
                        onChange={handleX}
                        sx={{justifyContent: "center"}}
                    >
                        <FormControlLabel value="-3" control={<Radio />} label="-3" />
                        <FormControlLabel value="-2" control={<Radio />} label="-2" />
                        <FormControlLabel value="-1" control={<Radio />} label="-1" />
                        <FormControlLabel value="0" control={<Radio />} label="0" />
                        <FormControlLabel value="1" control={<Radio />} label="1" />
                        <FormControlLabel value="2" control={<Radio />} label="2" />
                        <FormControlLabel value="3" control={<Radio />} label="3" />
                    </RadioGroup>
                    <p>Y value: {yValue}</p>
                    <TextField
                        id="yValue"
                        label="Y value"
                        type="number"
                        value={yValue ?? ''}
                        onChange={handleY}
                        error={yValue < -3 || yValue > 5}
                    />
                    <Button
                        className="button"
                        sx={{position: "absolute", bottom: 0, right: 0}}
                        variant="contained"
                        onClick={sendDot}>Send dot</Button>
                    
                    <Notification
                        open={openNotification}
                        setOpen={setOpenNotification}
                        info={notificationInfo}
                        type={notificationType}
                    />
                </div>
            </div>
            <DotsPanel dots={dots} setDots={setDots} />
            <div className="canvasSelection">
                <Canvas rValue={rValue} />
                <DotsCanvas rValue={rValue} dots={dots} newDot={newDot} addDot={addDot} />
            </div>
        </>
    );
}

export default Dashboard;