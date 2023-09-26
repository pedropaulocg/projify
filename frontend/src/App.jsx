import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Projects from './pages/Projects';
import ProtectedRoute from './Utils/ProtectedRoute';
import TopNavbar from './Components/TopNavbar';
import { useEffect, useState } from 'react';

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
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkToken = () => {
    
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
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
        <Router>
        { isLoggedIn && <TopNavbar checkToken={checkToken}/> }
          <Routes>
            {/* <Route index element={<Login  />} /> */}
            <Route index path="/login" element={<Login checkToken={checkToken}/>} />
            <Route element={<ProtectedRoute />}>
              <Route path="/projects" element={<Projects />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
