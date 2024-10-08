
const PostCreateCard = () => {
    return (
        <div className="card w-100 shadow-xss rounded-xxl border-0 ps-4 pt-4 pe-4 pb-3 mb-3">
            <div className="card-body p-0">
                <a href="#" className=" font-xssss fw-600 text-grey-500 card-body p-0 d-flex align-items-center">
                    <i className="btn-round-sm font-xs text-primary feather-edit-3 me-2 bg-greylight"></i>Create Post
                </a>
            </div>
            <div className="card-body p-0 mt-3 position-relative">
                <figure className="avatar position-absolute ms-2 mt-1 top-5"><img src="images/user-8.png" alt="image" className="shadow-sm rounded-circle w30" /></figure>
                <textarea name="message" className="h100 bor-0 w-100 rounded-xxl p-2 ps-5 font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg" cols="30" rows="10" placeholder="What's on your mind?"></textarea>
            </div>
            <div className="card-body d-flex p-0 mt-0">
                <a href="#" className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4"><i className="font-md text-danger feather-video me-2"></i><span className="d-none-xs">Live Video</span></a>
                <a href="#" className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4"><i className="font-md text-success feather-image me-2"></i><span className="d-none-xs">Photo/Video</span></a>
                <a href="#" className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4"><i className="font-md text-warning feather-camera me-2"></i><span className="d-none-xs">Feeling/Activity</span></a>
                <a href="#" className="ms-auto" id="dropdownMenu4" data-bs-toggle="dropdown" aria-expanded="false"><i className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i></a>
            </div>
        </div>
    );
};

export default PostCreateCard;
