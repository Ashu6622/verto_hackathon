import {useNavigate} from 'react-router-dom'
import '../styles/AuthenticationPage.css';

function AuthenticationPage(){

    const navigate = useNavigate()

    return(
        <div className="authentication-page-container">
            <div className="authentication-content">
                <div className="authentication-icon">🚫</div>
                <h1 className="authentication-title">Access Forbidden</h1>
                <p className="authentication-description">You don't have permission to access this page. Please contact your administrator if you believe this is an error.</p>
                <div className="button-container">
                    <button className="go-back-button" onClick={()=> navigate(-1)}>Go Back</button>
                </div>
            </div>
        </div>
    )
}

export default AuthenticationPage