export const ConfirmFriendList = () => {
    return (
        <div className="card w-100 shadow-xss rounded-xxl border-0 p-0 ">
            <div className="card-body d-flex align-items-center p-4 mb-0">
                <h4 className="fw-700 mb-0 font-xssss text-grey-900">Confirm Friend</h4>
                <a href="default-member.html" className="fw-600 ms-auto font-xssss text-primary">See all</a>
            </div>
            <div className="card-body bg-transparent-card d-flex p-3 bg-greylight ms-3 me-3 rounded-3">
                <figure className="avatar me-2 mb-0"><img src="images/user-7.png" alt="image" className="shadow-sm rounded-circle w45" /></figure>
                <h4 className="fw-700 text-grey-900 font-xssss mt-2">Anthony Daugloi <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">12 mutual friends</span></h4>
                <a href="#" className="btn-round-sm bg-white text-grey-900 feather-chevron-right font-xss ms-auto mt-2"></a>
            </div>
            {/* Ajouter d'autres éléments de confirmation ici */}
        </div>
    );
};


// SuggestGroupCard.jsx
export const SuggestGroupCard = () => {
    return (
        <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3 mt-3">
            <div className="card-body d-flex align-items-center p-4">
                <h4 className="fw-700 mb-0 font-xssss text-grey-900">Suggest Group</h4>
                <a href="default-group.html" className="fw-600 ms-auto font-xssss text-primary">See all</a>
            </div>
            <div className="card-body d-flex pt-4 ps-4 pe-4 pb-0 overflow-hidden border-top-xs bor-0">
                <img src="images/e-2.jpg" alt="img" className="img-fluid rounded-xxl mb-2" />
            </div>
            <div className="card-body dd-block pt-0 ps-4 pe-4 pb-4">
                <ul className="memberlist mt-1 mb-2 ms-0 d-block">
                    <li className="w20"><a href="#"><img src="images/user-6.png" alt="user" className="w35 d-inline-block" style={{ opacity: 1 }} /></a></li>
                    <li className="w20"><a href="#"><img src="images/user-7.png" alt="user" className="w35 d-inline-block" style={{ opacity: 1 }} /></a></li>
                    <li className="w20"><a href="#"><img src="images/user-8.png" alt="user" className="w35 d-inline-block" style={{ opacity: 1 }} /></a></li>
                    <li className="w20"><a href="#"><img src="images/user-3.png" alt="user" className="w35 d-inline-block" style={{ opacity: 1 }} /></a></li>
                    <li className="last-member"><a href="#" className="bg-greylight fw-600 text-grey-500 font-xssss w35 ls-3 text-center" style={{ height: "35px", lineHeight: "35px" }}>+2</a></li>
                    <li className="ps-3 w-auto ms-1"><a href="#" className="fw-600 text-grey-500 font-xssss">Member apply</a></li>
                </ul>
            </div>
        </div>
    );
};


// SuggestPagesCard.jsx
const SuggestPagesCard = () => {
    return (
        <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
            <div className="card-body d-flex align-items-center p-4">
                <h4 className="fw-700 mb-0 font-xssss text-grey-900">Suggest Pages</h4>
                <a href="default-group.html" className="fw-600 ms-auto font-xssss text-primary">See all</a>
            </div>
            <div className="card-body d-flex pt-4 ps-4 pe-4 pb-0 overflow-hidden border-top-xs bor-0">
                <img src="images/g-2.jpg" alt="img" className="img-fluid rounded-xxl mb-2" />
            </div>
            <div className="card-body d-flex align-items-center pt-0 ps-4 pe-4 pb-4">
                <a href="#" className="p-2 lh-28 w-100 bg-grey text-grey-800 text-center font-xssss fw-700 rounded-xl"><i className="feather-external-link font-xss me-2"></i> Like Page</a>
            </div>
        </div>
    );
};


// EventCard.jsx
const EventCard = () => {
    return (
        <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
            <div className="card-body d-flex align-items-center  p-4">
                <h4 className="fw-700 mb-0 font-xssss text-grey-900">Event</h4>
                <a href="default-event.html" className="fw-600 ms-auto font-xssss text-primary">See all</a>
            </div>
            <div className="card-body d-flex pt-0 ps-4 pe-4 pb-3 overflow-hidden">
                <div className="bg-success me-2 p-3 rounded-xxl"><h4 className="fw-700 font-lg ls-3 lh-1 text-white mb-0"><span className="ls-1 d-block font-xsss text-white fw-600">FEB</span>22</h4></div>
                <h4 className="fw-700 text-grey-900 font-xssss mt-2">Meeting with clients <span className="d-block font-xsssss fw-500 mt-1 lh-4 text-grey-500">41 madison ave, floor 24 new work, NY 10010</span> </h4>
            </div>
            {/* Ajouter d'autres événements ici */}
        </div>
    );
};

export default EventCard;