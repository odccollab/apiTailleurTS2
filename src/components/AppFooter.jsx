const AppFooter = () => {
    return (
        <div className="app-footer border-0 shadow-lg bg-primary-gradiant ">
            <a href="default.html" className="nav-content-bttn nav-center"><i className="feather-home"></i></a>
            <a href="default-video.html" className="nav-content-bttn"><i className="feather-package"></i></a>
            <a href="default-live-stream.html" className="nav-content-bttn" data-tab="chats"><i className="feather-layout"></i></a>
            <a href="shop-2.html" className="nav-content-bttn"><i className="feather-layers"></i></a>
            <a href="default-settings.html" className="nav-content-bttn"><img src="images/female-profile.png" alt="user" className="w30 shadow-xss" /></a>
        </div>
    );
};

export default AppFooter;