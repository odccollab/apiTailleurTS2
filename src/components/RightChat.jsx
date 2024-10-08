const RightChat = () => {
    return (
        <div className="right-chat nav-wrap mt-2 right-scroll-bar">
            <div className="middle-sidebar-right-content bg-white shadow-xss rounded-xxl">
                <LoaderWrapper />
                <ContactsSection />
                <GroupsSection />
                <PagesSection />
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

const ContactsSection = () => {
    return (
        <div className="section full pe-3 ps-4 pt-4 position-relative feed-body">
            <h4 className="font-xsssss text-grey-500 text-uppercase fw-700 ls-3">CONTACTS</h4>
            <ul className="list-group list-group-flush">
                {/* Contact items */}
                {contacts.map((contact, index) => (
                    <ContactItem key={index} contact={contact} />
                ))}
            </ul>
        </div>
    );
};

const ContactItem = ({ contact }) => {
    return (
        <li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">
            <figure className="avatar float-left mb-0 me-2">
                <img src={contact.image} alt="image" className="w35" />
            </figure>
            <h3 className="fw-700 mb-0 mt-0">
                <a className="font-xssss text-grey-600 d-block text-dark model-popup-chat" href="#">
                    {contact.name}
                </a>
            </h3>
            {contact.badge && <span className={contact.badge}></span>}
        </li>
    );
};

const GroupsSection = () => {
    return (
        <div className="section full pe-3 ps-4 pt-4 pb-4 position-relative feed-body">
            <h4 className="font-xsssss text-grey-500 text-uppercase fw-700 ls-3">GROUPS</h4>
            <ul className="list-group list-group-flush">
                {/* Group items */}
                {groups.map((group, index) => (
                    <GroupItem key={index} group={group} />
                ))}
            </ul>
        </div>
    );
};

const GroupItem = ({ group }) => {
    return (
        <li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">
            <span className={`btn-round-sm ${group.color} me-3 ls-3 text-white font-xssss fw-700`}>{group.initials}</span>
            <h3 className="fw-700 mb-0 mt-0">
                <a className="font-xssss text-grey-600 d-block text-dark model-popup-chat" href="#">
                    {group.name}
                </a>
            </h3>
            {group.status && <span className={group.status}></span>}
        </li>
    );
};

const PagesSection = () => {
    return (
        <div className="section full pe-3 ps-4 pt-0 pb-4 position-relative feed-body">
            <h4 className="font-xsssss text-grey-500 text-uppercase fw-700 ls-3">Pages</h4>
            <ul className="list-group list-group-flush">
                {/* Page items */}
                {pages.map((page, index) => (
                    <PageItem key={index} page={page} />
                ))}
            </ul>
        </div>
    );
};

const PageItem = ({ page }) => {
    return (
        <li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">
            <span className={`btn-round-sm ${page.color} me-3 ls-3 text-white font-xssss fw-700`}>{page.initials}</span>
            <h3 className="fw-700 mb-0 mt-0">
                <a className="font-xssss text-grey-600 d-block text-dark model-popup-chat" href="#">
                    {page.name}
                </a>
            </h3>
            {page.status && <span className={page.status}></span>}
        </li>
    );
};

const contacts = [
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