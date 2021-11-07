import React from 'react'
import ReactMapGL, { Marker } from "react-map-gl";
import { useState, useEffect } from 'react';
function Map(props) {
    const [viewport, setViewport] = useState({
        width: "70vw",
        height: 400,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
      });
    const {mapLocations} = props;
    const [selectedLocation, setSelectedLocation] = useState(null);
    
    //useEffect(mapLocations, [mapLocations]);
    //useEffect(selectedLocation, [selectedLocation]);
    return (
        <div>
            <ReactMapGL
            {...viewport}
            mapboxApiAccessToken='pk.eyJ1IjoiYWxhYmVuYWljaGEiLCJhIjoiY2t2bnU0aXoyMHV5OTJycWYweGVidXI1ayJ9.cza6jyUZayWvluoM6qKZAg'
            //mapStyle="mapbox://styles/leighhalliday/cjufmjn1r2kic1fl9wxg7u1l4"
            onViewportChange={viewport => {
            setViewport(viewport);
            }}
            >
                {/* <Marker
                        //key={location._id}
                        //latitude='37.773972'
                        //longitude='-122.431297'
                     >
                </Marker> */}
                {/* // {[mapLocations]?.map(location => (
                //     <Marker
                //         key={location._id}
                //         latitude='37.773972'
                //         longitude='-122.431297'
                //     >
                //         test */}
                        {/* <button
                        className="marker-btn"
                        onClick={e => {
                            e.preventDefault();
                            setSelectedLocation(location);
                        }}
                        >
                        <img src="https://www.flaticon.com/free-icon/placeholder_684809?term=location&page=1&position=13&page=1&position=13&related_id=684809&origin=search" alt="one location" />
                        </button> */}
                    {/* // </Marker>
                    // ))} */}

                    {/* {selectedLocation ? (
                    <Popup
                        latitude={location.lat}
                        longitude={location.lang}
                        onClose={() => {
                        setSelectedLocation(null);
                        }}
                    >
                        <div>
                        <h2>{selectedLocation.name}</h2>
                        <p>{selectedLocation.description}</p>
                        </div>
                    </Popup>
                    ) : null} */}
            </ReactMapGL>
        </div>
    )
}

export default Map
