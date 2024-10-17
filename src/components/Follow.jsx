import React from 'react';
import useFetch from "../backend/Services/useFetch";
import useSave from "../backend/Services/useSave";
import { useFollow } from "../context/FollowContext";

const Follow = ({ followedId }) => {
    const { saveData, isSaving, saveError } = useSave();
    const { theme, isFollowing, toggleFollow } = useFollow();

    const follow = async () => {
        const post = await saveData("users/follow", {"followedId": followedId});
        if (!post.error) {
            toggleFollow();
        }
    }

    return (
        <>
            <button
                onClick={follow}
                style={{ backgroundColor: theme, border: "1px solid" }}
                className="font-bold py-1 px-2 rounded"
            >
                {isFollowing ? 'Suivi(e)' : 'Suivre'}
            </button>
            {saveError && <div>{saveError}</div>}
        </>
    )
}

export default Follow;