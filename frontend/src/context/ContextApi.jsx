import {createContext, useState} from 'react'
import { z } from "zod";
export const MyContext = createContext();
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
const API_URL = import.meta.env.VITE_API_URL



export const userSchema = z.object({
    name: z.string().trim().min(3, "Name must be at leat 3 characters").regex(/^[A-Za-z][A-Za-z0-9\s]*$/, "Name must start with alphabet and contain only letters, numbers and spaces"),
    email: z.string().trim().email('Enter valid email'),
    position: z.string().trim().min(2, "must be at leat 2 characters").regex(/^[A-Za-z][A-Za-z0-9\s]*$/, "Position must start with alphabet and contain only letters, numbers and spaces"),
}).required();

const emailSchema = z.string().trim().email('Enter valid email')

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

             
            const controller = new AbortController()
            const clearId = setTimeout(()=>{
                controller.abort()  //abort the request if it is taking more than 6 second
            },6000)

        try{
            setError(null)
            setisLoading(true)
            const response = await fetch(`${API_URL}/add-employee`,{
                method:'POST',
                signal : controller.signal,
                headers:{
                    'content-type':'application/json',
                },
                body : JSON.stringify(form)
            })

            if(!response.ok){
                return toast.error('Something went wrong try again', { autoClose: 1500 })
            }   

            const result = await response.json();

            if(!result.success){
                toast.error(result.message, { autoClose: 1500 });
            }

            if(result.success){
                setTimeout(()=>{
                    toast.success(result.message, { autoClose: 1500 })
                    return navigate('/employee-list');
                },2000)
            }   

        }
        catch(error){
            toast.error(error.message, { autoClose: 1500 });
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
            clearTimeout(clearId);
        }
       
    }

    function handleFormChange(e){
        const {name, value} = e.target;
        setForm((prev)=> ({...prev,  [name]: value}));
    }

    async function handleLogin(){
        
        if(loginemail.trim() === ""){
             toast.error('Enter the Email', { autoClose: 1500 });
        }
        const check = emailSchema.safeParse(loginemail);

        if(!check.success){
            const error = check.error.format()
            const errorHandlers = {}
            errorHandlers.email = error._errors[0]
            setError(errorHandlers)
            return;
        }


        // const controller = new AbortController()
        // const clearId = setTimeout(()=>{
        //     controller.abort()  //abort the request if it is taking more than 6 second
        // },6000)

        try{
            setError(null);
            setisLoading(true);
            const response = await fetch(`${API_URL}/${role}-login`,{
                method:'POST',
                // signal: controller.signal,
                headers:{
                    'content-type':'application/json',
                },
                body : JSON.stringify({email:loginemail})
            });
            if(!response.ok){
                return toast.error('Something went wrong try again', { autoClose: 1500 })
            }
            const result = await response.json();

            if(!result.success){
                toast.error(result.message, { autoClose: 1500 });
                return navigate('/');
            }
           
            if(result.status === 200 && result.success){

                setTimeout(()=>{
                    
                    if(role === "admin"){
                        sessionStorage.setItem('loggedIn', 'adminlogged');
                        toast.success(result.message, { autoClose: 1500 });
                        return navigate('/employee-list', {replace:true})
                    }
                    else if(role === "employee"){
                        sessionStorage.setItem('loggedIn', `employeelogged-${result.data.id}`);
                        toast.success(result.message, { autoClose: 1500 });
                        return navigate(`/profile/${result.data.id}`, {replace:true})
                    }

                },1500)
            }
            
        }
        catch(error){
            toast.error('Try Again', { autoClose: 1500 });
            setTimeout(()=>{
                return navigate('/');
            },1500)
        }
        finally{

            setTimeout(()=>{
                setloginEmail('');
                setisLoading(false)
            }, 1500)

            clearTimeout(clearId);
        }
        
    }

    async function deleteEmployee(id){

        const controller = new AbortController()
        const clearId = setTimeout(()=>{
            controller.abort()  //abort the request if it is taking more than 6 second
        },6000)

        try{

            const response = await fetch(`${API_URL}/delete-employee/${id}`, {
                method:'DELETE',
                signal:controller.signal
            });

            if(!response.ok){
                return toast.error('Something went wrong try again', { autoClose: 1500 })
            }
            const result = await response.json();

            if(!result.success){
                return toast.error(result.message, { autoClose: 1500 })
            }

            if(result.success){
                setList((prev)=> {
                    return prev.filter((emp)=> emp.id !== id)
                })
                toast.success(result.message, { autoClose: 1500 });
            }
        }
        catch(error){
            toast.error('Try Again', { autoClose: 1500 });
            setTimeout(()=>{
                return navigate('/');
            },1500)
        }
        finally{
            clearTimeout(clearId);
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