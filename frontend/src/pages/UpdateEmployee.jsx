import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MyContext } from "../context/ContextApi.jsx";
import { z } from "zod";
import '../styles/UpdateEmployee.css';

const userSchema = z.object({
    name: z.string().min(3, "Name must be at leat 3 characters").regex(/^[A-Za-z][A-Za-z0-9\s]*$/, "Name must start with alphabet and contain only letters, numbers and spaces"),
    email: z.string().email('Enter valid email'),
    position: z.string().min(2, "must be at leat 2 characters").regex(/^[A-Za-z][A-Za-z0-9\s]*$/, "Position must start with alphabet and contain only letters, numbers and spaces"),
}).required();

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
      try {
        setisLoading(true);
        const response = await fetch(
          `http://localhost:5555/api/employee/employee-profile/${id}`
        );

         if(!response.ok){
            return alert('Something went wrong')
        }

        const result = await response.json();
        setUpdateForm({
          name: result?.data.name,
          email: result?.data.email,
          position: result?.data.position,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setisLoading(false);
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


        const check = userSchema.safeParse(updateform);
           
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

    try {
      
        setError(null);
        setisLoading(true);
      const response = await fetch(
        `http://localhost:5555/api/employee/update-employee/${id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(updateform),
        }
      );

       if(!response.ok){
            return alert('Something went wrong')
        }

      const result = await response.json();

      if (!result.success) {
        alert(result.message);
        return;
      }

      if (result.success) {
        setTimeout(()=>{
            return navigate("/employee-list");
        },1500)
      }
    } 
    catch (error) {
        console.log(error);
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
