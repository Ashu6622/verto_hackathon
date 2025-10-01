import {createContext, useState, useEffect} from 'react'
import { z } from "zod";
export const MyContext = createContext();
import {useNavigate} from 'react-router-dom';


const userSchema = z.object({
    name: z.string().min(3, "Name must be at leat 3 characters").regex(/^[A-Za-z][A-Za-z0-9\s]*$/, "Name must start with alphabet and contain only letters, numbers and spaces"),
    email: z.string().email('Enter valid email'),
    position: z.string().min(2, "must be at leat 2 characters").regex(/^[A-Za-z][A-Za-z0-9\s]*$/, "Position must start with alphabet and contain only letters, numbers and spaces"),
}).required();

function ContextApi({children}){

    const [form, setForm] = useState({
        name:"",
        email:"",
        position:"",
    })

    const navigate = useNavigate();
    const [role, setRole] = useState(null);
    const [loginemail, setloginEmail] = useState("");
    const [isloading, setisLoading] = useState(false);
    const [error, setError] = useState(null)
    const [showDialog, setShowDialog] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    const [list, setList] = useState(null);
    
    async function handleForm(){

         const check = userSchema.safeParse(form);
           
            if(!check.success){
                const error = check.error.format()
                
                const errorHandlers = {}
                errorHandlers.name = error.name?._errors[0]
                errorHandlers.email = error.email?._errors[0]
                errorHandlers.position = error.position?._errors[0]
                // console.log(errorHandlers);
                setError(errorHandlers)
                return;
            }

        try{
           
            setError(null)
            setisLoading(true)
            const response = await fetch(`http://localhost:5555/api/employee/add-employee`,{
                method:'POST',
                credentials:'include',
                headers:{
                    'content-type':'application/json',
                },
                body : JSON.stringify(form)
            })

            if(!response.ok){
                return alert('Something went wrong')
            }   

            const result = await response.json();

            if(!result.success){
                alert(result.message);
            }

            if(result.success && result.status === 200){
                setTimeout(()=>{
                    return navigate('/employee-list');
                },2000)
            }   

        }
        catch(error){
            alert(error.message);
            setTimeout(()=>{
                return navigate('/add-employee');
            },2000)
        }
        finally{
            setTimeout(()=>{
               setForm({
                    name:"",
                    email:"",
                    position:"",
                })
                setisLoading(false);
            },2000)
        }
       
    }

    function handleFormChange(e){
        const {name, value} = e.target;
        setForm((prev)=> ({...prev,  [name]: value}));
    }

    async function handleLogin(){

        try{
            setisLoading(true);
            const response = await fetch(`http://localhost:5555/api/employee/${role}-login`,{
                method:'POST',
                headers:{
                    'content-type':'application/json',
                },
                body : JSON.stringify({email:loginemail})
            });

            if(!response.ok){
                return alert('Something went wrong')
            }
            const result = await response.json();

            if(!result.success){
                alert(result.message);
                return navigate('/');
            }
           
            if(result.status === 200 && result.success){

                setTimeout(()=>{
                    
                    if(role === "admin"){
                        sessionStorage.setItem('loggedIn', 'adminlogged');
                        return navigate('/employee-list', {replace:true})
                    }
                    else if(role === "employee"){
                        sessionStorage.setItem('loggedIn', 'employeelogged');
                        return navigate(`/profile/${result.data.id}`, {replace:true})
                    }

                },1500)
            }
            
        }
        catch(error){
            console.log(error);
        }
        finally{

            setTimeout(()=>{
                setloginEmail('');
                setisLoading(false)
            }, 1500)
        }
        
    }

    async function deleteEmployee(id){

        const response = await fetch(`http://localhost:5555/api/employee/delete-employee/${id}`, {
            method:'DELETE'
        });

        if(!response.ok){
            return alert('Something went wrong')
        }
        const result = await response.json();

        if(!result.success){
            return alert(result.message)
        }

        if(result.success){
            setList((prev)=> {
                return prev.filter((emp)=> emp.id !== id)
            })
        }

    }


    function handleDeleteClick(emp) {
        setEmployeeToDelete(emp);
        setShowDialog(true);
    }

    function confirmDelete() {
        deleteEmployee(employeeToDelete.id);
        setShowDialog(false);
        setEmployeeToDelete(null);
    }

    function cancelDelete() {
        setShowDialog(false);
        setEmployeeToDelete(null);
    }

    async function logoutAdmin(){

        sessionStorage.removeItem('loggedIn')
        setTimeout(()=>{
           return navigate('/', {replace:true});
        },1000)
    }

    async function logoutEmployee(){

        sessionStorage.removeItem('loggedIn')
        setTimeout(()=>{
           return navigate('/', {replace:true});
        },1000)
    }
   



    return (
        <MyContext.Provider value={{setForm, form, loginemail, setloginEmail, handleForm, handleFormChange, handleLogin, deleteEmployee, role, setRole, isloading, setisLoading, logoutAdmin, logoutEmployee, error, setError, handleDeleteClick, confirmDelete, cancelDelete, showDialog, employeeToDelete, list, setList}}>
            {children}
        </MyContext.Provider>
    )
}

export default ContextApi;