import React from "react";

export const MapInfo = (props) => {
    const data = props.data;

    return (
        <div className="container">
            <h4 className="border-bottom">Directions</h4>
            <iframe
                width="100%"
                height="350"
                frameBorder="0" style={{"border":0}}
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyCOcxTSXvSDDWIP9DyVSDLqMYEApldW_yQ&origin=${data.manufacturerAddress}&destination=${data.customerAddress}&avoid=tolls|highways`}
                allowFullScreen>
            </iframe>
        </div>
    );
}