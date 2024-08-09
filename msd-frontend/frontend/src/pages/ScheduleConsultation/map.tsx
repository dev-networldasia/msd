
import { DirectionsRenderer, DirectionsService, GoogleMap, Marker, MarkerClusterer, useLoadScript } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import { location_green } from '../../components/ImgExport';
import { KEY_MAP } from '../../env';
import './styles.css';

interface MapProps {
    directLocation?: boolean,
    directLocationlat?: number,
    directLocationlng?: number,
    latUser?: number,
    lngUser?: number,
    lat: number,
    lng: number,
    listLocation: any
}
const Map: React.FC<MapProps> = ({ directLocation = false, directLocationlat = 0, directLocationlng = 0, latUser = 0, lngUser = 0, lat = 0, lng = 0, listLocation }) => {

    const [response, setResponse] = useState<google.maps.DirectionsResult | null>(null);
    const [latNumber, setLatNumber] = useState(lat ? lat : 0)
    const [lngNumber, setLngNumber] = useState(lng ? lng : 0)

    useEffect(() => {
        setLatNumber(lat)
        setLngNumber(lng)
    }, [lat, lng])
    const mapContainerStyle = {
        width: '100%',
        height: '100%',
    };
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: KEY_MAP,
    });

    if (loadError) {
        return <div>Đã xảy ra lỗi khi tải Google Maps</div>;
    }

    if (!isLoaded) {
        return <div>Đang tải Google Maps...</div>;
    }

    const directions = {
        origin: { lat: latUser, lng: lngUser }, // điểm đi
        destination: { lat: directLocationlat, lng: directLocationlng }, // điểm đến
        travelMode: 'DRIVING' as google.maps.TravelMode, // or 'WALKING', 'BICYCLING', 'TRANSIT'
    };
    const directionsCallback = (result: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus) => {
        if (status === 'OK') {
            setResponse(result);
        } else {
            console.error(`Error fetching directions ${result}`);
        }
    };

    return (
        <>
            {/* tablet - desktop */}
            {directLocation && (
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    options={{
                        styles: [{ featureType: 'poi.business', elementType: 'labels', stylers: [{ visibility: 'off' }] }],
                    }}
                // onClick={handleMapClick}
                >
                    <DirectionsService
                        options={{ destination: directions.destination, origin: directions.origin, travelMode: directions.travelMode }}
                        callback={directionsCallback}
                    />
                    {directLocation && <DirectionsRenderer options={{ directions: response }} />}
                    <MarkerClusterer>
                        {(clusterer) =>
                            <>
                                {latNumber !==0 && lngNumber !==0 && (
                                    <Marker
                                        position={{ lat: Number(latUser), lng: Number(lngUser) }}
                                        clusterer={clusterer}
                                    >
                                    </Marker>
                                )}
                                {listLocation && listLocation.map((item: any, index: number) => (
                                    <Marker
                                        position={{ lat: Number(item.lat), lng: Number(item.lng) }}
                                        icon={{
                                            url: location_green,
                                        }}
                                        clusterer={clusterer}
                                    // onClick={() => handleMarkerClick(index)}
                                    >
                                    </Marker>
                                ))}

                            </>
                        }
                    </MarkerClusterer>
                </GoogleMap>
            )}
            {!directLocation && (
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={{ lat: latNumber, lng: lngNumber }}
                    zoom={16}
                    options={{
                        styles: [{ featureType: 'poi.business', elementType: 'labels', stylers: [{ visibility: 'off' }] }],
                    }}
                // onClick={handleMapClick}
                >
                    <MarkerClusterer>
                        {(clusterer) =>
                            <>
                                {latNumber !==0 && lngNumber !==0 && (
                                    <Marker
                                        position={{ lat: Number(latUser), lng: Number(lngUser) }}
                                        clusterer={clusterer}
                                    >
                                    </Marker>
                                )}
                                {listLocation && listLocation.map((item: any, index: number) => (
                                    <Marker
                                        position={{ lat: Number(item.lat), lng: Number(item.lng) }}
                                        icon={{
                                            url: location_green,
                                        }}
                                        clusterer={clusterer}
                                    // onClick={() => handleMarkerClick(index)}
                                    >
                                    </Marker>
                                ))}

                            </>
                        }
                    </MarkerClusterer>
                </GoogleMap>
            )}


        </>

    )
}
export default Map