import {createContext, useState, useEffect} from 'react'
import { z } from "zod";
export const MyContext = createContext();
import {useNavigate} from 'react-router-dom';


const userSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    position: z.string().min(2),
})

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
    
    async function handleForm(){
        console.log(form);
        try{
            const check = userSchema.safeParse(form);
            // console.log(check)
            if(!check.success){
                throw new Error(`Invalid Input Try Again`);
            }
            setisLoading(true)
            const response = await fetch(`http://localhost:5555/api/employee/add-employee`,{
                method:'POST',
                credentials:'include',
                headers:{
                    'content-type':'application/json',
                },
                body : JSON.stringify(form)
            })

            const result = await response.json();
            console.log(result);

            if(!result.success){
                console.log("***");
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
            const result = await response.json();

            if(!result.success){
                alert(result.message);
                return navigate('/');
            }
           
            if(result.status === 200 && result.success){

                setTimeout(()=>{
                    
                    if(role === "admin"){
                        return navigate('/employee-list', {replace:true})
                    }
                    else if(role === "employee"){
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
                setisLoading(false)
                console.log("finally");
            }, 1500)
        }
        
    }

    async function deleteEmployee(id){

        const response = await fetch(`http://localhost:5555/api/employee/delete-employee/${id}`, {
            method:'DELETE'
        });
        const result = await response.json();
        console.log(result);
    }

    async function logout(){

        setTimeout(()=>{
           return navigate('/', {replace:true});
        },1000)
    }
   



    return (
        <MyContext.Provider value={{setForm, form, loginemail, setloginEmail, handleForm, handleFormChange, handleLogin, deleteEmployee, role, setRole, isloading, setisLoading, logout}}>
            {children}
        </MyContext.Provider>
    )
}

export default ContextApi;