import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MyContext } from "../context/ContextApi.jsx";

function UpdateEmployee() {
  const { isloading, setisLoading } = useContext(MyContext);
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
        const result = await response.json();
        console.log(result);
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
    console.log(updateform);

    try {
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
            setisLoading(false);
        },1500)
    }
  }

  return (
    <div>
      Add Employee Page
      
        <div>
          <div>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={updateform.name}
              required
              onChange={handleUpdateChange}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={updateform.email}
              required
              onChange={handleUpdateChange}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Position"
              name="position"
              value={updateform.position}
              required
              onChange={handleUpdateChange}
            />
          </div>
          <div>
            <button onClick={handleUpdate}>
              {isloading ? "Updating..." : "Update"}
            </button>
          </div>

          <div>
            <button
              onClick={() => {
                navigate(-1);
              }}
            >
              Back
            </button>
          </div>
        </div>
    </div>
  );
}

export default UpdateEmployee;
