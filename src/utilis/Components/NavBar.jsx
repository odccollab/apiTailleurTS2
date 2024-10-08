import NavLink from './NavLink';  // Assuming NavLink is in the same directory
import "../css/Nav.css"
import NavLink2 from "./NavLinkClass.jsx";
import Nav2 from "./Nav2.jsx";
const Navbar = () => {
    return (
        <nav className="bg-blue-500 p-50 w-20">
            <Nav2/>
            <NavLink text="Home" url="/" className="nav-link" />
            <NavLink text="login" url="/login" className="nav-link" />
            <NavLink text="home2" url="/home" className="nav-link" />
            <NavLink text="Module 1" url="/module1" className="nav-link" />
            <NavLink text="Module 2" url="/module2" className="nav-link" />
            <NavLink text="Module 3" url="/module3" className="nav-link" />
            <NavLink text="Module 4" url="/module4" className="nav-link" />
            <NavLink text="Module 5" url="/module5" className="nav-link" />
            <NavLink text="Module 6" url="/module6" className="nav-link" />
            <NavLink text="Module 7" url="/module7" className="nav-link" />
            <NavLink text="Module 8" url="/module8" className="nav-link" />
            <NavLink2 text="Module 9" url="/module9" className="nav-link" />
        </nav>
    );
};

export default Navbar;
