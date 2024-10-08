import PropTypes from 'prop-types';
const CButton = ({ onClick, text, style }) => {
    return (
        <button className={""} onClick={onClick} style={style}>
            {text}
        </button>
    );
};
CButton.propTypes = {
    onClick: PropTypes.func,  // 'onClick' doit être une fonction
    text: PropTypes.string,   // 'text' doit être une chaîne de caractères
    style:PropTypes.object
};
export default CButton;
