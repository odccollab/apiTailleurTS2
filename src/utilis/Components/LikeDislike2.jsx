import {useState} from "react";

import {Button} from "flowbite-react";

const LikeDislike = () => {
    const [action, setAction] = useState(null);

    const handleLike = () => {
        setAction((prevAction) => (prevAction === 'like' ? null : 'like'));
    };

    const handleDislike = () => {
        setAction((prevAction) => (prevAction === 'dislike' ? null : 'dislike'));
    };

    return (
        <>
            <h1>Vite + React</h1>
            <div className="card">
                <Button
                    onClick={handleLike}
                    color={action === 'like' ? 'green' : 'gray'}
                >
                    Like
                </Button>

                <Button
                    onClick={handleDislike}
                    color={action === 'dislike' ? 'red' : 'gray'}
                >
                    Dislike `{action}`
                </Button>

                <p>Edit <code>src/App.jsx</code> and save to test HMR</p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    );
};

export  default LikeDislike;
