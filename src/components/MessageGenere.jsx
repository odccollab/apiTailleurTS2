import {useAuth} from "../context/AuthContext.jsx";
import WelcomePage from "./AccDisc.jsx";
import Chat2 from "./Chat2.jsx";

const HandleMessage = ()=>{
    const {id}=useAuth();
    return (
        id===0?<WelcomePage/>:<Chat2/>
    )

}
export default HandleMessage;