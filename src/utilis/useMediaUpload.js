// hooks/useMediaUpload.js
import { useState } from 'react';

const useMediaUpload = (maxFiles = 5) => {
    const [mediaFiles, setMediaFiles] = useState([]);

    const addMediaFiles = (files) => {
        const selectedFiles = Array.from(files);
        const totalFiles = selectedFiles.length + mediaFiles.length;

        if (totalFiles > maxFiles) {
            alert(`You can upload a maximum of ${maxFiles} media files.`);
            return;
        }

        setMediaFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    };

    const removeMediaFile = (index) => {
        setMediaFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    return {
        mediaFiles,
        addMediaFiles,
        removeMediaFile,
        setMediaFiles
    };
};

export default useMediaUpload;
