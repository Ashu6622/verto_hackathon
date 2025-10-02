import {useContext, useEffect, useState} from 'react'
import {useParams, Navigate} from 'react-router-dom'
import { MyContext } from '../context/ContextApi.jsx';
import '../styles/EmpProfile.css';
const API_URL = import.meta.env.VITE_API_URL

function EmpProfile(){

    const {logoutEmployee, isloading, setisLoading} = useContext(MyContext);
    const [profile, setProfile] = useState(null);
    const {id} = useParams();

    const empId = sessionStorage.getItem('loggedIn').split('-');
    
    if(empId[1] !== id){
        return <Navigate to='/authentication-page' replace={true}/>
    }

    useEffect(()=>{
       
        async function getEmployee(){

                const controller = new AbortController()
                const clearId = setTimeout(()=>{
                controller.abort()  //abort the request if it is taking more than 3 second
                },3000)
            
                try{
                    setisLoading(true);
                    const response = await fetch(`${API_URL}/employee-profile/${id}`,{
                        method:'GET',
                        signal:controller.signal
                    });
                    const result = await response.json();
                    setProfile(result.data);
                }
                catch(error){
                    toast.error('Try Again', { autoClose: 1500 });
                    setTimeout(()=>{
                        return navigate('/');
                    },1500)
                }
                finally{
                    setTimeout(()=>{
                        setisLoading(false);
                    },500)
                    clearTimeout(clearId);
                }
            }
       
        getEmployee();
    },[])

    return(
        <div className="emp-profile-container">
            <div className="profile-header">
                <h1 className="page-title">Employee Profile</h1>
                <div className="logout-container">
                    <button className="logout-button" onClick={logoutEmployee}>Logout</button>
                </div>
            </div>
            {
                isloading ? 
                <div className="loading-container">
                    <h2 className="loading-text">Loading...</h2>
                </div> : 
                <div className="profile-card">
                    <div className="profile-avatar">
                        {profile?.name?.charAt(0)?.toUpperCase()}
                    </div>
                    <div className="profile-info">
                        <div className="profile-field name-field">
                            <div className="field-label">Name</div>
                            <h3 className="field-value">{profile?.name}</h3>
                        </div>
                        <div className="profile-field email-field">
                            <div className="field-label">Email</div>
                            <h3 className="field-value">{profile?.email}</h3>
                        </div>
                        <div className="profile-field position-field">
                            <div className="field-label">Position</div>
                            <h3 className="field-value">{profile?.position.toUpperCase()}</h3>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default EmpProfile
