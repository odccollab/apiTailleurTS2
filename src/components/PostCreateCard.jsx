import React, { useState } from 'react';
import useMediaUpload from '../utilis/useMediaUpload';
import MediaPreview from './MediaPreview';
import useSave from "../backend/Services/useSave.js";

const PostCreateCard = () => {
    const [content, setContent] = useState('');
    const { mediaFiles, addMediaFiles, removeMediaFile ,setMediaFiles} = useMediaUpload();
    const { saveData, isSaving, saveError } = useSave();
    const handleContentChange = (e) => setContent(e.target.value);

    const handleMediaChange = (e) => addMediaFiles(e.target.files);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) {
            alert('Content is required');
            return;
        }
        const formData = new FormData();
        formData.append("contenu", content);

        mediaFiles.forEach((file) => {
            formData.append("contenuMedia", file);
        });

        console.log('Creating post with content:', content, 'and media:', mediaFiles);
        try {
            // Wait for the post to be saved
            await saveData("posts/create", formData);
            // Reset the content and media files only after the post is created
            setContent("");
            setMediaFiles([]); // Use the correct function to clear media files
            alert("post created successfully.");
        } catch (error) {

            console.error("Error creating post:", error);
            // Handle error appropriately (e.g., show an error message)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="card  shadow-xss rounded-xxl border-0 ps-4 pt-4 pe-4 pb-1 mb-3" style={{maxWidth:'800px',margin: '0 auto'}}>
            <div className="card-body p-1">
                <a href="#" className="font-xssss fw-600 text-grey-500 card-body p-2 d-flex align-items-center">
                    <i className="btn-round-sm font-xs text-primary feather-edit-3 me-2 bg-greylight"></i>Create Post
                </a>
            </div>
            <div className="card-body p-0 mt-3 position-relative">
                <figure className="avatar position-absolute ms-2 mt-1 top-5">
                    <img src="../images/user-8.png" alt="user avatar" className="shadow-sm rounded-circle w10" />
                </figure>
                <textarea
                    name="content"
                    value={content}
                    onChange={handleContentChange}
                    className="h100 bor-0 w-100 rounded-xxl p-4 ps-5 font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg"
                    rows="4"
                    placeholder="What's on your mind?"
                    required
                ></textarea>
            </div>

            {/* Use the MediaPreview component */}
            <MediaPreview mediaFiles={mediaFiles} onRemove={removeMediaFile} />

            <div className="card-body d-flex p-0 mt-0">
                <label className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4">
                    <i className="font-md text-success feather-image me-2"></i><span className="d-none-xs">Add Media</span>
                    <input
                        type="file"
                        onChange={handleMediaChange}
                        accept="image/*,video/*"
                        multiple
                        className="d-none"
                        name="contenuMedia"
                    />
                </label>
                <a href="#" className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4"><i className="font-md text-danger feather-video me-2"></i><span className="d-none-xs">Live Video</span></a>
                <a href="#" className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4"><i className="font-md text-warning feather-camera me-2"></i><span className="d-none-xs">Feeling/Activity</span></a>
                {!isSaving ? <button type="submit" className="ms-auto btn btn-primary btn-sm">Post</button> :
                    <button type="button" className="ms-auto btn btn-primary btn-sm">saving.....</button>}
            </div>
        </form>
    );
};

export default PostCreateCard;
