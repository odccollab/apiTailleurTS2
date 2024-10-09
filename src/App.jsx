import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AuthLayout } from './layouts/AuthLayout';
import { LoginPage } from './pages/LoginPage';
import NavHeader from "./components/NavHeader";
import NavigationLeft from "./components/NavigationLeft";
import MainContent from "./components/MainContent";
import RightChat from "./components/RightChat";
import AppFooter from "./components/AppFooter";
import ChatModal from "./components/ChatModal";
import StoryModal from "./components/StoryModal";

const MainApp = () => {
    return (
        <div className="main-wrapper">
            <NavHeader />
            <NavigationLeft />
            <MainContent />
            <RightChat />
            <AppFooter />
            <StoryModal />
            <ChatModal />
        </div>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/"
                        element={
                            <AuthLayout>
                                <MainApp />
                            </AuthLayout>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;