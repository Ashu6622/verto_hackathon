import {useContext} from 'react'
import { MyContext } from '../context/ContextApi.jsx';

function Login(){

    const {loginemail, handleLogin, role, setRole, setloginEmail, isloading} = useContext(MyContext);

    return(
        <div>
            <h1>Login Page</h1>
            <div>
                {
                    role === null && <>
                        <button onClick={()=> setRole('admin')}>Admin</button>
                        <br />
                        <button onClick={()=> setRole('employee')}>Employee</button>
                    </>
                }
               
            </div>
            {
                role !== null && <>
                     <input type="email" placeholder="email" name="email" value={loginemail} onChange={(e)=> setloginEmail(e.target.value)}/>
                     <div>
                        <button onClick={handleLogin}>{isloading ? 'loading...' : 'Login'}</button>
                     </div>
                     <div>
                        <button onClick={()=> setRole(null)}>Back</button>
                     </div>
                </>
            }
           
        </div>
    )
}   

export default Login