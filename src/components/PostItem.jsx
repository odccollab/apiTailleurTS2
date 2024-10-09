import React, { useState } from 'react';
import OptionsModal from './modals/OptionsModal.jsx'; // Import du composant des options
import Favoris from './Favoris.jsx';

const PostItem = ({ userImage, userName, timeAgo, content, likes, comments, id }) => {
  const [showOptionsModal, setShowOptionsModal] = useState(false); // Gestion de l'affichage du modal des options

  const handleOptionsModal = () => setShowOptionsModal(!showOptionsModal);

  return (
    <div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3">
      <div className="card-body p-0 d-flex">
        <figure className="avatar me-3">
          <img src={userImage} alt="image" className="shadow-sm rounded-circle w45" />
        </figure>
        <h4 className="fw-700 text-grey-900 font-xssss mt-1">
          {userName}
          <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">{timeAgo}</span>
        </h4>
        <a
          href="#"
          className="ms-auto"
          onClick={handleOptionsModal} 
        >
          <i className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i>
        </a>
      </div>
      <div className="card-body p-0 me-lg-5">
        <p className="fw-500 text-grey-500 lh-26 font-xssss w-100">
          {content}
          <a href="#" className="fw-600 text-primary ms-2">See more</a>
        </p>
      </div>
      <div className="card-body d-flex p-0 mt-3">
        <a href="#" className="emoji-bttn d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-2">
          <i className="feather-thumbs-up text-white bg-primary-gradiant me-1 btn-round-xs font-xss"></i> {likes} Likes
        </a>
        <a href="#" className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss">
          <i className="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg"></i>
          <span className="d-none-xss">{comments} Comments</span>
        </a>
        <Favoris id={id} />
      </div>

      {/* Modal pour les options */}
      <OptionsModal show={showOptionsModal} handleClose={handleOptionsModal} postId={id} />
    </div>
  );
};

export default PostItem;
