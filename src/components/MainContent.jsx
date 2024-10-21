import React, {useEffect, useState} from 'react';
import PostItem from "./PostItem.jsx";
import PostCreateCard from "./PostCreateCard.jsx";
import StoryItem from "./StoryItem.jsx";
import StoryCreate from "./StoryCreate.jsx";
import FriendRequestCard from "./FriendRequestCard.jsx";
import useInfiniteScroll from '../backend/Services/useInfiniteScroll.js';
import SuggestedFriendsCard from "./SuggestedFriendsCard.jsx";
import {DotTyping} from "./DotTyping.jsx";
import "../css/stories.css";
import useFetch from "../backend/Services/useFetch.js";
import RightChat from "./RightChat.jsx";

const MainContent = () => {
    const [posts,setPost2]=useState([]);
    const [stories,setStory]=useState([]);
    // Data handlers for infinite scroll and fetch
    const dataHandler = (newData) => ({
        posts: [...(data.posts || []), ...(newData.posts || [])],
        stories: [...( []), ...(newData.stories || [])]
    });

    const { data, loading, hasMore, error } = useInfiniteScroll("posts/postall", 5, { posts: [], stories: [] }, dataHandler);
    const { data: relationData, loading: relationLoading, error: relationError } = useFetch('users/suggested-and-not-followed');
    console.log(relationData)

    useEffect(() => {
        setPost2(data.posts);
        setStory(data.stories);
    }, [data]);

    return (
        <>
            <div className="main-content right-chat-active">
                {/* Loading State */}
                {loading && posts.length === 0 && (
                    <div className="preloader-wrap p-3">
                        <div>Loading posts...</div>
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
                )}

                {/* Error State */}
                {!loading && error && (
                    <div className="error">Error fetching posts: {error.message}</div>
                )}

                {/* No Posts State */}
                {!loading && posts.length === 0 && (
                    <div className="error">No posts available.</div>
                )}

                {/* Main Content */}
                <div className="row feed-body">
                    <div className="col-xl-8 col-xxl-9 col-lg-8 z-index--6" style={{maxWidth: '1000px'}}>
                        <div className="card w-200 shadow-none bg-transparent border-0 p-4 mb-0">
                            <div className="stories-container d-flex col-lg-8 m-0 m-auto">
                                <StoryCreate stories={stories} setStories={setStory}/>
                                {stories.map((story) => (
                                    <StoryItem
                                        key={story.id}
                                        image={story.contenuMedia}
                                        userImage={story.user.image}
                                        userName={`${story.user.nom} ${story.user.prenom}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <PostCreateCard posts={posts} setPosts={setPost2}/>
                        {posts.map(post => (
                            <PostItem
                                key={post.id}
                                userImage={`${post.user.image}`}
                                userName={`${post.user.prenom} ${post.user.nom}`}
                                timeAgo={new Date(post.createdAt).toLocaleString()}
                                content={post.contenu}
                                media={post.contenuMedia}
                                likes={post.likes || "0"}
                                comments={post.comments || "0"}
                                id={post.id}
                                views={post.viewers || "0"}
                                idUser={post.idUser}
                            />
                        ))}

                        {/* Loading More Indicator */}
                        {loading && hasMore && (
                            <div className="card w-100 text-center shadow-xss rounded-xxl border-0 p-4 mb-3 mt-3">
                                <DotTyping/>
                            </div>
                        )}

                        {/* No More Posts */}
                        {!hasMore && !loading && <p>No more posts available.</p>}
                    </div>

                    <div className="col-xl-4 col-xxl-3 col-lg-4 ps-lg-0">
                        <FriendRequestCard friendRequests={relationData?.notFollowedBack || []}/>
                        <SuggestedFriendsCard suggestedFriends={relationData?.suggestedFriends || []}/>
                    </div>
                </div>
            </div>
           </>
    );
};

export default MainContent;
