import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, InfoWindow, LoadScript } from '@react-google-maps/api';

const CinemaMap = () => {
    const [cinemas, setCinemas] = useState([]);
    const [selectedCinema, setSelectedCinema] = useState(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        const fetchCinemas = async () => {
            try {
                const response = await fetch('https://api-adad-e27e767b86bc.herokuapp.com/cinemas');
                const data = await response.json();
                setCinemas(data);
            } catch (error) {
                console.error('Error fetching cinemas:', error);
                handleLoadError();
            }
        };

        fetchCinemas();

        return () => {
            // Cleanup function to unload the Google Maps API when the component is unmounted
            setMapLoaded(false);
        };
    }, []); // Empty dependency array to run the effect only once on mount

    const center = { lat: 38.736946, lng: -9.142685 };

    const mapContainerStyle = {
        height: '400px',
        width: '100%',
    };
    const infoWindowStyle = {
        width: '220px', // Set the width to match the desired width of the image
    };
    const onLoad = () => {
        setMapLoaded(true);
    };

    const onError = () => {
        console.error('Error loading Google Maps API');
        if (retryCount < 5) {
            // Retry up to 5 times (adjust as needed)
            setRetryCount(retryCount + 1);
            setMapLoaded(false); // Reset mapLoaded state for the retry
        } else {
            console.error('Exceeded maximum retry attempts. Reloading the page...');
            handleLoadError();
        }
    };

    const handleLoadError = () => {
        // Reload the page
        setTimeout(() => {
            window.location.reload();
        }, 3000); // You can adjust the delay (in milliseconds) before reloading
    };

    return (
        <div>
            <LoadScript
                googleMapsApiKey="AIzaSyBnRw6pPuuCuz0Kh4MU_YNb02pOc82U56o"
                onLoad={onLoad}
                onError={onError}
            >
                {mapLoaded ? (
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
                                        <div className="info-window">
                                            <h3>{selectedCinema.name} </h3>
                                            {selectedCinema.imageUrl && (
                                                <img
                                                    src={selectedCinema.imageUrl}
                                                    alt={selectedCinema.name}
                                                    style={{ width: '200px', height: 'auto' }}
                                                />
                                            )}
                                            {/* Add additional information here if needed */}
                                        </div>
                                    </InfoWindow>
                                )}
                            </Marker>
                        ))}
                    </GoogleMap>
                ) : (
                    <div>Loading...</div>
                )}
            </LoadScript>
        </div>
    );
};

export default CinemaMap;

