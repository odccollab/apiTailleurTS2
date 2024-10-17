import React, { useEffect } from 'react';
import useInfiniteScroll from '../backend/Services/useInfiniteScroll.js';
import PostItem from './PostItem';
import StoryItem from './StoryItem';
import ArticleItem from './ArticleItem';

const ProfileContent = ({ userId, activeTab }) => {
    let endpoint = activeTab === 'article' ? 'posts/article-user' :  'posts/postall-user';
    endpoint = userId ? `${endpoint}?userId=${userId}` : endpoint;

    const dataHandler = (newData) => ({
        posts: [...(data.posts || []), ...(newData.posts || [])],
        stories: [...(data.stories || []), ...(newData.stories || [])],
        articles: [...(data.articles || []), ...(newData.articles || [])]
    });

    const {
        data,
        loading,
        hasMore,
        error,
        setHasMore
    } = useInfiniteScroll(endpoint, 10, { posts: [], stories: [], articles: [] }, dataHandler);

    useEffect(() => {
        setHasMore(true);
    }, [activeTab, setHasMore]);

    if (loading &&!data) return <div>Loading...</div>;
    if (error) return <div>Erreur lors de la récupération des données.</div>;

    return (
        <div className="profile-content">
            {activeTab === 'post' && data.posts.map((post) => (
                <PostItem key={post.id} {...post} />
            ))}
            {activeTab === 'story' && data.stories.map((story) => (
                <StoryItem key={story.id} {...story} />
            ))}
            {activeTab === 'article' && data.articles.map((article) => (
                <ArticleItem key={article.id} {...article} />
            ))}

            {activeTab === 'post' && data.posts.length === 0 && <div>Aucun post trouvé.</div>}
            {activeTab === 'story' && data.stories.length === 0 && <div>Aucune story trouvée.</div>}
            {activeTab === 'article' && data.articles.length === 0 && <div>Aucun article trouvé.</div>}

            {hasMore && <div>Loading more...</div>}
        </div>
    );
};

export default ProfileContent;
