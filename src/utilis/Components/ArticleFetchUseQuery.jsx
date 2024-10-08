import { useQuery } from 'react-query';
import axios from 'axios';

const fetchArticles = async () => {
    const { data } = await axios.get('http://localhost:3000/articles');
    return data;
};

const ArticlesList = () => {
    // Utilisation de React Query pour la requête API
    const { data, error, isLoading } = useQuery('articles', fetchArticles);

    if (isLoading) return <p>Chargement des articles...</p>;
    if (error) return <p>Erreur lors du chargement des articles</p>;

    return (
        <ul>
            {data.map(article => (
                <li key={article.id}>{article.title}</li>
            ))}
        </ul>
    );
};

export default ArticlesList;
