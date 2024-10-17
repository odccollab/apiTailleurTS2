import { useState, useEffect, useCallback, useRef } from 'react';
import apiRepository from "../Repository/apiAxiosRepository.js";

const useInfiniteScroll = (endpoint, limit = 1, initialData = { posts: [], stories: [] }, dataHandler = (data) => data) => {
    const [data, setData] = useState(initialData);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // State for capturing errors
    const loadingRef = useRef(false);

    const fetchData = useCallback(async (page, limit) => {
        try {
            const result = await apiRepository.fetchData(`${endpoint}?page=${page}&limit=${limit}`);
            console.log("Fetched data:", result);
            return result;
        } catch (error) {
            console.error("Error fetching data:", error);
            setError(error); // Capture the error in the state
            return initialData; // Return the initial structure on error
        }
    }, [endpoint, initialData]);

    const loadMore = useCallback(async () => {
        if (loadingRef.current || !hasMore) return;

        loadingRef.current = true;
        setLoading(true);

        try {
            const newData = await fetchData(page, limit);
            console.log(newData);

            // Process the fetched data using the provided data handler
            const processedData = dataHandler(newData);
            if (!processedData)  {
                setHasMore(false);
            }
            setData(prev => ({
                ...prev,
                ...processedData // Merge the new data
            }));
            setPage(prev => prev + 1);
        } catch (error) {
            console.error("Failed to load more data:", error);
            setHasMore(false);
        } finally {
            setLoading(false);
            loadingRef.current = false;
        }
    }, [page, limit, fetchData, hasMore, dataHandler]);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - 200
            ) {
                loadMore();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadMore]);

    useEffect(() => {
        loadMore(); // Load initial data
    }, []); // Empty dependency array to run only once on mount

    return { data, loading, hasMore, error,setHasMore ,setPage}; // Include error in return value
};

export default useInfiniteScroll;
