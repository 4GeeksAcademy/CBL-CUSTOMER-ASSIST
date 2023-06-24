import React from "react";

export const LoadingData = props => {
	return (
		<div className="d-flex justify-content-center align-items-center h-100">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
	);
};
