import {Navigate} from 'react-router-dom'

function Auth({children}){
    
    // do an api call and check wether the admin is authenticated or not

    (async()=>{
        const response = await fetch(`http://localhost:5555/api/employee/is-login`,{
            credentials:true
        });

        const result = response.json();
        console.log(result);

        if(result.success === true){
            console.log("****");
            return children;
        }
       
        return window.location.replace('/');
        
    })()
}

export default Auth