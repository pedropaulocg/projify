
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from './pages/Login';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Projects from './pages/Projects';
import ProtectedRoute from './Utils/ProtectedRoute';
import TopNavbar from './Components/TopNavbar';
import { useContext, useEffect, useState } from 'react';
import darkScrollbar from '@mui/material/darkScrollbar';
import Kanban from "./pages/Kanban";
import { ProjectContext } from './Contexts/ProjectContext';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary:{
      main: '#1D5DB3',
      dark: '#1D5DB3'
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
  components: {
    MuiCssBaseline: {
      styleOverrides: (themeParam) => ({
        body: themeParam.palette.mode === 'dark' ? darkScrollbar() : null,
      }),
    },
  }
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate()
  const { projects, setProjects, selectedProject } = useContext(ProjectContext)
  const checkToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      navigate('/projects', {replace: true})
    }
    else {
      setIsLoggedIn(false);
    }
  };

useEffect(()=>{checkToken()},[])
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ToastContainer />
      <div className="App">
        { isLoggedIn && <TopNavbar checkToken={checkToken}/> }
        <Routes>
          <Route index element={<Login checkToken={checkToken} />} />
          <Route index path="/login" element={<Login checkToken={checkToken}/>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/projects" element={<Projects />} />
            <Route path="/kanban/:projectId" element={<Kanban />} />
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
