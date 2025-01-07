import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook
import { Box, Button, TextField } from '@mui/material';

function SignupPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            if (!username || !password || !confirmPassword) {
                setError('Please fill in all fields.');
                return;
            }

            if (password !== confirmPassword) {
                throw new Error("Passwords do not match");
            }

            const response = await axios.post('http://localhost:8080/api/auth/register', {
                "username": username,
                "password": password
            });
            console.log(response.data);
            navigate('/');
        } catch (error) {
            console.error('Signup failed:', error.response ? error.response.data : error.message);
            setError(error.response ? error.response.data : error.message);
        }
    };

    const handleInputKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSignup();
        }
    };

    return (
        <div>
            <div>
                    <h2 className="mb-4 text-center">Sign Up Page</h2>
                    {error && <p className="text-danger">{error}</p>}

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
                            onKeyDown={handleInputKeyPress}
                        />
                        <TextField
                            id="password"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleInputKeyPress}
                        />
                        <TextField
                            id="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            autoComplete="current-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onKeyDown={handleInputKeyPress}
                        />
                    </Box>

                    <Button variant="contained" onClick={handleSignup}>Sign up</Button>


                    <div className="text-center">
                        <p>Already Register? <a href="/">Login</a></p>
                    </div>
            </div>
        </div>
    );
}

export default SignupPage;