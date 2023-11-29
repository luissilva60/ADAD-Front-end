import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, InfoWindow, LoadScript } from '@react-google-maps/api';

const CinemaMap = () => {
    const [cinemas, setCinemas] = useState([]);
    const [selectedCinema, setSelectedCinema] = useState(null);

    useEffect(() => {
        const fetchCinemas = async () => {
            try {
                const response = await fetch('https://api-adad-e27e767b86bc.herokuapp.com/cinemas');
                const data = await response.json();
                setCinemas(data);
            } catch (error) {
                console.error('Error fetching cinemas:', error);
            }
        };

        fetchCinemas();
    }, []);

    const center = { lat: 38.736946, lng: -9.142685 };

    const mapContainerStyle = {
        height: '400px',
        width: '100%',
    };

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyAeXJMCul0dV0qlry9bSDTx9K9dKRLJZSY"
        >
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={12}
            >
                {cinemas.map((cinema) => (
                    <Marker
                        key={cinema._id}
                        position={{ lat: cinema.y, lng: cinema.x }}
                        icon={{
                            url: '../cinema.png',
                            scaledSize: new window.google.maps.Size(40, 40),
                        }}
                        onClick={() => {
                            setSelectedCinema(cinema);
                        }}
                    >
                        {selectedCinema === cinema && (
                            <InfoWindow
                                position={{ lat: selectedCinema.y, lng: selectedCinema.x }}
                                onCloseClick={() => {
                                    setSelectedCinema(null);

                                }}
                            >
                                <div>
                                    <h5>{selectedCinema.name}</h5>
                                    {/* Add additional information here if needed */}
                                </div>
                            </InfoWindow>
                        )}
                    </Marker>
                ))}
            </GoogleMap>
        </LoadScript>
    );
};

export default CinemaMap;
