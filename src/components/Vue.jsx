import { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { Eye } from 'lucide-react';
import useFetch from '../backend/Services/useFetch';

const Vue = ({ postId, initialViews }) => {
    const [views, setViews] = useState(initialViews.length);
    const [error, setError] = useState(null);
    const hasIncrementedRef = useRef(false);
    const observerRef = useRef(null);

    // Utilisez useFetch pour obtenir les données initiales
    const { data: initialData, loading: initialLoading, error: initialFetchError } = useFetch(`posts/${postId}/views`);

    // Utilisez useFetch pour l'incrémentation, mais ne l'exécutez que lorsque nécessaire
    const { data: incrementData, loading: incrementLoading, error: incrementError, executeFetch: executeIncrement } = useFetch(
        `posts/${postId}/view`,
        { method: 'GET' },
        false // Ne pas exécuter automatiquement
    );

    const incrementViews = useCallback(() => {
        if (!hasIncrementedRef.current) {
            hasIncrementedRef.current = true;
            executeIncrement(); // Exécuter la requête d'incrémentation
        }
    }, [executeIncrement]);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.5 && !hasIncrementedRef.current) {
                    incrementViews();
                }
            },
            { threshold: 0.5 }
        );

        const postElement = document.getElementById(`post-${postId}`);
        if (postElement && observerRef.current) {
            observerRef.current.observe(postElement);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [postId, incrementViews]);

    useEffect(() => {
        if (initialData && typeof initialData.views === 'number') {
            setViews(initialData.views);
        }
    }, [initialData]);

    useEffect(() => {
        if (incrementData && typeof incrementData.views === 'number') {
            setViews(incrementData.views);
        }
    }, [incrementData]);

    useEffect(() => {
        if (initialFetchError) {
            setError('Échec de la récupération des vues initiales');
            console.error('Initial fetch error:', initialFetchError);
        } else if (incrementError) {
            setError(/* 'Erreur lors de l\'incrémentation des vues' */);
            console.error('Increment error:', incrementError);
        }
    }, [initialFetchError, incrementError]);

    return (
        <div className="view-counter">
            <Eye className="view-icon" />
            {initialLoading || incrementLoading ? (
                <span>Chargement...</span>
            ) : (
                <span className="view-count">{views}</span>
            )}
            {error && <span className="error-message">{error}</span>}
        </div>
    );
};

Vue.propTypes = {
    postId: PropTypes.string.isRequired,
    initialViews: PropTypes.number.isRequired,
};

export default Vue;