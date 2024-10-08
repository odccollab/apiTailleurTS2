import {useContext} from "react";
import {UserContext} from "../Services/UserContext.jsx";
import CButton from "./CButton.jsx";

const ThemeToggleButton = () => {
    const { toggleTheme } = useContext(UserContext);
    return < CButton text={"dddd"} onClick={toggleTheme} />;
};
export default ThemeToggleButton;