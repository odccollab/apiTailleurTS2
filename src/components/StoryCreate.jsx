import React, { useState } from "react";
import "../css/postCreate.css";
import useSave from "../backend/Services/useSave.js";

const StoryCreate = () => {
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
        formData.append("type","story")
        if (contenuMedia) {
            formData.append("contenuMedia", contenuMedia);
        }

        try {
            // Add submission logic here
           const post = await saveData("posts/create", formData);
            console.log(post);
            setContenu("");
            setContenuMedia(null);
            setOpen(false); // Close the form after submission
        } catch (error) {
            console.error("Error submitting story:", error);
        }
    };

    return (
        <div className="item p-1">
            {/* Conditionally render either the "Add Story" card or the form */}
            { !open ? (
                <div
                    onClick={() => setOpen(true)}
                    className="card w200 h300 d-block border-0 shadow-xss rounded-xxxl bg-gradiant-bottom overflow-hidden cursor-pointer mb-3 mt-3"
                >
                    <div className="card-body position-relative text-center d-flex flex-column align-items-center justify-content-center">
                        <span className="btn-round-lg bg-white shadow-sm">
                            <i className="feather-plus font-lg text-primary"></i>
                        </span>
                        <h4 className="fw-700 mt-2 mb-0 text-dark">Add Story</h4>
                    </div>
                </div>
            ) : (
                <div className="card w200 h300 d-block border-0 shadow-xss rounded-xxxl bg-white overflow-hidden mb-3 mt-3">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="contenu" className="form-label fw-semibold">Story Content</label>
                                <textarea
                                    id="contenu"
                                    className="form-control border-primary"
                                    value={contenu}
                                    onChange={(e) => setContenu(e.target.value)}
                                    rows="4"
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contenuMedia" className="form-label fw-semibold">Media (optional)</label>
                                <input
                                    type="file"
                                    id="contenuMedia"
                                    className="form-control border-primary"
                                    onChange={handleMediaChange}
                                    accept="image/*,video/*"
                                />
                            </div>
                            <div className="d-flex justify-content-between">
                                <button type="button" className="btn btn-outline-secondary" onClick={() => setOpen(false)}>Cancel</button>
                                {!isSaving ? <button type="submit" className="btn btn-primary">Submit</button> :
                                    <button type="button" className="btn btn-primary">saving...</button>}
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StoryCreate;
