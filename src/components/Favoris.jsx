import useFetch from "../backend/Services/useFetch.js";

import useSave from "../backend/Services/useSave";
const Favoris = (props) => {
const { saveData, isSaving, saveError } = useSave();
    const fav = async (postId) => {
        const post = await saveData("users/favorite", {"postId": postId});
    }
    return (
        <>

            <button onClick={() => fav(props.id)}>{isSaving ? "saving ....." : "save"}</button>
            <div>{saveError}</div>
        </>
    )
}
export default Favoris