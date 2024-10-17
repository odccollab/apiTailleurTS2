
const StoryItem = ({ image, video, userImage, userName }) => {
    return (
        <div className="item p-1">
            <div data-bs-toggle="" data-bs-target="" className="card w200 h300 d-block border-0 shadow-xss rounded-xxxl  overflow-hidden cursor-pointer mb-3 mt-3" style={{ backgroundImage: `url(${image})` }}>
                {video && (
                    <video autoPlay loop className="float-right w-100">
                        <source src={video} type="video/mp4" />
                    </video>
                )}
                <div className="card-body d-block p-3 w-100 position-absolute bottom-0 text-center">
                    <a href="#">
                        <figure className="avatar ms-auto me-auto mb-0 position-relative w50 z-index-1"><img src={userImage} alt="user" className="float-right p-0 bg-white rounded-circle w-100 shadow-xss" /></figure>
                        <div className="clearfix"></div>
                        <h4 className="fw-600 position-relative z-index-1 ls-1 font-xssss text-white mt-2 mb-1">{userName}</h4>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default StoryItem;
