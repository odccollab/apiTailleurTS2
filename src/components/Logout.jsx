import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ExitToApp, PowerSettingsNew, DirectionsRun, SentimentVeryDissatisfied } from '@mui/icons-material';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logique de déconnexion
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <button 
      onClick={handleLogout} 
      className="p-2 text-center ms-3 menu-icon"
      title="Déconnexion"
    >
      {/* <ExitToApp className="font-xl text-current" />
      Alternatives : */}
      <PowerSettingsNew className="font-xl text-current" />
      {/* <DirectionsRun className="font-xl text-current" />
      <SentimentVeryDissatisfied className="font-xl text-current" /> */}
    </button>
  );
};

export default Logout;