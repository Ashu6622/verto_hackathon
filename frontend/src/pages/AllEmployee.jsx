import {useEffect, useState, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import { MyContext } from '../context/ContextApi.jsx';
import * as XLSX from "xlsx";

function AllEmployee(){
    
    const [list, setList] = useState(null);
    const navigate = useNavigate();
    const {deleteEmployee, isloading, setisLoading} = useContext(MyContext);
    const [text, setText] = useState('');

    useEffect(()=>{
        document.title = 'Employee List'
        const controller = new AbortController();

        async function fetchData(){

            try{

                setisLoading(true);
                const response = await fetch(`http://localhost:5555/api/employee/employee-list`,{
                    method:'GET',
                    // credentials: "include"
                    signal:controller.signal
                });

                if(!response.ok){
                    return navigate('/');
                }

                const result = await response.json();

                if(!result.success){
                    alert(result.message);
                    return navigate('/')
                }

                setTimeout(()=>{
                    setList(result.data);
                },1500)

            }
            catch(error){
                console.log(error);
            }
            finally{
                 setTimeout(()=>{
                     setisLoading(false);
                },1500)
            }
          
        }

        fetchData();

    },[])

    function exportToExcel(){
        const worksheet = XLSX.utils.json_to_sheet(list);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "employee-list.xlsx");
    };

    const fileteredData = list?.filter((emp)=> emp.name.toLowerCase().includes(text.toLowerCase()))


    return(
        <div>
            <h1>All Employee</h1>
            <div>
                <input type='text' placeholder={'Search By Name here...'} value={text} onChange={(e)=> setText(e.target.value)}/>
            </div>
            {

                isloading ? 
                <div>
                    <h2>Loading...</h2>
                </div> :
                 <div>
                    {
                        fileteredData?.map((emp)=>{
                            return(
                                <div key={emp.id}>
                                    <span>{emp.name}</span>
                                    <span>{emp.email}</span>
                                    <span>{emp.position}</span>
                                     <button onClick={()=> deleteEmployee(emp.id)}>Delete</button>
                                     <button onClick={()=> navigate(`/update-employee/${emp.id}`)}>Update</button>
                                </div>
                            )
                        })
                    }
            </div>
            }
           
            <div>
                <button onClick={exportToExcel}>Export</button>
                <button onClick={()=> navigate('/add-employee')}>Add Employee</button>
            </div>

        </div>

    )
}

export default AllEmployee;