import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { globalUsernameAtom, jwtTokenAtom } from '../util/store';
import { Button, TextField, Box } from '@mui/material';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
	const setJwtToken = useSetAtom(jwtTokenAtom);
	const setGlobalUsername = useSetAtom(globalUsernameAtom)
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            if (!username || !password) {
                setError('Please enter both username and password.');
                return;
            }

            const response = await axios.post('http://localhost:8080/api/auth/login', {
                "username": username,
                "password": password
            });
            console.log('Login successful:', response.data);
			setJwtToken(response.data.token);
			setGlobalUsername(response.data.username);
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            setError('Invalid username or password.');
        }
    };


    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <h2 className="mb-4 text-center">Login Page</h2>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                width: "50%",
                margin: "0 auto 15px",
                gap: "15px"
            }}>
                <TextField 
                    id="username"
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Box>
            {error && <p className="text-danger">{error}</p>} {/* Render error message if exists */}
            <Button variant="contained" onClick={handleLogin}>Sign in</Button>
            <div className="text-center">
                <p>Not a member? <a href="/signup" >Register</a></p>
            </div>
        </div>
    );
}

export default LoginPage;