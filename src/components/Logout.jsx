import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PowerSettingsNew } from '@mui/icons-material';

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
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        color: '#2D7EFD',
      }}
      title="Déconnexion"
    >
      <PowerSettingsNew className="font-xl text-current" />
    </button>
  );
};

export default Logout;
 