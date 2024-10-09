import PostItem from "./PostItem.jsx";
import PostCreateCard from "./PostCreateCard.jsx";
import StoryItem from "./StoryItem.jsx";
import StoryCreate from "./StoryCreate.jsx";
import FriendRequestCard from "./FriendRequestCard.jsx";
import useFetch from "../backend/Services/useFetch.js";

const MainContent = () => {
    const { data, loading, error } = useFetch("posts/accueil");

    if (loading) {
        return (
            <div className="main-content right-chat-active">
                Loading posts...
                <div className="preloader-wrap p-3">
                    {[...Array(3)].map((_, index) => (
                        <div className="box shimmer mb-3" key={index}>
                            <div className="lines">
                                <div className="line s_shimmer"></div>
                                <div className="line s_shimmer"></div>
                                <div className="line s_shimmer"></div>
                                <div className="line s_shimmer"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="error">Error: {error.message}</div>;
    }

    if (!data || !data.posts) {
        return <div className="error">No posts available.</div>;
    }

    return (
        <div className="main-content right-chat-active">
            <div className="row feed-body">
                <div className="col-xl-8 col-xxl-9 col-lg-8">
                    <div className="card w-100 shadow-none bg-transparent bg-transparent-card border-0 p-0 mb-0">
                        <div className="d-flex col-lg-8">
                            <StoryCreate />
                            <StoryItem image="images/s-1.jpg" userImage="images/user-11.png" userName="Victor Exrixon" />
                        </div>
                    </div>
                    <PostCreateCard />
                    {data.posts.map(post => (
                        <PostItem
                            key={post.id}
                            userImage={`images/${post.user.image}`}
                            userName={`${post.user.prenom} ${post.user.nom}`}
                            timeAgo={new Date(post.createdAt).toLocaleString()}
                            content={post.contenu}
                            media={post.contenuMedia} // Pass the media array to PostItem
                            likes={post.likes || "0"}
                            comments={post.comments || "0"}
                            id={post.id}
                        />
                    ))}
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
