import {useContext, useEffect} from 'react'
import { MyContext } from '../context/ContextApi.jsx';
import '../styles/Login.css';


function Login(){

    const {loginemail, handleLogin, role, setRole, setloginEmail, isloading, error} = useContext(MyContext);

     useEffect(()=>{
            document.title = 'Login'
    },[])

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
                         {error?.email && <p className="error-message" style={{fontSize:'12px', color:'red', marginTop:'-12px', marginBottom:'-30px', textAlign:'left'}}>{error.email}</p>}
                         {isloading && (
                            <div className="loading-message">
                                <p>🔐 Authenticating your credentials...</p>
                                <p>Please wait while we verify your access. It will be definitely done</p>
                            </div>
                         )}
                         <div className="button-group">
                            <button className="login-button" onClick={handleLogin} disabled={isloading}>{isloading ? 'Loading...' : 'Login'}</button>
                            <button className="back-button" onClick={()=> setRole(null)} disabled={isloading}>Back</button>
                         </div>
                    </div>
                }
            </div>
        </div>
    )
}   

export default Login