import React from "react";
// import { Loader } from "@googlemaps/js-api-loader"

import "../../../styles/map.css"

export const MapInfo = (props) => {
    const data = props.data;

    // const loader = new Loader({
    //     apiKey: "AIzaSyCOcxTSXvSDDWIP9DyVSDLqMYEApldW_yQ",
    //     version: "weekly"
    // });

    // loader.load().then(async () => {
    //     const { Map } = await google.maps.importLibrary("maps");

    //     const map = new Map(document.getElementById("map"), {
    //         center: { lat: -34.397, lng: 150.644 },
    //         zoom: 8,
    //     });
    // });

    // const directionsService = new DirectionsService();

    // directionsService.route(
    //     {
    //         origin: data.manufacturerAddress,
    //         destination: data.customerAddress,
    //         travelMode: "DRIVING"
    //     }
    // )

    return (
        <div className="mb-3">
            <h4 className="border-bottom">Directions</h4>
            {/* <div id="map"></div> */}
            <iframe
                className="rounded"
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