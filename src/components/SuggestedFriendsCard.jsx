import React from "react";

const SuggestedFriendsCard = ({ suggestedFriends = [] }) => {
    return (
        <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3 z-index-12">
            <div className="card-body d-flex align-items-center p-4">
                <h4 className="fw-700 mb-0 font-xssss text-grey-900">Suggested Friends</h4>
                <a href="default-suggestions.html" className="fw-600 ms-auto font-xssss text-primary">See all</a>
            </div>
            {suggestedFriends.map((friend, index) => (
                <React.Fragment key={index}>
                    <div className="card-body d-flex pt-4 ps-4 pe-4 pb-0 border-top-xs bor-0">
                        <figure className="avatar me-3">
                            <img src={friend.image} alt="user" className="shadow-sm rounded-circle w45" />
                        </figure>
                        <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                            {`${friend.prenom} ${friend.nom}`}
                            <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                                {friend.mutualFriends} mutual friends
                            </span>
                        </h4>
                    </div>
                    <div className="card-body d-flex align-items-center pt-0 ps-4 pe-4 pb-4">
                        <a href="#" className="p-2 lh-20 w100 bg-blue-gradiant me-2 text-white text-center font-xssss fw-600 ls-1 rounded-xl btn-primary">Add Friend</a>
                        <a href="#" className="p-2 lh-20 w100 bg-grey text-grey-800 text-center font-xssss fw-600 ls-1 rounded-xl">Profile</a>
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
};

export default SuggestedFriendsCard;
