import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AuthLayout } from './layouts/AuthLayout';
import NavHeader from "./components/NavHeader";
import NavigationLeft from "./components/NavigationLeft";
import AppFooter from "./components/AppFooter";
import ChatModal from "./components/ChatModal";
import StoryModal from "./components/StoryModal";
import SearchComponent from "./components/SearchComponent.jsx";
import UserProfile from "./components/UserProfile.jsx";
import Notification from "./components/Notifications.jsx"
// Lazy-loaded components
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const MainContent = lazy(() => import('./components/MainContent'));
const RightChat = lazy(() => import('./components/RightChat2'));
const UserProfile2 = lazy(() => import('./components/UserProfile2'));
const HandleMessage = lazy(() => import('./components/MessageGenere'));
const MessageSection = lazy(() => import('./components/MessageSection'));
const ArticlePage = lazy(() => import('./pages/ArticlePage'));
const StoriesPage = lazy(() => import('./pages/StoriesPage'));

// Loading component
const Loading = () => <div>
    <div className="preloader-wrap p-3">
        <div>Loading posts...</div>
        {[...Array(3)].map((_, index) => (
            <div className="box shimmer mb-3" key={index}>
                <div className="lines">
                    <div className="line s_shimmer"></div>
                    <div className="line s_shimmer"></div>
                    <div className="line s_shimmer"></div>
                    <div className="line s_shimmer"></div>
                </div>
            </div>
        ))}
    </div>
</div>;

const MainApp = ({content, rightchat = <RightChat/>}) => (
    <div className="main-wrapper">
        <NavHeader/>
        <NavigationLeft/>
        <Suspense fallback={<Loading/>}>
            {content}
        </Suspense>
        <Suspense fallback={<Loading/>}>
            {rightchat}
        </Suspense>
        <AppFooter/>
        <StoryModal/>
        <ChatModal/>
    </div>
);

const App = () => (
    <Router>
        <AuthProvider>
            <Suspense fallback={<Loading/>}>
                <Routes>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route element={<AuthLayout />}>
                        <Route path="/" element={<MainApp content={<MainContent />} />} />
                        <Route path="/video" element={<MainApp content={<MainContent />} />} />
                        <Route path="/profile" element={<MainApp content={<UserProfile/>} />} />
                        <Route path="/discussion" element={
                            <MainApp
                                content={<HandleMessage />}
                                rightchat={<RightChat element={<MessageSection />} />}
                            />
                        } />
                        <Route path="/shop" element={<MainApp content={<ArticlePage />} />} />
                        <Route path="/stories" element={<MainApp content={<StoriesPage />} />} />
                        <Route path="/search" element={<MainApp content={<SearchComponent />} />} />
                        <Route path="/notifications" element={<MainApp content={<Notification />} />} />
                    </Route>
                </Routes>
            </Suspense>
        </AuthProvider>
    </Router>
);

export default App;