import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

function AllEmployee(){
    
    const [list, setList] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        document.title = 'Employee List'

        async function fetchData(){

            const response = await fetch(`http://localhost:5555/api/employee/employee-list`,{
                method:'GET',
                credentials: "include"
            });

            const result = await response.json();

            console.log(result);

            if(!result.success){

                return navigate('/')
            }
        }

        fetchData();

    },[])


    return(
        <div>
            <h1>All Employee</h1>
        </div>

    )
}

export default AllEmployee;