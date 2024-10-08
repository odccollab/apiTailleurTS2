import {useState} from "react";

import CButton from "./CButton.jsx";
import MyPage from "./Link.jsx";
import LikeDislike from "./LikeDislike.jsx";
import NavLink from "./NavLink.jsx";
import {Link} from "react-router-dom";
import LikeDislike2 from "./LikeDislike2.jsx";
import LikeDislikeClass from "./LikeDislikeClass.jsx";
import UpdateUser from "./UpdateUser.jsx";
import ThemeToggleButton from "./ChangeTheme.jsx";
import ButtonTest, {ButtonTest2} from "./ButtonTest.jsx";
import MyForm from "./Login2.jsx";
import AlertD from "./AlertD.jsx";

const CountButton = () => {
    // Séparation des états pour like et dislike
    const [like, setLike] = useState(2);
    const [dislike, setDislike] = useState(2);
    // Gestion des likes
    const handleLike = () => {
        setLike(like + 1);
    };
    // Gestion des dislikes
    const handleDislike = () => {
        setDislike(dislike > 0 ? dislike - 1 : 0);
    };
    return (
        <>
            <h1>Vite + React</h1>
            <div className="card">
                {/* Utilisation du composant CButton avec les gestionnaires d'événements */}
                <CButton onClick={handleLike} text={`Like ${like}`} />
                <CButton onClick={handleDislike} text={`Dislike ${dislike}`} />
                <p>Edit <code>src/App.jsx</code> and save to test HMR</p>
                <LikeDislikeClass/>
                <UpdateUser/>
                <ThemeToggleButton/>
                <ButtonTest/>
                <ButtonTest2/>
            </div>
            <MyPage />
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
            <MyForm/>
            <AlertD name="fall"/>

        </>
    );
};
export  default CountButton;