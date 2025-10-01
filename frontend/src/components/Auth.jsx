import {Navigate} from 'react-router-dom'

function Auth({path, children}){

    const loggedIn = sessionStorage.getItem('loggedIn');

    if(!loggedIn){
        return <Navigate to='/Auth-Message' replace={true}/>
    }
  
    if(loggedIn === 'adminlogged'){
        if(path.includes('profile')){
            return <Navigate to='/authentication-page' replace={true}/>
        }
    }
    else if(loggedIn === 'employeelogged'){
        if(path.includes('employee-list') || path.includes('update-employee') || path.includes('add-employee')){
            return <Navigate to='/authentication-page' replace={true}/>
        }
    }

    return children
}

export default Auth