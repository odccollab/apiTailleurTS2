import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assurez-vous que le chemin d'importation est correct
import { LogOut } from 'lucide-react';
import { PowerSettingsNew } from '@mui/icons-material';

const Logout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login'); // Redirige vers la page de connexion après la déconnexion
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
