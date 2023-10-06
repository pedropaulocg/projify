import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from './pages/Login';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Projects from './pages/Projects';
import ProtectedRoute from './Utils/ProtectedRoute';
import { useContext, useEffect, useState } from 'react';
import Kanban from "./pages/Kanban";
import { ProjectContext } from './Contexts/ProjectContext';
import SideMenu from "./layout/SideMenu";
import TopNavbar from './layout/TopNavbar';
import './App.css'
import { ConfirmProvider } from 'material-ui-confirm'
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";

const darkTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: "#f6f8fa"
    },
    primary:{
      main: '#171f39',
      dark: '#1D5DB3'
    },
    secondary: {
      main: '#f06911'
    },
    success: {
      main: '#0CCA4A',
      dark: '#0CCA4A'
    },
    light: {
      main: '#FDFFFC',
      dark: '#FDFFFC'
    }
  },
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate()
  const location = useLocation()
  const { selectedProject, setSelectedProject } = useContext(ProjectContext)
  const checkToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      if(location.pathname === '/login' || location.pathname === '/') {
        navigate('/projects', {replace: true})
      }
    }
    else {
      setIsLoggedIn(false);
    }
  };

useEffect(()=>{
  checkToken()
},[])
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ToastContainer />
      <ConfirmProvider>
        <div className={selectedProject ? 'sideMenuFlex' : ''}>
          { (isLoggedIn && !selectedProject) && <TopNavbar checkToken={checkToken}/> }
          { selectedProject && <SideMenu checkToken={checkToken}/> }
          <Routes>
            <Route index element={<Login checkToken={checkToken} />} />
            <Route index path="/login" element={<Login checkToken={checkToken}/>} />
            <Route element={<ProtectedRoute />}>
              <Route path="/projects" element={<Projects />} />
              <Route path="/kanban/:projectId" element={<Kanban />} />
              <Route path="/dashboard/:projectId" element={<Dashboard />} />
              <Route path="/tasks/:projectId" element={<Tasks />} />
            </Route>
          </Routes>
        </div>
      </ConfirmProvider>
    </ThemeProvider>
  );
}

export default App;
