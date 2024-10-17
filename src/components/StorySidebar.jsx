import React from 'react';

const Sidebar = () => {
    return (
        <div className="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
            <div className="card-body d-flex align-items-center p-0">
                <h2 className="fw-700 mb-0 mt-0 font-md text-grey-900">Storie</h2>
                <div className="search-form-2 ms-auto">
                    <i className="ti-search font-xss"></i>
                    <input
                        type="text"
                        className="form-control text-grey-500 mb-0 bg-greylight theme-dark-bg border-0"
                        placeholder="Search here."
                    />
                </div>
                <a href="#" className="btn-round-md ms-2 bg-greylight theme-dark-bg rounded-3">
                    <i className="feather-filter font-xss text-grey-500"></i>
                </a>
            </div>
        </div>
    );
};

export default Sidebar;
