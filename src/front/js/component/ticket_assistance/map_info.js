import React, { useEffect, useState } from "react";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps";

export const MapInfo = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCOcxTSXvSDDWIP9DyVSDLqMYEApldW_yQ&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: "100%" }} />,
    containerElement: <div style={{ height: "400px" }} />,
    mapElement: <div style={{ height: "100%" }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    const directionsService = new window.google.maps.DirectionsService();

    const origin = "Lisbon";
    const destination = props.destination;
    const isAddress = typeof destination === "string";

    const request = {
      origin,
      [isAddress ? "destination" : "destinationLatLng"]: isAddress
        ? { query: destination }
        : destination,
      travelMode: window.google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        setDirections(result);

        const route = result.routes[0];
        const legs = route.legs[0];

        setDistance(legs.distance.text);
        setDuration(legs.duration.text);
      } else {
        console.error("Error fetching directions:", status);
      }
    });
  }, [props.destination]);

  return (
      <GoogleMap className="mb-3" defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
        {directions && <DirectionsRenderer directions={directions} distance={distance} duration={duration}/>}
        {/* {distance && <div>Distance: {distance}</div>}
        {duration && <div >Duration: {duration}</div>} */}
      </GoogleMap>
  );
});
