import {useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import { MyContext } from '../context/ContextApi.jsx';

function EmpProfile(){

    const {logout, isloading, setisLoading} = useContext(MyContext);
    const [profile, setProfile] = useState(null);
    const {id} = useParams();

    useEffect(()=>{
       
        async function getEmployee(){
            
                try{
                    setisLoading(true);
                    const response = await fetch(`http://localhost:5555/api/employee/employee-profile/${id}`);
                    const result = await response.json();
                    console.log(result);
                    setProfile(result.data)

                }
                catch(error){
                    console.log(error);
                }
                finally{
                    setTimeout(()=>{
                        setisLoading(false);
                    },500)
                }
              
            }
       
        getEmployee();
    },[])

    return(
        <div>
            <h1>Employee Profile Page</h1>
            
            <div>
                <button onClick={logout}>Logout</button>
            </div>
            {
                isloading ? <h2>Loading...</h2> : 
                <div>
                    <h3>Name : {profile?.name}</h3>
                    <h3>Email : {profile?.email}</h3>
                    <h3>Position : {profile?.position}</h3>
                </div>
            }
            
        </div>
    )
}

export default EmpProfile
