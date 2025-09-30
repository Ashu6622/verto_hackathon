import {createContext, useState, useEffect} from 'react'
import { z } from "zod";
export const MyContext = createContext();
import {useNavigate} from 'react-router-dom';

const userSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    positon: z.string().min(2),
})

function ContextApi({children}){

    const [form, setForm] = useState({
        name:"",
        email:"",
        position:"",
    })

    const navigate = useNavigate();

    const [isadmin, setIsAdmin] = useState(false);
    
    const [loginemail, setloginEmail] = useState("");
    
    async function handleForm(){
        console.log(form);

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

        // const check = userSchema.safeParse(form);..
        // console.log(check)
    }

    function handleFormChange(e){
        const {name, value} = e.target;
        setForm((prev)=> ({...prev,  [name]: value}));
    }

    function handleLoginChange(e){
        setloginEmail(e.target.value)
    }

    async function handleLogin(){
        console.log(loginemail);

        try{
            const response = await fetch(`http://localhost:5555/api/employee/admin-login`,{
                method:'POST',
                headers:{
                    'content-type':'application/json',
                },
                body : JSON.stringify({email:loginemail})
            });
            const result = await response.json();
            console.log(result);
            if(result.status === 200 && result.success){
                return navigate('/employee-list', {replace:true})
            }
        }
        catch(error){
            console.log(error);
        }
        
        }



    return (
        <MyContext.Provider value={{setForm, form, loginemail, setloginEmail, handleForm, handleFormChange, handleLoginChange, handleLogin}}>
            {children}
        </MyContext.Provider>
    )
}

export default ContextApi;