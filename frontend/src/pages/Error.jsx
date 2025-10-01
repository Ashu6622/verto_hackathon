import {useNavigate} from 'react-router-dom'

function Error(){

    const navigate = useNavigate();

    return(
        <div>
            <h1>Error Page</h1>
            <button onClick={()=> navigate(-1)} >Back</button>
        </div>
    )
}

export default Error;