import React from 'react';

const StoryCard = ({ image, video, userImage, name }) => {
    return (
        <div className={`card h300 d-block border-0 shadow-xss rounded-3 bg-gradiant-bottom overflow-hidden mb-3 ${image ? 'bg-image-cover' : ''}`} style={image ? { backgroundImage: `url(${image})` } : {}}>
            {video ? (
                <video autoPlay loop className="float-right w-100">
                    <source src={video} type="video/mp4" />
                </video>
            ) : null}
            <div className="card-body d-block w-100 position-absolute bottom-0 text-center">
                <figure className="avatar ms-auto me-auto mb-0 position-relative w50 z-index-1">
                    <img src={userImage} alt="avatar" className="float-right p-0 bg-white rounded-circle w-100 shadow-xss" />
                </figure>
                <div className="clearfix"></div>
                <h4 className="fw-600 position-relative z-index-1 ls-3 font-xssss text-white mt-2 mb-1">{name}</h4>
            </div>
        </div>
    );
};

export default StoryCard;
