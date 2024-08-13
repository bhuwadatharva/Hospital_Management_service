import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

export const Context = createContext({isPatientAuthenticated: false});

const AppWrapper = () => {
  const[isPatientAuthenticated, setIsPatientAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  return (
    <Context.Provider value={{isPatientAuthenticated, setIsPatientAuthenticated, user, setUser}}>
      <App/>
    </Context.Provider>
  );
};



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper/>
  </React.StrictMode>
);
