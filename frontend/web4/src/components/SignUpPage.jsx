import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook
import {
    MDBContainer,
    MDBInput,
} from 'mdb-react-ui-kit';

function SignupPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(''); // State to manage error messages
    const navigate = useNavigate(); // Get the history object for redirection

    const handleSignup = async () => {
        try {
            // Check for empty fields
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
            // Handle successful signup
            console.log(response.data);
            navigate('/');
        } catch (error) {
            // Handle signup error
            console.error('Signup failed:', error.response ? error.response.data : error.message);
            setError(error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="border rounded-lg p-4" style={{width: '600px', height: 'auto'}}>
                <MDBContainer className="p-3">
                    <h2 className="mb-4 text-center">Sign Up Page</h2>
                    {/* Render error message if exists */}
                    {error && <p className="text-danger">{error}</p>}
                    <MDBInput wrapperClass='mb-3' id='username' placeholder={"User Name"} value={username} type='text'
                              onChange={(e) => setUsername(e.target.value)}/>
                    <MDBInput wrapperClass='mb-3' placeholder='Password' id='password' type='password' value={password}
                              onChange={(e) => setPassword(e.target.value)}/>
                    <MDBInput wrapperClass='mb-3' placeholder='Confirm Password' id='confirmPassword' type='password'
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}/>

                    <button className="mb-4 d-block mx-auto fixed-action-btn btn-primary"
                            style={{height: '40px', width: '100%'}}
                            onClick={handleSignup}>Sign Up
                    </button>

                    <div className="text-center">
                        <p>Already Register? <a href="/">Login</a></p>
                    </div>

                </MDBContainer>
            </div>
        </div>
    );
}

export default SignupPage;