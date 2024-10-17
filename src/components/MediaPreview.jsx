// components/MediaPreview.jsx
import React from 'react';

const MediaPreview = ({ mediaFiles, onRemove }) => (
    <div className="d-flex flex-wrap mt-3">
        {mediaFiles.map((file, index) => (
            <div key={index} className="media-preview position-relative me-2 mb-2">
                {file.type.startsWith('image') ? (
                    <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="rounded shadow-sm"
                        style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    />
                ) : (
                    <video
                        src={URL.createObjectURL(file)}
                        controls
                        className="rounded shadow-sm"
                        style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    />
                )}
                <button
                    type="button"
                    onClick={() => onRemove(index)}
                    className="btn-close position-absolute top-0 start-0"
                    style={{ background: 'rgba(255, 255, 255, 0.7)', borderRadius: '50%' }}
                    aria-label="Close"
                ></button>
            </div>
        ))}
    </div>
);

export default MediaPreview;
