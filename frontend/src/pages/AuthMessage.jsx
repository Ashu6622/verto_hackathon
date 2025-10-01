import {useNavigate} from 'react-router-dom';
import '../styles/AuthMessage.css';

function AuthMessage(){ 

    const navigate = useNavigate();
        return(
            <div className="auth-message-container">
                <div className="auth-message-content">
                    <div className="auth-icon">🔒</div>
                    <h1 className="auth-message-title">Access Denied</h1>
                    <p className="auth-description">You are not logged in. Please log in to access this page.</p>
                    <div className="auth-button-container">
                        <button className="back-button" onClick={()=> navigate('/')}>Go to Login</button>
                    </div>
                </div>
            </div>
        )
}

export default AuthMessage