// WelcomeDashboard.js
import { useSetAtom } from 'jotai';
import { useNavigate} from 'react-router-dom'; // Import useHistory hook
import { globalUsername, jwtTokenAtom } from '../store';

function WelcomeDashboard({ username }) {
    const navigate = useNavigate();
	const setJwtToken = useSetAtom(jwtTokenAtom);
	const setGlobalUsername = useSetAtom(globalUsername);


    const handleLogout = () => {
		setJwtToken(null);
		setGlobalUsername(null);
        navigate('/');
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="border rounded-lg p-4" style={{width: '500px', height: '400px'}}>
                <h2 className="mb-4 text-center">Welcome to Dashboard</h2>
                <p className="mb-4 text-center">Hello, {username}!</p>
                <p className="text-center">You are logged in successfully.</p>
                <div className="text-center">
                    <button type="button" className="btn btn-primary mt-3" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
}

export default WelcomeDashboard;