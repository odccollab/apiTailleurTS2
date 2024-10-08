import {Component} from "react";
import PropTypes from "prop-types";

class NavLink2 extends Component {
    render() {
        return (
            <a href={this.props.url} className="nav-link">
                {this.props.text}
            </a>
        );
    }

}
NavLink2.propTypes = {
    text: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    className: PropTypes.string
};

export default NavLink2;