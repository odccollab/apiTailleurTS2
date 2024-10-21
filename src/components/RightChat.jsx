import {useAuth} from "../context/AuthContext.jsx";
import {ContactsSection} from "./ContactSection.jsx";

const RightChat = ({element=<ContactsSection/>}) => {
    return (
        <div className="right-chat nav-wrap mt-2 right-scroll-bar active-sidebar">
            <div className="middle-sidebar-right-content bg-white shadow-xss rounded-xxl">
                <LoaderWrapper />
                {element}
            </div>
        </div>
    );
};


const LoaderWrapper = () => {
    return (
        <div className="preloader-wrap p-3">
            {[...Array(3)].map((_, index) => (
                <div className="box shimmer mb-3" key={index}>
                    <div className="lines">
                        {[...Array(4)].map((_, lineIndex) => (
                            <div className="line s_shimmer" key={lineIndex}></div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};




const contacts = [
    { image: "images/user-8.png", name: "Hurin Seary", badge: "badge badge-primary text-white badge-pill fw-500 mt-0" },
    { image: "images/user-7.png", name: "Victor Exrixon", badge: "bg-success ms-auto btn-round-xss" },
    { image: "images/user-8.png", name: "Hurin Seary", badge: "badge badge-primary text-white badge-pill fw-500 mt-0" },
    { image: "images/user-7.png", name: "Victor Exrixon", badge: "bg-success ms-auto btn-round-xss" },
    { image: "images/user-8.png", name: "Hurin Seary", badge: "badge badge-primary text-white badge-pill fw-500 mt-0" },
    { image: "images/user-7.png", name: "Victor Exrixon", badge: "bg-success ms-auto btn-round-xss" },
    { image: "images/user-8.png", name: "Hurin Seary", badge: "badge badge-primary text-white badge-pill fw-500 mt-0" },
    { image: "images/user-7.png", name: "Victor Exrixon", badge: "bg-success ms-auto btn-round-xss" },
    { image: "images/user-8.png", name: "Hurin Seary", badge: "badge badge-primary text-white badge-pill fw-500 mt-0" },
    { image: "images/user-7.png", name: "Victor Exrixon", badge: "bg-success ms-auto btn-round-xss" },
    { image: "images/user-8.png", name: "Hurin Seary", badge: "badge badge-primary text-white badge-pill fw-500 mt-0" },
    { image: "images/user-7.png", name: "Victor Exrixon", badge: "bg-success ms-auto btn-round-xss" },
    { image: "images/user-8.png", name: "Hurin Seary", badge: "badge badge-primary text-white badge-pill fw-500 mt-0" },
    { image: "images/user-7.png", name: "Victor Exrixon", badge: "bg-success ms-auto btn-round-xss" },
    { image: "images/user-8.png", name: "Hurin Seary", badge: "badge badge-primary text-white badge-pill fw-500 mt-0" },
    { image: "images/user-7.png", name: "Victor Exrixon", badge: "bg-success ms-auto btn-round-xss" },

    // Other contacts...
];

const groups = [
    { initials: "UD", name: "Studio Express", color: "bg-primary-gradiant", status: "badge mt-0 text-grey-500 badge-pill pe-0 font-xsssss" },
    { initials: "AR", name: "Armany Design", color: "bg-gold-gradiant", status: "bg-warning ms-auto btn-round-xss" },
    // Other groups...
];

const pages = [
    { initials: "AB", name: "Armany Seary", color: "bg-primary-gradiant", status: "bg-success ms-auto btn-round-xss" },
    { initials: "SD", name: "Entropio Inc", color: "bg-gold-gradiant", status: "bg-success ms-auto btn-round-xss" },
    // Other pages...
];

export default RightChat;