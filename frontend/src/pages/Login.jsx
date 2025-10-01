import {useContext} from 'react'
import { MyContext } from '../context/ContextApi.jsx';
import '../styles/Login.css';


function Login(){

    const {loginemail, handleLogin, role, setRole, setloginEmail, isloading} = useContext(MyContext);

    return(
        <div className="login-container">
            <div className="login-card">
                {
                    role !== null ?  <h1 className="login-title">Login as {role.toUpperCase()}</h1> : <h1 className="login-title">Login </h1>
                }
                <div className="role-selection">
                    {
                        role === null && <>
                            <button className="role-button" onClick={()=> setRole('admin')}>Admin</button>
                            <br />
                            <button className="role-button" onClick={()=> setRole('employee')}>Employee</button>
                        </>
                    }
                   
                </div>
                {
                    role !== null && 
                    <div className="login-form">
                         <input className="email-input" type="email" placeholder="Enter Email" name="email" value={loginemail} onChange={(e)=> setloginEmail(e.target.value)}/>
                         <div className="button-group">
                            <button className="login-button" onClick={handleLogin} disabled={isloading}>{isloading ? 'Loading...' : 'Login'}</button>
                            <button className="back-button" onClick={()=> setRole(null)}>Back</button>
                         </div>
                    </div>
                }
            </div>
        </div>
    )
}   

export default Login