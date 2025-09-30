import {useContext} from 'react'
import { MyContext } from '../context/ContextApi.jsx';

function Login(){

    const {loginemail, handleLoginChange, handleLogin} = useContext(MyContext);

    return(
        <div>
            <h1>Login Page</h1>
            <input type="email" placeholder="email" name="email" value={loginemail} onChange={handleLoginChange}/>
            <div>
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    )
}   

export default Login