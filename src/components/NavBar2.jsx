export const NavHeader2 = () => {
    return (
        <div className="nav-header bg-transparent shadow-none border-0 z-index--2000">
            <div className="nav-top w-100">
                <a href="index.html">
                    <i className="feather-zap text-success display1-size me-2 ms-0"></i>
                    <span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">
            Sociala.
          </span>
                </a>
                <a href="#" className="mob-menu ms-auto me-2 chat-active-btn">
                    <i className="feather-message-circle text-grey-900 font-sm btn-round-md bg-greylight"></i>
                </a>
                <a href="default-video.html" className="mob-menu me-2">
                    <i className="feather-video text-grey-900 font-sm btn-round-md bg-greylight"></i>
                </a>
                <a href="#" className="me-2 menu-search-icon mob-menu">
                    <i className="feather-search text-grey-900 font-sm btn-round-md bg-greylight"></i>
                </a>
                <button className="nav-menu me-0 ms-2"></button>
                <a
                    href="#"
                    className="header-btn d-none d-lg-block bg-dark fw-500 text-white font-xsss p-3 ms-auto w100 text-center lh-20 rounded-xl"
                    data-bs-toggle="modal"
                    data-bs-target="#Modallogin"
                >
                    Login
                </a>
                <a
                    href="/register"
                    className="header-btn d-none d-lg-block bg-dark fw-500 text-white font-xsss p-3 ms-2 w100 text-center lh-20 rounded-xl"

                >
                    Register
                </a>
            </div>
        </div>
    );
};
export default NavHeader2;