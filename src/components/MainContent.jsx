import PostItem from "./PostItem.jsx";
import PostCreateCard from "./PostCreateCard.jsx";
import StoryItem from "./StoryItem.jsx";
import StoryCreate from "./StoryCreate.jsx";
import FriendRequestCard from "./FriendRequestCard.jsx";

const MainContent = () => {
    return (
        <div className="main-content right-chat-active">
            <div className="preloader-wrap p-3">
                <div className="box shimmer">
                    <div className="lines">
                        <div className="line s_shimmer"></div>
                        <div className="line s_shimmer"></div>
                        <div className="line s_shimmer"></div>
                        <div className="line s_shimmer"></div>
                    </div>
                </div>
                <div className="box shimmer mb-3">
                    <div className="lines">
                        <div className="line s_shimmer"></div>
                        <div className="line s_shimmer"></div>
                        <div className="line s_shimmer"></div>
                        <div className="line s_shimmer"></div>
                    </div>
                </div>
                <div className="box shimmer">
                    <div className="lines">
                        <div className="line s_shimmer"></div>
                        <div className="line s_shimmer"></div>
                        <div className="line s_shimmer"></div>
                        <div className="line s_shimmer"></div>
                    </div>
                </div>
            </div>
            <div className="row feed-body">
                <div className="col-xl-8 col-xxl-9 col-lg-8">
                    <div className="card w-100 shadow-none bg-transparent bg-transparent-card border-0 p-0 mb-0">
                        <div className="d-flex col-lg-8">
                            <StoryCreate />
                            <StoryItem image="images/s-1.jpg" userImage="images/user-11.png" userName="Victor Exrixon" />
                        </div>

                    </div>
                    <PostCreateCard />
                    <PostItem
                        userImage="images/user-7.png"
                        userName="Surfiya Zakir"
                        timeAgo="3 hours ago"
                        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi."
                        likes="2.8K"
                        comments="22"
                        id="2"
                    />
                    {/* Ajouter plus de <PostItem /> en fonction des données */}
                </div>
                <div className="col-xl-4 col-xxl-3 col-lg-4 ps-lg-0">
                    <FriendRequestCard userImage="images/user-7.png" userName="Anthony Daugloi" mutualFriends="12" />
                    {/* Additional friend requests, suggested groups, pages, and events can be added here as needed */}
                </div>
            </div>
        </div>
    );
};

export default MainContent;