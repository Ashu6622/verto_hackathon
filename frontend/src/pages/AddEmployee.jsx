import {useContext} from 'react'
import { MyContext } from '../context/ContextApi.jsx';


function AddEmployee(){

    const {form, handleForm, handleFormChange} = useContext(MyContext);


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
                <button onClick = {handleForm}>Submit</button>
            </div>
        </div>
    )
}

export default AddEmployee