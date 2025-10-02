import {useEffect, useState, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import { MyContext } from '../context/ContextApi.jsx';
import * as XLSX from "xlsx";
import '../styles/AllEmployee.css';
const API_URL = import.meta.env.VITE_API_URL


function AllEmployee(){
    

    const navigate = useNavigate();
    const {isloading, setisLoading, logoutAdmin,  handleDeleteClick, confirmDelete, cancelDelete, showDialog, employeeToDelete, list, setList} = useContext(MyContext);
    const [text, setText] = useState('');


    useEffect(()=>{
        document.title = 'Employee List'

        async function fetchData(){

            const controller = new AbortController()
            const clearId = setTimeout(()=>{
                controller.abort()  //abort the request if it is taking more than 6 second
            },6000)

            try{

                setisLoading(true);
                const response = await fetch(`${API_URL}/employee-list`,{
                    method:'GET',
                    signal:controller.signal
                });

                if(!response.ok){
                    return navigate('/');
                }

                const result = await response.json();

                if(!result.success){
                    toast.error(result.success, { autoClose: 1500 });
                    return navigate('/')
                }

                setTimeout(()=>{
                    setList(result.data);
                },1500)

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
                },1500)
                clearTimeout(clearId);
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
        <div className="all-employee-container">
            <h1 className="page-title">All Employee</h1>
            <div className="search-container">
                <input className="search-input" type='text' placeholder={'Search By Name here...'} value={text} onChange={(e)=> setText(e.target.value)}/>
            </div>
            {

                isloading ? 
                <div className="loading-container">
                    <h2 className="loading-text">Loading...</h2>
                </div> :
                 <div className="employee-grid">
                    {   

                        (fileteredData?.length === 0 || fileteredData === null) ? 

                        <div className="no-content">
                            <h2>No Content</h2>
                        </div> :
                    
                        fileteredData?.map((emp)=>{
                            return(
                                <div className="employee-card" key={emp.id}>
                                    <div className="employee-info">
                                        <span className="employee-name">{emp.name}</span>
                                        <span className="employee-email">{emp.email}</span>
                                        <span className="employee-position">{emp.position.toUpperCase()}</span>
                                    </div>
                                    <div className="employee-actions">
                                        <button className="action-button delete-button" onClick={()=> handleDeleteClick(emp)}>Delete</button>
                                        <button className="action-button update-button" onClick={()=> navigate(`/update-employee/${emp.id}`)}>Update</button>
                                    </div>
                                </div>
                            )
                        })
                    }
            </div>
            }
           
            <div className="bottom-actions">
                <button className="primary-button export-button" onClick={exportToExcel}>Export</button>
                <button className="primary-button add-button" onClick={()=> navigate('/add-employee')}>Add Employee</button>
                <button className="primary-button logout-button" onClick={logoutAdmin}>Logout</button>
            </div>

            {showDialog && (
                <div className="dialog-overlay">
                    <div className="dialog-box">
                        <h3 className="dialog-title">Confirm Delete</h3>
                        <p className="dialog-message">
                            Are you sure you want to delete <strong>{employeeToDelete?.name}</strong>?
                        </p>
                        <div className="dialog-actions">
                            <button className="dialog-button cancel-button" onClick={cancelDelete}>Cancel</button>
                            <button className="dialog-button confirm-button" onClick={confirmDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            )}

        </div>

    )
}

export default AllEmployee;