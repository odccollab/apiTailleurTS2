// Home.js
import useFetch from "../Services/useFetch.js";

const Home = () => {
    const { data: responseData, loading: loadingPosts, error: postsError } = useFetch('posts/accueil'); // Fetching data

    // Extract posts, stories, and articles from the response
    const { posts = [], stories = [], articles = [] } = responseData || {}; // Default to empty arrays if undefined
    
    return (
        <div>
            <h1>Welcome to Our Platform!</h1>

            <h2>Posts</h2>
            {loadingPosts && <p>Loading posts...</p>}
            {postsError && <p>Error loading posts: {postsError}</p>}
            {posts.length === 0 && <p>No posts available.</p>}
            {posts.map((post) => (
                <div key={post.id}>
                    <h3>{post.contenu }</h3>
                    <p>{post.contenu}</p>
                </div>
            ))}

            {/* Optionally, you can render stories and articles as well */}
            <h2>Stories</h2>
            {loadingPosts && <p>Loading posts...</p>}
            {postsError && <p>Error loading posts: {postsError}</p>}
            {stories.length === 0 && <p>No stories available.</p>}
            {stories.map((story) => (
                <div key={story.id}>
                    <h3>{story.title}</h3>
                    <p>{story.content}</p>
                </div>
            ))}

            <h2>Articles</h2>
            {loadingPosts && <p>Loading posts...</p>}
            {postsError && <p>Error loading posts: {postsError}</p>}
            {articles.length === 0 && <p>No articles available.</p>}
            {articles.map((article) => (
                <div key={article.id}>
                    <h3>{article.title}</h3>
                    <p>{article.content}</p>
                </div>
            ))}
        </div>
    );
};

export default Home;
