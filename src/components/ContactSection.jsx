import useFetch from "../backend/Services/useFetch.js";
import {useEffect, useState} from "react";
import {useAuth} from "../context/AuthContext.jsx";


export const LoaderWrapper = () => {
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
export const ContactsSection = () => {
    const { data, loading, error } = useFetch("users/mutual-friends");
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        if (data) {
            setContacts(data.mutualFriends);
        }
    }, [data]);

    if (loading) return <LoaderWrapper />;
    if (error) return <div>Error loading contacts: {error.message}</div>;
    return (
        <div className="section full pe-3 ps-4 pt-4 position-relative feed-body">
            <h4 className="font-xsssss text-grey-500 text-uppercase fw-700 ls-3">CONTACTS</h4>
            <ul className="list-group list-group-flush">
                {/* Contact items */}
                {contacts.map((contact, index) => (
                    <ContactItem  contact={contact} />
                ))}
            </ul>
        </div>
    );
};

export const ContactItem = ({ contact }) => {
    const {setId} = useAuth()
    return (
        <li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center" onClick={()=>setId(contact.id)}>
            <figure className="avatar float-left mb-0 me-2">
                <img src={contact.image} alt="image" className="w35" />
            </figure>
            <h3 className="fw-700 mb-0 mt-0">
                <a className="font-xssss text-grey-600 d-block text-dark model-popup-chat" href="#">
                    {contact.nom +" "+ contact.prenom}
                </a>
            </h3>
            {contact.badge && <span className={contact.badge}></span>}
        </li>
    );
};
