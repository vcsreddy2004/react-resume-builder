import './App.css';
import './../node_modules/bootstrap/dist/css/bootstrap.css';
import './../node_modules/font-awesome/css/font-awesome.css';
import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom';
import ViewResume from './components/view-resume';
import ResumeForm from './components/resume-form';
import Navbar from './components/navbar';
import Profile from './components/profile';
import LogIn from './components/login';
import Register from './components/register';
import LogOut from './components/logout';
import ProtectedRoute from './components/protectedRoute';
function App() {
  return (
    <>
      <Navbar></Navbar>
      <BrowserRouter>
        <Routes>
          <Route path='/logout' Component={LogOut}></Route>
          <Route path='/login' Component={LogIn}></Route>
          <Route path='/register' Component={Register}></Route>
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<ResumeForm />}></Route>
            <Route path='/profile' element={<Profile/>}></Route>
            <Route path='/view-resume' element={<ViewResume/>}></Route>
          </Route>
          <Route path='*' element={<Navigate to="/login" />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
