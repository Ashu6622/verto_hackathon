import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/Login'
import AddEmployee from './pages/AddEmployee'
import UpdateEmployee from './pages/UpdateEmployee'
import AllEmployee from './pages/AllEmployee'
import EmpProfile from './pages/EmpProfile'
import Auth from './components/Auth'
import AuthMessage from './pages/AuthMessage'
import AuthenticationPage from './pages/AuthenticationPage'
import Error from './pages/Error'
import ContextApi from './context/ContextApi'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App(){

  return(
    <BrowserRouter>
    <ContextApi>
    <Routes>
        <Route path='/'  element={<Login />} />
        <Route path='/Auth-Message' element={<AuthMessage />}/>
        <Route path='/authentication-page' element={<AuthenticationPage />}/>
        <Route path='/employee-list' element={<Auth path={'employee-list'}><AllEmployee /></Auth>}/>
        <Route path='/update-employee/:id' element={<Auth path={'update-employee/:id'}><UpdateEmployee /></Auth>}/>
        <Route path='/add-employee' element={<Auth path={'add-employee'}><AddEmployee /></Auth>}/>
        <Route path='/profile/:id' element={<Auth path={'profile/:id'}><EmpProfile /></Auth>}/>
        <Route path="*" element={<Error />}/>
    </Routes>
    <ToastContainer />
    </ContextApi>
    </BrowserRouter>
  )
}

export default App;