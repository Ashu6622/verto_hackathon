import {useContext} from 'react'
import { MyContext } from '../context/ContextApi.jsx';
import {useNavigate} from 'react-router-dom'

function AddEmployee(){

    const {form, handleForm, handleFormChange, isloading} = useContext(MyContext);
    const navigate = useNavigate();


    return(
        <div>
            Add Employee Page
            <div>
                <input type="text" placeholder='Name' name="name" value={form.name} required onChange={handleFormChange}/>
            </div>
            <div>
                <input type="email" placeholder='Email' name="email" value={form.email}   required onChange={handleFormChange}/>
            </div>
            <div>
                <input type="text" placeholder='Position' name="position" value={form.position}   required onChange={handleFormChange}/>
            </div>
            <div>
                <button onClick = {handleForm}>{isloading ? 'Loading...' : 'Submit'}</button>
            </div>

            <div>
                <button onClick={()=> {navigate(-1)}}>Back</button>
            </div>
        </div>
    )
}

export default AddEmployee