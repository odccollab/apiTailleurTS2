import NavHeader from "./components/NavHeader.jsx";
import NavigationLeft from "./components/NavigationLeft.jsx";
import MainContent from "./components/MainContent.jsx";
import RightChat from "./components/RightChat.jsx";
import AppFooter from "./components/AppFooter.jsx";
import ChatModal from "./components/ChatModal.jsx";
import StoryModal from "./components/StoryModal.jsx";


const App = () => {
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

export default App;