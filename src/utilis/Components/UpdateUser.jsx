import {useContext, useState} from "react";
import {UserContext} from "../Services/UserContext.jsx";

const UpdateUser = () => {
    const { updateUser } = useContext(UserContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleUpdate = () => {
        updateUser(firstName, lastName);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            <button onClick={handleUpdate}>Update User</button>
        </div>
    );
};

export default UpdateUser;