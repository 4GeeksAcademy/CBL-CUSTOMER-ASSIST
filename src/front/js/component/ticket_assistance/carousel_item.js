import React from "react";

export const CarouselItem = (props) => {

    return (
        <div className={`carousel-item ${props.index === 0 ? "active" : null}`}>
            <div className="img d-block w-100 ratio ratio-4x3" style={{ "backgroundImage": `url('${props.url}')` }}></div>
        </div>
    );
}
