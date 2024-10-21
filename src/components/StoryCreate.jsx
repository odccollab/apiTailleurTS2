import React, { useState } from "react";
import "../css/postCreate.css";
import useSave from "../backend/Services/useSave.js";

const StoryCreate = ({ stories, setStories }) => {
    const [contenu, setContenu] = useState("");
    const [contenuMedia, setContenuMedia] = useState(null);
    const [open, setOpen] = useState(false);
    const { saveData, isSaving, saveError } = useSave();

    const handleMediaChange = (e) => {
        setContenuMedia(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("contenu", contenu);
        formData.append("type", "story");
        if (contenuMedia) {
            formData.append("contenuMedia", contenuMedia);
        }

        try {
            const post = await saveData("posts/create", formData);
            setStories([post, ...stories]);
            setContenu("");
            setContenuMedia(null);
            setOpen(false); // Close the form after submission
        } catch (error) {
            console.error("Error submitting story:", error);
        }
    };

    return (
        <div className="story-create-container p-1">
            {!open ? (
                <div
                    className=" w-500 h-500 story-card story-add-btn shadow-lg rounded-xxl bg-gradient position-relative text-center d-flex flex-column align-items-center justify-content-center cursor-pointer mb-3"
                    onClick={() => setOpen(true)}
                    style={{ transition: 'transform 0.3s', transform: 'scale(1.05)' }}
                >
                    <div className="icon-wrap bg-white rounded-circle shadow-lg p-3 mb-3">
                        <i className="feather-plus font-xl text-primary"></i>
                    </div>
                    <h4 className="fw-bold text-white">Add Story</h4>
                </div>
            ) : (
                <div className="story-card shadow-lg rounded-xxl bg-white overflow-hidden mb-3 p-2" style={{ animation: 'fadeIn 0.5s ease' }}>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="contenu" className="form-label fw-bold text-dark"></label>
                            <textarea
                                id="contenu"
                                className="form-control border-light shadow-sm"
                                value={contenu}
                                onChange={(e) => setContenu(e.target.value)}
                                rows="4"
                                required
                                style={{ borderRadius: '12px' }}
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="contenuMedia" className="form-label fw-bold text-dark"></label>
                            <input
                                type="file"
                                id="contenuMedia"
                                className="form-control border-light shadow-sm"
                                onChange={handleMediaChange}
                                accept="image/*,video/*"
                                style={{ borderRadius: '12px' }}
                            />
                        </div>
                        <div className="d-flex justify-content-between">
                            <button type="button" className="btn btn-outline-secondary rounded-pill" onClick={() => setOpen(false)}>
                                Cancel
                            </button>
                            {!isSaving ? (
                                <button type="submit" className="btn btn-primary rounded-pill">
                                    Submit Story
                                </button>
                            ) : (
                                <button type="button" className="btn btn-primary rounded-pill" disabled>
                                    Saving...
                                </button>
                            )}
                        </div>
                        {saveError && <p className="error-message text-danger mt-2">Error: {saveError}</p>}
                    </form>
                </div>
            )}
        </div>
    );
};

export default StoryCreate;
