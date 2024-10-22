import React, { useEffect, useState } from 'react';
import PostItem from "./PostItem.jsx";
import PostCreateCard from "./PostCreateCard.jsx";
import StoryItem from "./StoryItem.jsx";
import StoryCreate from "./StoryCreate.jsx";
import FriendRequestCard from "./FriendRequestCard.jsx";
import useInfiniteScroll from '../backend/Services/useInfiniteScroll.js';
import SuggestedFriendsCard from "./SuggestedFriendsCard.jsx";
import { DotTyping } from "./DotTyping.jsx";
import "../css/stories.css";
import useFetch from "../backend/Services/useFetch.js";
import useSave from "../backend/Services/useSave.js";
import HttpMethod from "../Enums/httpMethods.js";
import StoryModal from './modals/StoryModal';
import useFollow from "../backend/Services/Follow.js";
import { useAuth } from "../context/AuthContext.jsx";

const MainContent = () => {
    const { saveData } = useSave();
    const { user } = useAuth();
    const { modifyArray } = useFollow();

    const [posts, setPosts] = useState([]);
    const [stories, setStories] = useState([]);
    const [userStories, setUserStories] = useState([]);
    const [otherStories, setOtherStories] = useState([]);
    const [groupedStories, setGroupedStories] = useState({});
    const [selectedUserStories, setSelectedUserStories] = useState(null);

    const { data, loading, hasMore, error } = useInfiniteScroll("posts/postall", 5, { posts: [], stories: [] });
    const { data: relationData } = useFetch('users/suggested-and-not-followed');

    useEffect(() => {
        if (data) {
            setPosts(data.posts || []);
            updateStories(data.stories || []);
        }
    }, [data]);

    // Centralisation de la gestion des stories
    const updateStories = (newStories) => {
        const validStories = newStories.filter(story => story && story.user);
        const currentUserStories = validStories.filter(story => story.user.id === user.id);
        const otherUserStories = validStories.filter(story => story.user.id !== user.id);

        setUserStories(currentUserStories);
        setOtherStories(otherUserStories);
        setStories([...currentUserStories, ...otherUserStories]);
        // Regrouper les stories par utilisateur
        const grouped = groupStoriesByUser([...currentUserStories, ...otherUserStories]);
        setGroupedStories(grouped);
    };

    // Fonction pour regrouper les stories par utilisateur
    const groupStoriesByUser = (stories) => {
        return stories.reduce((acc, story) => {
            const userId = story.user.id;
            if (!acc[userId]) {
                acc[userId] = {
                    user: story.user,
                    stories: []
                };
            }
            acc[userId].stories.push(story);
            return acc;
        }, {});
    };

    const handleAddStory = (newStory) => {
        console.log(  newStory )
        if (!newStory || !newStory.user) return;
        const isCurrentUser = newStory.user.id === user.id;

        if (isCurrentUser) {
            setUserStories(prev => [...prev, newStory]);
        } else {
            setOtherStories(prev => [...prev, newStory]);
        }

        updateStories([newStory, ...stories]);
    };

    const handleDeleteStory = async (story) => {
        console.log(story,"storyyyyyy")
        if (!story || !story.id) return;
        try {
            console.log(stories,"before")
            await saveData(`posts/${story.id}`, null, HttpMethod.DELETE);
            const updatedStories = stories.filter(s => s.id !== story.id);
            console.log(updatedStories,"after")
            updateStories(updatedStories);
        } catch (error) {
            console.error('Failed to delete story:', error);
        }
    };

    const handleStoryClick = (userId) => {
        const userStories = groupedStories[userId]?.stories;
        if (userStories?.length > 0) {
            setSelectedUserStories(userStories);
        }
    };

    const closeStoryModal = () => {
        setSelectedUserStories(null);
    };

    return (
        <>
            <div className="main-content right-chat-active">
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

                {!loading && error && <div className="error">Error fetching posts: {error.message}</div>}
                {!loading && posts.length === 0 && <div className="error">No posts available.</div>}
                <div className="row feed-body">
                    <div className="col-xl-8 col-xxl-9 col-lg-8 z-index--6" style={{ maxWidth: '1000px' }}>
                        <div className="card shadow-none bg-transparent border-0 p-4 mb-0">
                            <div className="d-flex col-lg-8 m-0 m-auto" style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
                                <StoryCreate stories={stories} setStories={handleAddStory} />
                                {Object.values(groupedStories).map((userGroup) => (
                                    <div
                                        key={userGroup.user.id}
                                        style={{ display: 'inline-block' }}
                                        onClick={() => handleStoryClick(userGroup.user.id)}
                                    >
                                        <StoryItem
                                            userImage={userGroup.user.image}
                                            userName={`${userGroup.user.nom} ${userGroup.user.prenom}`}
                                            image={userGroup.user.image}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <PostCreateCard posts={posts} setPosts={setPosts} />
                        {posts.map(post => (
                            <PostItem
                                key={post.id}
                                userImage={post.user.image}
                                userName={`${post.user.prenom} ${post.user.nom}`}
                                timeAgo={new Date(post.createdAt).toLocaleString()}
                                content={post.contenu}
                                media={post.contenuMedia}
                                likes={post.likes || "0"}
                                comments={post.comments || "0"}
                                id={post.id}
                                views={post.viewers || "0"}
                                favorite={post.favorite}
                                likeStatus={post.likeStatus}
                                isfollowing={post.following}
                                post={post}
                                delet={() => setPosts(modifyArray(posts, post, 'remove'))}
                            />
                        ))}

                        {loading && hasMore && (
                            <div className="card w-100 text-center shadow-xss rounded-xxl border-0 p-4 mb-3 mt-3">
                                <DotTyping />
                            </div>
                        )}
                        {!hasMore && !loading && (
                            <div className="card w-100 text-center shadow-xss rounded-xxl border-0 p-4 mb-3 mt-3">
                                <p className="fw-500 text-grey-500 font-xssss">No more posts available.</p>
                            </div>
                        )}
                    </div>

                    <div className="col-xl-4 col-xxl-3 col-lg-4 ps-lg-0">
                        <FriendRequestCard friendRequests={relationData?.notFollowedBack || []} />
                        <SuggestedFriendsCard suggestedFriends={relationData?.suggestedFriends || []} />
                    </div>
                </div>
            </div>

            {selectedUserStories && (
                <StoryModal
                    onDeleteStory={handleDeleteStory}
                    onSendMessage={saveData}
                    stories={selectedUserStories}
                    onClose={closeStoryModal}
                />
            )}
        </>
    );
};

export default MainContent;
