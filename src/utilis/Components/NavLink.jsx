import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavLink = ({ text, url, className }) => {
    return (
        <Link to={url} className={className}>
            {text}
        </Link>
    );
};

NavLink.propTypes = {
    text: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    className: PropTypes.string
};

export default NavLink;
