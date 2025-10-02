import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MyContext } from "../context/ContextApi.jsx";
import {userSchema} from '../context/ContextApi'
import '../styles/UpdateEmployee.css';
import { toast } from 'react-toastify';
const API_URL = import.meta.env.VITE_API_URL

function UpdateEmployee() {
  const { isloading, setisLoading, error, setError } = useContext(MyContext);
  const [updateform, setUpdateForm] = useState({
    name: "",
    email: "",
    position: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getEmployee() {

        const controller = new AbortController()
        const clearId = setTimeout(()=>{
        controller.abort()  //abort the request if it is taking more than 3 second
        },3000)

      try {
        setisLoading(true);
        const response = await fetch(`${API_URL}/employee-profile/${id}`, {
          method:'GET',
          signal:controller.signal
        });

        if(!response.ok){
            return toast.error('Something went wrong try again', { autoClose: 1500 });
        }

        const result = await response.json();
        setUpdateForm({
          name: result?.data.name,
          email: result?.data.email,
          position: result?.data.position,
        });
      } 
      catch (error) {
          toast.error('Try Again', { autoClose: 1500 });
          setTimeout(()=>{
            return navigate('/');
          },1500)
      } 
      finally {
        setisLoading(false);
        clearTimeout(clearId);
      }
    }

    getEmployee();

    return () => {
      setUpdateForm({
        name: "",
        email: "",
        position: "",
      });
    };
  }, []);

  function handleUpdateChange(e) {
    const { name, value } = e.target;
    setUpdateForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleUpdate() {

        const controller = new AbortController()
        const clearId = setTimeout(()=>{
        controller.abort()  //abort the request if it is taking more than 3 second
        },3000)

        const check = userSchema.safeParse(updateform);
           
            if(!check.success){
                const error = check.error.format()
                
                const errorHandlers = {}
                errorHandlers.name = error.name?._errors[0]
                errorHandlers.email = error.email?._errors[0]
                errorHandlers.position = error.position?._errors[0]
                setError(errorHandlers)
                return;
            }

      try {
        setError(null);
        setisLoading(true);
      const response = await fetch(`${API_URL}/update-employee/${id}`,
        {
          method: "PUT",
          signal:controller.signal,
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(updateform),
        }
      );

        if(!response.ok){
            return toast.error('Something went wrong try again', { autoClose: 1500 });
        }

      const result = await response.json();

      if (!result.success) {
         return toast.error(result.message, { autoClose: 1500 });
      }

      if (result.success) {
        setTimeout(()=>{
            toast.success(result.message, { autoClose: 1500 });
            return navigate("/employee-list");
        },1500)
      }
    } 
    catch (error) {
         toast.error('Try Again', { autoClose: 1500 });
            setTimeout(()=>{
            return navigate('/employee-list');
        },1500)
    } 
    finally {
        setTimeout(()=>{
            setUpdateForm({
                name: "",
                email: "",
                position: "",
            });
            setisLoading(false);
        },1500)
        clearTimeout(clearId);
    }
  }

  return (
    <div className="update-employee-container">
      <div className="update-form-card">
        <h1 className="page-title">Update Employee</h1>
        
        <div className="form-container">
          <div className="input-group">
            <input
              className="form-input"
              type="text"
              placeholder="Name"
              name="name"
              value={updateform.name}
              required
              onChange={handleUpdateChange}
            />
            {error?.name && <p className="error-message" style={{fontSize:'12px', color:'red', marginBottom:'-20px'}}>{error.name}</p>}
          </div>
          <div className="input-group">
            <input
              className="form-input"
              type="email"
              placeholder="Email"
              name="email"
              value={updateform.email}
              required
              onChange={handleUpdateChange}
            />
            {error?.email && <p className="error-message" style={{fontSize:'12px', color:'red', marginBottom:'-20px'}}>{error.email}</p>}
          </div>
          <div className="input-group">
            <input
              className="form-input"
              type="text"
              placeholder="Position"
              name="position"
              value={updateform.position}
              required
              onChange={handleUpdateChange}
            />
            {error?.position && <p className="error-message" style={{fontSize:'12px', color:'red', marginBottom:'-20px'}}>{error.position}</p>}
          </div>
          <div className="button-group">
            <button className="update-button" onClick={handleUpdate} disabled={isloading}>
              {isloading ? "Updating..." : "Update"}
            </button>
            <button
              className="back-button"
              onClick={() => {
                navigate(-1);
              }}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateEmployee;
