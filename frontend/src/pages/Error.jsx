import {useNavigate} from 'react-router-dom'
import '../styles/Error.css';

function Error(){

    const navigate = useNavigate();

    return(
        <div className="error-container">
            <div className="error-content">
                <div className="error-icon">⚠️</div>
                <h1 className="error-title">Oops!</h1>
                <p className="error-message">Something went wrong. The page you're looking for might have been moved or doesn't exist.</p>
                <button className="back-button" onClick={()=> navigate(-1)}>Go Back</button>
            </div>
        </div>
    )
}

export default Error;