import React ,{useEffect} from 'react';
import BannerSlider from '../components/BannerSlider';
import ProductCard from '../components/ProductItem.jsx';
import { ArticleProvider, UseArticle } from '../context/ArticleContext.jsx'; // Import ArticleProvider and UseArticle
import useFetch from '../backend/Services/useFetch.js';
import { useAuth } from '../context/AuthContext.jsx';

const HomePage = () => {
    const { articles, setArticles } = useAuth(); // Access context data here
    
    const { data: articles2, loading, error } = useFetch("posts/article");

    useEffect(() => {
        // Check if articles2 and articles2.articles are valid
        if (articles2 && articles2.articles) {
            setArticles(articles2.articles); // Set articles array to context
        }
    }, [articles2, setArticles]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading articles</div>;

    return (
        <div className="main-content bg-white right-chat-active">
            <div className="middle-sidebar-bottom">
                <div className="middle-sidebar-left pe-0">
                    <div className="row">
                        <div className="col-xl-12">
                            <BannerSlider />
                        </div>
                    </div>
                    <div className="row mt-4">
                        {/* Add check to ensure articles exist before mapping */}
                        {articles && articles.length > 0 && articles.map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default function WrappedHomePage() {
    return (
        <ArticleProvider>
            <HomePage />
        </ArticleProvider>
    );
}
