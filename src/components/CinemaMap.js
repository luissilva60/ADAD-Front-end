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

    const center = { lat: 0, lng: 0 };

    const mapContainerStyle = {
        height: '400px',
        width: '100%',
    };

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyBSXwa7dbHxfTU-qvDTE5GXskpCHr951sg"
        >
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={2}
            >
                {cinemas.map((cinema) => (
                    <Marker
                        key={cinema._id}
                        position={{ lat: cinema.y, lng: cinema.x }}
                        onClick={() => {
                            setSelectedCinema(cinema);
                        }}
                    />
                ))}

                {selectedCinema && (
                    <InfoWindow
                        position={{ lat: selectedCinema.y, lng: selectedCinema.x }}
                        onCloseClick={() => {
                            setSelectedCinema(null);
                        }}
                    >
                        <div>
                            <h5>{selectedCinema.name}</h5>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default CinemaMap;
