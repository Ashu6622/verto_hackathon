import {useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import { MyContext } from '../context/ContextApi.jsx';
import '../styles/EmpProfile.css';

function EmpProfile(){

    const {logoutEmployee, isloading, setisLoading} = useContext(MyContext);
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
                            <h3 className="field-value">{profile?.position}</h3>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default EmpProfile
