const SettingsDropdown = () => {
    return (
        <div className="dropdown-menu-settings switchcolor-wrap">
            <h4 className="fw-700 font-sm mb-4">Settings</h4>
            <h6 className="font-xssss text-grey-500 fw-700 mb-3 d-block">Choose Color Theme</h6>
            <ul>
                <li>
                    <label className="item-radio item-content">
                        <input type="radio" name="color-radio" value="red" checked="" /><i className="ti-check"></i>
                        <span className="circle-color bg-red" style={{ backgroundColor: "#ff3b30" }}></span>
                    </label>
                </li>
                {/* Other color options... */}
            </ul>
            <div className="card bg-transparent-card border-0 d-block mt-3">
                <h4 className="d-inline font-xssss mont-font fw-700">Header Background</h4>
                <div className="d-inline float-right mt-1">
                    <label className="toggle toggle-menu-color"><input type="checkbox" /><span className="toggle-icon"></span></label>
                </div>
            </div>
            <div className="card bg-transparent-card border-0 d-block mt-3">
                <h4 className="d-inline font-xssss mont-font fw-700">Menu Position</h4>
                <div className="d-inline float-right mt-1">
                    <label className="toggle toggle-menu"><input type="checkbox" /><span className="toggle-icon"></span></label>
                </div>
            </div>
            <div className="card bg-transparent-card border-0 d-block mt-3">
                <h4 className="d-inline font-xssss mont-font fw-700">Dark Mode</h4>
                <div className="d-inline float-right mt-1">
                    <label className="toggle toggle-dark"><input type="checkbox" /><span className="toggle-icon"></span></label>
                </div>
            </div>
        </div>
    );
};
export default SettingsDropdown;