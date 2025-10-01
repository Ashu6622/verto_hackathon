import {useContext} from 'react'
import { MyContext } from '../context/ContextApi.jsx';
import {useNavigate} from 'react-router-dom'
import '../styles/AddEmployee.css';

function AddEmployee(){

    const {form, handleForm, handleFormChange, isloading, error} = useContext(MyContext);
    const navigate = useNavigate();


    return(
        <div className="add-employee-container">
            <div className="add-form-card">
                <h1 className="page-title">Add Employee</h1>
                <div className="form-container">
                    <div className="input-group">
                        <input className="form-input" type="text" placeholder='Name' name="name" value={form.name} required onChange={handleFormChange}/>
                        {error?.name && <p className="error-message" style={{fontSize:'12px', color:'red', marginBottom:'-20px'}}>{error.name}</p>}
                    </div>
                    <div className="input-group">
                        <input className="form-input" type="email" placeholder='Email' name="email" value={form.email}   required onChange={handleFormChange}/>
                        {error?.email && <p className="error-message" style={{fontSize:'12px', color:'red', marginBottom:'-20px'}}>{error.email}</p>}
                    </div>
                    <div className="input-group">
                        <input className="form-input" type="text" placeholder='Position' name="position" value={form.position}   required onChange={handleFormChange}/>
                        {error?.position && <p className="error-message" style={{fontSize:'12px', color:'red', marginBottom:'-20px'}}>{error.position}</p>}
                    </div>
                    <div className="button-group">
                        <button className="submit-button" onClick = {handleForm} disabled={isloading}>{isloading ? 'Loading...' : 'Submit'}</button>
                        <button className="back-button" onClick={()=> {navigate(-1)}}>Back</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddEmployee