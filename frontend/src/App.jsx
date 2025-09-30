import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/Login'
import AddEmployee from './pages/AddEmployee'
import UpdateEmployee from './pages/UpdateEmployee'
import AllEmployee from './pages/AllEmployee'
import Auth from './components/Auth'
import Error from './pages/Error'
import ContextApi from './context/ContextApi'
function App(){

  return(
    <BrowserRouter>
    <ContextApi>
    <Routes>
        <Route path='/'  element={<Login />} />
        <Route path='/employee-list' element={<AllEmployee />}/>
        <Route path='/update-employee' element={<UpdateEmployee />}/>
        <Route path='/add-employee' element={<AddEmployee />}/>
        <Route path="*" element={<Error />}/>
    </Routes>
    </ContextApi>
    </BrowserRouter>
  )
}

export default App;