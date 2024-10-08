const AlertD = (props) => {
    const showAlert = (name) => {
        alert(`Alert ${name}`);
    }
    return (
        <button onClick={() => showAlert(props.name)} className="alert alert-danger">
            Clique
        </button>
    )
}

export default AlertD;
