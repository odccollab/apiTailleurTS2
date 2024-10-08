import { Component } from "react";
import CButton from "./CButton.jsx";

class LikeDislike2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            action: null
        };
    }

    // Gestion des likes
    handleLike = () => {
        this.setState(prevState => ({
            action: prevState.action === 'like' ? null : 'like'
        }));
    };

    // Gestion des dislikes
    handleDislike = () => {
        this.setState(prevState => ({
            action: prevState.action === 'dislike' ? null : 'dislike'
        }));
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.action !== this.state.action) {
            console.log(`Action mise à jour: ${this.state.action}`);
        }
    }

    componentDidMount() {
        console.log("Le composant LikeDislike a été monté.");
    }

    componentWillUnmount() {
        console.log("Le composant LikeDislike va être démonté.");
    }

    render() {
        return (
            <>
                <h1>Vite + React</h1>
                <div className="card">
                    {/* Utilisation du composant CButton avec gestion des couleurs */}
                    <CButton
                        onClick={this.handleLike}
                        text={`Like`}
                        style={{
                            backgroundColor: this.state.action === 'like' ? 'blue' : 'white', // Coloration du bouton Like
                            color: this.state.action === 'like' ? 'white' : 'black',
                        }}
                    />
                    <CButton
                        onClick={this.handleDislike}
                        text={`Dislike`}
                        style={{
                            backgroundColor: this.state.action === 'dislike' ? 'red' : 'white', // Coloration du bouton Dislike
                            color: this.state.action === 'dislike' ? 'white' : 'black',
                        }}
                    />
                    <p>Edit <code>src/App.jsx</code> and save to test HMR</p>
                </div>
                <p className="read-the-docs">
                    Click on the Vite and React logos to learn more
                </p>
            </>
        );
    }
}

export default LikeDislike2;
