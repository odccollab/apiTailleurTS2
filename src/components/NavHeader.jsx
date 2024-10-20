import SettingsDropdown from "./SettingsDropdown.jsx";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import useFetch from '../backend/Services/useFetch';

const NavHeader = () => {
    const [searchQuery, setSearchQuery] = useState(''); // Gérer l'état de l'input de recherche
    const navigate = useNavigate(); // Hook de navigation
    const { data: notificationData, loading, error } = useFetch('users/notification');

    // Extraire le nombre de notifications non lues
    const unreadCount = notificationData ? notificationData.notifications.length : 0;

    // Fonction pour gérer le changement dans l'input de recherche
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        // Redirection vers la page de résultats de recherche uniquement si le champ n'est pas vide
        if (query.trim().length > 0) {
            navigate(`/search?query=${query}`);
        }
    };

    return (
        <div className="nav-header bg-white shadow-xs border-0 p-2">
            <div className="nav-top">
                <RouterLink to="/">
                    <i className="feather-zap text-success display1-size me-2 ms-0"></i>
                    <span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0 p-2">
                        Feeling Style
                    </span>
                </RouterLink>
                <RouterLink to="#" className="mob-menu ms-auto me-2 chat-active-btn">
                    <i className="feather-message-circle text-grey-900 font-sm btn-round-md bg-greylight p-3"></i>
                </RouterLink>
                <RouterLink to="/default-video" className="mob-menu me-2">
                    <i className="feather-video text-grey-900 font-sm btn-round-md bg-greylight"></i>
                </RouterLink>
                <RouterLink to="#" className="me-2 menu-search-icon mob-menu">
                    <i className="feather-search text-grey-900 font-sm btn-round-md bg-greylight"></i>
                </RouterLink>
                <button className="nav-menu me-0 ms-2"></button>
            </div>

            <form action="#" className="float-left header-search">
                <div className="form-group mb-0 icon-input">
                    <i className="feather-search font-sm text-grey-400"></i>
                    <input
                        type="text"
                        placeholder="Start typing to search.."
                        className="bg-grey border-0 lh-32 pt-2 pb-2 ps-5 pe-3 font-xssss fw-500 rounded-xl w350 theme-dark-bg"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
            </form>

            <RouterLink to="/" className="p-2 text-center ms-3 menu-icon center-menu-icon">
                <i className="feather-home font-lg alert-primary btn-round-lg theme-dark-bg text-current p-2"></i>
            </RouterLink>
            <RouterLink to="/stories" className="p-2 text-center ms-0 menu-icon center-menu-icon">
                <i className="feather-zap font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500 p-2"></i>
            </RouterLink>
            <RouterLink to="/" className="p-2 text-center ms-0 menu-icon center-menu-icon">
                <i className="feather-video font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500 p-2"></i>
            </RouterLink>
            <RouterLink to="/profile" className="p-2 text-center ms-0 menu-icon center-menu-icon">
                <i className="feather-user font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500 p-2"></i>
            </RouterLink>
            <RouterLink to="/shop" className="p-2 text-center ms-0 menu-icon center-menu-icon">
                <i className="feather-shopping-bag font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500 p-2"></i>
            </RouterLink>

                    <RouterLink to="/notifications" className="p-2 text-center ms-auto menu-icon">
            <i className="feather-bell font-xl text-current"></i>
            {unreadCount > 0 && (
                <span className="notification-count" style={{ marginLeft: '5px', fontSize: '0.9rem', color: 'red' }}>
                    {unreadCount}
                </span>
            )}
        </RouterLink>

            <RouterLink to="/discussion" className="p-2 text-center ms-3 menu-icon chat-active-btn">
                <i className="feather-message-square font-xl text-current"></i>
            </RouterLink>

            <RouterLink to="/default-settings" className="p-0 ms-3 menu-icon">
                <img src="../images/profile-4.png" alt="profile" />
            </RouterLink>
        </div>
    );
};

export default NavHeader;
